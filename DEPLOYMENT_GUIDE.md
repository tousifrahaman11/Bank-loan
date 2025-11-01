# 🚀 Free Deployment Guide - Bank Loan Chatbot

This guide will help you deploy your Bank Loan Chatbot application for **FREE** using:
- **Frontend**: Vercel (Free tier)
- **Backend**: Render (Free tier)

## 📋 Prerequisites

1. GitHub account (you already have this!)
2. Vercel account (free) - Sign up at [vercel.com](https://vercel.com)
3. Render account (free) - Sign up at [render.com](https://render.com)
4. (Optional) MongoDB Atlas account (free tier) - Sign up at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)

---

## 🎯 Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account (recommended)

### 1.2 Create New Web Service
1. Click "New +" button → Select "Web Service"
2. Connect your GitHub repository: `Bank-loan`
3. Configure the service:
   - **Name**: `bank-loan-server` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server` ⚠️ **IMPORTANT**: Use `server` (NOT `tata-loan-chatbot/server`)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 1.3 Set Environment Variables
In Render dashboard, go to "Environment" section and add:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=your_super_secret_jwt_key_change_this_random_string_12345
MONGODB_URI=your_mongodb_atlas_connection_string (optional - app works without it)
FRONTEND_URL=https://your-app-name.vercel.app (we'll update this after frontend deployment)
```

**To get MongoDB URI (Optional):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string and replace `<password>` with your password
4. Add `0.0.0.0/0` to IP whitelist (or specific IPs for security)

### 1.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (takes 2-5 minutes)
3. Copy your backend URL (e.g., `https://bank-loan-server.onrender.com`)

⚠️ **Important Notes:**
- Free tier services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-50 seconds (cold start)
- Consider upgrading to paid plan for always-on service

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with your GitHub account

### 2.2 Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository: `tousifrahaman11/Bank-loan`
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client` ⚠️ **IMPORTANT**: Use `client` (NOT `tata-loan-chatbot/client`)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

### 2.3 Set Environment Variables
Click "Environment Variables" and add:

```
VITE_API_URL=https://bank-loan-server.onrender.com
```

(Replace with your actual Render backend URL from Step 1.4)

### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment (takes 1-2 minutes)
3. Copy your frontend URL (e.g., `https://bank-loan-app.vercel.app`)

---

## 🔄 Step 3: Update Backend CORS

After deploying frontend, update the backend CORS:

1. Go back to Render dashboard → Your backend service
2. Go to "Environment" section
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
4. Click "Save Changes"
5. Render will automatically redeploy

---

## ✅ Step 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test the application:
   - Landing page loads
   - Login/Signup works
   - Chatbot opens
   - API calls work

3. Check backend health:
   ```
   https://your-backend-url.onrender.com/api/health
   ```

---

## 🔧 Troubleshooting

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check `VITE_API_URL` in Vercel environment variables
- Ensure backend URL is correct (no trailing slash)

**Problem**: Build fails
- **Solution**: Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

### Backend Issues

**Problem**: Backend not starting
- **Solution**: Check Render logs
- Verify `NODE_ENV=production`
- Ensure `PORT` is set (Render uses 10000 for free tier)

**Problem**: CORS errors
- **Solution**: Update `FRONTEND_URL` in Render environment variables
- Clear browser cache and try again

**Problem**: MongoDB connection fails
- **Solution**: App works without MongoDB (demo mode)
- If you want MongoDB, verify connection string format
- Check IP whitelist in MongoDB Atlas

### Cold Start Issues

**Problem**: First request is slow
- **Solution**: This is normal on Render free tier
- Service spins up after 15 minutes of inactivity
- Consider keeping it active or upgrading to paid plan

---

## 📊 Deployment URLs Template

After deployment, you'll have:

```
Frontend: https://your-app-name.vercel.app
Backend:  https://your-server-name.onrender.com
```

Update these in your README.md for easy reference!

---

## 🎉 Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Application loads without errors
- [ ] Login/Signup works
- [ ] Chatbot functions correctly
- [ ] API endpoints respond

---

## 💡 Tips for Better Performance

1. **Keep Backend Active** (Render free tier):
   - Use a service like [UptimeRobot](https://uptimerobot.com) (free)
   - Ping your backend every 14 minutes to prevent spin-down

2. **MongoDB Atlas**:
   - Use connection pooling
   - Index frequently queried fields
   - Free tier has 512MB storage

3. **Vercel**:
   - Uses CDN automatically
   - Global edge network
   - Automatic HTTPS

4. **Monitoring**:
   - Use Render logs for backend monitoring
   - Use Vercel Analytics for frontend (free tier)

---

## 🔐 Security Reminders

- Never commit `.env` files to Git
- Use strong `JWT_SECRET` in production
- Keep MongoDB connection strings private
- Use HTTPS only (automatically enabled)
- Regularly update dependencies

---

## 📞 Need Help?

- Check Render logs: Dashboard → Your Service → Logs
- Check Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
- Review environment variables in both platforms
- Test API endpoints directly using Postman/curl

---

**Congratulations! 🎊 Your app is now live on the internet for FREE!**

