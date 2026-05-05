# AnasFlow Integration Testing Plan

Yeh plan aapko guide karega ke kis platform ke liye **API Key** chahiye aur kiske liye **OAuth**. Har platform ki testing ka flow alag hai.

---

## 🔑 Group A: API Key Platforms
In platforms ko test karna bohot simple hai. Aapko sirf inke dashboard se API Key nikalni hai aur AnasFlow ke UI (Connect modal) mein paste karni hai. Backend is key ko validate karega.

1. **OpenAI**
   - **How to test:** `platform.openai.com` se API key banayein aur paste karein.
   - **Expectation:** Backend validate karega aur UI mein card "Connected Integrations" section mein aa jayega.

2. **Groq**
   - **How to test:** `console.groq.com` se API key nikalein.
   - **Expectation:** Turant connect ho jana chahiye.

3. **Anthropic (Claude)**
   - **How to test:** `console.anthropic.com` se API key copy karein.
   - **Expectation:** Card upar connected section mein move karega.

4. **ManyChat**
   - **How to test:** ManyChat (Pro) settings > API se token nikalein.
   
5. **n8n**
   - **How to test:** Apne n8n instance se API key copy karein. (Note: n8n localhost pe hai toh validation ke liye port `5678` use hoga).

---

## 🔗 Group B: OAuth 2.0 Platforms
In platforms ki testing ke liye UI mein API key nahi daalni parti. Jaise hi aap 'Connect' pe click karenge, yeh aapko official platform (e.g., Stripe) ke login page par redirect karega.

> [!WARNING]
> **Prerequisite:** OAuth test karne ke liye aapke backend ki `.env` file mein in platforms ki **Client ID** aur **Client Secret** pehle se set honi chahiye. Agar nahi hai, toh yeh demo mode mein chala jayega (success ka message dega par real login popup nahi khulega).

1. **GoHighLevel (GHL)**
   - **How to test:** UI se connect karein -> GHL marketplace redirect -> Account select karein -> AnasFlow par wapas return.

2. **HubSpot**
   - **How to test:** Connect pe click karein -> HubSpot login -> Permissions grant karein -> AnasFlow wapas.

3. **Stripe**
   - **How to test:** Connect pe click karein -> Stripe Dashboard login -> AnasFlow wapas.

4. **Slack**
   - **How to test:** Connect karein -> Slack workspace select karein -> Allow karein -> AnasFlow wapas.

5. **Zapier**
   - **How to test:** Connect karein -> Zapier popup authorization -> AnasFlow wapas.

---

## 🛠️ Testing Checklist (Aapke liye)

- [x] **OpenAI** API Key connection test
- [ ] **Groq** API Key connection test
- [ ] **Anthropic** API Key connection test
- [ ] **GHL** OAuth connection test (Requires GHL App Client ID in `.env`)
- [ ] **HubSpot** OAuth connection test (Requires HubSpot Client ID in `.env`)
- [ ] Ensure ki sab connected apps **Connected Integrations** section mein aa rahi hain.
- [ ] **Client Switcher Test:** Ek Client select kar ke connect karein, phir client change kar ke dekhein (apps hide/show honi chahiye).
