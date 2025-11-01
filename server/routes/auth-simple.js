const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// In-memory user storage (for demo without MongoDB)
const users = new Map();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'demo-secret-key-12345', {
    expiresIn: '30d'
  });
};

// Generate random user data
const generateUserData = (name, email) => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  return {
    _id: id,
    name: name || email.split('@')[0],
    email,
    age: Math.floor(Math.random() * 35) + 25,
    city: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'][Math.floor(Math.random() * 5)],
    salary: Math.floor(Math.random() * 100000) + 30000,
    preApproved: Math.random() > 0.5,
    preApprovedAmount: Math.floor(Math.random() * 400000) + 100000,
    creditScore: Math.floor(Math.random() * 200) + 700,
    pan: `PAN${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
    aadhaar: `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
    bankAccount: `XXXX${Math.floor(Math.random() * 9000) + 1000}`,
    createdAt: new Date(),
    lastLogin: new Date()
  };
};

// @route   POST /api/auth/register
// @desc    Register new customer
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    let user = users.get(email);
    
    if (user) {
      // Auto-login if user exists (demo mode)
      user.lastLogin = new Date();
      const token = generateToken(user._id);
      return res.json({
        success: true,
        message: 'Welcome back! You already have an account. Logged in successfully! 🎉',
        token,
        customer: user
      });
    }

    // Create new user
    user = generateUserData(name, email);
    users.set(email, user);

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome! 🎉',
      token,
      customer: user
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again.'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login customer
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    let user = users.get(email);
    
    if (!user) {
      // Auto-create user in demo mode
      user = generateUserData(null, email);
      users.set(email, user);
    }

    user.lastLogin = new Date();
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful! 🎉',
      token,
      customer: user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current customer
// @access  Private
router.get('/me', (req, res) => {
  try {
    // Extract token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret-key-12345');
    
    // Find user by ID
    let user = null;
    for (const [email, userData] of users.entries()) {
      if (userData._id === decoded.id) {
        user = userData;
        break;
      }
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      customer: user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

module.exports = router;
