import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaBolt, FaUsers, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from '../components/LoginModal';
import { setModalOpen, toggleDarkMode, setPostLoginAction } from '../redux/slices/uiSlice';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { modalOpen, darkMode } = useSelector((state) => state.ui);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <FaBolt className="text-4xl" />,
      title: '30-Min Approval',
      description: 'Get instant approval in just 30 minutes with our AI-powered system',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Tata Trust',
      description: '150+ years of trust and reliability backed by Tata Group',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'Zero Fees',
      description: 'No processing fees, no hidden charges. What you see is what you get',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: '10L+ Customers',
      description: 'Join millions of satisfied customers who trust Tata Capital',
      color: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
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
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setModalOpen('login'))}
              className="px-6 py-2 bg-gradient-tata text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Login
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Personal Loans</span>
              <br />
              <span className="text-gray-800 dark:text-white">Made Simple</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get instant approval for your personal loan with our <span className="font-bold text-secondary">AI-powered loan assistant</span>. 
              Flexible amounts, competitive rates, and personalized guidance!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(74, 0, 224, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Require login; after success, auto-open chatbot on Dashboard
                  dispatch(setPostLoginAction('openChat'));
                  dispatch(setModalOpen('login'));
                }}
                className="px-8 py-4 bg-gradient-tata text-white rounded-xl font-bold text-lg shadow-xl btn-hover flex items-center space-x-2 pulse-glow"
              >
                <FaRocket />
                <span>Start Chat - Apply Now! 🚀</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  dispatch(setModalOpen('login'));
                }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-primary dark:text-white border-2 border-primary rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Loan Info & Details 📊
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Zero Processing Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>30-Min Approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>100% Digital</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Tata Trust</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Why Choose Tata Capital?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-600"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-tata text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Exclusive Benefits 🎁
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Experience the Tata difference with unmatched benefits
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { emoji: '💰', text: 'Loans up to ₹10 Lakhs' },
                { emoji: '⚡', text: 'Instant disbursal in 24hrs' },
                { emoji: '🎯', text: 'Flexible tenure 12-60 months' },
                { emoji: '🔒', text: 'Secure & confidential' },
                { emoji: '📱', text: '100% paperless process' },
                { emoji: '🏆', text: 'Award-winning service' },
                { emoji: '💳', text: 'No collateral required' },
                { emoji: '🎉', text: 'Special offers for you' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:bg-white/20 transition-all"
                >
                  <div className="text-4xl mb-2">{benefit.emoji}</div>
                  <p className="font-semibold">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started? 🚀
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 10 lakh+ happy customers and experience the Tata difference today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                dispatch(setPostLoginAction('openChat'));
                dispatch(setModalOpen('login'));
              }}
              className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Apply Now - Get Instant Approval! ⚡
            </motion.button>
            <p className="mt-6 text-sm opacity-75">
              * Subject to credit approval. Terms and conditions apply.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tata Capital</h3>
              <p className="text-gray-400">
                Trusted by millions for personal loans with the best rates and fastest approval.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 1800-209-9191</li>
                <li>📧 support@tatacapital.com</li>
                <li>🕐 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tata Capital Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {modalOpen === 'login' && <LoginModal />}
    </div>
  );
};

export default LandingPage;
