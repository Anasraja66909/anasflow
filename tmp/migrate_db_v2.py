import sqlite3

def run_migration():
    conn = sqlite3.connect('backend/anasflow.db')
    cursor = conn.cursor()
    
    commands = [
        "ALTER TABLE platforms ADD COLUMN updated_at DATETIME"
    ]
    
    for cmd in commands:
        try:
            print(f"Running: {cmd}")
            cursor.execute(cmd)
            conn.commit()
            print("Success!")
        except sqlite3.OperationalError as e:
            print(f"Error: {e}")
            
    conn.close()

if __name__ == "__main__":
    run_migration()
