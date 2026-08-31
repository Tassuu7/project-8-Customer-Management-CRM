#!/usr/bin/env python3
"""
Automated Production Archive Packager
"""

import os
import zipfile

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ZIP_NAME = 'project-8-Customer-Management-CRM.zip'

def package():
    zip_path = os.path.join(ROOT_DIR, ZIP_NAME)
    print(f"Creating zip archive: {zip_path}...")
    
    ignore_dirs = {'.git', 'node_modules', 'logs', 'temp', '.nyc_output'}
    ignore_files = {ZIP_NAME, '.env'}

    count = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            for file in files:
                if file in ignore_files or file.endswith('.tmp'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                zipf.write(full_path, rel_path)
                count += 1

    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Successfully packaged {count} files into {ZIP_NAME} ({size_mb:.2f} MB)")

if __name__ == '__main__':
    package()
