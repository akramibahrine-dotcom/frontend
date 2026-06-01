import re

with open('app/admin/AdminDashboardClient.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    # Remove unused types
    if line.startswith('type LoginEvent = {'): skip = True
    if line.startswith('type AccessRule = {'): skip = True
    if line.startswith('type TranslationOverride = {'): skip = True
    
    # Remove unused tabs
    if line.startswith('/*') and 'Products Tab' in line: skip = True
    if line.startswith('/*') and 'Visitors Tab' in line: skip = True
    
    # End of skipped blocks
    if skip and line.startswith('};'):
        # Just assume any }; while skipping types ends the skip
        skip = False
        continue
            
    # End of ProductsTab (before Orders Tab)
    if skip and line.startswith('/*') and 'Orders Tab' in line:
        skip = False
        
    # End of LoginsTab (before OrderPreview)
    if skip and line.startswith('function OrderPreview'):
        skip = False

    if not skip:
        new_lines.append(line)

with open('app/admin/AdminDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
