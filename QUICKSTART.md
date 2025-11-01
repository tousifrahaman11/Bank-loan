# 🚀 Quick Start Guide - Tata Capital Loan Chatbot

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- Git (optional)

## 5-Minute Setup

### Step 1: Install Dependencies

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Or manually:**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment Variables

**Server (.env in server folder):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tata-loan-db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
PORT=5000
NODE_ENV=development
```

**Client (.env in client folder):**
```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster (if you don't have one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Paste it in `server/.env` as `MONGODB_URI`

### Step 4: Seed Database with Dummy Data

```bash
cd server
node utils/seedDatabase.js
```

You'll see 10 dummy customer accounts created with credentials:
- Email: `rajesh.kumar@example.com` (and 9 others)
- Password: `demo123` (for all accounts)

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 6: Access the Application

Open your browser and go to: **http://localhost:5173**

## Test Credentials

Use any of these emails with password `demo123`:

1. `rajesh.kumar@example.com` - Pre-approved ₹3L, Credit: 820
2. `priya.sharma@example.com` - Pre-approved ₹2L, Credit: 780
3. `amit.patel@example.com` - Pre-approved ₹5L, Credit: 850
4. `sneha.reddy@example.com` - Not pre-approved, Credit: 720
5. `vikram.singh@example.com` - Pre-approved ₹8L, Credit: 870

**Or** use any email/password in demo mode - it will auto-create an account!

## Testing the Chatbot Flow

1. **Login** with any test account
2. Click **"Start Chat"** on dashboard
3. Type **"apply"** to start loan application
4. Fill in loan details (amount, tenure, purpose, salary)
5. Watch the bot verify your KYC
6. See your credit score displayed
7. Get instant approval or upload salary slip
8. Download your sanction letter PDF!

## Common Issues & Solutions

### MongoDB Connection Error
- Check if your IP is whitelisted in MongoDB Atlas
- Verify connection string is correct
- Try using `0.0.0.0/0` for IP whitelist (testing only)

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Dark Mode Not Working
- Clear browser cache
- Check browser console for errors
- Refresh the page

## API Endpoints for Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Login (Demo Mode)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"demo123"}'
```

### Get Offers
```bash
curl http://localhost:5000/api/offers
```

### Calculate EMI
```bash
curl -X POST http://localhost:5000/api/offers/calculate-emi \
  -H "Content-Type: application/json" \
  -d '{"principal":100000,"rate":13,"tenure":24}'
```

## Features to Test

- ✅ Landing page with animations
- ✅ Login/Signup (demo mode)
- ✅ Dashboard with pre-approval info
- ✅ Chatbot interface with typing indicator
- ✅ 5-stage progress bar
- ✅ Loan input sliders (amount, tenure, salary)
- ✅ Real-time EMI calculation
- ✅ KYC verification display
- ✅ Credit score gauge with colors
- ✅ 3-tier eligibility logic
- ✅ Salary slip upload (drag & drop)
- ✅ Sanction letter PDF generation
- ✅ Dark mode toggle
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Loan info page with charts
- ✅ Interest rate comparison
- ✅ AI Q&A and objection handling

## Next Steps

- Customize the Tata logo (replace base64 in PDF route)
- Add real MongoDB Atlas connection
- Deploy to production (Vercel + Render/Railway)
- Add email notifications
- Implement real credit bureau integration
- Add analytics tracking

## Support

For issues, check:
1. README.md for detailed documentation
2. Browser console for frontend errors
3. Terminal output for backend errors
4. MongoDB Atlas dashboard for connection issues

---

**Built with ❤️ using MERN Stack**
