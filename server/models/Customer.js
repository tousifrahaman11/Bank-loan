const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    min: 18,
    max: 70
  },
  city: {
    type: String,
    trim: true
  },
  salary: {
    type: Number,
    min: 0
  },
  preApproved: {
    type: Boolean,
    default: false
  },
  preApprovedAmount: {
    type: Number,
    default: 0
  },
  creditScore: {
    type: Number,
    min: 300,
    max: 900,
    default: 750
  },
  purpose: {
    type: String,
    enum: ['Education', 'Medical', 'Business', 'Home Renovation', 'Wedding', 'Travel', 'Other'],
    default: 'Other'
  },
  pan: {
    type: String,
    uppercase: true,
    trim: true
  },
  aadhaar: {
    type: String,
    trim: true
  },
  bankAccount: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
customerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
customerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get safe customer data (without password)
customerSchema.methods.toSafeObject = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('Customer', customerSchema);
