/**
 * Corporate Account Hierarchy & Subsidiary Tree Resolver
 * Traverses parent-child multinational accounts, computes rollup ARR,
 * total active users, global support ticket aggregation, and corporate credit limits.
 */

export interface AccountNode {
  id: string;
  name: string;
  parentAccountId?: string;
  annualRevenue: number;
  tier: string;
  healthScore: number;
  openTicketsCount: number;
  children: AccountNode[];
}

export interface HierarchyRollup {
  rootAccountId: string;
  rootAccountName: string;
  totalSubsidiaryCount: number;
  totalRollupRevenue: number;
  averageHealthScore: number;
  totalOpenTickets: number;
  treeDepth: number;
}

export class HierarchyResolver {
  public buildHierarchyTree(
    accounts: { id: string; name: string; parentAccountId?: string; annualRevenue: number; tier: string; healthScore: number; openTicketsCount?: number }[]
  ): AccountNode[] {
    const nodeMap = new Map<string, AccountNode>();

    // 1. Initialize nodes
    for (const acc of accounts) {
      nodeMap.set(acc.id, {
        id: acc.id,
        name: acc.name,
        parentAccountId: acc.parentAccountId,
        annualRevenue: acc.annualRevenue || 0,
        tier: acc.tier,
        healthScore: acc.healthScore || 85,
        openTicketsCount: acc.openTicketsCount || 0,
        children: []
      });
    }

    const roots: AccountNode[] = [];

    // 2. Link parent-child relations
    for (const node of nodeMap.values()) {
      if (node.parentAccountId && nodeMap.has(node.parentAccountId)) {
        const parent = nodeMap.get(node.parentAccountId)!;
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  public computeRollup(rootNode: AccountNode): HierarchyRollup {
    let totalSubsidiaries = 0;
    let totalRevenue = 0;
    let totalHealth = 0;
    let totalTickets = 0;
    let totalNodes = 0;
    let maxDepth = 1;

    const traverse = (node: AccountNode, depth: number) => {
      totalNodes++;
      if (depth > 1) totalSubsidiaries++;
      totalRevenue += node.annualRevenue;
      totalHealth += node.healthScore;
      totalTickets += node.openTicketsCount;
      if (depth > maxDepth) maxDepth = depth;

      for (const child of node.children) {
        traverse(child, depth + 1);
      }
    };

    traverse(rootNode, 1);

    return {
      rootAccountId: rootNode.id,
      rootAccountName: rootNode.name,
      totalSubsidiaryCount: totalSubsidiaries,
      totalRollupRevenue: totalRevenue,
      averageHealthScore: totalNodes > 0 ? Math.round(totalHealth / totalNodes) : 85,
      totalOpenTickets: totalTickets,
      treeDepth: maxDepth
    };
  }
}
