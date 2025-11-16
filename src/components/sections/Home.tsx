import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BookmarkButton from '../BookmarkButton';
import hero from '../../images/hero.svg';
import placeholder from '../../assets/placeholder.svg';
import heroPng from '../../../images/téléchargement.png';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <motion.div
        className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20 shadow-2xl shadow-purple-900/20 relative"
      >
        <div className="absolute top-4 right-4 z-10">
          <BookmarkButton section="home" title={t('navigation.home')} />
        </div>
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              className="h-64 w-full object-cover md:h-full"
              src={heroPng as unknown as string}
              alt="Statue grecque sombre et pensive"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                // first fallback to the local svg hero, then to the placeholder
                if (target.src && target.src.endsWith('.png')) {
                  target.src = hero as unknown as string;
                  return;
                }
                target.src = placeholder as unknown as string;
              }}
            />
          </div>
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4 text-purple-300">{t('home.title')}</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    {t('home.p1_part1')} <strong className="text-pink-400">{t('home.p1_part2')}</strong> {t('home.p1_part3')}
                  </p>
                  <p>
                    {t('home.p2_part1')} <strong className="text-purple-400">{t('home.p2_part2')}</strong>{t('home.p2_part3')}
                  </p>
                  <p>
                    {t('home.p3_part1')} <strong className="text-pink-400">{t('home.p3_part2')}</strong> {t('home.p3_part3')} <strong className="text-purple-400">{t('home.p3_part4')}</strong> {t('home.p3_part5')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
