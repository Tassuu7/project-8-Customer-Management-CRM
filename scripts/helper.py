import os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
def write_file(rel, content):
    p = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content.strip() + chr(10))
    print(f'  Created {rel}: {len(content.splitlines())} LOC')
