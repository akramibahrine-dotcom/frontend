import re

with open('app/admin/AdminDashboardClient.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if line.startswith('const ALL_COUNTRIES'): skip = True
    
    if not skip:
        new_lines.append(line)
        
    if skip and line.startswith('];'):
        skip = False

with open('app/admin/AdminDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
