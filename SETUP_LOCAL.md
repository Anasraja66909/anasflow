# AnasFlow - Local Development Setup Guide

## Quick Start (Fastest Way)

1. **Open PowerShell or Command Prompt** in the `anasflow-complete` directory
2. **Run this command:**
   ```powershell
   .\start_anasflow.bat
   ```

This will automatically:
- Start the FastAPI backend on `http://localhost:8000`
- Start the Next.js frontend on `http://localhost:3000`
- Open the application in your browser

---

## Manual Setup (Step by Step)

### Prerequisites
- Node.js 20+ installed
- Python 3.10+ installed
- npm or yarn installed

### Step 1: Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Backend will be available at:** `http://localhost:8000`
**API Documentation:** `http://localhost:8000/docs`

### Step 2: Frontend Setup (New Terminal/Tab)

```powershell
# Navigate to frontend directory
cd frontend-next

# Install Node dependencies (if not already installed)
npm install

# Start the dev server
npm run dev
```

**Frontend will be available at:** `http://localhost:3000`

---

## Environment Configuration

### Backend (.env)
Located at: `backend/.env`

Key variables to configure:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-key
```

### Frontend (.env.local)
Located at: `frontend-next/.env.local`

Key variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

---

## Tech Stack

### Backend
- **Framework:** FastAPI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** JWT + Google OAuth
- **Server:** Uvicorn

### Frontend
- **Framework:** Next.js 16
- **Language:** TypeScript
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **State Management:** React Context + TanStack Query
- **Charts:** Recharts

---

## Directory Structure

```
anasflow-complete/
├── backend/              # FastAPI backend
│   ├── app/main.py      # Main application file
│   ├── requirements.txt  # Python dependencies
│   └── .env             # Environment variables
│
├── frontend-next/        # Next.js frontend (MAIN)
│   ├── src/
│   │   ├── app/         # Next.js app router
│   │   ├── components/  # React components
│   │   └── lib/         # Utilities & API client
│   ├── package.json     # NPM dependencies
│   └── .env.local       # Environment variables
│
├── frontend/            # Legacy React/Vite version (deprecated)
└── agency-front/        # Legacy Next.js version (deprecated)
```

---

## Accessing the Application

| Component | URL | Access |
|-----------|-----|--------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:8000 | API endpoints |
| API Docs | http://localhost:8000/docs | Swagger documentation |

---

## Common Issues & Solutions

### Issue: Backend fails to start
**Solution:**
```powershell
# Ensure Python 3.10+ is installed
python --version

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Issue: Frontend won't start
**Solution:**
```powershell
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Issue: CORS errors
**Solution:**
- Make sure backend is running on `localhost:8000`
- Check `.env` files for correct API URLs
- Ensure both servers are running

### Issue: Database connection failed
**Solution:**
- Check Supabase credentials in `backend/.env`
- Ensure internet connection is active
- Verify Supabase project is accessible

---

## Building for Production

### Backend
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```powershell
npm run build
npm start
```

---

## Running Tests

### Frontend Tests
```powershell
npm run test
```

### Linting
```powershell
npm run lint
```

---

## Project Architecture

```
User Browser (Frontend - Next.js on :3000)
    ↓ (HTTP/REST)
FastAPI Backend (:8000)
    ↓
Supabase (PostgreSQL Database)
    ↓
External APIs (Zapier, n8n, Claude, etc.)
```

---

## Features

✅ Unified dashboard for all automation platforms
✅ Multiple platform integrations (Claude, OpenAI, n8n, Zapier, etc.)
✅ Real-time cost monitoring
✅ Automation performance tracking
✅ Cost optimization suggestions
✅ User authentication (Email + Google OAuth)
✅ Client management for agencies
✅ Stripe payment integration
✅ Responsive UI with dark mode support

---

## Development Tips

1. **Hot Reload:** Both backend and frontend support hot reload - just save files while servers are running

2. **Debug Backend:** Add `--reload` flag to automatically restart on file changes

3. **Debug Frontend:** Use Next.js DevTools in browser console (F12 → Console)

4. **API Testing:** Visit `http://localhost:8000/docs` for interactive API documentation

5. **Database Queries:** Check Supabase dashboard for direct database access

---

## Support & Documentation

- **Backend API Docs:** http://localhost:8000/docs
- **Next.js Docs:** https://nextjs.org/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **Supabase Docs:** https://supabase.com/docs

---

**Happy coding! 🚀**
