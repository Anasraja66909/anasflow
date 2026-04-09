# MVP Integrations Checklist (One-by-One)

This checklist is focused on the most important platforms for your MVP:

- GoHighLevel (GHL)
- Zapier
- n8n
- HubSpot
- OpenAI (Realtime capable usage)
- ElevenLabs

Use this document as an execution checklist. Complete one platform at a time.

---

## 1) GoHighLevel (OAuth2) - High Priority

### Current status
- Frontend OAuth connect flow: ready
- Backend OAuth generic flow: ready
- Missing: provider app credentials and final verification with real account

### Required env vars
- `GOHIGHLEVEL_OAUTH_CLIENT_ID`
- `GOHIGHLEVEL_OAUTH_CLIENT_SECRET`
- `GOHIGHLEVEL_OAUTH_AUTHORIZE_URL`
- `GOHIGHLEVEL_OAUTH_TOKEN_URL`
- `GOHIGHLEVEL_OAUTH_SCOPE` (optional)

### Test steps
1. Fill env vars and restart backend.
2. Login in app and go to `Dashboard -> Platforms`.
3. Select `GoHighLevel` and click `Connect via OAuth`.
4. Complete provider consent screen.
5. Verify return to `/dashboard/platforms/oauth-callback`.
6. Confirm platform appears in connected list.

### Done criteria
- OAuth completes without error
- New platform row saved in DB
- Appears as active in UI

---

## 2) Zapier (OAuth2) - High Priority

### Current status
- Frontend OAuth connect flow: ready
- Backend OAuth generic flow: ready
- Missing: real app credentials

### Required env vars
- `ZAPIER_OAUTH_CLIENT_ID`
- `ZAPIER_OAUTH_CLIENT_SECRET`
- `ZAPIER_OAUTH_AUTHORIZE_URL=https://zapier.com/oauth/authorize`
- `ZAPIER_OAUTH_TOKEN_URL=https://zapier.com/oauth/token`
- `ZAPIER_OAUTH_SCOPE` (optional)

### Test steps
1. Fill env vars and restart backend.
2. Connect Zapier from platforms page.
3. Authorize Zapier app.
4. Validate callback success and DB entry.

### Done criteria
- OAuth connect finishes
- Platform shown active in dashboard

---

## 3) n8n (API Key) - High Priority

### Current status
- Frontend API key flow: ready
- Backend `/platforms/connect`: ready
- Missing: real n8n API key + endpoint validation in your deployment

### Required input (from UI)
- API key
- `api_endpoint` (n8n instance URL)

### Test steps
1. Open `Connect Integration`.
2. Select `n8n`.
3. Enter API key and instance URL.
4. Click `Connect Securely`.
5. Confirm connected platform appears.

### Done criteria
- Platform saved with `auth_type=api_key`
- Dashboard shows n8n in active platforms

---

## 4) HubSpot (OAuth2) - High Priority

### Current status
- Frontend OAuth connect flow: ready
- Backend OAuth generic flow: ready
- Missing: real app credentials from HubSpot developer app

### Required env vars
- `HUBSPOT_OAUTH_CLIENT_ID`
- `HUBSPOT_OAUTH_CLIENT_SECRET`
- `HUBSPOT_OAUTH_AUTHORIZE_URL=https://app.hubspot.com/oauth/authorize`
- `HUBSPOT_OAUTH_TOKEN_URL=https://api.hubapi.com/oauth/v1/token`
- `HUBSPOT_OAUTH_SCOPE=crm.objects.contacts.read crm.objects.deals.read`

### Test steps
1. Fill env vars and restart backend.
2. Connect HubSpot via OAuth.
3. Complete HubSpot consent.
4. Confirm callback success and saved platform.

### Done criteria
- OAuth success
- Active connection visible in UI

---

## 5) OpenAI (API Key, Realtime-capable) - MVP Core

### Current status
- API key based connect flow: ready
- Platform type exists in UI
- Missing: real key and usage validation against your OpenAI account

### Required input (from UI)
- OpenAI API key

### Test steps
1. Connect `OpenAI` from platforms page.
2. Enter valid API key.
3. Save connection and refresh dashboard.

### Done criteria
- OpenAI appears connected
- Dashboard/alerts include OpenAI related signals

Note: Realtime usage is a product-side capability; this MVP phase ensures secure connection and monitoring path.

---

## 6) ElevenLabs (API Key) - MVP Core

### Current status
- API key flow in UI: ready
- Backend connect endpoint: ready
- Missing: real key + production validation

### Required input (from UI)
- ElevenLabs API key

### Test steps
1. Select `ElevenLabs`.
2. Enter API key and connect.
3. Verify platform listed as active.

### Done criteria
- Saved in DB and visible in platforms grid
- Included in dashboard platform counts

---

## Global Prerequisites (for all OAuth platforms)

Set in `backend/.env`:

- `OAUTH_REDIRECT_URI=http://localhost:3000/dashboard/platforms/oauth-callback`
- Platform specific `*_OAUTH_*` variables

Then restart backend server after each env update.

---

## Suggested Execution Order

1. n8n (quickest API-key validation)
2. OpenAI
3. ElevenLabs
4. Zapier
5. HubSpot
6. GoHighLevel

This order gives early wins first, then OAuth providers.
