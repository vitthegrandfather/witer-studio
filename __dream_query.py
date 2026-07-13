import sqlite3
import json
import os
from datetime import datetime, timedelta

DB_PATH = r'C:\Users\vitth\.local\share\mimocode\mimocode.db'
MEMORY_ROOT = r'C:\Users\vitth\.local\share\mimocode\memory'

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# 1. List all tables
c.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in c.fetchall()]
print("=== TABLES ===")
print(tables)

# 2. Schema of each table
for t in tables:
    c.execute(f"PRAGMA table_info({t})")
    cols = [(r['name'], r['type']) for r in c.fetchall()]
    print(f"\n=== SCHEMA: {t} ===")
    print(cols)

# 3. Recent sessions (last 7 days)
seven_days_ago = (datetime.utcnow() - timedelta(days=7)).isoformat()
c.execute("SELECT * FROM session ORDER BY time_created DESC LIMIT 30")
rows = c.fetchall()
print(f"\n=== RECENT SESSIONS (last 30) ===")
for r in rows:
    d = dict(r)
    print(json.dumps({k: v for k, v in d.items() if k != 'data'}, default=str))
    if d.get('data'):
        try:
            data = json.loads(d['data'])
            print(f"  data keys: {list(data.keys())}")
        except:
            print(f"  data (first 200): {str(d['data'])[:200]}")

conn.close()
