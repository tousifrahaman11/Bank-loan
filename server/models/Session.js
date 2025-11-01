const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  stage: {
    type: String,
    enum: ['conversation', 'verification', 'credit', 'approval', 'sanction'],
    default: 'conversation'
  },
  loanAmount: {
    type: Number,
    min: 10000,
    max: 1000000
  },
  tenure: {
    type: Number,
    min: 12,
    max: 60
  },
  emi: {
    type: Number
  },
  interestRate: {
    type: Number,
    default: 13.0
  },
  purpose: {
    type: String,
    enum: ['Education', 'Medical', 'Business', 'Home Renovation', 'Wedding', 'Travel', 'Other']
  },
  status: {
    type: String,
    enum: ['active', 'approved', 'rejected', 'pending_documents', 'completed'],
    default: 'active'
  },
  chatHistory: [{
    sender: {
      type: String,
      enum: ['user', 'bot']
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: mongoose.Schema.Types.Mixed
  }],
  documents: [{
    type: {
      type: String,
      enum: ['salary_slip', 'pan', 'aadhaar', 'bank_statement']
    },
    filename: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    verified: {
      type: Boolean,
      default: false
    }
  }],
  sanctionLetter: {
    generated: {
      type: Boolean,
      default: false
    },
    generatedAt: Date,
    pdfUrl: String
  },
  eligibilityTier: {
    type: String,
    enum: ['pre_approved', 'salary_slip_required', 'rejected']
  },
  rejectionReason: String,
  fallbackOffer: {
    amount: Number,
    rate: Number
  }
}, {
  timestamps: true
});

// Index for faster queries
sessionSchema.index({ customerId: 1, status: 1 });
sessionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Session', sessionSchema);
