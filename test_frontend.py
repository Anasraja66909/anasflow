import urllib.request
import urllib.error

print("=" * 70)
print("FRONTEND RESPONSE TEST")
print("=" * 70)
print()

try:
    print("Connecting to http://localhost:3000...")
    response = urllib.request.urlopen('http://127.0.0.1:3000/', timeout=5)
    print(f"✓ Status: {response.status}")
    print(f"✓ Content-Type: {response.headers.get('content-type')}")
    print()
    print("✓✓✓ FRONTEND IS RESPONDING AND WORKING ✓✓✓")
    print()
    
    # Get response content
    content = response.read(300).decode('utf-8', errors='ignore')
    print("Response Preview:")
    print("-" * 70)
    print(content[:300])
    print()
    
except urllib.error.URLError as e:
    if '10061' in str(e):
        print("✗ Connection refused - Frontend not running")
        print("  Start it with: cd frontend-next && npm run dev")
    else:
        print(f"✗ Connection error: {e}")
except Exception as e:
    print(f"✗ Error: {type(e).__name__}: {e}")

print()
print("=" * 70)
