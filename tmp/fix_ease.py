import os
import glob
import re

src_dir = r"c:\anasflow-master\frontend-next\src"
files = glob.glob(src_dir + "/**/*.tsx", recursive=True) + glob.glob(src_dir + "/**/*.ts", recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(r'ease:\s*\[[\d\.\s,]+\]', 'ease: "easeOut"', content)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed ease in {filepath}")
