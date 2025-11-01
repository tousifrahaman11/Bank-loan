const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find customer
    const customer = await Customer.findById(decoded.id).select('-password');
    
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    // Add customer to request
    req.customer = customer;
    req.customerId = decoded.id;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

module.exports = authMiddleware;
