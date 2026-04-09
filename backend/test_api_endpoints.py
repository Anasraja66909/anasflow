import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:8000"

def run_endpoint_test(method, url, data=None, headers=None):
    if headers is None:
        headers = {}
        
    req_data = None
    if data:
        if headers.get("Content-Type") == "application/json":
            req_data = json.dumps(data).encode("utf-8")
        else:
            req_data = urllib.parse.urlencode(data).encode("utf-8")

    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")
    except Exception as e:
        return 0, str(e)

print("Starting tests...")
print("Root:", run_endpoint_test("GET", BASE_URL + "/"))

# Send json because main.py expects UserLogin (JSON)
data_auth = {"email": "test@test.com", "password": "badpassword"}
print("Login:", run_endpoint_test("POST", BASE_URL + "/auth/login", data=data_auth, headers={"Content-Type": "application/json"}))

print("Dashboard Stats:", run_endpoint_test("GET", BASE_URL + "/dashboard/stats"))

print("Clients:", run_endpoint_test("GET", BASE_URL + "/clients"))
