import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Search } from 'lucide-react';

const Glossary: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const terms = t('glossary.terms', { returnObjects: true }) as Array<{
    term: string;
    definition: string;
    example?: string;
  }>;

  const filteredTerms = Array.isArray(terms)
    ? terms.filter((term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('glossary.title')}
        </h2>
        <p className="text-slate-400">{t('glossary.subtitle')}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder={t('glossary.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-12 py-3 text-white placeholder-slate-400 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>

      {/* Terms List */}
      <div className="space-y-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-serif text-purple-300 mb-2">{term.term}</h3>
                  <p className="text-slate-300 leading-relaxed mb-2">{term.definition}</p>
                  {term.example && (
                    <div className="mt-3 p-3 bg-slate-900/50 rounded-lg border-l-4 border-pink-500">
                      <p className="text-sm text-slate-400 mb-1">{t('glossary.example')}:</p>
                      <p className="text-slate-200 italic">{term.example}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">{t('glossary.no_results')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Glossary;

