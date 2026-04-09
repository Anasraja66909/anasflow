# AnasFlow Project Guidelines

AnasFlow is an automated agency analytics and optimization platform built with **FastAPI + Next.js 16 + SQLite**. Use these guidelines for all development tasks.

## Quick Start

```bash
# One command starts everything (backend on :8000, frontend on :3000):
.\start_anasflow.bat

# Or manually:
# Terminal 1: cd backend && python -m uvicorn app.main:app --reload
# Terminal 2: cd frontend-next && npm run dev

# API docs: http://localhost:8000/docs
```

## Architecture

**Backend**: FastAPI with pluggable connector registry (Claude, OpenAI, GoHighLevel, n8n, Zapier, Stripe)  
**Frontend**: Next.js 13+ App Router with React Context for auth state  
**Database**: SQLite (SQLAlchemy ORM) with auto-initialized models  
**Auth**: JWT tokens (Authorization header) + Google OAuth

See [Architecture Reference](/memories/repo/anasflow-architecture.md) for detailed structure, models, and patterns.

## Code Style & Conventions

### Backend (Python/FastAPI)

- **Async handlers**: All router functions are `async def`
- **DB access**: Always use `db: Session = Depends(get_db)` dependency
- **Schemas**: Use Pydantic BaseModel for request/response validation
- **Errors**: Standardized HTTPException with status codes
- **Connectors**: Inherit `BaseConnector`, implement `validate_connection()`, `fetch_usage()`, `handle_webhook()`
  - Register with: `@ConnectorRegistry.register("platform_name")`
- **Password hashing**: PBKDF2-HMAC-SHA256 (100,000 iterations) via `hashlib` + `secrets`

### Frontend (TypeScript/Next.js)

- **"use client"**: Mark interactive components with this directive
- **Protected pages**: Use `useAuth()` hook; 401 responses auto-redirect to `/auth`
- **API calls**: Import from `lib/api.ts`—automatically injects JWT in Authorization header
- **State**: AuthContext for user/auth state; localStorage for JWT persistence
- **UI library**: shadcn/ui components (50+) + Tailwind CSS
- **Errors/Toasts**: Sonner toast notifications (`import { toast } from "sonner"`)

## Build & Test

### Install Dependencies

```powershell
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend-next
npm install
```

### Development Servers

```powershell
# Backend (auto-reload on code changes)
python -m uvicorn app.main:app --reload

# Frontend (auto-reload)
npm run dev
```

### Database

- SQLite database auto-initializes on backend startup
- Models defined in `backend/app/database.py`
- To reset: delete `anasflow.db` and restart backend

## Common Patterns

### Adding an API Endpoint

1. Create async function in `backend/app/routers/` (e.g., `routers/clients.py`)
2. Add `db: Session = Depends(get_db)` parameter
3. Register router in `backend/app/main.py`: `app.include_router(clients_router, prefix="/clients")`
4. Use Pydantic models for request/response schemas

### Adding a Platform Connector

1. Create class in `backend/app/connectors/` (e.g., `connectors/new_platform.py`)
2. Inherit from `BaseConnector` (from `base.py`)
3. Implement required methods: `validate_connection()`, `fetch_usage()`, `handle_webhook()`
4. Register: `@ConnectorRegistry.register("new_platform")`
5. Import in `connectors/__init__.py` to activate

### Adding a Frontend Page

1. Create file in `frontend-next/src/app/` following Next.js 13+ structure
2. Use `"use client"` for interactive components
3. Use `useAuth()` hook for authentication checks
4. Call API via `lib/api.ts`; handle 401 responses (auto-redirect included)

## Environment Configuration

### Backend (.env)

```env
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
# API keys for connectors as needed
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Important Gotchas

1. **JWT Expiry**: Default 10,080 minutes (7 days); check `backend/app/main.py` for `ACCESS_TOKEN_EXPIRE_MINUTES`
2. **CORS**: Backend has CORS enabled for localhost:3000
3. **Password Reset**: Not yet implemented—users must register new account
4. **Database Persistence**: SQLite file at `anasflow.db` in backend root; back it up before testing reset logic
5. **Frontend Auth**: Token stored in `localStorage`—clearing browser storage logs user out

## Project Layout

```
anasflow-complete/
├── backend/app/
│   ├── main.py              # FastAPI app, router registration
│   ├── database.py          # SQLAlchemy models
│   ├── connectors/          # Platform integrations (extensible registry)
│   ├── routers/             # API routes (auth, clients, platforms, reports, etc.)
│   └── schemas/
├── frontend-next/src/
│   ├── app/                 # Next.js pages (auth, dashboard, etc.)
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React Context (AuthContext)
│   └── lib/                 # Utilities (api.ts, utils.ts)
├── SETUP_LOCAL.md           # Local development guide
├── MIGRATION_SUMMARY.md     # Supabase → SQLite migration notes
└── *.bat                    # Quick-start batch scripts
```

## Feedback & Questions

For any clarifications on architecture, conventions, or expected behavior, refer to [SETUP_LOCAL.md](../SETUP_LOCAL.md) or [MIGRATION_SUMMARY.md](../MIGRATION_SUMMARY.md). For new features or significant changes, update this file and the reference architecture.
