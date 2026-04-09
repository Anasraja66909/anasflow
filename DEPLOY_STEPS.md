# AnasFlow Deployment Guide

## ✅ Your Application is Ready to Deploy!

### **STEP 1: Initialize Git (First Time Only)**

Open Command Prompt in `c:\anasflow-master` and run:

```bash
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial AnasFlow commit"
```

### **STEP 2: Create GitHub Repository**

1. Go to https://github.com/new
2. Create repository named: `anasflow-master`
3. Copy the commands shown and run them:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anasflow-master.git
git push -u origin main
```

### **STEP 3: Deploy to Netlify**

1. Go to https://app.netlify.com/
2. Click **"Add new site"** -> **"Import an existing project"**
3. Select **GitHub** and authorize.
4. Choose your `anasflow-master` repository.
5. In the build settings, Netlify should auto-detect Next.js via the `netlify.toml`.
6. Click **"Deploy site"**

**Your site will be LIVE in a few minutes!**

### **STEP 4: Get Your Live URL**

Netlify will give you a unique URL like:
- `https://your-site-name.netlify.app`
- Access it on ANY device!

---

## 🎯 What Gets Deployed

✅ **Frontend**: Next.js website (fully hosted on Netlify)
✅ **All pages**: Hero, pricing, login, dashboard components
✅ **Styling**: Tailwind CSS + animations
✅ **Authentication UI**: Sign in/Sign up pages ready

⚠️ **Note**: Backend API still runs locally. For production:
- Deploy backend to Railway.app or Render.com
- Update API URL in environment variables on Netlify

---

## Quick Commands

Copy & paste these in order:

```bash
# 1. Navigate to project
cd c:\anasflow-master

# 2. Initialize git
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial AnasFlow commit"

# 3. Add GitHub as remote (after creating repo)
git remote add origin https://github.com/YOUR_USERNAME/anasflow-master.git
git branch -M main
git push -u origin main
```

Then connect to Netlify and deploy!

---

**Questions?** Check the files in your project for more details.
