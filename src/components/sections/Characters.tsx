import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const characterKeys = ['antigone', 'creon', 'ismene', 'hemon', 'choeur', 'gardes', 'nurse', 'messenger', 'eurydice', 'page'];

const Characters: React.FC = () => {
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
          {t('characters.title')}
        </h2>
        <p className="text-slate-400">{t('characters.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characterKeys.map((key, index) => {
          const traits = t(`characters.${key}.traits`, { returnObjects: true }) as string[];
          
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
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-purple-300 mb-1">{t(`characters.${key}.name`)}</h3>
                  <p className="text-sm text-pink-400">{t(`characters.${key}.role`)}</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">
                {t(`characters.${key}.description`)}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {Array.isArray(traits) && traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
};

export default Characters;
