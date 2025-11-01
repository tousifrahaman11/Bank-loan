import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const LoanInputs = ({ onSubmit }) => {
  const { interestRate } = useSelector((state) => state.loan);
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(24);
  const [purpose, setPurpose] = useState('Other');
  const [salary, setSalary] = useState(50000);

  const purposes = ['Education', 'Medical', 'Business', 'Home Renovation', 'Wedding', 'Travel', 'Other'];

  // Calculate EMI preview
  const calculatePreviewEMI = () => {
    const P = amount;
    const r = interestRate / 12 / 100;
    const n = tenure;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleSubmit = () => {
    onSubmit({ amount, tenure, purpose, salary });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
    >
      {/* Purpose */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Loan Purpose 🎯
        </label>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
        >
          {purposes.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Amount Slider */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Loan Amount: ₹{amount.toLocaleString('en-IN')} 💰
        </label>
        <input
          type="range"
          min="10000"
          max="1000000"
          step="10000"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹10k</span>
          <span>₹10L</span>
        </div>
      </div>

      {/* Tenure Slider */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tenure: {tenure} months ⏱️
        </label>
        <input
          type="range"
          min="12"
          max="60"
          step="6"
          value={tenure}
          onChange={(e) => setTenure(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>12 months</span>
          <span>60 months</span>
        </div>
      </div>

      {/* Salary */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Monthly Salary: ₹{salary.toLocaleString('en-IN')} 💵
        </label>
        <input
          type="range"
          min="20000"
          max="200000"
          step="5000"
          value={salary}
          onChange={(e) => setSalary(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹20k</span>
          <span>₹2L</span>
        </div>
      </div>

      {/* EMI Preview */}
      <div className="bg-gradient-tata text-white p-4 rounded-lg text-center">
        <p className="text-sm opacity-90 mb-1">Estimated Monthly EMI</p>
        <p className="text-3xl font-bold">₹{calculatePreviewEMI().toLocaleString('en-IN')}</p>
        <p className="text-xs opacity-75 mt-1">@ {interestRate}% p.a.</p>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full py-3 bg-secondary text-white rounded-lg font-bold hover:shadow-lg transition-all"
      >
        Continue ➡️
      </motion.button>
    </motion.div>
  );
};

export default LoanInputs;
