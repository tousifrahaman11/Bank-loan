const express = require('express');
const router = express.Router();

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Purpose-based interest rates
const interestRates = {
  'Education': 12.5,
  'Medical': 12.0,
  'Business': 13.5,
  'Home Renovation': 13.0,
  'Wedding': 13.5,
  'Travel': 14.0,
  'Other': 13.0
};

// @route   GET /api/offers
// @desc    Get all loan offers (Mock Offer Server)
// @access  Public
router.get('/', async (req, res) => {
  try {
    await delay(500);

    const offers = [
      {
        id: 1,
        name: 'Personal Loan - Education',
        purpose: 'Education',
        minAmount: 50000,
        maxAmount: 1000000,
        interestRate: 12.5,
        tenure: '12-60 months',
        features: [
          'Zero processing fees',
          'Flexible repayment',
          'Quick approval in 30 minutes',
          'No collateral required'
        ],
        eligibility: {
          minAge: 21,
          maxAge: 60,
          minSalary: 25000,
          minCreditScore: 700
        }
      },
      {
        id: 2,
        name: 'Personal Loan - Medical',
        purpose: 'Medical',
        minAmount: 25000,
        maxAmount: 500000,
        interestRate: 12.0,
        tenure: '12-48 months',
        features: [
          'Lowest interest rate',
          'Emergency approval',
          'Instant disbursal',
          'Tata trust & reliability'
        ],
        eligibility: {
          minAge: 21,
          maxAge: 65,
          minSalary: 20000,
          minCreditScore: 650
        }
      },
      {
        id: 3,
        name: 'Personal Loan - General',
        purpose: 'Other',
        minAmount: 10000,
        maxAmount: 1000000,
        interestRate: 13.0,
        tenure: '12-60 months',
        features: [
          'No end-use restriction',
          'Competitive rates',
          'Digital process',
          '10L+ happy customers'
        ],
        eligibility: {
          minAge: 21,
          maxAge: 60,
          minSalary: 30000,
          minCreditScore: 700
        }
      }
    ];

    res.json({
      success: true,
      data: offers,
      benefits: [
        '✅ Zero processing fees',
        '⚡ 30-minute approval',
        '🏆 Tata trust - 150+ years',
        '💰 Competitive interest rates',
        '📱 100% digital process',
        '🔒 Secure & confidential',
        '👥 10L+ satisfied customers',
        '🎯 Flexible tenure options'
      ]
    });
  } catch (error) {
    console.error('Offers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching offers'
    });
  }
});

// @route   GET /api/offers/rate/:purpose
// @desc    Get interest rate for specific purpose
// @access  Public
router.get('/rate/:purpose', async (req, res) => {
  try {
    const purpose = req.params.purpose;
    const rate = interestRates[purpose] || interestRates['Other'];

    res.json({
      success: true,
      data: {
        purpose,
        interestRate: rate,
        comparison: {
          marketAverage: 16.0,
          savings: `Save ₹${Math.floor((16.0 - rate) * 1000)} per lakh per year`
        }
      }
    });
  } catch (error) {
    console.error('Rate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rate'
    });
  }
});

// @route   POST /api/offers/calculate-emi
// @desc    Calculate EMI
// @access  Public
router.post('/calculate-emi', async (req, res) => {
  try {
    const { principal, rate, tenure } = req.body;

    if (!principal || !rate || !tenure) {
      return res.status(400).json({
        success: false,
        message: 'Principal, rate, and tenure are required'
      });
    }

    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly rate
    const n = parseInt(tenure); // Tenure in months

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    res.json({
      success: true,
      data: {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: P,
        interestRate: parseFloat(rate),
        tenure: n,
        breakdown: {
          monthlyEmi: Math.round(emi),
          principalComponent: Math.round(P / n),
          interestComponent: Math.round(totalInterest / n)
        }
      }
    });
  } catch (error) {
    console.error('EMI calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating EMI'
    });
  }
});

module.exports = router;
