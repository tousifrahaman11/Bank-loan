# 🧪 Testing Checklist - Tata Capital Loan Chatbot

## Pre-Testing Setup
- [ ] MongoDB connected successfully
- [ ] Database seeded with dummy customers
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] No console errors on startup

## 1. Landing Page Tests

### Visual & Layout
- [ ] Hero section displays correctly
- [ ] Tata Capital logo and branding visible
- [ ] "Start Chat" button prominent and animated
- [ ] "Loan Info" button visible
- [ ] Features section with 4 cards displays
- [ ] Benefits section with 8 items shows
- [ ] Footer with contact info present
- [ ] All animations smooth (60fps)

### Functionality
- [ ] Dark mode toggle works
- [ ] Login button opens modal
- [ ] Start Chat button opens chatbot
- [ ] All hover effects working
- [ ] Responsive on mobile (< 640px)
- [ ] Responsive on tablet (640-1024px)
- [ ] Responsive on desktop (> 1024px)

## 2. Authentication Tests

### Login Modal
- [ ] Modal opens with animation
- [ ] Close button works
- [ ] Email validation works
- [ ] Password validation (min 6 chars)
- [ ] Login with test credentials succeeds
- [ ] Login with any email/password works (demo mode)
- [ ] Error messages display correctly
- [ ] Toggle to Sign Up works
- [ ] Modal closes after successful login
- [ ] Redirects to dashboard after login

### Sign Up
- [ ] Name field validation
- [ ] Email format validation
- [ ] Password length validation
- [ ] Account creation succeeds
- [ ] Auto-login after signup
- [ ] Random data assigned (credit score, pre-approval)

## 3. Dashboard Tests

### Layout
- [ ] Welcome message shows user name
- [ ] Two main cards (Chat & Loan Info) display
- [ ] Pre-approval banner shows (if applicable)
- [ ] Quick stats cards display
- [ ] Dark mode toggle works
- [ ] Logout button works

### Functionality
- [ ] Start Chat card opens chatbot
- [ ] Loan Info card navigates to info page
- [ ] Pre-approved amount displays correctly
- [ ] Apply Now button opens chatbot
- [ ] Logout clears session and redirects

## 4. Chatbot Interface Tests

### Initial State
- [ ] Chatbot opens with slide-in animation
- [ ] Header shows "Tata Loan Assistant"
- [ ] Progress bar at 0% (Conversation stage)
- [ ] Personalized greeting appears
- [ ] Pre-approval message (if applicable)
- [ ] Welcome message with options

### Chat Functionality
- [ ] Input field accepts text
- [ ] Send button enabled when text present
- [ ] Enter key sends message
- [ ] User messages appear on left
- [ ] Bot messages appear on right
- [ ] Typing indicator shows during bot response
- [ ] Messages auto-scroll to bottom
- [ ] Chat history persists in localStorage

### AI Q&A (Objection Handling)
- [ ] "interest" → Shows rate comparison
- [ ] "tata" or "trust" → Shows trust message
- [ ] "apply" → Starts application flow
- [ ] "fee" → Shows zero fees message
- [ ] "time" → Shows approval time
- [ ] "document" → Shows required docs
- [ ] "eligibility" → Shows criteria
- [ ] "help" → Shows help menu
- [ ] Generic questions → Smart response

## 5. Loan Application Flow

### Stage 1: Conversation (Sales Agent)
- [ ] Progress bar at 20%
- [ ] Loan inputs component displays
- [ ] Purpose dropdown works (7 options)
- [ ] Amount slider (₹10k - ₹10L)
- [ ] Tenure slider (12-60 months)
- [ ] Salary slider (₹20k - ₹2L)
- [ ] EMI preview updates in real-time
- [ ] Interest rate changes by purpose
- [ ] Continue button submits data
- [ ] Sales message shows loan details

### Stage 2: Verification
- [ ] Progress bar at 40%
- [ ] KYC verification message
- [ ] KYC component displays customer data
- [ ] PAN masked correctly (XXX format)
- [ ] Aadhaar masked (XXXX XXXX 1234)
- [ ] Bank account shown
- [ ] All fields marked as verified
- [ ] Success message after 3 seconds

### Stage 3: Credit Check
- [ ] Progress bar at 60%
- [ ] Credit check message
- [ ] Credit score fetched from API
- [ ] Credit score gauge displays
- [ ] Color coding correct (green/orange/red)
- [ ] Score label correct (Excellent/Good/Fair/Poor)
- [ ] Circular progress animates
- [ ] Score range and status shown

### Stage 4: Eligibility (3-Tier Logic)

#### Tier 1: Pre-Approved (Instant Approve)
- [ ] Pre-approved customers get instant approval
- [ ] EMI ≤ 50% of salary check
- [ ] Approval message with confetti
- [ ] Progress bar at 80%
- [ ] Moves to sanction stage

#### Tier 2: Salary Slip Required
- [ ] Non-pre-approved or EMI > 50% → Upload required
- [ ] Upload component displays
- [ ] Drag & drop area works
- [ ] File browse button works
- [ ] File type validation (PDF, JPG, PNG)
- [ ] File size validation (< 5MB)
- [ ] Selected file shows name and size
- [ ] Remove file button works
- [ ] Upload & Verify button enabled
- [ ] EMI validation message shows
- [ ] Upload succeeds if EMI ≤ 50%
- [ ] Upload fails if EMI > 50%
- [ ] Success leads to approval

#### Tier 3: Rejected with Fallback
- [ ] Credit score < 700 → Rejection
- [ ] EMI > 100% of salary → Rejection
- [ ] Rejection message displays
- [ ] Fallback offer shows (50% of requested)
- [ ] Fallback rate mentioned (14%)

### Stage 5: Sanction Letter
- [ ] Progress bar at 100%
- [ ] Sanction letter ready message
- [ ] Sanction modal opens
- [ ] Congratulations animation
- [ ] Document preview shows
- [ ] Download button works
- [ ] PDF generates correctly
- [ ] PDF contains all loan details
- [ ] PDF has Tata branding
- [ ] Next steps section visible

## 6. Loan Info Page Tests

### Layout
- [ ] Back button navigates to dashboard
- [ ] Bank info banner (Tata Capital, Personal Loan, 12% rate)
- [ ] EMI calculator section
- [ ] Interest rate comparison chart
- [ ] Loan distribution pie chart
- [ ] EMI vs Tenure line chart
- [ ] Features table with 10 rows
- [ ] Eligibility criteria section
- [ ] CTA button at bottom

### EMI Calculator
- [ ] Amount slider works (₹10k - ₹10L)
- [ ] Rate slider works (10% - 20%)
- [ ] Tenure slider works (12-60 months)
- [ ] Salary slider works (₹20k - ₹2L)
- [ ] EMI calculates correctly
- [ ] Principal and interest shown
- [ ] Total amount calculated
- [ ] EMI/Salary ratio displayed
- [ ] Affordability check (green if ≤50%)
- [ ] Pie chart shows principal vs interest
- [ ] All values update in real-time

### Charts
- [ ] Bar chart renders (rate comparison)
- [ ] Pie chart renders (loan distribution)
- [ ] Line chart renders (EMI vs tenure)
- [ ] Charts responsive on mobile
- [ ] Tooltips work on hover
- [ ] Legends display correctly

## 7. UI/UX Tests

### Dark Mode
- [ ] Toggle switches between light/dark
- [ ] Preference saved in localStorage
- [ ] All pages support dark mode
- [ ] Text readable in both modes
- [ ] Colors appropriate in dark mode
- [ ] Charts visible in dark mode

### Animations
- [ ] Page transitions smooth
- [ ] Button hover effects work
- [ ] Modal fade-in/scale animations
- [ ] Chat bubble slide-in animations
- [ ] Progress bar fill animation
- [ ] Confetti animation on approval
- [ ] Loading spinners during API calls
- [ ] Typing indicator animation

### Responsive Design
- [ ] Mobile (< 640px): Single column layout
- [ ] Mobile: Hamburger menu (if applicable)
- [ ] Mobile: Touch-friendly buttons
- [ ] Mobile: Chatbot full-screen
- [ ] Tablet (640-1024px): Adjusted layout
- [ ] Desktop (> 1024px): Full layout
- [ ] All text readable on small screens
- [ ] Images scale appropriately

## 8. API Integration Tests

### Backend Endpoints
- [ ] GET /api/health → Returns OK
- [ ] POST /api/auth/login → Returns token
- [ ] POST /api/auth/register → Creates user
- [ ] GET /api/auth/me → Returns user data
- [ ] GET /api/crm/customer/me → Returns CRM data
- [ ] GET /api/credit/customer/me → Returns credit score
- [ ] GET /api/offers → Returns loan offers
- [ ] POST /api/offers/calculate-emi → Returns EMI
- [ ] POST /api/session/create → Creates session
- [ ] GET /api/session/active → Returns active session
- [ ] POST /api/upload/salary-slip → Validates and accepts
- [ ] POST /api/pdf/generate-sanction → Returns PDF blob

### Error Handling
- [ ] Invalid credentials → Error message
- [ ] Network error → User-friendly message
- [ ] 401 Unauthorized → Redirects to login
- [ ] 500 Server error → Error toast
- [ ] File upload error → Clear message
- [ ] Validation errors → Field-specific messages

## 9. Data Persistence Tests

### LocalStorage
- [ ] Auth token persists
- [ ] User data persists
- [ ] Chat history persists
- [ ] Dark mode preference persists
- [ ] Data clears on logout

### Session Management
- [ ] Session created on chat start
- [ ] Session ID stored in Redux
- [ ] Messages saved to session
- [ ] Session retrieved on refresh
- [ ] Multiple sessions handled

## 10. Performance Tests

### Load Times
- [ ] Landing page loads < 2s
- [ ] Dashboard loads < 1s
- [ ] Chatbot opens < 500ms
- [ ] API responses < 1s
- [ ] PDF generation < 3s

### Optimization
- [ ] No memory leaks
- [ ] Smooth 60fps animations
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading where appropriate

## 11. Security Tests

### Authentication
- [ ] Passwords not visible in network tab
- [ ] JWT token in Authorization header
- [ ] Token expires after 30 days
- [ ] Logout clears all sensitive data
- [ ] Protected routes redirect if not authenticated

### Data Protection
- [ ] PAN/Aadhaar masked in UI
- [ ] No sensitive data in console logs
- [ ] CORS configured correctly
- [ ] Rate limiting active (100 req/15min)
- [ ] Helmet.js security headers applied

## 12. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 13. Accessibility Tests

### ARIA & Keyboard Navigation
- [ ] All buttons have aria-labels
- [ ] Tab navigation works
- [ ] Enter key submits forms
- [ ] Escape key closes modals
- [ ] Focus indicators visible
- [ ] Screen reader friendly

### Visual
- [ ] Sufficient color contrast
- [ ] Text readable at 200% zoom
- [ ] No reliance on color alone
- [ ] Alt text on images
- [ ] Semantic HTML used

## Test Results Summary

**Total Tests:** ~200+
**Passed:** ___
**Failed:** ___
**Skipped:** ___

**Critical Issues:** ___
**Minor Issues:** ___

**Tested By:** ___________
**Date:** ___________
**Environment:** Development / Staging / Production

---

## Notes

Record any bugs, issues, or observations here:

1. 
2. 
3. 

---

**Status:** ✅ Ready for Production / ⚠️ Needs Fixes / ❌ Major Issues
