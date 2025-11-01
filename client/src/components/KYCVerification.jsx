import { motion } from 'framer-motion';
import { FaCheckCircle, FaIdCard, FaCreditCard, FaUniversity } from 'react-icons/fa';

const KYCVerification = ({ data }) => {
  if (!data) return null;

  const maskAadhaar = (aadhaar) => {
    if (!aadhaar) return 'XXXX XXXX XXXX';
    const parts = aadhaar.split(' ');
    return `XXXX XXXX ${parts[parts.length - 1]}`;
  };

  const maskPAN = (pan) => {
    if (!pan) return 'XXXXX0000X';
    return `${pan.substring(0, 3)}XX${pan.substring(5)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <FaCheckCircle className="text-white text-3xl" />
        </div>
      </div>

      <div className="space-y-3">
        {/* Name */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex items-center space-x-3">
          <FaIdCard className="text-primary text-xl" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
            <p className="font-semibold text-gray-800 dark:text-white">{data.name}</p>
          </div>
        </div>

        {/* PAN */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex items-center space-x-3">
          <FaCreditCard className="text-primary text-xl" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">PAN Card</p>
            <p className="font-semibold text-gray-800 dark:text-white font-mono">{maskPAN(data.pan)}</p>
          </div>
          <span className="text-green-500 text-sm">✓ Verified</span>
        </div>

        {/* Aadhaar */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex items-center space-x-3">
          <FaIdCard className="text-primary text-xl" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Aadhaar Number</p>
            <p className="font-semibold text-gray-800 dark:text-white font-mono">{maskAadhaar(data.aadhaar)}</p>
          </div>
          <span className="text-green-500 text-sm">✓ Verified</span>
        </div>

        {/* Bank Account */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex items-center space-x-3">
          <FaUniversity className="text-primary text-xl" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Bank Account</p>
            <p className="font-semibold text-gray-800 dark:text-white font-mono">{data.bankAccount}</p>
          </div>
          <span className="text-green-500 text-sm">✓ Verified</span>
        </div>

        {/* City */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg flex items-center space-x-3">
          <div className="text-primary text-xl">📍</div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
            <p className="font-semibold text-gray-800 dark:text-white">{data.city}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
          ✅ All KYC details verified successfully!
        </p>
      </div>
    </motion.div>
  );
};

export default KYCVerification;
