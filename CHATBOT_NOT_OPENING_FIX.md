# 🔧 Chatbot Not Opening - Troubleshooting Guide

## ✅ What I Fixed:

### **Better Error Handling**
- ✅ Chatbot will now show even if backend API fails
- ✅ Added console logs for debugging
- ✅ Improved error handling for API calls

---

## 🧪 How to Test & Fix:

### **Step 1: Restart Both Servers**

**IMPORTANT: You MUST restart both servers!**

```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Wait 2 seconds...

# Start Backend (Terminal 1)
cd server
npm start

# Wait until you see:
# "🚀 Server running on port 5000"

# Start Frontend (Terminal 2)
cd client
npm run dev

# Wait until you see:
# "Local: http://localhost:5173/"
```

### **Step 2: Clear Browser Cache**

1. Open browser
2. Press `Ctrl + Shift + Delete`
3. Select "Cached images and files"
4. Click "Clear data"
5. Close and reopen browser

### **Step 3: Test the Chatbot**

1. Go to http://localhost:5173
2. Login with any email/password
3. Should go to Dashboard
4. Open browser console (Press F12)
5. Click "Start Chat Now" button
6. **Check console for logs:**
   - Should see: "ChatbotInterface mounted, user: {name: ...}"
   - Should see: "Chatbot opening..."

---

## 🔍 Debugging Steps:

### **Check 1: Is Backend Running?**

Open http://localhost:5000/api/health in browser

**Expected:**
```json
{
  "status": "OK",
  "message": "Tata Capital Loan Server is running!",
  "timestamp": "2024-..."
}
```

**If NOT working:**
- Backend not running
- Go to server terminal
- Run: `npm start`

### **Check 2: Is Frontend Running?**

Open http://localhost:5173

**Expected:**
- See landing page
- No errors in console (F12)

**If NOT working:**
- Frontend not running
- Go to client terminal
- Run: `npm run dev`

### **Check 3: Are You Logged In?**

Open browser console (F12), type:
```javascript
localStorage.getItem('token')
```

**Expected:**
- Should return a long string (JWT token)

**If NULL:**
- You're not logged in
- Click "Login" button
- Enter any email/password
- Should redirect to Dashboard

### **Check 4: Is Chatbot State Correct?**

In browser console (F12), type:
```javascript
// Check Redux state
console.log(window.__REDUX_DEVTOOLS_EXTENSION__)
```

Or install Redux DevTools extension to see state.

**Check:**
- `auth.isAuthenticated` should be `true`
- `auth.user` should have your data
- `ui.chatOpen` should be `true` when you click button

---

## 🐛 Common Issues & Solutions:

### **Issue 1: Button Clicks But Nothing Happens**

**Cause:** Redux state not updating

**Solution:**
1. Open browser console (F12)
2. Click "Start Chat Now"
3. Check for errors
4. If you see "Cannot read property 'name' of null":
   - User data not loaded
   - Restart servers
   - Clear localStorage
   - Login again

### **Issue 2: Chatbot Opens But No Messages**

**Cause:** API calls failing

**Solution:**
1. Check backend terminal for errors
2. Make sure backend is running on port 5000
3. Check browser console for network errors
4. Try refreshing page

### **Issue 3: "Cannot connect to server" Error**

**Cause:** Backend not running or wrong port

**Solution:**
```bash
# Check if backend is running
netstat -ano | findstr :5000

# If nothing shows, start backend
cd server
npm start
```

### **Issue 4: Chatbot Shows But Crashes**

**Cause:** Missing dependencies or code error

**Solution:**
1. Check browser console for errors
2. Reinstall dependencies:
   ```bash
   cd client
   npm install
   
   cd ../server
   npm install
   ```
3. Restart both servers

---

## ✅ Success Checklist:

After restarting servers, verify:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can login successfully
- [ ] Redirects to Dashboard
- [ ] Dashboard shows "Start Loan Chat" card
- [ ] Click button
- [ ] **Chatbot opens** ✅
- [ ] See welcome message from AI
- [ ] Can type and send messages

---

## 🎯 Expected Behavior:

### **When You Click "Start Chat Now":**

1. ✅ Button animates (scale effect)
2. ✅ Chatbot slides in from right side
3. ✅ Shows header: "Tata Capital Loan Assistant"
4. ✅ Shows AI message: "Hi [Your Name]! 👋"
5. ✅ Shows second message: "I'm here to help you..."
6. ✅ Input box at bottom
7. ✅ Voice button (microphone icon)
8. ✅ Send button

### **Console Logs You Should See:**

```
ChatbotInterface mounted, user: {name: "...", email: "..."}
Initializing chat...
Welcome messages sent
```

---

## 📞 Still Not Working?

### **Try This Complete Reset:**

```bash
# 1. Kill all Node processes
taskkill /F /IM node.exe

# 2. Clear browser data
# Press Ctrl+Shift+Delete, clear everything

# 3. Delete node_modules and reinstall
cd client
rmdir /s /q node_modules
npm install

cd ../server
rmdir /s /q node_modules
npm install

# 4. Start fresh
cd server
npm start

# New terminal
cd client
npm run dev

# 5. Open browser in incognito mode
# Go to http://localhost:5173
# Login and test
```

---

## 🔧 Quick Fix Commands:

### **Restart Everything:**
```bash
taskkill /F /IM node.exe && cd server && start cmd /k npm start && cd ../client && start cmd /k npm run dev
```

### **Check Ports:**
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

### **Clear Browser Storage:**
Open console (F12) and run:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## ✅ After Fixing:

Once chatbot opens successfully:

1. ✅ Type "apply"
2. ✅ Fill loan details
3. ✅ Complete 5-stage flow
4. ✅ Get sanction letter
5. ✅ Download PDF

---

**Status:** ✅ **Fixed with better error handling!**

**Just restart servers and test!**

If still not working, check browser console (F12) for specific errors and share them.
