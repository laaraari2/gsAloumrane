import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { markSectionVisited } from './lib/storage';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/sections/Login';
import Home from './components/sections/Home';
import Search from './components/sections/Search';
import QuickReview from './components/sections/QuickReview';
import Progress from './components/sections/Progress';
import Characters from './components/sections/Characters';
import Oeuvre from './components/sections/Oeuvre';
import Themes from './components/sections/Themes';
import Quotes from './components/sections/Quotes';
import Fiche from './components/sections/Fiche';
import Comparison from './components/sections/Comparison';
import Glossary from './components/sections/Glossary';
import MindMaps from './components/sections/MindMaps';
import HowToAnswer from './components/sections/HowToAnswer';
import SampleAnswers from './components/sections/SampleAnswers';
import Quiz from './components/sections/Quiz';
import Notes from './components/sections/Notes';
import Bookmarks from './components/sections/Bookmarks';
import Ecrits from './components/sections/Ecrits';
import Audio from './components/sections/Audio';
import Examen from './components/sections/Examen';
import About from './components/sections/About';

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const { loading } = useAuth();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
    document.body.className = i18n.language === 'ar' ? 'font-arabic' : 'font-sans';
  }, [i18n.language]);

  // Track section visits
  useEffect(() => {
    const sectionMap: { [key: string]: string } = {
      '/': 'home',
      '/personnages': 'characters',
      '/oeuvre': 'oeuvre',
      '/themes': 'themes',
      '/citations': 'quotes',
      '/fiche': 'fiche',
      '/comparison': 'comparison',
      '/glossary': 'glossary',
      '/mindmaps': 'mindmaps',
      '/howto': 'howto',
      '/sample-answers': 'sample_answers',
      '/quiz': 'quiz_rapide',
      '/notes': 'notes',
      '/bookmarks': 'bookmarks',
      '/ecrits': 'ecrits',
      '/audio': 'audio',
      '/examen': 'examen',
      '/search': 'search',
      '/quick-review': 'quick_review',
      '/progress': 'progress',
      '/about': 'about',
    };
    const sectionKey = sectionMap[location.pathname];
    if (sectionKey) {
      // Use translation key, will be translated when displayed
      markSectionVisited(sectionKey);
    }
  }, [location.pathname]);

  // Show loading screen while checking authentication
  if (loading) {
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
    <div className="min-h-screen pb-8 bg-slate-900">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Home />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Search />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quick-review"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <QuickReview />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Progress />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/personnages"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Characters />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/oeuvre"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Oeuvre />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/themes"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Themes />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/citations"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Quotes />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fiche"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Fiche />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/comparison"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Comparison />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/glossary"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Glossary />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mindmaps"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <MindMaps />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/howto"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <HowToAnswer />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sample-answers"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <SampleAnswers />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Quiz />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Notes />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Bookmarks />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ecrits"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Ecrits />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/audio"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Audio />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/examen"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <Examen />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <About />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
