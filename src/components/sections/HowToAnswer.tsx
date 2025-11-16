import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Edit3, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const HowToAnswer: React.FC = () => {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState<string | null>('analysis');

  const sections = [
    { key: 'analysis', icon: BookOpen, title: t('howto.analysis.title') },
    { key: 'writing', icon: Edit3, title: t('howto.writing.title') },
  ];

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const SectionCard: React.FC<{ sectionKey: string; icon: React.ElementType; title: string }> = ({
    sectionKey,
    icon: Icon,
    title,
  }) => {
    const isExpanded = expandedSection === sectionKey;
    const steps = t(`howto.${sectionKey}.steps`, { returnObjects: true }) as Array<{
      step: string;
      description: string;
      tips?: string[];
    }>;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 mb-6"
      >
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-purple-300 text-start">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-purple-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-400" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mt-4">
                {Array.isArray(steps) &&
                  steps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-slate-900/50 rounded-lg p-5 border border-purple-500/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-purple-300 mb-2">{step.step}</h4>
                          <p className="text-slate-300 text-sm leading-relaxed mb-3">{step.description}</p>
                          {Array.isArray(step.tips) && step.tips.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {step.tips.map((tip, tipIndex) => (
                                <div key={tipIndex} className="flex items-start gap-2 text-sm text-slate-400">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{tip}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
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
          {t('howto.title')}
        </h2>
        <p className="text-slate-400">{t('howto.subtitle')}</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <SectionCard
            key={section.key}
            sectionKey={section.key}
            icon={section.icon}
            title={section.title}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HowToAnswer;

