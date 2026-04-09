import os
import glob

src_dir = r"c:\anasflow-master\frontend-next\src"
files = glob.glob(src_dir + "/**/*.tsx", recursive=True) + glob.glob(src_dir + "/**/*.ts", recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if '@/context/' in content or '@/context"' in content:
        content = content.replace('@/context/', '@/contexts/').replace('@/context"', '@/contexts"')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed imports in {filepath}")
