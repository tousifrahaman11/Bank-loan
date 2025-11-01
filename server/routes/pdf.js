const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Session = require('../models/Session');
const Customer = require('../models/Customer');
const authMiddleware = require('../middleware/auth');

// Tata Capital Logo (Base64 - simplified version)
const TATA_LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// @route   POST /api/pdf/generate-sanction
// @desc    Generate sanction letter PDF
// @access  Private
router.post('/generate-sanction', authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findOne({
      _id: sessionId,
      customerId: req.customerId
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    const customer = await Customer.findById(req.customerId);

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Tata_Sanction_Letter_${customer.name.replace(/\s+/g, '_')}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Header
    doc.fontSize(20)
       .fillColor('#4A00E0')
       .text('TATA CAPITAL', { align: 'center' })
       .moveDown(0.5);

    doc.fontSize(16)
       .fillColor('#000000')
       .text('LOAN SANCTION LETTER', { align: 'center' })
       .moveDown(1);

    // Date
    doc.fontSize(10)
       .text(`Date: ${new Date().toLocaleDateString('en-IN')}`, { align: 'right' })
       .moveDown(1);

    // Customer Details
    doc.fontSize(12)
       .text(`Dear ${customer.name},`, { align: 'left' })
       .moveDown(0.5);

    doc.fontSize(10)
       .text('We are pleased to inform you that your personal loan application has been approved! 🎉', { align: 'left' })
       .moveDown(1);

    // Loan Details Box
    doc.rect(50, doc.y, 495, 200)
       .stroke('#4A00E0');

    const boxStartY = doc.y + 10;
    doc.fontSize(14)
       .fillColor('#4A00E0')
       .text('LOAN DETAILS', 60, boxStartY, { align: 'left' })
       .moveDown(1);

    doc.fontSize(11)
       .fillColor('#000000');

    const detailsY = doc.y;
    const leftCol = 60;
    const rightCol = 320;

    // Left column
    doc.text('Applicant Name:', leftCol, detailsY);
    doc.text('Loan Amount:', leftCol, detailsY + 25);
    doc.text('Interest Rate:', leftCol, detailsY + 50);
    doc.text('Tenure:', leftCol, detailsY + 75);
    doc.text('Monthly EMI:', leftCol, detailsY + 100);
    doc.text('Purpose:', leftCol, detailsY + 125);

    // Right column (values)
    doc.fontSize(11)
       .fillColor('#4A00E0');
    doc.text(customer.name, rightCol, detailsY);
    doc.text(`₹${session.loanAmount?.toLocaleString('en-IN') || 'N/A'}`, rightCol, detailsY + 25);
    doc.text(`${session.interestRate || 13.0}% p.a.`, rightCol, detailsY + 50);
    doc.text(`${session.tenure || 'N/A'} months`, rightCol, detailsY + 75);
    doc.text(`₹${session.emi?.toLocaleString('en-IN') || 'N/A'}`, rightCol, detailsY + 100);
    doc.text(session.purpose || 'Personal', rightCol, detailsY + 125);

    doc.moveDown(10);

    // Terms & Conditions
    doc.fontSize(12)
       .fillColor('#4A00E0')
       .text('TERMS & CONDITIONS', { align: 'left' })
       .moveDown(0.5);

    doc.fontSize(9)
       .fillColor('#000000')
       .text('1. The loan is subject to verification of documents and credit assessment.', { align: 'left' })
       .text('2. Zero processing fees applicable for this loan.', { align: 'left' })
       .text('3. Prepayment allowed after 6 months with no charges.', { align: 'left' })
       .text('4. EMI auto-debit from registered bank account.', { align: 'left' })
       .text('5. Loan disbursal within 24-48 hours of document verification.', { align: 'left' })
       .moveDown(1);

    // Benefits
    doc.fontSize(12)
       .fillColor('#00C851')
       .text('✅ YOUR BENEFITS', { align: 'left' })
       .moveDown(0.5);

    doc.fontSize(9)
       .fillColor('#000000')
       .text('• Zero processing fees - Save ₹' + Math.floor(session.loanAmount * 0.02), { align: 'left' })
       .text('• Flexible repayment options', { align: 'left' })
       .text('• 24/7 customer support', { align: 'left' })
       .text('• Backed by Tata trust - 150+ years of excellence', { align: 'left' })
       .moveDown(2);

    // Footer
    doc.fontSize(10)
       .fillColor('#4A00E0')
       .text('Next Steps:', { align: 'left' })
       .fontSize(9)
       .fillColor('#000000')
       .text('1. Submit required documents (if any)', { align: 'left' })
       .text('2. Complete e-sign process', { align: 'left' })
       .text('3. Loan amount will be disbursed to your registered bank account', { align: 'left' })
       .moveDown(2);

    doc.fontSize(8)
       .fillColor('#666666')
       .text('For queries, contact us at support@tatacapital.com or call 1800-209-9191', { align: 'center' })
       .moveDown(0.5);

    doc.fontSize(8)
       .text('This is a system-generated letter and does not require a signature.', { align: 'center' })
       .moveDown(0.5);

    doc.fontSize(7)
       .text('Tata Capital Limited | Registered Office: 11th Floor, Tower A, Peninsula Business Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai - 400013', { align: 'center' });

    // Finalize PDF
    doc.end();

    // Update session
    session.sanctionLetter = {
      generated: true,
      generatedAt: new Date()
    };
    await session.save();

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating PDF'
    });
  }
});

module.exports = router;
