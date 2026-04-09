import os
import glob
import re

backend_app_dir = r"c:\anasflow-master\backend\app"
files = glob.glob(backend_app_dir + "/**/*.py", recursive=True)

# We want to replace:
# from app.database import get_db, User, Automation, ...
# with:
# from app.db.session import get_db
# from app.models import User, Automation, ...

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for imports from app.database
    if 'from app.database import' in content:
        lines = content.split('\n')
        new_lines = []
        for line in lines:
            if line.startswith('from app.database import'):
                imports_part = line.replace('from app.database import', '').strip()
                imports = [i.strip() for i in imports_part.split(',')]
                
                # separate get_db and SessionLocal from models
                db_imports = []
                model_imports = []
                for imp in imports:
                    if imp in ['get_db', 'SessionLocal', 'engine', 'init_db']:
                        db_imports.append(imp)
                    else:
                        model_imports.append(imp)
                
                if db_imports:
                    new_lines.append(f"from app.db.session import {', '.join(db_imports)}")
                if model_imports:
                    new_lines.append(f"from app.models import {', '.join(model_imports)}")
            else:
                new_lines.append(line)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"Refactored imports in {filepath}")
        
    elif 'import app.database' in content:
        print(f"WARN: Manual replacement needed in {filepath}")
