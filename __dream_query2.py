import sqlite3
import json

DB_PATH = r'C:\Users\vitth\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get main (non-checkpoint-writer) sessions for this project
c.execute("""
    SELECT id, parent_id, title, time_created, directory
    FROM session
    WHERE project_id = '64adfac3-8538-474b-b860-501edb809a22'
      AND parent_id IS NULL
    ORDER BY time_created DESC
    LIMIT 15
""")
print("=== MAIN SESSIONS (witer-studio project) ===")
for r in c.fetchall():
    d = dict(r)
    print(json.dumps({k: v for k, v in d.items()}, default=str))

# Get user messages from the favicon session
print("\n=== USER MESSAGES: favicon session ses_0a9e25604ffejc2FgnLE2iJfIm ===")
c.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, substr(json_extract(m.data, '$.content'), 1, 500) as content
    FROM message m
    WHERE m.session_id = 'ses_0a9e25604ffejc2FgnLE2iJfIm'
      AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""")
for r in c.fetchall():
    d = dict(r)
    print(json.dumps(d, default=str))

# Get user messages from YEEZY session
print("\n=== USER MESSAGES: YEEZY session ses_0af96851effeacZbrT7433zrQ0 ===")
c.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, substr(json_extract(m.data, '$.content'), 1, 500) as content
    FROM message m
    WHERE m.session_id = 'ses_0af96851effeacZbrT7433zrQ0'
      AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""")
for r in c.fetchall():
    d = dict(r)
    print(json.dumps(d, default=str))

# Also check all sessions for the "global" project that are in witer-studio-repo directory
print("\n=== ALL SESSIONS IN witer-studio-repo directory ===")
c.execute("""
    SELECT id, project_id, parent_id, title, time_created
    FROM session
    WHERE directory LIKE '%witer-studio-repo%'
    ORDER BY time_created DESC
    LIMIT 10
""")
for r in c.fetchall():
    d = dict(r)
    print(json.dumps({k: v for k, v in d.items()}, default=str))

conn.close()
