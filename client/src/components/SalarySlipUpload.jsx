import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { uploadAPI } from '../utils/api';

const SalarySlipUpload = ({ onSuccess, salary, emi }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Invalid file type. Please upload PDF, JPG, or PNG');
      return;
    }

    // Validate file size (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('salary', salary);
      formData.append('emi', emi);

      const response = await uploadAPI.uploadSalarySlip(formData);

      if (response.data.success) {
        toast.success('Salary slip verified successfully! ✅');
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Upload failed. Please try again.';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          Upload Salary Slip 📄
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please upload your latest salary slip for verification
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? 'border-primary bg-purple-50 dark:bg-purple-900/20'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
        />

        {!file ? (
          <div>
            <FaUpload className="text-5xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Drag & drop your file here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Supported: PDF, JPG, PNG (Max 5MB)
            </p>
          </div>
        ) : (
          <div>
            <FaFileAlt className="text-5xl text-primary mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {file.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {(file.size / 1024).toFixed(2)} KB
            </p>
            <button
              onClick={() => setFile(null)}
              className="text-sm text-red-500 hover:text-red-600 underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Validation Info */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Validation:</strong> EMI (₹{emi.toLocaleString('en-IN')}) should be ≤ 50% of salary (₹{salary.toLocaleString('en-IN')})
        </p>
      </div>

      {/* Upload Button */}
      {file && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleUpload}
          disabled={uploading}
          className="w-full mt-4 py-3 bg-gradient-tata text-white rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {uploading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span>Upload & Verify</span>
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default SalarySlipUpload;
