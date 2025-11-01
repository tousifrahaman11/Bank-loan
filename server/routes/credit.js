const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const authMiddleware = require('../middleware/auth');

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// @route   GET /api/credit/:pan
// @desc    Get credit score by PAN (Mock Credit Bureau)
// @access  Public (for demo)
router.get('/:pan', async (req, res) => {
  try {
    await delay(500); // Simulate credit bureau API delay

    const customer = await Customer.findOne({ pan: req.params.pan.toUpperCase() });

    let creditScore = 750;
    let creditHistory = 'Good';
    let bureauName = 'CIBIL';

    if (customer) {
      creditScore = customer.creditScore;
    } else {
      // Generate random score for unknown PAN
      creditScore = Math.floor(Math.random() * 200) + 700; // 700-900
    }

    // Determine credit history based on score
    if (creditScore >= 800) {
      creditHistory = 'Excellent';
    } else if (creditScore >= 750) {
      creditHistory = 'Good';
    } else if (creditScore >= 700) {
      creditHistory = 'Fair';
    } else {
      creditHistory = 'Poor';
    }

    res.json({
      success: true,
      data: {
        pan: req.params.pan.toUpperCase(),
        creditScore,
        creditHistory,
        bureauName,
        lastUpdated: new Date().toISOString(),
        factors: {
          paymentHistory: creditScore >= 750 ? 'Excellent' : 'Good',
          creditUtilization: creditScore >= 750 ? 'Low' : 'Moderate',
          creditAge: `${Math.floor(Math.random() * 10) + 3} years`,
          totalAccounts: Math.floor(Math.random() * 8) + 2,
          hardInquiries: Math.floor(Math.random() * 3)
        }
      }
    });
  } catch (error) {
    console.error('Credit bureau error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching credit score'
    });
  }
});

// @route   GET /api/credit/customer/me
// @desc    Get current customer credit score
// @access  Private
router.get('/customer/me', authMiddleware, async (req, res) => {
  try {
    await delay(500);

    const customer = req.customer;
    const creditScore = customer.creditScore;

    let creditHistory = 'Good';
    if (creditScore >= 800) {
      creditHistory = 'Excellent';
    } else if (creditScore >= 750) {
      creditHistory = 'Good';
    } else if (creditScore >= 700) {
      creditHistory = 'Fair';
    } else {
      creditHistory = 'Poor';
    }

    res.json({
      success: true,
      data: {
        pan: customer.pan,
        creditScore,
        creditHistory,
        bureauName: 'CIBIL',
        lastUpdated: new Date().toISOString(),
        factors: {
          paymentHistory: creditScore >= 750 ? 'Excellent' : 'Good',
          creditUtilization: creditScore >= 750 ? 'Low' : 'Moderate',
          creditAge: `${Math.floor(Math.random() * 10) + 3} years`,
          totalAccounts: Math.floor(Math.random() * 8) + 2,
          hardInquiries: Math.floor(Math.random() * 3)
        }
      }
    });
  } catch (error) {
    console.error('Credit bureau error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching credit score'
    });
  }
});

module.exports = router;
