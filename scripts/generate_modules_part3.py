import os

ROOT = os.getcwd()

def write_file(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    lines = len(content.strip().splitlines())
    print(f"  [+Created] {rel_path:<50} {lines:>6} LOC")
    return lines

def generate_support_and_comm():
    print("Generating Service Desk & Communication Hub Modules...")
    
    # 1. sla_escalation_matrix.ts
    code_sla = """/**
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
"""
    write_file("src/modules/service_desk/sla_escalation_matrix.ts", code_sla)

    # 2. skill_based_routing.ts
    code_routing = """/**
 * Intelligent Skill-Based & Workload Balanced Agent Routing Engine
 */

export interface SupportAgent {
  id: string;
  name: string;
  skills: string[]; // e.g. ["Billing", "Kubernetes", "SAML SSO", "API"]
  languages: string[];
  activeTicketCount: number;
  maxTicketCapacity: number;
  isAvailable: boolean;
}

export class SkillBasedRouting {
  public routeTicket(
    ticket: { subject: string; description: string; priority: string; language?: string },
    agents: SupportAgent[]
  ): { assignedAgentId?: string; routingReason: string } {
    const availableAgents = agents.filter(a => a.isAvailable && a.activeTicketCount < a.maxTicketCapacity);
    if (availableAgents.length === 0) {
      return { routingReason: 'All agents at capacity. Placed in priority queue.' };
    }

    const text = `${ticket.subject} ${ticket.description}`.toLowerCase();
    let bestAgent: SupportAgent | null = null;
    let highestScore = -1;

    for (const agent of availableAgents) {
      let score = 10;
      // Workload balancing bonus (more available slots = higher score)
      const capacityRatio = (agent.maxTicketCapacity - agent.activeTicketCount) / agent.maxTicketCapacity;
      score += Math.round(capacityRatio * 20);

      // Skill matches
      for (const skill of agent.skills) {
        if (text.includes(skill.toLowerCase())) {
          score += 25;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestAgent = agent;
      }
    }

    return {
      assignedAgentId: bestAgent ? bestAgent.id : availableAgents[0].id,
      routingReason: `Matched agent based on skill affinity score of ${highestScore}`
    };
  }
}
"""
    write_file("src/modules/service_desk/skill_based_routing.ts", code_routing)

    # 3. email_template_compiler.ts
    code_email = """/**
 * Handlebars-Style Variable Interpolator & Email Template Compiler
 */

export class EmailTemplateCompiler {
  public compile(templateHtml: string, context: Record<string, any>): string {
    let output = templateHtml;

    for (const [key, value] of Object.entries(context)) {
      if (typeof value === 'object' && value !== null) {
        for (const [subKey, subVal] of Object.entries(value)) {
          const pattern = new RegExp(`\\{\\{${key}\\.${subKey}\\}\\}`, 'g');
          output = output.replace(pattern, String(subVal ?? ''));
        }
      } else {
        const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        output = output.replace(pattern, String(value ?? ''));
      }
    }

    return output;
  }
}
"""
    write_file("src/modules/communication_hub/email_template_compiler.ts", code_email)

    # 4. meeting_scheduler.ts
    code_meeting = """/**
 * Meeting Scheduling, Timezone Resolver & iCalendar (ICS) Generator
 */

export class MeetingScheduler {
  public generateICalendar(event: {
    uid: string;
    title: string;
    description: string;
    location: string;
    startTime: string; // ISO
    durationMinutes: number;
    organizerEmail: string;
    attendeeEmails: string[];
  }): string {
    const start = new Date(event.startTime);
    const end = new Date(start.getTime() + event.durationMinutes * 60000);

    const formatICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Apex OmniCustomer 360 CRM//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${event.uid}`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      `ORGANIZER;CN=Apex CRM:mailto:${event.organizerEmail}`,
      ...event.attendeeEmails.map(email => `ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:${email}`),
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }
}
"""
    write_file("src/modules/communication_hub/meeting_scheduler.ts", code_meeting)

if __name__ == '__main__':
    generate_support_and_comm()
