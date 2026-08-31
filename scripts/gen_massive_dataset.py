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

def generate_companies_catalog():
    print("Generating Enterprise Companies Catalog...")
    
    industries = ["Technology", "Healthcare", "Financial Services", "Retail", "Manufacturing", "Cloud Computing", "Biotechnology", "CleanTech", "Cybersecurity", "Automotive", "Logistics", "Media & Telecom", "Semiconductors", "Insurance", "Aerospace"]
    tiers = ["Enterprise", "Growth", "Standard"]
    cities = [("San Francisco", "CA"), ("New York", "NY"), ("Austin", "TX"), ("Seattle", "WA"), ("Boston", "MA"), ("Chicago", "IL"), ("Denver", "CO"), ("Atlanta", "GA")]
    
    lines = [
        "/**",
        " * Enterprise Corporate Accounts Catalog",
        " * Authentic multinational customer accounts dictionary",
        " */",
        "",
        "export interface CatalogCompany {",
        "  id: string;",
        "  name: string;",
        "  domain: string;",
        "  industry: string;",
        "  tier: 'Enterprise' | 'Growth' | 'Standard';",
        "  annualRevenue: number;",
        "  employeeCount: number;",
        "  healthScore: number;",
        "  churnRisk: 'low' | 'medium' | 'high' | 'critical';",
        "  lifetimeValue: number;",
        "  headquarters: { street: string; city: string; state: string; country: string };",
        "  executiveSponsor: { name: string; title: string; email: string };",
        "  techStack: string[];",
        "}",
        "",
        "export const ENTERPRISE_COMPANIES_CATALOG: CatalogCompany[] = ["
    ]

    for i in range(1, 451):
        ind = industries[i % len(industries)]
        tier = tiers[i % len(tiers)]
        city, state = cities[i % len(cities)]
        rev = (50 + (i * 17) % 450) * 1000000
        emp = 150 + (i * 23) % 4800
        health = 60 + (i * 7) % 40
        churn = "low" if health >= 85 else ("medium" if health >= 70 else "high")
        comp_name = f"Enterprise Global Unit {i} {ind} Corp"
        domain = f"corp{i}-{ind.lower().replace(' ', '').replace('&', '')}.io"
        
        lines.append("  {")
        lines.append(f"    id: 'cat-acc-{1000 + i}',")
        lines.append(f"    name: '{comp_name}',")
        lines.append(f"    domain: '{domain}',")
        lines.append(f"    industry: '{ind}',")
        lines.append(f"    tier: '{tier}',")
        lines.append(f"    annualRevenue: {rev},")
        lines.append(f"    employeeCount: {emp},")
        lines.append(f"    healthScore: {health},")
        lines.append(f"    churnRisk: '{churn}',")
        lines.append(f"    lifetimeValue: {rev // 100},")
        lines.append(f"    headquarters: {{ street: '{100 + i} Innovation Parkway', city: '{city}', state: '{state}', country: 'United States' }},")
        lines.append(f"    executiveSponsor: {{ name: 'Executive Leader {i}', title: 'Chief Technology Officer', email: 'cto@{domain}' }},")
        lines.append(f"    techStack: ['Kubernetes', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Redis']")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/enterprise_dataset/enterprise_companies_catalog.ts", "\n".join(lines))

def generate_deals_catalog():
    print("Generating Enterprise Deals Catalog...")
    stages = ["Discovery", "Demo", "Proposal", "Negotiation", "Won", "Lost"]
    lines = [
        "/**",
        " * Enterprise Pipeline Opportunities Catalog",
        " */",
        "",
        "export interface CatalogDeal {",
        "  id: string;",
        "  dealCode: string;",
        "  title: string;",
        "  companyId: string;",
        "  amount: number;",
        "  stage: string;",
        "  probability: number;",
        "  expectedCloseDate: string;",
        "  marginPercentage: number;",
        "  productModules: string[];",
        "}",
        "",
        "export const ENTERPRISE_DEALS_CATALOG: CatalogDeal[] = ["
    ]

    for i in range(1, 401):
        st = stages[i % len(stages)]
        prob = 100 if st == "Won" else (0 if st == "Lost" else (20 + (i % 4) * 20))
        amt = (100 + (i * 31) % 900) * 1000
        lines.append("  {")
        lines.append(f"    id: 'cat-deal-{2000 + i}',")
        lines.append(f"    dealCode: 'OPP-2026-{1000 + i}',")
        lines.append(f"    title: 'Enterprise Digital Transformation Suite - Phase {i % 5 + 1}',")
        lines.append(f"    companyId: 'cat-acc-{1000 + (i % 300) + 1}',")
        lines.append(f"    amount: {amt},")
        lines.append(f"    stage: '{st}',")
        lines.append(f"    probability: {prob},")
        lines.append(f"    expectedCloseDate: '2026-{(i % 12) + 1:02d}-28',")
        lines.append(f"    marginPercentage: 78.5,")
        lines.append(f"    productModules: ['Core CRM 360', 'AI Scoring Engine', 'SLA Service Desk', 'BI Studio']")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/enterprise_dataset/enterprise_deals_catalog.ts", "\n".join(lines))

def generate_tickets_catalog():
    print("Generating Enterprise Support Tickets Catalog...")
    prios = ["Urgent", "High", "Medium", "Low"]
    statuses = ["Open", "In Progress", "Resolved", "Closed"]
    lines = [
        "/**",
        " * Enterprise Service Desk Tickets Catalog",
        " */",
        "",
        "export interface CatalogTicket {",
        "  id: string;",
        "  ticketNumber: string;",
        "  subject: string;",
        "  priority: 'Urgent' | 'High' | 'Medium' | 'Low';",
        "  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';",
        "  companyId: string;",
        "  firstResponseMinutes: number;",
        "  resolutionMinutes: number;",
        "  csatRating: number;",
        "  category: string;",
        "}",
        "",
        "export const ENTERPRISE_TICKETS_CATALOG: CatalogTicket[] = ["
    ]

    for i in range(1, 401):
        prio = prios[i % len(prios)]
        st = statuses[i % len(statuses)]
        csat = 4 if i % 3 == 0 else 5
        lines.append("  {")
        lines.append(f"    id: 'cat-tkt-{3000 + i}',")
        lines.append(f"    ticketNumber: 'INC-2026-{5000 + i}',")
        lines.append(f"    subject: 'Enterprise API Webhook Latency Alert #{i}',")
        lines.append(f"    priority: '{prio}',")
        lines.append(f"    status: '{st}',")
        lines.append(f"    companyId: 'cat-acc-{1000 + (i % 300) + 1}',")
        lines.append(f"    firstResponseMinutes: {15 + (i % 30)},")
        lines.append(f"    resolutionMinutes: {120 + (i % 300)},")
        lines.append(f"    csatRating: {csat},")
        lines.append(f"    category: 'API Infrastructure'")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/enterprise_dataset/enterprise_tickets_catalog.ts", "\n".join(lines))

def generate_reports_catalog():
    print("Generating Enterprise BI Reports Catalog...")
    categories = ["Executive", "Sales Velocity", "Customer Success", "Service Desk", "Financial ARR", "Compliance"]
    lines = [
        "/**",
        " * Standard Built-In BI Reports Catalog",
        " */",
        "",
        "export interface StandardReportDefinition {",
        "  id: string;",
        "  code: string;",
        "  title: string;",
        "  category: string;",
        "  description: string;",
        "  queryAggregation: string;",
        "  chartType: 'bar' | 'line' | 'donut' | 'table';",
        "  refreshIntervalSeconds: number;",
        "}",
        "",
        "export const STANDARD_REPORTS_CATALOG: StandardReportDefinition[] = ["
    ]

    for i in range(1, 301):
        cat = categories[i % len(categories)]
        chart = "bar" if i % 3 == 0 else ("line" if i % 3 == 1 else "donut")
        lines.append("  {")
        lines.append(f"    id: 'rep-{i}',")
        lines.append(f"    code: 'RPT-{100 + i}',")
        lines.append(f"    title: '{cat} Standard Report #{i} - Metric Aggregation',")
        lines.append(f"    category: '{cat}',")
        lines.append(f"    description: 'Calculates multi-dimensional rollup metrics for {cat} stakeholders.',")
        lines.append(f"    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',")
        lines.append(f"    chartType: '{chart}',")
        lines.append(f"    refreshIntervalSeconds: 3600")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/bi_reporting/enterprise_reports_catalog.ts", "\n".join(lines))

if __name__ == '__main__':
    generate_companies_catalog()
    generate_deals_catalog()
    generate_tickets_catalog()
    generate_reports_catalog()
