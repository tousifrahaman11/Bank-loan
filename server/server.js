const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// MongoDB Connection (Optional - will work without it in demo mode)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.warn('⚠️ MongoDB Connection Failed:', err.message);
    console.log('📝 Running in DEMO MODE without database (in-memory storage)');
  });
} else {
  console.log('📝 No MongoDB URI provided - Running in DEMO MODE (in-memory storage)');
}

// Routes
// Use simple auth if MongoDB is not connected
let authRoutes;
try {
  if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) {
    authRoutes = require('./routes/auth');
  } else {
    authRoutes = require('./routes/auth-simple');
    console.log('📝 Using simple in-memory authentication (no database required)');
  }
} catch (error) {
  authRoutes = require('./routes/auth-simple');
  console.log('📝 Using simple in-memory authentication (no database required)');
}

const crmRoutes = require('./routes/crm');
const creditRoutes = require('./routes/credit');
const offerRoutes = require('./routes/offers');
const sessionRoutes = require('./routes/session');
const pdfRoutes = require('./routes/pdf');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Tata Capital Loan Server is running!',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
