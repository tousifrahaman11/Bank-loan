import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SanctionLetterModal = ({ sessionId, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Client-side minimal PDF generation (no backend required)
      const pdfText = `
%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 200 >> stream
BT /F1 24 Tf 72 740 Td (Tata Capital - Loan Sanction Letter) Tj ET
BT /F1 12 Tf 72 700 Td (Session: ${sessionId || 'MOCK'}) Tj ET
BT /F1 12 Tf 72 680 Td (This is a demo sanction letter generated on the client.) Tj ET
BT /F1 12 Tf 72 660 Td (It contains mock data suitable for testing your flow.) Tj ET
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000061 00000 n 
0000000112 00000 n 
0000000296 00000 n 
0000000586 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
650
%%EOF`;

      const blob = new Blob([pdfText], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Tata_Sanction_Letter_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Sanction letter downloaded successfully! 🎉');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download sanction letter');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="text-gray-600 dark:text-gray-400" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-slow">
              <FaCheckCircle className="text-white text-4xl" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-3">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Your Loan is Approved!
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Your sanction letter is ready for download
            </p>
          </div>

          {/* Document Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-tata rounded-lg flex items-center justify-center flex-shrink-0">
                <FaFileAlt className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white mb-1">
                  Loan Sanction Letter
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Official document from Tata Capital
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PDF Document • Ready to download
                </p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-4 bg-gradient-tata text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FaDownload />
                <span>Download Sanction Letter</span>
              </>
            )}
          </motion.button>

          {/* Next Steps */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
              📋 Next Steps:
            </p>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>✓ Download and save your sanction letter</li>
              <li>✓ Complete e-sign process (link sent to email)</li>
              <li>✓ Loan amount will be disbursed in 24-48 hours</li>
            </ul>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            For queries, contact: support@tatacapital.com
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SanctionLetterModal;
