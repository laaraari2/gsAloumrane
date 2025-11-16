import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Drama, Feather } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Oeuvre: React.FC = () => {
  const { t, i18n } = useTranslation();

  const sections = [
    { key: 'creation', icon: Drama },
    { key: 'style', icon: Feather },
    { key: 'vision', icon: BookMarked }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('oeuvre.title')}
        </h2>
        <p className="text-slate-400">{t('oeuvre.subtitle')}</p>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const initialX = i18n.dir() === 'rtl' ? 50 : -50;
          return (
            <motion.div
              key={index}
              initial={{ x: initialX, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg mt-1">
                  <Icon className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-purple-300 mb-3">{t(`oeuvre.${section.key}.title`)}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed text-justify">{t(`oeuvre.${section.key}.content`)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Oeuvre;
