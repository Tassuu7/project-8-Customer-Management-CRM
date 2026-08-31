# Python Enterprise Modules Generator
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

print("Enterprise Modules builder ready.")
