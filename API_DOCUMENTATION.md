# 📡 API Documentation - Tata Capital Loan Chatbot

## Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-backend.onrender.com/api`

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Tata Capital Loan Server is running!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "mongodb": "Connected"
}
```

---

### 2. Authentication

#### 2.1 Register

**POST** `/auth/register`

Create a new customer account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 32,
    "city": "Mumbai",
    "salary": 75000,
    "preApproved": true,
    "preApprovedAmount": 300000,
    "creditScore": 820,
    "pan": "ABCDE1234F",
    "aadhaar": "1234 5678 9012",
    "bankAccount": "XXXX4567"
  }
}
```

#### 2.2 Login

**POST** `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": { /* customer object */ }
}
```

**Note:** In development mode, any email/password combination will auto-create an account.

#### 2.3 Get Current User

**GET** `/auth/me`

Get currently authenticated user details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "customer": { /* customer object */ }
}
```

---

### 3. CRM (Customer Relationship Management)

#### 3.1 Get Customer by Email

**GET** `/crm/:email`

Get customer CRM data by email (Mock CRM).

**Example:** `/crm/john@example.com`

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 32,
    "city": "Mumbai",
    "salary": 75000,
    "preApproved": true,
    "preApprovedAmount": 300000,
    "pan": "ABCDE1234F",
    "aadhaar": "1234 5678 9012",
    "bankAccount": "XXXX4567",
    "phone": "+91 9876543210",
    "customerSince": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 3.2 Get My CRM Data

**GET** `/crm/customer/me`

Get current customer's CRM data.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Same as 3.1

---

### 4. Credit Bureau

#### 4.1 Get Credit Score by PAN

**GET** `/credit/:pan`

Get credit score by PAN number (Mock Credit Bureau).

**Example:** `/credit/ABCDE1234F`

**Response:**
```json
{
  "success": true,
  "data": {
    "pan": "ABCDE1234F",
    "creditScore": 820,
    "creditHistory": "Excellent",
    "bureauName": "CIBIL",
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "factors": {
      "paymentHistory": "Excellent",
      "creditUtilization": "Low",
      "creditAge": "7 years",
      "totalAccounts": 5,
      "hardInquiries": 1
    }
  }
}
```

#### 4.2 Get My Credit Score

**GET** `/credit/customer/me`

Get current customer's credit score.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Same as 4.1

---

### 5. Offers

#### 5.1 Get All Offers

**GET** `/offers`

Get all available loan offers.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Personal Loan - Education",
      "purpose": "Education",
      "minAmount": 50000,
      "maxAmount": 1000000,
      "interestRate": 12.5,
      "tenure": "12-60 months",
      "features": [
        "Zero processing fees",
        "Flexible repayment",
        "Quick approval in 30 minutes",
        "No collateral required"
      ],
      "eligibility": {
        "minAge": 21,
        "maxAge": 60,
        "minSalary": 25000,
        "minCreditScore": 700
      }
    }
    /* ... more offers */
  ],
  "benefits": [
    "✅ Zero processing fees",
    "⚡ 30-minute approval",
    /* ... more benefits */
  ]
}
```

#### 5.2 Get Interest Rate by Purpose

**GET** `/offers/rate/:purpose`

Get interest rate for a specific loan purpose.

**Example:** `/offers/rate/Education`

**Response:**
```json
{
  "success": true,
  "data": {
    "purpose": "Education",
    "interestRate": 12.5,
    "comparison": {
      "marketAverage": 16.0,
      "savings": "Save ₹3500 per lakh per year"
    }
  }
}
```

**Purpose Options:** Education, Medical, Business, Home Renovation, Wedding, Travel, Other

#### 5.3 Calculate EMI

**POST** `/offers/calculate-emi`

Calculate EMI for given loan parameters.

**Request Body:**
```json
{
  "principal": 100000,
  "rate": 13.0,
  "tenure": 24
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "emi": 4707,
    "totalAmount": 112968,
    "totalInterest": 12968,
    "principal": 100000,
    "interestRate": 13.0,
    "tenure": 24,
    "breakdown": {
      "monthlyEmi": 4707,
      "principalComponent": 4167,
      "interestComponent": 540
    }
  }
}
```

**EMI Formula:** `EMI = P * r * (1+r)^n / ((1+r)^n - 1)`
- P = Principal amount
- r = Monthly interest rate (annual rate / 12 / 100)
- n = Tenure in months

---

### 6. Session Management

#### 6.1 Create Session

**POST** `/session/create`

Create a new loan application session.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "customerId": "507f1f77bcf86cd799439012",
    "stage": "conversation",
    "status": "active",
    "chatHistory": [],
    "documents": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 6.2 Get Active Session

**GET** `/session/active`

Get the current active session for the customer.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": { /* session object */ }
}
```

#### 6.3 Update Session

**PUT** `/session/:id`

Update session details.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "stage": "verification",
  "loanAmount": 100000,
  "tenure": 24,
  "emi": 4707,
  "interestRate": 13.0,
  "purpose": "Education",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated session */ }
}
```

#### 6.4 Add Message to Chat

**POST** `/session/:id/message`

Add a message to the chat history.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "sender": "user",
  "message": "I want to apply for a loan",
  "metadata": {
    "type": "text"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sender": "user",
    "message": "I want to apply for a loan",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "metadata": { "type": "text" }
  }
}
```

#### 6.5 Get Chat History

**GET** `/session/:id/history`

Get all chat messages for a session.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sender": "bot",
      "message": "Hi! Welcome to Tata Capital!",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
    /* ... more messages */
  ]
}
```

#### 6.6 Add Document to Session

**POST** `/session/:id/document`

Add a document reference to the session.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "type": "salary_slip",
  "filename": "salary_slip_jan_2024.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "salary_slip",
    "filename": "salary_slip_jan_2024.pdf",
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "verified": false
  }
}
```

---

### 7. File Upload

#### 7.1 Upload Salary Slip

**POST** `/upload/salary-slip`

Upload and validate salary slip.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File (PDF, JPG, PNG - Max 5MB)
- `salary`: Number (Monthly salary)
- `emi`: Number (Monthly EMI)

**Response (Success):**
```json
{
  "success": true,
  "message": "Salary slip verified successfully! ✅",
  "data": {
    "filename": "salary_slip.pdf",
    "size": 245678,
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "verified": true,
    "emiToSalaryRatio": "35.50",
    "status": "approved"
  }
}
```

**Response (Validation Failed):**
```json
{
  "success": false,
  "message": "EMI (₹25000) exceeds 50% of your salary (₹40000). Please reduce loan amount or increase tenure.",
  "data": {
    "emiToSalaryRatio": "62.50",
    "maxAllowedEmi": 20000,
    "currentEmi": 25000
  }
}
```

**Validation Rules:**
- File type: PDF, JPG, JPEG, PNG
- File size: Max 5MB
- EMI must be ≤ 50% of salary

#### 7.2 Upload General Document

**POST** `/upload/document`

Upload a general document.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File (PDF, JPG, PNG - Max 5MB)
- `documentType`: String (optional)

**Response:**
```json
{
  "success": true,
  "message": "Document uploaded successfully!",
  "data": {
    "filename": "document.pdf",
    "size": 123456,
    "type": "general",
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "verified": true
  }
}
```

---

### 8. PDF Generation

#### 8.1 Generate Sanction Letter

**POST** `/pdf/generate-sanction`

Generate and download loan sanction letter PDF.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "sessionId": "507f1f77bcf86cd799439011"
}
```

**Response:**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename=Tata_Sanction_Letter_John_Doe.pdf`
- Binary PDF data

**PDF Contents:**
- Tata Capital branding
- Customer name and details
- Loan amount, EMI, interest rate, tenure
- Terms & conditions
- Benefits
- Next steps
- Contact information

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ /* validation errors if applicable */ ]
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Header:** `X-RateLimit-Remaining` shows remaining requests
- **Response when exceeded:**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
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

### Get Credit Score (with auth)
```bash
curl http://localhost:5000/api/credit/customer/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Upload File
```bash
curl -X POST http://localhost:5000/api/upload/salary-slip \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/salary_slip.pdf" \
  -F "salary=50000" \
  -F "emi=15000"
```

---

## Testing with Postman

1. **Import Collection:** Create a new collection "Tata Loan API"
2. **Set Base URL:** Variable `{{baseUrl}}` = `http://localhost:5000/api`
3. **Set Auth Token:** Variable `{{token}}` = Your JWT token
4. **Add Requests:** Copy endpoints from this documentation
5. **Use Pre-request Scripts:** Auto-set Authorization header

**Pre-request Script Example:**
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.variables.get('token')
});
```

---

## WebSocket Support (Future Enhancement)

Currently not implemented, but can be added for real-time chat:

```javascript
// Client
const socket = io('http://localhost:5000');
socket.emit('chat-message', { message: 'Hello' });
socket.on('bot-response', (data) => console.log(data));

// Server
io.on('connection', (socket) => {
  socket.on('chat-message', async (data) => {
    const response = await processMessage(data.message);
    socket.emit('bot-response', response);
  });
});
```

---

## API Versioning

Current version: **v1** (implicit in `/api/` routes)

Future versions will use: `/api/v2/`, `/api/v3/`, etc.

---

## Support

For API issues:
- Check server logs
- Verify request format matches documentation
- Ensure authentication token is valid
- Check rate limiting headers
- Review error messages

---

**Last Updated:** 2024
**API Version:** 1.0.0
