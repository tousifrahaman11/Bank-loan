import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(13.0);
  const [tenure, setTenure] = useState(24);
  const [salary, setSalary] = useState(50000);

  // Calculate EMI
  const calculateEMI = () => {
    const P = principal;
    const r = rate / 12 / 100;
    const n = tenure;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;
  const emiToSalaryRatio = (emi / salary) * 100;

  const chartData = [
    { name: 'Principal', value: principal, color: '#4A00E0' },
    { name: 'Interest', value: totalInterest, color: '#00C851' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Loan Amount: ₹{principal.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={principal}
              onChange={(e) => setPrincipal(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹10k</span>
              <span>₹10L</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate: {rate}% p.a.
            </label>
            <input
              type="range"
              min="10"
              max="20"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>20%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tenure: {tenure} months
            </label>
            <input
              type="range"
              min="12"
              max="60"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>12 months</span>
              <span>60 months</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Monthly Salary: ₹{salary.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min="20000"
              max="200000"
              step="5000"
              value={salary}
              onChange={(e) => setSalary(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹20k</span>
              <span>₹2L</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* EMI Display */}
          <motion.div
            key={emi}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-tata text-white p-6 rounded-xl text-center"
          >
            <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
            <p className="text-5xl font-bold mb-2">₹{emi.toLocaleString('en-IN')}</p>
            <p className="text-sm opacity-75">for {tenure} months</p>
          </motion.div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Principal Amount</p>
              <p className="text-xl font-bold text-primary">₹{principal.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-secondary">₹{totalInterest.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-blue-600">₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">EMI/Salary Ratio</p>
              <p className="text-xl font-bold text-orange-600">{emiToSalaryRatio.toFixed(1)}%</p>
            </div>
          </div>

          {/* Affordability Check */}
          <div className={`p-4 rounded-lg ${emiToSalaryRatio <= 50 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <p className={`text-sm font-semibold ${emiToSalaryRatio <= 50 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
              {emiToSalaryRatio <= 50 
                ? '✅ Affordable! EMI is within recommended limit (50% of salary)'
                : '⚠️ EMI exceeds 50% of salary. Consider reducing loan amount or increasing tenure.'}
            </p>
          </div>

          {/* Pie Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
