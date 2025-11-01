# ⚡ Quick Deployment Checklist

## 🎯 Fast Track Deployment (15 minutes)

### ✅ Pre-Deployment Checklist

1. **GitHub Repository** ✓
   - [x] Code pushed to GitHub
   - [x] Repository: `https://github.com/tousifrahaman11/Bank-loan.git`

### 🚀 Backend Deployment (Render)

1. **Sign up**: [render.com](https://render.com) (GitHub login)
2. **New Web Service**:
   - Connect repo: `tousifrahaman11/Bank-loan`
   - Root: `server` ⚠️ (NOT `tata-loan-chatbot/server`)
   - Build: `npm install`
   - Start: `npm start`
   - Plan: **Free**
3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=replace_with_random_secret_key_12345
   FRONTEND_URL=https://your-app.vercel.app (update after frontend deploy)
   ```
4. **Deploy** → Copy backend URL

### 🎨 Frontend Deployment (Vercel)

1. **Sign up**: [vercel.com](https://vercel.com) (GitHub login)
2. **Import Project**:
   - Repo: `tousifrahaman11/Bank-loan`
   - Root: `client` ⚠️ (NOT `tata-loan-chatbot/client`)
   - Framework: **Vite** (auto-detect)
3. **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
4. **Deploy** → Copy frontend URL

### 🔄 Final Step

1. Update `FRONTEND_URL` in Render with your Vercel URL
2. Test your live app! 🎉

---

**Time Required**: ~15 minutes
**Cost**: $0 (Free forever)

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

