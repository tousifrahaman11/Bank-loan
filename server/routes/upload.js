const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth');

// Configure multer for file upload (memory storage for demo)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept PDF, DOC, DOCX, JPG, PNG
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// @route   POST /api/upload/salary-slip
// @desc    Upload and validate salary slip
// @access  Private
router.post('/salary-slip', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { salary, emi } = req.body;

    // Simulate validation
    const salaryAmount = parseFloat(salary);
    const emiAmount = parseFloat(emi);

    // Check if EMI is <= 50% of salary
    const emiToSalaryRatio = (emiAmount / salaryAmount) * 100;

    if (emiToSalaryRatio > 50) {
      return res.status(400).json({
        success: false,
        message: `EMI (₹${emiAmount}) exceeds 50% of your salary (₹${salaryAmount}). Please reduce loan amount or increase tenure.`,
        data: {
          emiToSalaryRatio: emiToSalaryRatio.toFixed(2),
          maxAllowedEmi: Math.floor(salaryAmount * 0.5),
          currentEmi: emiAmount
        }
      });
    }

    // Simulate document verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: 'Salary slip verified successfully! ✅',
      data: {
        filename: req.file.originalname,
        size: req.file.size,
        uploadedAt: new Date(),
        verified: true,
        emiToSalaryRatio: emiToSalaryRatio.toFixed(2),
        status: 'approved'
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds 5MB limit'
        });
      }
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading file'
    });
  }
});

// @route   POST /api/upload/document
// @desc    Upload general document
// @access  Private
router.post('/document', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { documentType } = req.body;

    // Simulate document verification
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({
      success: true,
      message: 'Document uploaded successfully!',
      data: {
        filename: req.file.originalname,
        size: req.file.size,
        type: documentType || 'general',
        uploadedAt: new Date(),
        verified: true
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds 5MB limit'
        });
      }
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading file'
    });
  }
});

module.exports = router;
