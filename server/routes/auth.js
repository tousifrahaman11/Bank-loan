const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const authMiddleware = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register new customer
// @access  Public
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if customer exists
    let customer = await Customer.findOne({ email });
    if (customer) {
      // Auto-login existing customer (demo mode behavior)
      customer.lastLogin = new Date();
      await customer.save();
      const token = generateToken(customer._id);
      return res.json({
        success: true,
        message: 'Welcome back! You already have an account. Logged in successfully! 🎉',
        token,
        customer: customer.toSafeObject()
      });
    }

    // Create new customer
    customer = new Customer({
      name,
      email,
      password,
      creditScore: Math.floor(Math.random() * 200) + 700, // Random 700-900
      preApproved: Math.random() > 0.5,
      preApprovedAmount: Math.floor(Math.random() * 400000) + 100000, // 1L-5L
      pan: `PAN${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
      aadhaar: `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
      bankAccount: `XXXX${Math.floor(Math.random() * 9000) + 1000}`,
      salary: Math.floor(Math.random() * 100000) + 30000, // 30k-130k
      age: Math.floor(Math.random() * 35) + 25, // 25-60
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'][Math.floor(Math.random() * 5)]
    });

    await customer.save();

    const token = generateToken(customer._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token,
      customer: customer.toSafeObject()
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login customer
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Demo mode: Auto-login any email/password (for testing)
    if (process.env.NODE_ENV === 'development') {
      let customer = await Customer.findOne({ email });
      
      if (!customer) {
        // Auto-create customer in demo mode
        customer = new Customer({
          name: email.split('@')[0],
          email,
          password: 'demo123',
          creditScore: Math.floor(Math.random() * 200) + 700,
          preApproved: Math.random() > 0.5,
          preApprovedAmount: Math.floor(Math.random() * 400000) + 100000,
          pan: `PAN${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
          aadhaar: `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
          bankAccount: `XXXX${Math.floor(Math.random() * 9000) + 1000}`,
          salary: Math.floor(Math.random() * 100000) + 30000,
          age: Math.floor(Math.random() * 35) + 25,
          city: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'][Math.floor(Math.random() * 5)]
        });
        await customer.save();
      }

      customer.lastLogin = new Date();
      await customer.save();

      const token = generateToken(customer._id);

      return res.json({
        success: true,
        message: 'Login successful!',
        token,
        customer: customer.toSafeObject()
      });
    }

    // Production mode: Verify password
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    customer.lastLogin = new Date();
    await customer.save();

    const token = generateToken(customer._id);

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      customer: customer.toSafeObject()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current customer
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      customer: req.customer.toSafeObject()
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
