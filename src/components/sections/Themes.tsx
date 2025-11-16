import React from 'react';
import { motion } from 'framer-motion';
import { ShieldOff, Smile, Baby, Clock, UserX, Landmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  revolte: ShieldOff,
  bonheur: Smile,
  enfance: Baby,
  fatalite: Clock,
  solitude: UserX,
  politique: Landmark
};

const themeKeys = ['revolte', 'bonheur', 'enfance', 'fatalite', 'solitude', 'politique'];

const Themes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('themes.title')}
        </h2>
        <p className="text-slate-400">{t('themes.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themeKeys.map((key, index) => {
          const Icon = iconMap[key];
          
          return (
            <motion.div
              key={key}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 rounded-xl">
                  <Icon className="w-7 h-7 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold font-serif text-purple-300">{t(`themes.${key}.title`)}</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-grow">
                {t(`themes.${key}.description`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Themes;
