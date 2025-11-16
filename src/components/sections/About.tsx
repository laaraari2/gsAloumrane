import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Info, Code, BookOpen, Users, Target, Heart, Award, Zap } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: BookOpen,
      title: t('about.features.content.title'),
      description: t('about.features.content.description'),
    },
    {
      icon: Zap,
      title: t('about.features.interactive.title'),
      description: t('about.features.interactive.description'),
    },
    {
      icon: Target,
      title: t('about.features.exam.title'),
      description: t('about.features.exam.description'),
    },
    {
      icon: Users,
      title: t('about.features.community.title'),
      description: t('about.features.community.description'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('about.title')}
        </h2>
        <p className="text-slate-400">{t('about.subtitle')}</p>
      </div>

      {/* Introduction */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-8 backdrop-blur-sm border border-purple-500/20 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <Info className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-purple-300 mb-3">
              {t('about.intro.title')}
            </h3>
            <p className="text-slate-300 leading-relaxed">{t('about.intro.description')}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold font-serif text-purple-300 mb-6 text-center">
          {t('about.features.title')}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-300 mb-2">{feature.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Developer Info */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-8 backdrop-blur-sm border border-purple-500/20 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-pink-500/20 p-3 rounded-lg">
            <Code className="w-6 h-6 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold font-serif text-purple-300 mb-3">
              {t('about.developer.title')}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">{t('about.developer.description')}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">{t('about.developer.name_label')}</p>
                <p className="text-lg font-bold text-purple-300">
                  {t('about.developer.name_ar')} / {t('about.developer.name_fr')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-8 backdrop-blur-sm border border-purple-500/20 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-500/20 p-3 rounded-lg">
            <Heart className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-purple-300 mb-3">
              {t('about.purpose.title')}
            </h3>
            <p className="text-slate-300 leading-relaxed">{t('about.purpose.description')}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 text-center"
        >
          <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <h4 className="text-3xl font-bold text-purple-300 mb-2">20+</h4>
          <p className="text-slate-400 text-sm">{t('about.stats.sections')}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 text-center"
        >
          <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <h4 className="text-3xl font-bold text-purple-300 mb-2">100%</h4>
          <p className="text-slate-400 text-sm">{t('about.stats.free')}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 text-center"
        >
          <Zap className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h4 className="text-3xl font-bold text-purple-300 mb-2">2</h4>
          <p className="text-slate-400 text-sm">{t('about.stats.languages')}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;

