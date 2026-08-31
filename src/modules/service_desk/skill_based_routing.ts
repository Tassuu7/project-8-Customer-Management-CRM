/**
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
