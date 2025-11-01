import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUpload, FaFile } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DocumentUpload = ({ onAllUploaded, applicantName }) => {
  const [uploads, setUploads] = useState({
    pan: null,
    aadhaar: null,
    salarySlip: null,
    bankStatement: null
  });

  const documents = [
    { key: 'pan', label: 'PAN Card', icon: '📄' },
    { key: 'aadhaar', label: 'Aadhaar Card', icon: '🆔' },
    { key: 'salarySlip', label: 'Salary Slips (Last 3 months)', icon: '💰' },
    { key: 'bankStatement', label: 'Bank Statements (Last 6 months)', icon: '🏦' }
  ];

  const handleFileSelect = (docType, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload PDF, JPG, or PNG files only');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setUploads(prev => ({ ...prev, [docType]: file }));
      toast.success(`${documents.find(d => d.key === docType).label} uploaded successfully!`);

      // Check if all documents are uploaded
      const newUploads = { ...uploads, [docType]: file };
      const allUploaded = Object.values(newUploads).every(file => file !== null);
      
      if (allUploaded) {
        setTimeout(() => {
          onAllUploaded(newUploads);
        }, 500);
      }
    }
  };

  const allUploaded = Object.values(uploads).every(file => file !== null);

  return (
    <div className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-3">
        📤 Upload Required Documents
      </h3>
      
      {documents.map((doc) => (
        <motion.div
          key={doc.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-600 rounded-lg p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{doc.icon}</span>
              <div>
                <p className="font-medium text-gray-800 dark:text-white text-sm">
                  {doc.label}
                </p>
                {uploads[doc.key] && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <FaFile className="text-xs" />
                    {uploads[doc.key].name}
                  </p>
                )}
              </div>
            </div>
            
            {uploads[doc.key] ? (
              <FaCheckCircle className="text-green-500 text-xl" />
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect(doc.key, e)}
                  className="hidden"
                />
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
                  <FaUpload className="text-xs" />
                  Upload
                </div>
              </label>
            )}
          </div>
        </motion.div>
      ))}

      {allUploaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded-lg p-3 text-center"
        >
          <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
          <p className="text-green-700 dark:text-green-300 font-semibold">
            ✅ All documents uploaded successfully!
          </p>
          <p className="text-green-600 dark:text-green-400 text-sm mt-1">
            Processing your documents...
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentUpload;
