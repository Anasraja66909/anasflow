"""
╔══════════════════════════════════════════════════════════════════╗
║         AnasFlow - Live API Testing Script                      ║
║  Tests: User Register → Login → Groq Connect → n8n Connect     ║
╚══════════════════════════════════════════════════════════════════╝
"""

import requests
import json
import sys
import os
import httpx

BASE_URL = "http://localhost:8000"

# ─── Colors ────────────────────────────────────────────────────────────────────
GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def p(color, icon, msg):
    print(f"{color}{BOLD}{icon}  {msg}{RESET}")

def hr():
    print(f"{CYAN}{'─'*60}{RESET}")

# ─── Step 1: Check Backend ─────────────────────────────────────────────────────
hr()
p(CYAN, "🔍", "STEP 1: Backend Health Check")
hr()
try:
    r = requests.get(f"{BASE_URL}/health", timeout=5)
    if r.status_code == 200:
        p(GREEN, "✅", f"Backend is LIVE at {BASE_URL}")
        print(f"   {r.json()}")
    else:
        p(YELLOW, "⚠️", f"Backend responded with status {r.status_code}")
except Exception as e:
    p(RED, "❌", f"Backend NOT reachable: {e}")
    p(RED, "💡", "Make sure backend is running: python -m uvicorn app.main:app --port 8000")
    sys.exit(1)

# ─── Step 2: Register User ─────────────────────────────────────────────────────
hr()
p(CYAN, "👤", "STEP 2: Register Test User")
hr()

TEST_USER = {
    "email":        "testuser@anasflow.com",
    "password":     "Test@123456",
    "full_name":    "Anas Test User",
    "company_name": "AnasFlow Agency",
}

token = None
r = requests.post(f"{BASE_URL}/auth/register", json=TEST_USER)
if r.status_code == 200:
    token = r.json()["access_token"]
    p(GREEN, "✅", f"User registered successfully!")
    print(f"   Email: {TEST_USER['email']}")
    print(f"   Token: {token[:40]}...")
elif r.status_code == 400 and "already exists" in r.text:
    p(YELLOW, "⚠️", "User already exists — logging in instead...")
    login_r = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": TEST_USER["email"], "password": TEST_USER["password"]},
    )
    if login_r.status_code == 200:
        token = login_r.json()["access_token"]
        p(GREEN, "✅", "Login successful!")
        print(f"   Token: {token[:40]}...")
    else:
        p(RED, "❌", f"Login failed: {login_r.text}")
        sys.exit(1)
else:
    p(RED, "❌", f"Registration failed: {r.text}")
    sys.exit(1)

HEADERS = {"Authorization": f"Bearer {token}"}

# ─── Step 3: Verify /auth/me ───────────────────────────────────────────────────
hr()
p(CYAN, "🔑", "STEP 3: Verify Auth Token (/auth/me)")
hr()
me_r = requests.get(f"{BASE_URL}/auth/me", headers=HEADERS)
if me_r.status_code == 200:
    me = me_r.json()
    p(GREEN, "✅", "Token valid! User profile:")
    print(f"   ID:      {me.get('id')}")
    print(f"   Email:   {me.get('email')}")
    print(f"   Name:    {me.get('full_name')}")
    print(f"   Company: {me.get('company_name')}")
else:
    p(RED, "❌", f"Auth verification failed: {me_r.text}")

# ─── Step 4: Groq API Test ─────────────────────────────────────────────────────
hr()
p(CYAN, "🤖", "STEP 4: Groq API Test")
hr()

# Get Groq API key from user or env
groq_api_key = os.getenv("GROQ_API_KEY", "").strip()

if not groq_api_key:
    print(f"{YELLOW}{'─'*60}{RESET}")
    p(YELLOW, "📝", "Groq API Key required!")
    print(f"{YELLOW}   Get it from: https://console.groq.com/keys{RESET}")
    groq_api_key = input(f"{BOLD}   Enter your Groq API Key: {RESET}").strip()

if not groq_api_key:
    p(RED, "❌", "No Groq API key provided — skipping Groq test")
else:
    # 4a: Test Groq API directly
    p(CYAN, "🧪", "4a. Testing Groq API directly (real call)...")
    try:
        groq_r = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {groq_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": "llama3-8b-8192",
                "messages": [{"role": "user", "content": "Say 'AnasFlow connected!' in one sentence."}],
                "max_tokens": 30,
            },
            timeout=15,
        )
        if groq_r.status_code == 200:
            reply = groq_r.json()["choices"][0]["message"]["content"]
            p(GREEN, "✅", f"Groq API WORKS! Response:")
            print(f"   🤖 Groq says: {reply.strip()}")
        else:
            p(RED, "❌", f"Groq API error: {groq_r.status_code} - {groq_r.text[:200]}")
    except Exception as e:
        p(RED, "❌", f"Groq connection error: {e}")

    # 4b: Connect Groq to AnasFlow platform
    p(CYAN, "🔗", "4b. Connecting Groq to AnasFlow platform...")
    connect_r = requests.post(
        f"{BASE_URL}/platforms/connect",
        headers=HEADERS,
        json={
            "platform_type": "groq",
            "platform_name": "Groq AI",
            "auth_type": "api_key",
            "api_key": groq_api_key,
        },
    )
    if connect_r.status_code in [200, 201]:
        p(GREEN, "✅", "Groq connected to AnasFlow!")
        conn = connect_r.json()
        print(f"   Platform ID: {conn.get('id')}")
        print(f"   Status:      {conn.get('status')}")
    else:
        p(YELLOW, "⚠️", f"Platform connect response: {connect_r.status_code} - {connect_r.text[:200]}")

# ─── Step 5: n8n API Test ──────────────────────────────────────────────────────
hr()
p(CYAN, "⚙️", "STEP 5: n8n API Test")
hr()

n8n_api_key = os.getenv("N8N_API_KEY", "").strip()
n8n_base_url = os.getenv("N8N_BASE_URL", "").strip()

print(f"{YELLOW}   n8n can be self-hosted or cloud (n8n.cloud){RESET}")
print(f"{YELLOW}   Example URL: http://localhost:5678 or https://your-name.app.n8n.cloud{RESET}")
print()

if not n8n_base_url:
    n8n_base_url = input(f"{BOLD}   Enter your n8n URL (or press Enter to skip): {RESET}").strip()

if not n8n_base_url:
    p(YELLOW, "⏭️", "n8n URL not provided — skipping n8n test")
else:
    if not n8n_api_key:
        print(f"{YELLOW}   Get n8n API key from: Settings → API → Create API Key{RESET}")
        n8n_api_key = input(f"{BOLD}   Enter your n8n API Key (or press Enter to skip): {RESET}").strip()

    if n8n_api_key:
        # 5a: Test n8n API directly
        p(CYAN, "🧪", "5a. Testing n8n API directly...")
        try:
            n8n_r = requests.get(
                f"{n8n_base_url.rstrip('/')}/api/v1/workflows",
                headers={"X-N8N-API-KEY": n8n_api_key},
                timeout=10,
            )
            if n8n_r.status_code == 200:
                workflows = n8n_r.json()
                count = len(workflows.get("data", workflows if isinstance(workflows, list) else []))
                p(GREEN, "✅", f"n8n API WORKS! Found {count} workflow(s)")
            else:
                p(YELLOW, "⚠️", f"n8n responded: {n8n_r.status_code} - {n8n_r.text[:200]}")
        except Exception as e:
            p(RED, "❌", f"n8n connection error: {e}")

        # 5b: Connect n8n to AnasFlow
        p(CYAN, "🔗", "5b. Connecting n8n to AnasFlow platform...")
        n8n_connect_r = requests.post(
            f"{BASE_URL}/platforms/connect",
            headers=HEADERS,
            json={
                "platform_type": "n8n",
                "platform_name": "n8n Automation",
                "auth_type": "api_key",
                "api_key": n8n_api_key,
                "config": {"base_url": n8n_base_url},
            },
        )
        if n8n_connect_r.status_code in [200, 201]:
            p(GREEN, "✅", "n8n connected to AnasFlow!")
            conn = n8n_connect_r.json()
            print(f"   Platform ID: {conn.get('id')}")
            print(f"   Status:      {conn.get('status')}")
        else:
            p(YELLOW, "⚠️", f"n8n platform connect: {n8n_connect_r.status_code} - {n8n_connect_r.text[:200]}")
    else:
        p(YELLOW, "⏭️", "n8n API key not provided — skipping")

# ─── Step 6: List All Connected Platforms ─────────────────────────────────────
hr()
p(CYAN, "📋", "STEP 6: List All Connected Platforms")
hr()
platforms_r = requests.get(f"{BASE_URL}/platforms/connections", headers=HEADERS)
if platforms_r.status_code == 200:
    data = platforms_r.json()
    connections = data.get("connections", [])
    p(GREEN, "✅", f"Total Platforms Connected: {data.get('total', 0)}")
    for c in connections:
        status_icon = "🟢" if c.get("status") == "connected" else "🔴"
        print(f"   {status_icon} {c.get('platform_name')} ({c.get('platform_type')}) - {c.get('status')}")
else:
    p(RED, "❌", f"Could not fetch platforms: {platforms_r.text}")

# ─── Step 7: Dashboard Stats ───────────────────────────────────────────────────
hr()
p(CYAN, "📊", "STEP 7: Dashboard Stats")
hr()
dash_r = requests.get(f"{BASE_URL}/dashboard/stats", headers=HEADERS)
if dash_r.status_code == 200:
    p(GREEN, "✅", "Dashboard stats fetched!")
    stats = dash_r.json()
    for k, v in stats.items():
        print(f"   {k}: {v}")
else:
    p(YELLOW, "⚠️", f"Dashboard stats: {dash_r.status_code} - {dash_r.text[:100]}")

# ─── Summary ───────────────────────────────────────────────────────────────────
hr()
p(GREEN, "🎉", "TEST COMPLETE!")
hr()
print(f"""
{BOLD}Test User Credentials:{RESET}
  Email:    {TEST_USER['email']}
  Password: {TEST_USER['password']}
  
{BOLD}URLs:{RESET}
  Backend API:  {BASE_URL}
  API Docs:     {BASE_URL}/docs
  Frontend:     http://localhost:3000

{YELLOW}You can now login on the frontend with the above credentials!{RESET}
""")
