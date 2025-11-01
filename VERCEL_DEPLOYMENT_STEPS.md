# 🎨 Step-by-Step Vercel Deployment Guide

## ✅ Prerequisites

- ✅ GitHub repository already set up
- ✅ Backend deployed on Render (you already did this!)
- ✅ Backend URL from Render (e.g., `https://your-backend.onrender.com`)

---

## 🚀 Step 1: Create Vercel Account

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"** button (top right)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. You'll be redirected to your Vercel dashboard

---

## 📦 Step 2: Import Your Project

1. In your Vercel dashboard, click **"Add New..."** button (top right)
2. Select **"Project"** from the dropdown
3. You'll see a list of your GitHub repositories
4. Find and click on **"Bank-loan"** repository
5. Click **"Import"** button

---

## ⚙️ Step 3: Configure Project Settings

After clicking Import, you'll see the **"Configure Project"** page. Configure as follows:

### Project Name
- **Name**: Keep default (`bank-loan`) or change to your preference
- **Framework Preset**: Should auto-detect as **"Vite"** ✅

### Root Directory
⚠️ **CRITICAL STEP** - This is the most important setting!

1. Click on **"Root Directory"** field
2. Click **"Edit"** button
3. Type: `client` (just the word `client`, nothing else)
4. Press Enter or click outside to save
5. ✅ You should see: `Root Directory: client`

**Important**: Do NOT use `tata-loan-chatbot/client` - just `client`!

### Build and Output Settings
These should auto-populate, but verify:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

---

## 🔑 Step 4: Add Environment Variables

This is crucial for connecting your frontend to the backend!

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or click in the empty field
3. Add the following variable:

   **Key**: `VITE_API_URL`
   
   **Value**: Your Render backend URL
   - Example: `https://bank-loan-server.onrender.com`
   - ⚠️ **Important**: 
     - Use `https://` (not `http://`)
     - No trailing slash at the end
     - Copy the exact URL from your Render dashboard

4. Click **"Add"** or press Enter
5. ✅ You should see: `VITE_API_URL = https://your-backend.onrender.com`

**Where to find your backend URL:**
- Go to your Render dashboard
- Click on your backend service
- The URL is displayed at the top (e.g., `https://bank-loan-server.onrender.com`)

---

## 🚀 Step 5: Deploy!

1. Review all settings one more time:
   - ✅ Root Directory: `client`
   - ✅ Framework: `Vite`
   - ✅ Environment Variable: `VITE_API_URL` with your backend URL
   
2. Scroll down and click the big **"Deploy"** button
3. Vercel will start the deployment process
4. You'll see a deployment log showing:
   - Installing dependencies
   - Building project
   - Deployment progress

**Deployment Time**: Usually takes 1-3 minutes

---

## ⏳ Step 6: Wait for Deployment

1. Watch the deployment log in real-time
2. Look for these messages:
   - `Installing dependencies...` ✅
   - `Building...` ✅
   - `Deploying...` ✅
   - `Ready` ✅ (green checkmark)

3. If deployment fails:
   - Check the error messages in the log
   - Most common issues:
     - Wrong Root Directory (should be `client`)
     - Missing environment variable
     - Build errors

---

## ✅ Step 7: Get Your Frontend URL

Once deployment succeeds:

1. You'll see a **"Congratulations!"** message
2. Your frontend URL will be displayed:
   - Example: `https://bank-loan.vercel.app`
   - Or: `https://bank-loan-username.vercel.app`
3. **Copy this URL** - you'll need it for the next step!

---

## 🔄 Step 8: Update Backend CORS (IMPORTANT!)

Now you need to tell your backend to accept requests from your frontend:

1. Go back to your **Render dashboard**
2. Click on your backend service
3. Go to **"Environment"** tab
4. Find the `FRONTEND_URL` variable (or add it if it doesn't exist)
5. Update the value to your Vercel URL:
   ```
   https://your-frontend-url.vercel.app
   ```
   - Example: `https://bank-loan.vercel.app`
6. Click **"Save Changes"**
7. Render will automatically redeploy (takes 2-3 minutes)

---

## 🧪 Step 9: Test Your Live App!

1. Open your Vercel frontend URL in a browser
   - Example: `https://bank-loan.vercel.app`
2. Test the following:
   - ✅ Landing page loads
   - ✅ Login/Signup buttons work
   - ✅ Chatbot opens
   - ✅ API calls work (try logging in)
   - ✅ All features function correctly

3. If you see CORS errors:
   - Wait a few more minutes for Render redeploy
   - Check that `FRONTEND_URL` in Render matches your Vercel URL exactly

---

## 📊 Step 10: Verify Both Services

### Check Backend Health
Visit: `https://your-backend.onrender.com/api/health`
- Should return: `{"status":"OK",...}`

### Check Frontend
Visit: `https://your-frontend.vercel.app`
- Should show your landing page

---

## 🎉 Success Checklist

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Root Directory set to `client`
- [ ] Environment variable `VITE_API_URL` added with backend URL
- [ ] Deployment successful (green checkmark)
- [ ] Frontend URL copied
- [ ] `FRONTEND_URL` updated in Render
- [ ] Render redeployed successfully
- [ ] Frontend loads in browser
- [ ] All features working correctly

---

## 🐛 Common Issues & Solutions

### Issue: Build Fails
**Solution**: 
- Check Root Directory is exactly `client`
- Verify `VITE_API_URL` is set correctly
- Check deployment logs for specific errors

### Issue: CORS Errors
**Solution**:
- Wait for Render to finish redeploying after updating `FRONTEND_URL`
- Verify `FRONTEND_URL` in Render matches Vercel URL exactly
- Clear browser cache and try again

### Issue: API Calls Fail
**Solution**:
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running (check Render dashboard)
- Check browser console for specific error messages

### Issue: 404 Errors on Routes
**Solution**:
- This is normal for Vite apps - Vercel handles it automatically
- Check `vercel.json` file (already configured ✅)

---

## 📱 Your Live URLs

After successful deployment:

```
Frontend: https://your-app.vercel.app
Backend:  https://your-backend.onrender.com
```

**Congratulations! Your app is now live on the internet! 🎊**

---

## 💡 Pro Tips

1. **Custom Domain**: You can add a custom domain later in Vercel settings
2. **Auto-Deploy**: Every push to GitHub main branch will auto-deploy
3. **Preview Deployments**: Every PR gets its own preview URL
4. **Analytics**: Enable Vercel Analytics for free (in project settings)

---

Need help? Check the deployment logs in Vercel dashboard for specific error messages!

