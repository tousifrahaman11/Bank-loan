# 🔧 Troubleshooting Guide - Login/Signup Errors

## Common Error: "An error occurred. Please try again."

If you're seeing this error when trying to login or signup, here are the most common causes and solutions:

---

## ✅ Issue 1: Environment Variable Not Set in Netlify/Vercel

**Symptom**: Error occurs immediately on login/signup, no response from server

**Solution**:

1. **Check Netlify Environment Variables:**
   - Go to your Netlify dashboard
   - Select your site → **Site settings** → **Environment variables**
   - Verify `VITE_API_URL` is set to your Render backend URL
   - Format: `https://your-backend.onrender.com` (NO trailing slash)
   
2. **Check Vercel Environment Variables:**
   - Go to your Vercel dashboard
   - Select your project → **Settings** → **Environment Variables**
   - Verify `VITE_API_URL` is set correctly

3. **After Adding/Updating:**
   - Trigger a new deployment (Netlify: Deploys → Trigger deploy)
   - Wait for build to complete
   - Test again

**How to Verify:**
- Open browser console (F12)
- Look for: `🔗 API URL configured: https://your-backend.onrender.com`
- If you see `http://localhost:5000`, the environment variable is NOT set!

---

## ✅ Issue 2: Backend Not Running (Render Free Tier Spin-Down)

**Symptom**: Error after waiting, or "Network Error" message

**Cause**: Render free tier spins down after 15 minutes of inactivity

**Solution**:

1. **Wake up the backend:**
   - Visit your backend health endpoint: `https://your-backend.onrender.com/api/health`
   - Wait 30-50 seconds for cold start
   - You should see: `{"status":"OK",...}`
   - Then try login again

2. **Keep Backend Active (Recommended):**
   - Use [UptimeRobot](https://uptimerobot.com) (free)
   - Set up a monitor that pings your backend every 14 minutes
   - This prevents spin-down

**How to Verify:**
- Try accessing: `https://your-backend.onrender.com/api/health` in browser
- If it times out or shows error, backend is down

---

## ✅ Issue 3: CORS Configuration Error

**Symptom**: CORS error in browser console, or "CORS error" message

**Solution**:

1. **Update Render Environment Variable:**
   - Go to Render dashboard → Your backend service
   - Go to **Environment** tab
   - Add/Update `FRONTEND_URL` with your Netlify URL:
     ```
     https://your-app.netlify.app
     ```
   - Save changes (will auto-redeploy)

2. **Verify URLs Match:**
   - Frontend URL: Check your Netlify site URL
   - Backend `FRONTEND_URL`: Must match exactly (including https://)

**How to Verify:**
- Check browser console for CORS errors
- Check Render logs for CORS warnings

---

## ✅ Issue 4: Wrong Backend URL

**Symptom**: All API calls fail, different error messages

**Solution**:

1. **Verify Backend URL:**
   - Go to Render dashboard
   - Copy the exact URL of your backend service
   - Should look like: `https://bank-loan-server.onrender.com`

2. **Update Frontend Environment Variable:**
   - In Netlify/Vercel, update `VITE_API_URL`
   - Make sure:
     - Uses `https://` (NOT `http://`)
     - No trailing slash at the end
     - Correct subdomain

---

## 🐛 Debugging Steps

### Step 1: Check Browser Console
1. Open your deployed site
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for:
   - `🔗 API URL configured: ...` - This shows your API URL
   - Any error messages with details

### Step 2: Check Network Tab
1. Open Developer Tools
2. Go to **Network** tab
3. Try to login/signup
4. Look for failed requests (red entries)
5. Click on failed request to see:
   - Status code
   - Error message
   - Request URL

### Step 3: Test Backend Directly
1. Open a new tab
2. Visit: `https://your-backend.onrender.com/api/health`
3. Should return JSON: `{"status":"OK",...}`
4. If not working, backend is the issue

### Step 4: Check Render Logs
1. Go to Render dashboard
2. Click your backend service
3. Go to **Logs** tab
4. Look for:
   - CORS warnings
   - Error messages
   - Request logs

---

## 📋 Quick Checklist

Before reporting an issue, verify:

- [ ] `VITE_API_URL` is set in Netlify/Vercel environment variables
- [ ] `FRONTEND_URL` is set in Render environment variables
- [ ] Backend is accessible: `https://your-backend.onrender.com/api/health` works
- [ ] URLs match exactly (no typos, correct protocol)
- [ ] No trailing slashes in URLs
- [ ] Environment variables are saved and deployment is complete
- [ ] Browser console shows correct API URL

---

## 🔗 Correct Configuration Example

**Netlify/Vercel Environment Variables:**
```
VITE_API_URL=https://bank-loan-server.onrender.com
```

**Render Environment Variables:**
```
FRONTEND_URL=https://ban-loan.netlify.app
NODE_ENV=production
PORT=10000
JWT_SECRET=your_secret_here
```

---

## 💡 Pro Tips

1. **Always check browser console first** - It shows the actual API URL being used
2. **Test backend health endpoint** - Quick way to verify backend is up
3. **Check Render logs** - They show CORS and request issues
4. **Use UptimeRobot** - Keeps backend active, prevents spin-down issues
5. **Wait for deployments** - Both frontend and backend need time to deploy

---

## 🆘 Still Having Issues?

If none of the above works:

1. **Double-check all URLs:**
   - Copy directly from dashboard (don't type manually)
   - Verify in browser console what API URL is actually being used

2. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear cache completely

3. **Check for typos:**
   - URLs are case-sensitive in some cases
   - Make sure no extra spaces

4. **Verify both deployments:**
   - Frontend deployment completed successfully
   - Backend deployment completed successfully

---

**Remember**: The most common issue is missing or incorrect `VITE_API_URL` environment variable! Always check browser console first.

