import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authAPI } from '../utils/api';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { setModalOpen, setLoading } from '../redux/slices/uiSlice';

const LoginModal = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onClose = () => {
    dispatch(setModalOpen(null));
    reset();
  };

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());
      dispatch(setLoading(true));

      let response;
      if (isLogin) {
        response = await authAPI.login(data);
        const successMsg = response.data.message || 'Login successful! 🎉';
        toast.success(successMsg);
      } else {
        response = await authAPI.register(data);
        const successMsg = response.data.message || 'Registration successful! Welcome! 🎉';
        toast.success(successMsg);
      }

      dispatch(loginSuccess(response.data));
      
      // Small delay before closing to show success message
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      dispatch(loginFailure(message));
      
      // If email exists error during signup, auto-switch to login
      if (!isLogin && (message.includes('already exists') || message.includes('Customer already exists'))) {
        toast.error('Email already registered!');
        setTimeout(() => {
          toast.success('Switching to login... 🔄');
          setIsLogin(true);
        }, 1000);
      } else {
        toast.error(message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 modal-content"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="text-gray-600 dark:text-gray-400" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-tata rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Tata Capital'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? 'Login to continue your loan application' : 'Create an account to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    {...register('name', { required: !isLogin })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register('email', { 
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Valid email is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-tata text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all btn-hover"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
              <strong>Demo Mode:</strong> Use any email/password to login instantly!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;
