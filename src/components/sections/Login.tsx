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
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400">{i18n.language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
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
            {/* Outer glow circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-xl animate-pulse"></div>
            
            {/* Main circle container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-1 shadow-2xl border-2 border-purple-500/50">
              {/* Inner gradient border */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20 p-1">
                {/* Image container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                  <img
                    src="/logo.jpg"
                    alt={t('login.institution_name')}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error('Failed to load logo image from /logo.jpg');
                      const target = e.currentTarget;
                      // Try alternative paths
                      if (target.src.includes('/logo.jpg')) {
                        target.src = './logo.jpg';
                      } else if (target.src.includes('./logo.jpg')) {
                        target.src = 'logo.jpg';
                      } else {
                        // Hide image if all paths fail
                        target.style.display = 'none';
                      }
                    }}
                    onLoad={() => {
                      console.log('Logo image loaded successfully');
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-purple-500/20"
              style={{ width: 'calc(100% + 8px)', height: 'calc(100% + 8px)', margin: '-4px' }}
            ></motion.div>
          </motion.div>
          
          {/* Institution Name */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3"
          >
            {t('login.institution_name')}
          </motion.h1>
          
          {/* Welcome Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 mb-2"
          >
            {t('login.welcome')}
          </motion.p>
          
          {/* Developer Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-slate-400 mt-4"
          >
            <Code className="w-4 h-4" />
            <span>{t('login.developer')}</span>
          </motion.div>
        </div>

        {/* Login Form Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 shadow-2xl">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              {t('login.title')}
            </h2>
            <p className="text-slate-400 text-sm">{t('login.subtitle')}</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                {t('login.username')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border ${
                    error ? 'border-red-500/50' : 'border-slate-600'
                  } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent`}
                  placeholder={t('login.username_placeholder')}
                  autoComplete="username"
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border ${
                    error ? 'border-red-500/50' : 'border-slate-600'
                  } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent`}
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
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <p className="text-blue-300 text-sm text-center">{t('login.info')}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

