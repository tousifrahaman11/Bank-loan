const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/session/create
// @desc    Create new loan session
// @access  Private
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const session = new Session({
      customerId: req.customerId,
      stage: 'conversation',
      status: 'active'
    });

    await session.save();

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating session'
    });
  }
});

// @route   GET /api/session/active
// @desc    Get active session for customer
// @access  Private
router.get('/active', authMiddleware, async (req, res) => {
  try {
    let session = await Session.findOne({
      customerId: req.customerId,
      status: { $in: ['active', 'pending_documents'] }
    }).sort({ createdAt: -1 });

    if (!session) {
      // Create new session if none exists
      session = new Session({
        customerId: req.customerId,
        stage: 'conversation',
        status: 'active'
      });
      await session.save();
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Get active session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching session'
    });
  }
});

// @route   PUT /api/session/:id
// @desc    Update session
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      customerId: req.customerId
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Update allowed fields
    const allowedUpdates = ['stage', 'loanAmount', 'tenure', 'emi', 'interestRate', 'purpose', 'status', 'eligibilityTier', 'rejectionReason', 'fallbackOffer'];
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        session[key] = req.body[key];
      }
    });

    await session.save();

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating session'
    });
  }
});

// @route   POST /api/session/:id/message
// @desc    Add message to chat history
// @access  Private
router.post('/:id/message', authMiddleware, async (req, res) => {
  try {
    const { sender, message, metadata } = req.body;

    const session = await Session.findOne({
      _id: req.params.id,
      customerId: req.customerId
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    session.chatHistory.push({
      sender,
      message,
      metadata,
      timestamp: new Date()
    });

    await session.save();

    res.json({
      success: true,
      data: session.chatHistory[session.chatHistory.length - 1]
    });
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding message'
    });
  }
});

// @route   GET /api/session/:id/history
// @desc    Get chat history
// @access  Private
router.get('/:id/history', authMiddleware, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      customerId: req.customerId
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      data: session.chatHistory
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching history'
    });
  }
});

// @route   POST /api/session/:id/document
// @desc    Add document to session
// @access  Private
router.post('/:id/document', authMiddleware, async (req, res) => {
  try {
    const { type, filename } = req.body;

    const session = await Session.findOne({
      _id: req.params.id,
      customerId: req.customerId
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    session.documents.push({
      type,
      filename,
      uploadedAt: new Date(),
      verified: false
    });

    await session.save();

    res.json({
      success: true,
      data: session.documents[session.documents.length - 1]
    });
  } catch (error) {
    console.error('Add document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding document'
    });
  }
});

module.exports = router;
