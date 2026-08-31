import os
import json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def write(rel, content):
    p = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f'Created: {rel} ({len(content.splitlines())} lines)')

def main():
    print('Scaffolding directories...')
    dirs = [
        'src/core', 'src/database', 'src/models', 'src/services',
        'src/controllers', 'src/middleware', 'src/routes',
        'src/frontend/public/css', 'src/frontend/public/js/components',
        'src/frontend/public/views', 'tests', 'dist', 'data', 'logs', 'scripts'
    ]
    for d in dirs:
        os.makedirs(os.path.join(ROOT, d), exist_ok=True)
    print('Directories ready.')

if __name__ == '__main__':
    main()