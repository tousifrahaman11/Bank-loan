import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaMoon, FaSun, FaComments, FaInfoCircle } from 'react-icons/fa';
import ChatbotInterface from '../components/ChatbotInterface';
import { logout } from '../redux/slices/authSlice';
import { setChatOpen, toggleDarkMode, setPostLoginAction } from '../redux/slices/uiSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { chatOpen, darkMode, postLoginAction } = useSelector((state) => state.ui);

  useEffect(() => {
    // If user arrived here right after login from Start Chat, auto-open chatbot
    if (postLoginAction === 'openChat') {
      dispatch(setChatOpen(true));
      dispatch(setPostLoginAction(null));
    }
  }, [postLoginAction, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-tata rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">TATA CAPITAL</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Personal Loans</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </span>
            
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="gradient-text">Your Loan Dashboard</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
            Choose an option to get started with your personal loan application
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Start Chat Card */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(74, 0, 224, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Start Chat clicked! Opening chatbot...');
                dispatch(setChatOpen(true));
              }}
              className="bg-gradient-tata p-8 rounded-2xl shadow-xl cursor-pointer text-white"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <FaComments className="text-5xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Start Loan Chat</h2>
              <p className="text-center opacity-90 mb-6">
                Chat with our AI assistant to apply for a personal loan. Get instant approval and personalized offers!
              </p>
              <div className="flex justify-center">
                <span className="px-6 py-3 bg-white text-primary rounded-lg font-semibold">
                  Start Chat Now 💬
                </span>
              </div>
            </motion.div>

            {/* Loan Info Card */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 200, 81, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/loan-info')}
              className="bg-gradient-green p-8 rounded-2xl shadow-xl cursor-pointer text-white"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="text-5xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Loan Information</h2>
              <p className="text-center opacity-90 mb-6">
                View detailed information about our loan products, interest rates, EMI calculator, and more.
              </p>
              <div className="flex justify-center">
                <span className="px-6 py-3 bg-white text-secondary rounded-lg font-semibold">
                  View Details 📊
                </span>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          {user?.preApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 gradient-text">🎉 Great News!</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  You are pre-approved for a loan of
                </p>
                <p className="text-5xl font-bold text-primary mb-4">
                  ₹{user.preApprovedAmount?.toLocaleString('en-IN')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start your application now to get instant approval!
                </p>
                <button
                  onClick={() => dispatch(setChatOpen(true))}
                  className="px-8 py-4 bg-gradient-tata text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all pulse-glow"
                >
                  Apply Now - Get Instant Approval! ⚡
                </button>
              </div>
            </motion.div>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { emoji: '✅', text: 'Zero Fees' },
              { emoji: '⚡', text: '30-Min Approval' },
              { emoji: '🔒', text: 'Secure Process' },
              { emoji: '🏆', text: 'Tata Trust' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Chatbot */}
      {chatOpen && <ChatbotInterface />}
      
      {/* Debug: Show chatOpen state */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded text-xs">
          chatOpen: {chatOpen ? 'true' : 'false'}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
