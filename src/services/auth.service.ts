/**
 * Authentication, JWT Issuance & Session Management Service
 */

import { Repository } from '../database/repository';
import { User, Role, AuthTokensDTO, UserProfileDTO } from '../models/user.model';
import { CryptoUtils } from '../core/crypto';
import { ValidationError, UnauthorizedError, ConflictError, NotFoundError } from '../core/errors';
import { config } from '../core/config';
import { logger } from '../core/logger';
import { eventBus } from '../core/events';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  private userRepo = new Repository<User>('users');
  private roleRepo = new Repository<Role>('roles');

  public async login(email: string, password: string, ipAddress?: string): Promise<AuthTokensDTO> {
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = this.userRepo.query().where('email', '=', cleanEmail).first();

    if (!user || user.status !== 'active') {
      logger.warn(`[Auth] Failed login attempt for email: ${cleanEmail}`, 'AUTH_SERVICE', { ip: ipAddress });
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await CryptoUtils.comparePassword(password, user.passwordHash);
    if (!isMatch) {
      logger.warn(`[Auth] Password mismatch for user: ${cleanEmail}`, 'AUTH_SERVICE', { ip: ipAddress });
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update last login
    this.userRepo.update(user.id, { lastLoginAt: new Date().toISOString() });

    const role = this.roleRepo.findById(user.roleId);
    const permissions = role ? role.permissions : [];

    const userProfile: UserProfileDTO = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      roleId: user.roleId,
      roleName: role ? role.name : 'Unknown',
      permissions,
      department: user.department,
      avatarUrl: user.avatarUrl,
      status: user.status
    };

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        roleId: user.roleId,
        permissions
      },
      config.auth.jwtSecret,
      { expiresIn: config.auth.jwtExpirationSec }
    );

    const refreshToken = CryptoUtils.generateSecureToken(48);

    await eventBus.emit('auth.login_success', { userId: user.id, email: user.email, ipAddress });
    logger.audit('USER_LOGIN', { userId: user.id, email: user.email, ipAddress }, 'AUTH_SERVICE');

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: config.auth.jwtExpirationSec,
      user: userProfile
    };
  }

  public async register(dto: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId?: string;
    department?: string;
  }, actorId?: string): Promise<UserProfileDTO> {
    if (!dto.email || !dto.password || !dto.firstName || !dto.lastName) {
      throw new ValidationError('Email, password, first name, and last name are required');
    }

    const cleanEmail = dto.email.toLowerCase().trim();
    const existing = this.userRepo.query().where('email', '=', cleanEmail).first();
    if (existing) {
      throw new ConflictError('A user with this email address already exists');
    }

    const passwordHash = await CryptoUtils.hashPassword(dto.password);
    const roleId = dto.roleId || 'role-account-exec';

    const created = this.userRepo.create({
      email: cleanEmail,
      passwordHash,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      roleId,
      department: dto.department || 'Sales',
      status: 'active'
    });

    const role = this.roleRepo.findById(roleId);
    const permissions = role ? role.permissions : [];

    await eventBus.emit('user.registered', { userId: created.id, email: cleanEmail }, actorId);
    logger.audit('USER_REGISTER', { userId: created.id, email: cleanEmail, actorId }, 'AUTH_SERVICE');

    return {
      id: created.id,
      email: created.email,
      firstName: created.firstName,
      lastName: created.lastName,
      fullName: `${created.firstName} ${created.lastName}`,
      roleId: created.roleId,
      roleName: role?.name,
      permissions,
      department: created.department,
      status: created.status
    };
  }

  public async getCurrentUser(userId: string): Promise<UserProfileDTO> {
    const user = this.userRepo.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    const role = this.roleRepo.findById(user.roleId);
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      roleId: user.roleId,
      roleName: role?.name,
      permissions: role ? role.permissions : [],
      department: user.department,
      avatarUrl: user.avatarUrl,
      status: user.status
    };
  }
}
