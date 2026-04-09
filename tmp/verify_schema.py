import sqlite3
import re

def get_models_from_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Simple regex to find class names and their columns
    models = {}
    classes = re.split(r'class\s+', content)[1:]
    for cls_content in classes:
        lines = cls_content.split('\n')
        cls_name = lines[0].split('(')[0].strip()
        
        # Find table name
        table_match = re.search(r'__tablename__\s*=\s*[\'"](\w+)[\'"]', cls_content)
        if table_match:
            table_name = table_match.group(1)
            columns = []
            for line in lines[1:]:
                col_match = re.search(r'^\s+(\w+)\s*=\s*Column\(', line)
                if col_match:
                    columns.append(col_match.group(1))
            models[table_name] = columns
    return models

def check_db_schema(db_path, models):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    mismatches = []
    for table_name, model_columns in models.items():
        cursor.execute(f"PRAGMA table_info({table_name})")
        db_columns = [col[1] for col in cursor.fetchall()]
        
        if not db_columns:
            mismatches.append(f"Table '{table_name}' does not exist in the database.")
            continue
            
        missing_in_db = [col for col in model_columns if col not in db_columns]
        if missing_in_db:
            mismatches.append(f"Table '{table_name}' is missing columns in DB: {', '.join(missing_in_db)}")
            
    conn.close()
    return mismatches

if __name__ == "__main__":
    models = get_models_from_file('backend/app/database.py')
    mismatches = check_db_schema('backend/anasflow.db', models)
    if mismatches:
        for m in mismatches:
            print(m)
    else:
        print("No schema mismatches found.")
