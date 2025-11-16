import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, BookOpen, Lightbulb, Quote, FileText, Theater, PenSquare, Ear, GraduationCap, Timer, Scale, BookMarked, Network, HelpCircle, FileCheck, BarChart3, StickyNote, Search, Zap, Bookmark, Info, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm(t('logout.confirm'))) {
      logout();
      navigate('/login', { replace: true });
    }
  };

  const navItems = [
    { to: '/', label: t('navigation.home'), icon: Home },
    { to: '/search', label: t('navigation.search'), icon: Search },
    { to: '/quick-review', label: t('navigation.quick_review'), icon: Zap },
    { to: '/progress', label: t('navigation.progress'), icon: BarChart3 },
    { to: '/personnages', label: t('navigation.characters'), icon: Users },
    { to: '/oeuvre', label: t('navigation.oeuvre'), icon: BookOpen },
    { to: '/themes', label: t('navigation.themes'), icon: Lightbulb },
    { to: '/citations', label: t('navigation.quotes'), icon: Quote },
    { to: '/fiche', label: t('navigation.fiche'), icon: FileText },
    { to: '/comparison', label: t('navigation.comparison'), icon: Scale },
    { to: '/glossary', label: t('navigation.glossary'), icon: BookMarked },
    { to: '/mindmaps', label: t('navigation.mindmaps'), icon: Network },
    { to: '/howto', label: t('navigation.howto'), icon: HelpCircle },
    { to: '/sample-answers', label: t('navigation.sample_answers'), icon: FileCheck },
    { to: '/quiz', label: t('navigation.quiz_rapide'), icon: Timer },
    { to: '/notes', label: t('navigation.notes'), icon: StickyNote },
    { to: '/bookmarks', label: t('navigation.bookmarks'), icon: Bookmark },
    { to: '/ecrits', label: t('navigation.ecrits'), icon: PenSquare },
    { to: '/audio', label: t('navigation.audio'), icon: Ear },
    { to: '/examen', label: t('navigation.examen'), icon: GraduationCap },
    { to: '/about', label: t('navigation.about'), icon: Info },
  ];

  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md shadow-lg shadow-black/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          <div className="w-1/3 md:w-1/3 flex items-center">
            {/* Mobile hamburger */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:bg-slate-800"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            {/* Developer credit - hidden on mobile, shown on desktop */}
            {/* In RTL (Arabic), justify-start puts content on the right. In LTR (French), it puts it on the left */}
            <p className={`hidden md:block text-xs text-slate-400 ${i18n.language === 'ar' ? 'mr-4' : 'ml-4'}`}>
              {t('app.developer')}
            </p>
          </div>
          <div className="w-1/3 text-center">
            <div className="flex items-center justify-center gap-3">
              <Theater className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-shadow">
                {t('app.title')}
              </h1>
            </div>
            <p className="text-center text-sm md:text-md text-slate-400 mt-1">
              {t('app.subtitle')}
            </p>
          </div>
          <div className="w-1/3 flex justify-end items-center gap-3">
            {user && (
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                <User className="w-4 h-4" />
                <span>{i18n.language === 'ar' ? user.name : user.nameFr}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
              title={t('logout.title')}
            >
              <LogOut className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Desktop nav */}
        <nav className="hidden md:block border-t border-purple-500/20">
          <div className="flex flex-wrap justify-start items-center gap-2 md:gap-4 py-3 pl-2 md:pl-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `relative flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? 'text-purple-300'
                        : 'text-slate-400 hover:text-purple-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Mobile sliding menu */}
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-purple-500/10 bg-slate-900/90 backdrop-blur-sm z-60"
          >
            <div className="flex flex-col py-4 px-4 gap-2 max-h-[60vh] overflow-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-md transition-colors duration-200 text-lg ${
                        isActive ? 'text-purple-300' : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
