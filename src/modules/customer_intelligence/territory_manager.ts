/**
 * Enterprise Territory & Geographic Account Routing Engine
 * Maps customer zip codes, states, countries, and industry verticals to designated account executive teams.
 */

export interface SalesTerritory {
  id: string;
  name: string;
  regions: string[]; // e.g. ["CA", "WA", "OR"]
  industryFocus: string[];
  assignedTeamLeaderId: string;
  assignedRepIds: string[];
  annualQuotaRevenue: number;
}

export class TerritoryManager {
  private territories: SalesTerritory[] = [
    {
      id: 'terr-west',
      name: 'North America West Strategic',
      regions: ['CA', 'WA', 'OR', 'NV', 'AZ', 'CO'],
      industryFocus: ['Technology', 'Cloud & Hosting', 'CleanTech'],
      assignedTeamLeaderId: 'usr-sales-01',
      assignedRepIds: ['usr-exec-01', 'usr-exec-02'],
      annualQuotaRevenue: 15000000
    },
    {
      id: 'terr-east',
      name: 'North America East Financial & Healthcare',
      regions: ['NY', 'NJ', 'MA', 'CT', 'PA', 'FL'],
      industryFocus: ['Financial Services', 'Healthcare', 'Insurance', 'Biotechnology'],
      assignedTeamLeaderId: 'usr-sales-01',
      assignedRepIds: ['usr-exec-01'],
      annualQuotaRevenue: 22000000
    }
  ];

  public assignTerritory(account: { state?: string; country?: string; industry?: string }): {
    territoryId: string;
    territoryName: string;
    assignedRepId: string;
  } {
    const state = (account.state || '').toUpperCase();
    const industry = account.industry || 'Technology';

    for (const terr of this.territories) {
      const matchState = state && terr.regions.includes(state);
      const matchIndustry = terr.industryFocus.includes(industry);

      if (matchState || matchIndustry) {
        // Round-robin selection of assigned rep
        const rep = terr.assignedRepIds[Math.floor(Math.random() * terr.assignedRepIds.length)];
        return {
          territoryId: terr.id,
          territoryName: terr.name,
          assignedRepId: rep || terr.assignedTeamLeaderId
        };
      }
    }

    return {
      territoryId: this.territories[0].id,
      territoryName: this.territories[0].name,
      assignedRepId: this.territories[0].assignedRepIds[0]
    };
  }
}
