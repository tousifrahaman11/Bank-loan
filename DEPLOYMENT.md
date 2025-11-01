# 🚀 Deployment Guide - Tata Capital Loan Chatbot

## Overview

This guide covers deploying the application to production using:
- **Frontend:** Vercel or Netlify
- **Backend:** Render, Railway, or Heroku
- **Database:** MongoDB Atlas (already set up)

---

## Prerequisites

- [ ] GitHub account
- [ ] MongoDB Atlas cluster (free tier)
- [ ] Vercel/Netlify account (free tier)
- [ ] Render/Railway account (free tier)
- [ ] Code pushed to GitHub repository

---

## Part 1: Deploy Backend (Render)

### Step 1: Prepare Backend for Deployment

1. **Ensure server/package.json has start script:**
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

2. **Create server/.env with production values:**
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret_min_32_chars
PORT=5000
NODE_ENV=production
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `tata-loan-backend`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

5. **Add Environment Variables:**
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Your secret key (min 32 chars)
   - `NODE_ENV` = `production`

6. Click **"Create Web Service"**

7. Wait for deployment (5-10 minutes)

8. **Note your backend URL:** `https://tata-loan-backend.onrender.com`

### Step 3: Test Backend

```bash
curl https://tata-loan-backend.onrender.com/api/health
```

Should return: `{"status":"OK","message":"Tata Capital Loan Server is running!"}`

---

## Part 2: Deploy Frontend (Vercel)

### Step 1: Prepare Frontend for Deployment

1. **Update client/.env for production:**
```env
VITE_API_URL=https://tata-loan-backend.onrender.com
```

2. **Update CORS in server/server.js:**
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.vercel.app' 
    : 'http://localhost:5173',
  credentials: true
}));
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Add Environment Variable:**
   - `VITE_API_URL` = `https://tata-loan-backend.onrender.com`

6. Click **"Deploy"**

7. Wait for deployment (2-5 minutes)

8. **Your app is live!** `https://tata-loan-chatbot.vercel.app`

### Step 3: Update Backend CORS

Go back to Render dashboard:
1. Open your backend service
2. Go to **Environment**
3. Add variable:
   - `FRONTEND_URL` = `https://tata-loan-chatbot.vercel.app`

4. Update `server/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

5. Redeploy backend

---

## Alternative: Deploy to Netlify (Frontend)

### Step 1: Create netlify.toml

Create `client/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Step 2: Deploy

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub repository
4. Configure:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`

5. **Environment Variables:**
   - `VITE_API_URL` = Your backend URL

6. Click **"Deploy site"**

---

## Alternative: Deploy Backend to Railway

### Step 1: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Configure:
   - **Root Directory:** `server`
   - **Start Command:** `node server.js`

5. **Add Environment Variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

6. Railway will auto-deploy

7. **Get your URL:** `https://tata-loan-backend.up.railway.app`

---

## Part 3: Seed Production Database

### Option 1: Run Locally Against Production DB

```bash
cd server
# Update .env with production MONGODB_URI
node utils/seedDatabase.js
```

### Option 2: Run on Render

1. Go to Render dashboard
2. Open your service
3. Go to **"Shell"** tab
4. Run:
```bash
node utils/seedDatabase.js
```

---

## Part 4: Post-Deployment Checks

### Backend Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

### Test Login
```bash
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rajesh.kumar@example.com","password":"demo123"}'
```

### Frontend Checks
- [ ] Landing page loads
- [ ] Login works
- [ ] Chatbot opens
- [ ] API calls succeed
- [ ] Dark mode works
- [ ] Responsive on mobile
- [ ] No console errors

---

## Part 5: Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your domain (e.g., `loan.tatacapital.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### Render Custom Domain

1. Go to Render service settings
2. Click **"Custom Domains"**
3. Add your domain
4. Update DNS records as instructed
5. SSL certificate auto-generated

---

## Part 6: Environment Variables Summary

### Backend (Render/Railway)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tata-loan-db
JWT_SECRET=super_secret_key_minimum_32_characters_long_production
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel/Netlify)
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## Part 7: Monitoring & Maintenance

### Render Monitoring
- **Logs:** Render Dashboard → Logs tab
- **Metrics:** CPU, Memory usage visible
- **Alerts:** Set up email alerts for downtime

### Vercel Monitoring
- **Analytics:** Vercel Dashboard → Analytics
- **Logs:** Real-time logs in dashboard
- **Performance:** Core Web Vitals tracking

### MongoDB Atlas Monitoring
- **Metrics:** Atlas Dashboard → Metrics
- **Alerts:** Set up for high connections, storage
- **Backups:** Enable automated backups

---

## Part 8: CI/CD Setup (Optional)

### GitHub Actions for Auto-Deploy

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Part 9: Security Hardening

### Production Checklist
- [ ] Change JWT_SECRET to strong random string
- [ ] Enable MongoDB IP whitelist (specific IPs only)
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS only (enforced by Vercel/Render)
- [ ] Set secure cookie flags
- [ ] Enable rate limiting
- [ ] Remove console.logs from production
- [ ] Minify and obfuscate code
- [ ] Enable CORS only for your domain
- [ ] Set up monitoring and alerts

### Update server.js for Production
```javascript
// Stricter CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}));

// Stricter rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 50 : 100
});
```

---

## Part 10: Troubleshooting

### Common Issues

**1. CORS Error**
- Check FRONTEND_URL matches exactly
- Ensure no trailing slash
- Verify CORS middleware order

**2. MongoDB Connection Failed**
- Check IP whitelist (0.0.0.0/0 for testing)
- Verify connection string
- Check MongoDB Atlas status

**3. Build Failed**
- Check Node version (18+)
- Verify all dependencies in package.json
- Check build logs for errors

**4. API 404 Errors**
- Verify VITE_API_URL is correct
- Check backend is running
- Test backend health endpoint

**5. Environment Variables Not Working**
- Redeploy after adding variables
- Check variable names (case-sensitive)
- Verify .env files not committed to Git

---

## Deployment Costs (Free Tier)

| Service | Free Tier Limits |
|---------|------------------|
| **MongoDB Atlas** | 512MB storage, Shared cluster |
| **Render** | 750 hours/month, Sleeps after 15min inactivity |
| **Vercel** | 100GB bandwidth, Unlimited deployments |
| **Railway** | $5 credit/month, ~500 hours |

**Total Cost:** $0/month (within free tier limits)

---

## Production URLs Template

```
Frontend: https://tata-loan-chatbot.vercel.app
Backend: https://tata-loan-backend.onrender.com
Database: MongoDB Atlas (cloud.mongodb.com)

Admin Panel: https://cloud.mongodb.com
Vercel Dashboard: https://vercel.com/dashboard
Render Dashboard: https://dashboard.render.com
```

---

## Next Steps After Deployment

1. **Test thoroughly** using TESTING.md checklist
2. **Set up monitoring** and alerts
3. **Enable backups** for MongoDB
4. **Add analytics** (Google Analytics, Mixpanel)
5. **Set up error tracking** (Sentry)
6. **Create documentation** for users
7. **Plan scaling** strategy for growth

---

**Deployment Status:** ✅ Live / ⚠️ In Progress / ❌ Failed

**Deployed By:** ___________
**Date:** ___________
**URLs:** 
- Frontend: ___________
- Backend: ___________

---

**🎉 Congratulations! Your Tata Capital Loan Chatbot is now live!**
