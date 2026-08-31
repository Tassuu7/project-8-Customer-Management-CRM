/**
 * User, Role & RBAC Domain Models and DTOs
 */

import { BaseEntity } from '../database/repository';

export interface User extends BaseEntity {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  roleId: string;
  department?: string;
  avatarUrl?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLoginAt?: string;
}

export interface Role extends BaseEntity {
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
}

export interface UserProfileDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roleId: string;
  roleName?: string;
  permissions: string[];
  department?: string;
  avatarUrl?: string;
  status: string;
}

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: UserProfileDTO;
}
