import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EMICalculator from '../components/EMICalculator';
import { logout } from '../redux/slices/authSlice';
import { toggleDarkMode } from '../redux/slices/uiSlice';

const LoanInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Interest rate comparison data
  const rateComparisonData = [
    { purpose: 'Medical', rate: 12.0, market: 16.0 },
    { purpose: 'Education', rate: 12.5, market: 16.5 },
    { purpose: 'General', rate: 13.0, market: 17.0 },
    { purpose: 'Business', rate: 13.5, market: 17.5 },
    { purpose: 'Wedding', rate: 13.5, market: 18.0 },
    { purpose: 'Travel', rate: 14.0, market: 18.5 }
  ];

  // Loan amount distribution
  const loanDistributionData = [
    { range: '₹10k-₹1L', value: 25 },
    { range: '₹1L-₹3L', value: 35 },
    { range: '₹3L-₹5L', value: 25 },
    { range: '₹5L-₹10L', value: 15 }
  ];

  const COLORS = ['#4A00E0', '#8E2DE2', '#00C851', '#00E676'];

  // Tenure vs Interest savings
  const tenureData = [
    { months: 12, emi: 8884, total: 106608 },
    { months: 24, emi: 4707, total: 112968 },
    { months: 36, emi: 3327, total: 119772 },
    { months: 48, emi: 2634, total: 126432 },
    { months: 60, emi: 2224, total: 133440 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-tata rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">TATA CAPITAL</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Loan Information</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
              {user?.name}
            </span>
            
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
            Personal Loan Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
            Everything you need to know about Tata Capital Personal Loans
          </p>

          {/* Bank Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-tata text-white p-8 rounded-2xl shadow-xl mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-lg opacity-90 mb-2">Bank Name</h3>
                <p className="text-3xl font-bold">Tata Capital</p>
              </div>
              <div>
                <h3 className="text-lg opacity-90 mb-2">Loan Type</h3>
                <p className="text-3xl font-bold">Personal Loan</p>
              </div>
              <div>
                <h3 className="text-lg opacity-90 mb-2">Starting Rate</h3>
                <p className="text-3xl font-bold">12.0% p.a.</p>
              </div>
            </div>
          </motion.div>

          {/* EMI Calculator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">EMI Calculator</h2>
            <EMICalculator />
          </motion.div>

          {/* Interest Rate Comparison Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Interest Rate Comparison</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how Tata Capital rates compare with market average
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rateComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="purpose" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#4A00E0" name="Tata Capital" />
                <Bar dataKey="market" fill="#cccccc" name="Market Average" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Loan Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 gradient-text">Popular Loan Amounts</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={loanDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, value }) => `${range}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loanDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 gradient-text">EMI vs Tenure (₹1L Loan)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tenureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="months" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="emi" stroke="#4A00E0" strokeWidth={2} name="Monthly EMI (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Loan Features Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Loan Features & Benefits</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 text-gray-700 dark:text-gray-300">Feature</th>
                    <th className="text-left py-4 px-4 text-gray-700 dark:text-gray-300">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Loan Amount', detail: '₹10,000 - ₹10,00,000' },
                    { feature: 'Interest Rate', detail: '12.0% - 14.0% p.a.' },
                    { feature: 'Tenure', detail: '12 - 60 months' },
                    { feature: 'Processing Fee', detail: 'Zero (₹0)' },
                    { feature: 'Prepayment Charges', detail: 'Nil after 6 months' },
                    { feature: 'Approval Time', detail: '30 minutes' },
                    { feature: 'Disbursal Time', detail: '24-48 hours' },
                    { feature: 'Documentation', detail: '100% Digital' },
                    { feature: 'Collateral', detail: 'Not Required' },
                    { feature: 'Credit Score', detail: 'Minimum 650' }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-4 font-semibold text-gray-800 dark:text-gray-200">{row.feature}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Eligibility Criteria */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-green text-white p-8 rounded-2xl shadow-xl mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Eligibility Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">✓ Basic Requirements</h3>
                <ul className="space-y-2 opacity-90">
                  <li>• Age: 21 - 60 years</li>
                  <li>• Minimum Salary: ₹25,000/month</li>
                  <li>• Employment: Salaried or Self-employed</li>
                  <li>• Credit Score: 650+</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">✓ Documents Required</h3>
                <ul className="space-y-2 opacity-90">
                  <li>• PAN Card</li>
                  <li>• Aadhaar Card</li>
                  <li>• Salary Slips (Last 3 months)</li>
                  <li>• Bank Statements (Last 6 months)</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get instant approval and disbursal in 24 hours!
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              Start Application Now 🚀
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoanInfo;
