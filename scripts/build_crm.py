# OmniCustomer 360 CRM - Master Build Script
import os
import sys
import json
import time

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def write_file(rel_path, content):
    full_path = os.path.join(ROOT_DIR, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + chr(10))
    line_count = len(content.splitlines())
    print(f'  [+Created] {rel_path:<45} {line_count:>6} LOC')
    return line_count

print('CRM Master Build Script ready.')
