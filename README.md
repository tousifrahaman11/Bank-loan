# 🏦 Tata Capital Personal Loan Chatbot

A complete, production-ready MERN stack application for personal loan applications with an AI-powered chatbot interface.

## ✨ Features

- 🤖 Interactive AI Chatbot with 27+ features
- 💰 Real-time EMI Calculator
- 📊 5-Stage Progress Tracking
- 📄 Auto-generated Sanction Letter (PDF)
- 🔐 JWT Authentication
- 📱 Fully Responsive Design
- 🎨 Tata-branded UI (Purple & Green)
- ⚡ Smooth Animations with Framer Motion
- 🌙 Dark Mode Support
- 📈 Credit Score Visualization
- 💳 KYC Verification
- 📤 Document Upload
- 🎯 3-Tier Eligibility Logic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (free tier)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd tata-loan-chatbot
```

2. **Set up environment variables**

Create `.env` in the `server` folder:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Create `.env` in the `client` folder:
```env
VITE_API_URL=http://localhost:5000
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
```

4. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

5. **Seed Database with Dummy Customers**
```bash
cd ../server
node utils/seedDatabase.js
```

6. **Run the Application**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

7. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🧪 Testing

### Backend API Endpoints (Postman/cURL)

```bash
# Health Check
curl http://localhost:5000/api/health

# Get CRM Data
curl http://localhost:5000/api/crm/customer@email.com

# Get Credit Score
curl http://localhost:5000/api/credit/PAN123456

# Get Offers
curl http://localhost:5000/api/offers
```

### Frontend Testing Checklist

- [ ] Landing page loads with hero section
- [ ] Login/Signup modal works
- [ ] Chatbot opens and greets user
- [ ] Progress bar updates through stages
- [ ] EMI calculator shows real-time results
- [ ] KYC verification displays masked data
- [ ] Credit score gauge animates
- [ ] Salary slip upload validates
- [ ] PDF sanction letter downloads
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode toggle works
- [ ] All animations smooth (60fps)

## 📦 Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- React Router
- React Hook Form
- Recharts
- React Icons
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- pdf-lib (PDF generation)
- CORS, Helmet, Rate Limiting

## 🎨 Design System

**Colors:**
- Primary Purple: `#4A00E0`
- Primary Green: `#00C851`
- Gradients: Purple to Blue, Green accents

**Fonts:**
- Inter (headings)
- Roboto (body)

**Animations:**
- Chat bubbles: Slide-in from right
- Progress bar: Smooth fill with easing
- Modals: Fade + scale
- Buttons: Hover lift + shadow

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- JWT token authentication
- Password hashing (bcrypt)
- Input sanitization
- Rate limiting (100 req/15min)
- CORS configuration
- Helmet.js security headers
- File upload validation

## 📊 Database Schema

**Customer Model:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  city: String,
  salary: Number,
  preApproved: Boolean,
  preApprovedAmount: Number,
  creditScore: Number,
  purpose: String,
  pan: String,
  aadhaar: String,
  bankAccount: String
}
```

**Session Model:**
```javascript
{
  customerId: ObjectId,
  stage: String,
  loanAmount: Number,
  tenure: Number,
  emi: Number,
  interestRate: Number,
  purpose: String,
  status: String,
  chatHistory: Array
}
```

## 🎯 27 Core Features Implemented

1. ✅ Web-Based Chatbot Interface
2. ✅ Landing Page with Dual CTAs
3. ✅ Progress Bar (5 Stages)
4. ✅ Master Agent (AI Controller)
5. ✅ Sales Agent (Worker #1)
6. ✅ Interactive EMI Calculator
7. ✅ Verification Agent (Worker #2)
8. ✅ Underwriting Agent (Worker #3)
9. ✅ 3-Tier Eligibility Logic
10. ✅ Salary Slip Upload
11. ✅ Sanction Letter Generator
12. ✅ PDF Download Modal
13. ✅ 10 Dummy Customers
14. ✅ Mock APIs
15. ✅ Personalized Greeting
16. ✅ Purpose-Based Interest Rates
17. ✅ AI Objection Handling
18. ✅ Tata Benefits Engine
19. ✅ Loan Info Section
20. ✅ Bank Name Display
21. ✅ Loan Type Display
22. ✅ Customer Q&A
23. ✅ Login/Sign-Up
24. ✅ Responsive Modals
25. ✅ Edge Case Handling
26. ✅ Human-Like Conversation
27. ✅ Additional Polish (Dark mode, persistence, etc.)

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0 for testing)
- Check connection string format
- Verify network access in Atlas dashboard

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**Build Errors:**
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check Node version: `node -v` (should be 18+)

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Developer Notes

- All customer data is dummy/mock
- No real external APIs used
- JWT tokens stored in localStorage (demo only)
- File uploads simulated (validation only)
- Credit scores randomly generated (700-900)

## 🚀 Deployment

### Free Deployment Options

This project is ready for **FREE** deployment using:
- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Render (recommended) or Railway

### Quick Start

📖 **See detailed deployment guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

🎨 **Vercel deployment steps**: [VERCEL_DEPLOYMENT_STEPS.md](./VERCEL_DEPLOYMENT_STEPS.md)

🌐 **Netlify deployment steps**: [NETLIFY_DEPLOYMENT_STEPS.md](./NETLIFY_DEPLOYMENT_STEPS.md)

⚡ **Quick checklist**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

### Configuration Files

- Frontend: 
  - `client/vercel.json` (Vercel configuration)
  - `client/netlify.toml` (Netlify configuration)
- Backend: `server/render.yaml` (Render configuration)

### Environment Variables

**Frontend (Vercel or Netlify)**:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

**Backend (Render)**:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your_secret_key_here
FRONTEND_URL=https://your-frontend-url.vercel.app
MONGODB_URI=your_mongodb_uri (optional)
```

### Deployment Steps

1. Push code to GitHub (already done ✓)
2. Deploy backend to Render (see DEPLOYMENT_GUIDE.md)
   - ⚠️ **Important**: Use Root Directory = `server` (NOT `tata-loan-chatbot/server`)
3. Deploy frontend to Vercel or Netlify:
   - **Vercel**: See [VERCEL_DEPLOYMENT_STEPS.md](./VERCEL_DEPLOYMENT_STEPS.md)
     - ⚠️ **Important**: Use Root Directory = `client` (NOT `tata-loan-chatbot/client`)
   - **Netlify**: See [NETLIFY_DEPLOYMENT_STEPS.md](./NETLIFY_DEPLOYMENT_STEPS.md)
     - ⚠️ **Important**: Use Base directory = `client` (NOT `tata-loan-chatbot/client`)
4. Update CORS settings with production URLs
5. Test your live application!

## 📞 Support

For issues or questions, check the troubleshooting section or review the inline code comments.

---

**Built with ❤️ using MERN Stack**
