import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, User, Lock, AlertCircle, Code } from 'lucide-react';

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError(t('login.error.empty'));
      setLoading(false);
      return;
    }

    // Attempt login
    try {
      const success = await login(username, password);
      
      if (success) {
        // Redirect to home page
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        setError(t('login.error.invalid'));
        setLoading(false);
      }
    } catch (error) {
      setError(t('login.error.invalid'));
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{i18n.language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Welcome Section */}
        <div className="text-center mb-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex items-center justify-center relative"
          >
            {/* Outer glow circle - Lighter version for light theme */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 blur-xl animate-pulse"></div>
            
            {/* Main circle container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-1 shadow-lg border-2 border-purple-100">
              {/* Inner gradient border */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-1">
                {/* Image container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL || '/antigoneGs/'}logo-new.jpg?${new Date().getTime()}`}
                    alt={t('login.institution_name')}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error('Failed to load logo image');
                      const target = e.currentTarget;
                      // Try alternative paths with cache busting
                      const timestamp = `?${new Date().getTime()}`;
                      const baseUrl = import.meta.env.VITE_BASE_URL || '/antigoneGs/';
                      
                      // Try different paths in sequence
                      const tryPaths = [
                        `${baseUrl}logo-new.jpg${timestamp}`,
                        `${baseUrl}logo.jpg${timestamp}`,
                        `/logo-new.jpg${timestamp}`,
                        `/logo.jpg${timestamp}`,
                        `./logo-new.jpg${timestamp}`,
                        `./logo.jpg${timestamp}`,
                      ];
                      
                      let currentIndex = 0;
                      const tryNextPath = () => {
                        if (currentIndex < tryPaths.length) {
                          target.src = tryPaths[currentIndex];
                          currentIndex++;
                          
                          // Check if image loaded successfully after a short delay
                          setTimeout(() => {
                            if (!target.complete || target.naturalWidth === 0) {
                              tryNextPath();
                            }
                          }, 100);
                        } else {
                          // Hide image if all paths fail
                          target.style.display = 'none';
                        }
                      };
                      
                      // Start trying paths
                      tryNextPath();
                    }}
                    onLoad={() => {
                      console.log('Logo image loaded successfully');
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative rings - Lighter version for light theme */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-purple-200"
              style={{ width: 'calc(100% + 8px)', height: 'calc(100% + 8px)', margin: '-4px' }}
            ></motion.div>
          </motion.div>
          
          {/* Institution Name */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3"
          >
            {t('login.institution_name')}
          </motion.h1>
          
          {/* Welcome Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-2"
          >
            {t('login.welcome')}
          </motion.p>
          
          {/* Developer Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4"
          >
            <Code className="w-4 h-4" />
            <span>{t('login.developer')}</span>
          </motion.div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-gray-800 mb-2">
              {t('login.title')}
            </h2>
            <p className="text-gray-600 text-sm">{t('login.subtitle')}</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.username')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder={t('login.username_placeholder')}
                  autoComplete="username"
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder={t('login.password_placeholder')}
                  autoComplete="current-password"
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{t('login.logging_in')}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{t('login.submit')}</span>
                </>
              )}
            </button>
          </form>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm text-center">{t('login.info')}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

