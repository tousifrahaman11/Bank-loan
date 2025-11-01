const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const authMiddleware = require('../middleware/auth');

// Simulate API delay for realism
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// @route   GET /api/crm/:email
// @desc    Get customer CRM data by email (Mock CRM)
// @access  Public (for demo)
router.get('/:email', async (req, res) => {
  try {
    await delay(500); // Simulate API delay

    const customer = await Customer.findOne({ email: req.params.email }).select('-password');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found in CRM'
      });
    }

    res.json({
      success: true,
      data: {
        name: customer.name,
        email: customer.email,
        age: customer.age,
        city: customer.city,
        salary: customer.salary,
        preApproved: customer.preApproved,
        preApprovedAmount: customer.preApprovedAmount,
        pan: customer.pan,
        aadhaar: customer.aadhaar,
        bankAccount: customer.bankAccount,
        phone: customer.phone || `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        customerSince: customer.createdAt
      }
    });
  } catch (error) {
    console.error('CRM error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching CRM data'
    });
  }
});

// @route   GET /api/crm/customer/me
// @desc    Get current customer CRM data
// @access  Private
router.get('/customer/me', authMiddleware, async (req, res) => {
  try {
    await delay(500);

    const customer = req.customer;

    res.json({
      success: true,
      data: {
        name: customer.name,
        email: customer.email,
        age: customer.age,
        city: customer.city,
        salary: customer.salary,
        preApproved: customer.preApproved,
        preApprovedAmount: customer.preApprovedAmount,
        pan: customer.pan,
        aadhaar: customer.aadhaar,
        bankAccount: customer.bankAccount,
        phone: customer.phone || `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        customerSince: customer.createdAt
      }
    });
  } catch (error) {
    console.error('CRM error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching CRM data'
    });
  }
});

module.exports = router;
