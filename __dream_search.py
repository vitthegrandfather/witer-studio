import sqlite3
import json

DB_PATH = r'C:\Users\vitth\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

# Search for user messages containing rule-like keywords (WITER project only)
# First find session IDs for WITER project
c.execute("""
    SELECT id FROM session
    WHERE project_id = 'global'
      AND directory LIKE '%site%'
      AND parent_id IS NULL
    ORDER BY time_created DESC
    LIMIT 20
""")
witer_sessions = [r[0] for r in c.fetchall()]

# Also include the witer-studio-repo sessions
c.execute("""
    SELECT id FROM session
    WHERE project_id = '64adfac3-8538-474b-b860-501edb809a22'
      AND parent_id IS NULL
    ORDER BY time_created DESC
    LIMIT 10
""")
witer_sessions += [r[0] for r in c.fetchall()]

print(f"Found {len(witer_sessions)} WITER sessions")

# Search user messages for rule-like keywords
placeholders = ','.join(['?'] * len(witer_sessions))
c.execute(f"""
    SELECT substr(json_extract(p.data, '$.text'), 1, 300) as text
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id IN ({placeholders})
      AND json_extract(m.data, '$.role') = 'user'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%завжди%'
        OR json_extract(p.data, '$.text') LIKE '%ніколи%'
        OR json_extract(p.data, '$.text') LIKE '%прибери%'
        OR json_extract(p.data, '$.text') LIKE '%роби%'
        OR json_extract(p.data, '$.text') LIKE '%треба%'
        OR json_extract(p.data, '$.text') LIKE '%без цін%'
        OR json_extract(p.data, '$.text') LIKE '%ціни%'
        OR json_extract(p.data, '$.text') LIKE '%відгук%'
        OR json_extract(p.data, '$.text') LIKE '%вигадуй%'
        OR json_extract(p.data, '$.text') LIKE '%видумуй%'
      )
    ORDER BY m.time_created DESC
    LIMIT 50
""", witer_sessions)

print("\n=== USER DIRECTIVES (recent) ===")
for r in c.fetchall():
    text = r[0] if r[0] else "(empty)"
    print(f"  - {text[:200]}")

conn.close()
