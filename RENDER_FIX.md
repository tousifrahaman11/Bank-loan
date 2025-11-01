# 🔧 How to Fix Render Deployment Error

## ⚠️ Error You Encountered

```
Service Root Directory "/opt/render/project/src/tata-loan-chatbot/server" is missing.
```

## ✅ Solution

The Root Directory path is incorrect. Here's how to fix it:

### Step 1: Update Render Service Settings

1. Go to your Render dashboard
2. Click on your `bank-loan-server` service
3. Go to **Settings** tab
4. Scroll down to **Build & Deploy** section
5. Find **Root Directory** field
6. Change from: `tata-loan-chatbot/server`
7. Change to: `server` ⚠️ (just `server`, nothing else)
8. Click **Save Changes**

### Step 2: Redeploy

1. After saving, Render will automatically trigger a new deployment
2. Go to **Events** tab to watch the deployment progress
3. Wait for it to complete (2-5 minutes)

### Step 3: Verify

1. Once deployment succeeds (green checkmark), test your backend:
   ```
   https://your-backend-url.onrender.com/api/health
   ```
2. You should see a JSON response:
   ```json
   {
     "status": "OK",
     "message": "Tata Capital Loan Server is running!",
     ...
   }
   ```

## 🎯 Why This Happened

When you cloned the repository, the git repository root contains the `server` folder directly (not nested in `tata-loan-chatbot`). 

**Repository Structure:**
```
Bank-loan/
├── server/          ← This is what Render needs
├── client/
├── README.md
└── ...
```

**NOT:**
```
Bank-loan/
└── tata-loan-chatbot/
    ├── server/
    └── client/
```

## ✅ After Fix

Your deployment should work now! The build will succeed and your backend will be live.

---
**Note**: Same fix applies to Vercel - use `client` (not `tata-loan-chatbot/client`)

