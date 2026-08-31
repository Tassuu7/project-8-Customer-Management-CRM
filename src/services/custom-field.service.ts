/**
 * Dynamic Custom Field Definition & Schema Service
 */

import { Repository } from '../database/repository';
import { BaseEntity } from '../database/repository';
import { ValidationError } from '../core/errors';

export interface CustomFieldDefinition extends BaseEntity {
  entityType: string;
  name: string;
  label: string;
  fieldType: 'text' | 'number' | 'date' | 'select' | 'boolean';
  options?: string[];
  isRequired: boolean;
}

export class CustomFieldService {
  private fieldRepo: Repository<CustomFieldDefinition>;

  constructor() {
    this.fieldRepo = new Repository<CustomFieldDefinition>('custom_fields');
  }

  public async getFieldsForEntity(entityType: string): Promise<CustomFieldDefinition[]> {
    return this.fieldRepo.query().where('entityType', '=', entityType).get();
  }

  public async createField(dto: {
    entityType: string;
    name: string;
    label: string;
    fieldType: CustomFieldDefinition['fieldType'];
    options?: string[];
    isRequired?: boolean;
  }): Promise<CustomFieldDefinition> {
    if (!dto.name || !dto.label || !dto.entityType) {
      throw new ValidationError('Entity type, field name, and label are required');
    }

    return this.fieldRepo.create({
      entityType: dto.entityType,
      name: dto.name.trim().toLowerCase().replace(/\s+/g, '_'),
      label: dto.label.trim(),
      fieldType: dto.fieldType,
      options: dto.options || [],
      isRequired: dto.isRequired || false
    });
  }

  public validateCustomFields(entityType: string, values: Record<string, any>): void {
    const fields = this.fieldRepo.query().where('entityType', '=', entityType).get();
    for (const f of fields) {
      if (f.isRequired && (values[f.name] === undefined || values[f.name] === null || values[f.name] === '')) {
        throw new ValidationError(`Custom field '${f.label}' is required`);
      }
    }
  }
}
