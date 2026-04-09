import os
import glob
import re

src_dir = r"c:\anasflow-master\frontend-next\src"
files = glob.glob(src_dir + "/**/*.tsx", recursive=True) + glob.glob(src_dir + "/**/*.ts", recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to remove `, ease: "easeOut"` or ` ease: "easeOut"`
    new_content = re.sub(r',?\s*ease:\s*"easeOut"', '', content)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed ease in {filepath}")
