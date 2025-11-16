import React from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const quoteKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

const Quotes: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('quotes.title')}
        </h2>
        <p className="text-slate-400">{t('quotes.subtitle')}</p>
      </div>

      <div className="space-y-6">
        {quoteKeys.map((key, index) => {
          const isRtl = i18n.dir() === 'rtl';
          const initialX = (index % 2 === 0 ? -50 : 50) * (isRtl ? -1 : 1);

          return (
            <motion.div
              key={key}
              initial={{ x: initialX, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-2 rounded-lg flex-shrink-0 mt-1">
                  <QuoteIcon className="w-6 h-6 text-purple-400 transform -scale-x-100" />
                </div>
                
                <div className="flex-1">
                  <blockquote className="text-lg md:text-xl text-purple-200 font-serif italic mb-4 leading-relaxed">
                    "{t(`quotes.${key}.text`)}"
                  </blockquote>
                  
                  <div className="text-end">
                    <span className="text-pink-400 font-semibold">— {t(`quotes.${key}.speaker`)}</span>
                    <p className="text-slate-400 text-sm mt-1">{t(`quotes.${key}.context`)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Quotes;
