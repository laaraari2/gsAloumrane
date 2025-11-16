import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, ChevronRight, ChevronLeft, BookOpen, Users, Lightbulb } from 'lucide-react';

const QuickReview: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewCards = [
    {
      title: t('quick_review.characters.title'),
      icon: Users,
      items: [
        { label: t('characters.antigone.name'), value: t('characters.antigone.role') },
        { label: t('characters.creon.name'), value: t('characters.creon.role') },
        { label: t('characters.ismene.name'), value: t('characters.ismene.role') },
        { label: t('characters.hemon.name'), value: t('characters.hemon.role') },
      ],
    },
    {
      title: t('quick_review.themes.title'),
      icon: Lightbulb,
      items: [
        { label: t('themes.revolte.title'), value: t('themes.revolte.description') },
        { label: t('themes.bonheur.title'), value: t('themes.bonheur.description') },
        { label: t('themes.fatalite.title'), value: t('themes.fatalite.description') },
      ],
    },
    {
      title: t('quick_review.key_info.title'),
      icon: BookOpen,
      items: [
        { label: t('quick_review.key_info.author'), value: 'Jean Anouilh' },
        { label: t('quick_review.key_info.date'), value: '1942 (écrit), 1944 (joué)' },
        { label: t('quick_review.key_info.genre'), value: t('fiche.identity.genre_value') },
        { label: t('quick_review.key_info.context'), value: t('quick_review.key_info.context_value') },
      ],
    },
  ];

  const currentCard = reviewCards[currentIndex];
  const Icon = currentCard.icon;

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewCards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewCards.length) % reviewCards.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('quick_review.title')}
        </h2>
        <p className="text-slate-400">{t('quick_review.subtitle')}</p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-8 backdrop-blur-sm border border-purple-500/20 min-h-[400px]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-purple-300">{currentCard.title}</h3>
            </div>

            <div className="space-y-4">
              {currentCard.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-purple-300 mb-2">{item.label}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-700/50 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            {t('quick_review.previous')}
          </button>

          <div className="flex gap-2">
            {reviewCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex ? 'bg-purple-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
          >
            {t('quick_review.next')}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickReview;

