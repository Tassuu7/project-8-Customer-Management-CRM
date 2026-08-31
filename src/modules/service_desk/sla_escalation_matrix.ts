/**
 * Complex Business Hours & Multi-Tier SLA Escalation Policy Matrix
 */

export interface SLAPolicyDefinition {
  tier: 'Platinum 24/7' | 'Gold Business Hours' | 'Silver Standard';
  businessHoursOnly: boolean;
  businessStartHour: number; // e.g. 9
  businessEndHour: number; // e.g. 17
  responseTargetsMinutes: Record<'Urgent' | 'High' | 'Medium' | 'Low', number>;
  resolutionTargetsMinutes: Record<'Urgent' | 'High' | 'Medium' | 'Low', number>;
}

export class SLAEscalationMatrix {
  private policies: Record<string, SLAPolicyDefinition> = {
    'Platinum 24/7': {
      tier: 'Platinum 24/7',
      businessHoursOnly: false,
      businessStartHour: 0,
      businessEndHour: 24,
      responseTargetsMinutes: { Urgent: 30, High: 120, Medium: 240, Low: 480 },
      resolutionTargetsMinutes: { Urgent: 240, High: 720, Medium: 1440, Low: 2880 }
    },
    'Gold Business Hours': {
      tier: 'Gold Business Hours',
      businessHoursOnly: true,
      businessStartHour: 8,
      businessEndHour: 18,
      responseTargetsMinutes: { Urgent: 60, High: 240, Medium: 480, Low: 960 },
      resolutionTargetsMinutes: { Urgent: 480, High: 1440, Medium: 2880, Low: 5760 }
    }
  };

  public computeDeadlines(
    createdAt: string,
    priority: 'Urgent' | 'High' | 'Medium' | 'Low',
    tierName = 'Platinum 24/7'
  ): { firstResponseDue: string; resolutionDue: string } {
    const policy = this.policies[tierName] || this.policies['Platinum 24/7'];
    const startTime = new Date(createdAt).getTime();

    const firstResponseMins = policy.responseTargetsMinutes[priority];
    const resolutionMins = policy.resolutionTargetsMinutes[priority];

    const firstResponseDue = new Date(startTime + firstResponseMins * 60000).toISOString();
    const resolutionDue = new Date(startTime + resolutionMins * 60000).toISOString();

    return {
      firstResponseDue,
      resolutionDue
    };
  }
}
