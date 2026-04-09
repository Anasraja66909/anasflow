---
description: "Start AnasFlow local development environment (FastAPI backend + Next.js frontend)"
name: "Start LocalHost"
argument-hint: "Start AnasFlow on localhost"
agent: "agent"
---

# Start AnasFlow Development Server

I need to start the AnasFlow development environment with both backend and frontend running:

**Backend**: FastAPI on `http://localhost:8000`
- API documentation available at `http://localhost:8000/docs`
- SQLite database auto-initializes

**Frontend**: Next.js dev server on `http://localhost:3000`
- Hot-reload on code changes

## Task

1. Start the backend server (FastAPI with auto-reload from `backend/app/main.py`)
2. Start the frontend dev server (Next.js from `frontend-next/`)
3. Confirm both are running and accessible
4. Report the URLs where I can access them

## Expected Output

- ✓ Backend running at `http://localhost:8000`
- ✓ Frontend running at `http://localhost:3000`
- ✓ Ready for development
