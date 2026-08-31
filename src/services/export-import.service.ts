/**
 * Enterprise Bulk Data Import / Export Engine
 * Handles CSV parsing, schema transformation, batch customer import,
 * and JSON/CSV streaming export.
 */

import { Repository } from '../database/repository';
import { CustomerAccount } from '../models/customer.model';
import { Contact } from '../models/contact.model';
import { Deal } from '../models/deal.model';

export class ExportImportService {
  private accountRepo = new Repository<CustomerAccount>('accounts');
  private contactRepo = new Repository<Contact>('contacts');
  private dealRepo = new Repository<Deal>('deals');

  public exportCustomersToCsv(): string {
    const accounts = this.accountRepo.findAll();
    const headers = ['ID', 'Name', 'Domain', 'Industry', 'Tier', 'Annual Revenue', 'Health Score', 'Churn Risk', 'LTV', 'Created At'];
    
    const rows = accounts.map(a => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      a.domain || '',
      a.industry || '',
      a.tier,
      a.annualRevenue,
      a.healthScore,
      a.churnRisk,
      a.lifetimeValue,
      a.createdAt
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  public importCustomersFromCsv(csvContent: string): { importedCount: number; errors: string[] } {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) return { importedCount: 0, errors: ['CSV file is empty or missing data rows'] };

    let importedCount = 0;
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = line.split(',').map(c => c.replace(/^"|"$/g, '').trim());
      const name = cols[0];
      if (!name) {
        errors.push(`Row ${i}: Missing customer name`);
        continue;
      }

      this.accountRepo.create({
        name,
        domain: cols[1] || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        industry: cols[2] || 'General',
        tier: (cols[3] as any) || 'Standard',
        annualRevenue: Number(cols[4]) || 0,
        employeeCount: 10,
        healthScore: 80,
        churnRisk: 'low',
        lifetimeValue: 0,
        status: 'active',
        tags: ['CSV_Imported'],
        customFields: {}
      });
      importedCount++;
    }

    return { importedCount, errors };
  }
}
