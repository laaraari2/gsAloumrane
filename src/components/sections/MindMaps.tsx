import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Network, Users, Lightbulb, GitBranch } from 'lucide-react';

const MindMaps: React.FC = () => {
  const { t } = useTranslation();
  const maps = t('mindmaps.maps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    items: string[];
    icon: string;
  }>;

  const iconMap: Record<string, React.ElementType> = {
    characters: Users,
    themes: Lightbulb,
    structure: GitBranch,
    default: Network,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('mindmaps.title')}
        </h2>
        <p className="text-slate-400">{t('mindmaps.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.isArray(maps) &&
          maps.map((map, index) => {
            const Icon = iconMap[map.icon] || iconMap.default;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-purple-300 mb-2">{map.title}</h3>
                    <p className="text-slate-300 text-sm">{map.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {Array.isArray(map.items) &&
                    map.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-2 text-slate-300 text-sm"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                </div>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default MindMaps;

