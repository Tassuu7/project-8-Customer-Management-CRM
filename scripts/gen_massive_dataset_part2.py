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

def generate_contacts_catalog():
    print("Generating Contacts Catalog...")
    titles = [
        ("Chief Information Officer", "Executive Leadership"),
        ("VP of Engineering", "Engineering"),
        ("Chief Information Security Officer", "Information Security"),
        ("Director of Product Operations", "Product"),
        ("Head of Customer Experience", "Customer Success"),
        ("VP Global Procurement", "Finance & Operations"),
        ("Lead Cloud Architect", "Infrastructure"),
        ("Senior Data Strategist", "Data & AI")
    ]
    first_names = ["Robert", "Amanda", "David", "Jessica", "Michael", "Aris", "Samantha", "Vikram", "Evelyn", "Thomas", "Sarah", "Alex", "Elena", "Marcus", "Priya", "Lucas", "Clara", "Jordan", "Gabriel", "Olivia"]
    last_names = ["Chen", "Wellington", "Sterling", "Taylor", "Chang", "Thorne", "Ray", "Patel", "Cross", "Wright", "Connor", "Morgan", "Rostova", "Vance", "Sharma", "Vanguard", "Oswald", "Bell", "Santos", "Dunne"]

    lines = [
        "/**",
        " * Enterprise Executive Contacts Directory",
        " */",
        "",
        "export interface CatalogContact {",
        "  id: string;",
        "  companyId: string;",
        "  firstName: string;",
        "  lastName: string;",
        "  email: string;",
        "  phone: string;",
        "  title: string;",
        "  department: string;",
        "  linkedInUrl: string;",
        "  isPrimary: boolean;",
        "  timezone: string;",
        "}",
        "",
        "export const ENTERPRISE_CONTACTS_CATALOG: CatalogContact[] = ["
    ]

    for i in range(1, 801):
        fn = first_names[i % len(first_names)]
        ln = last_names[i % len(last_names)]
        title, dept = titles[i % len(titles)]
        comp_id = f"cat-acc-{1000 + (i % 400) + 1}"
        email = f"{fn.lower()}.{ln.lower()}{i}@enterprise-corp{i % 400 + 1}.io"
        phone = f"+1-415-555-{1000 + i:04d}"

        lines.append("  {")
        lines.append(f"    id: 'cat-con-{4000 + i}',")
        lines.append(f"    companyId: '{comp_id}',")
        lines.append(f"    firstName: '{fn}',")
        lines.append(f"    lastName: '{ln}',")
        lines.append(f"    email: '{email}',")
        lines.append(f"    phone: '{phone}',")
        lines.append(f"    title: '{title}',")
        lines.append(f"    department: '{dept}',")
        lines.append(f"    linkedInUrl: 'https://linkedin.com/in/{fn.lower()}-{ln.lower()}-{i}',")
        lines.append(f"    isPrimary: {str(i % 3 == 0).lower()},")
        lines.append(f"    timezone: 'America/New_York'")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/enterprise_dataset/enterprise_contacts_catalog.ts", "\n".join(lines))

def generate_invoices_catalog():
    print("Generating Invoices Catalog...")
    statuses = ["Paid", "Sent", "Paid", "Draft", "Paid"]
    lines = [
        "/**",
        " * Enterprise Invoices & Billing Records Catalog",
        " */",
        "",
        "export interface CatalogInvoice {",
        "  id: string;",
        "  invoiceNumber: string;",
        "  companyId: string;",
        "  subtotal: number;",
        "  taxAmount: number;",
        "  totalAmount: number;",
        "  status: 'Paid' | 'Sent' | 'Draft' | 'Overdue';",
        "  issueDate: string;",
        "  dueDate: string;",
        "  paidDate?: string;",
        "  currency: string;",
        "}",
        "",
        "export const ENTERPRISE_INVOICES_CATALOG: CatalogInvoice[] = ["
    ]

    for i in range(1, 601):
        st = statuses[i % len(statuses)]
        sub = (50 + (i * 19) % 300) * 1000
        tax = int(sub * 0.08)
        tot = sub + tax
        comp_id = f"cat-acc-{1000 + (i % 400) + 1}"
        paid_date = f"'2026-{(i % 12) + 1:02d}-15'" if st == "Paid" else "undefined"

        lines.append("  {")
        lines.append(f"    id: 'cat-inv-{5000 + i}',")
        lines.append(f"    invoiceNumber: 'INV-2026-{8000 + i}',")
        lines.append(f"    companyId: '{comp_id}',")
        lines.append(f"    subtotal: {sub},")
        lines.append(f"    taxAmount: {tax},")
        lines.append(f"    totalAmount: {tot},")
        lines.append(f"    status: '{st}',")
        lines.append(f"    issueDate: '2026-{(i % 12) + 1:02d}-01',")
        lines.append(f"    dueDate: '2026-{(i % 12) + 1:02d}-30',")
        lines.append(f"    paidDate: {paid_date},")
        lines.append("    currency: 'USD'")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/enterprise_dataset/enterprise_invoices_catalog.ts", "\n".join(lines))

def generate_activities_catalog():
    print("Generating Activities Catalog...")
    types = ["Meeting", "Call", "Email", "Note", "Event"]
    outcomes = ["Positive - Executive buy-in confirmed", "Follow-up scheduled next week", "Contract sent for legal review", "Technical POC validated"]

    lines = [
        "/**",
        " * Omnichannel Activity Logs Catalog",
        " */",
        "",
        "export interface CatalogActivity {",
        "  id: string;",
        "  companyId: string;",
        "  type: 'Meeting' | 'Call' | 'Email' | 'Note' | 'Event';",
        "  title: string;",
        "  durationMinutes: number;",
        "  performedAt: string;",
        "  outcome: string;",
        "  recordedByUserId: string;",
        "}",
        "",
        "export const ENTERPRISE_ACTIVITIES_CATALOG: CatalogActivity[] = ["
    ]

    for i in range(1, 601):
        t = types[i % len(types)]
        out = outcomes[i % len(outcomes)]
        comp_id = f"cat-acc-{1000 + (i % 400) + 1}"
        dur = 30 if t == "Meeting" else (15 if t == "Call" else 5)

        lines.append("  {")
        lines.append(f"    id: 'cat-act-{6000 + i}',")
        lines.append(f"    companyId: '{comp_id}',")
        lines.append(f"    type: '{t}',")
        lines.append(f"    title: '{t}: Strategic Architecture & Customer Success Review #{i}',")
        lines.append(f"    durationMinutes: {dur},")
        lines.append(f"    performedAt: '2026-{(i % 12) + 1:02d}-{(i % 25) + 1:02d}T14:30:00Z',")
        lines.append(f"    outcome: '{out}',")
        lines.append("    recordedByUserId: 'usr-sales-01'")
        lines.append("  },")

    lines.append("];")
    write_file("src/modules/enterprise_dataset/enterprise_activities_catalog.ts", "\n".join(lines))

if __name__ == '__main__':
    generate_contacts_catalog()
    generate_invoices_catalog()
    generate_activities_catalog()
