import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, BookOpen, Edit3, HelpCircle } from 'lucide-react';

interface ComprehensionQuestion {
  question: string;
  points: string[];
}

interface AnalysisQuestion {
  quote: string;
  question: string;
  points: string[];
}

interface WritingPrompt {
  prompt: string;
  points: string[];
}

const Examen: React.FC = () => {
  const { t } = useTranslation();
  const comprehensionQuestions: ComprehensionQuestion[] = useMemo(() => t('examen.comprehension_questions', { returnObjects: true }), [t]);
  const analysisQuestions: AnalysisQuestion[] = useMemo(() => t('examen.analysis_questions', { returnObjects: true }), [t]);
  const writingPrompts: WritingPrompt[] = useMemo(() => t('examen.writing_prompts', { returnObjects: true }), [t]);

  const [activeComprehension, setActiveComprehension] = useState<number | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<number | null>(null);
  const [activeWriting, setActiveWriting] = useState<number | null>(null);

  const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <Icon className="w-8 h-8 text-purple-400" />
        <h3 className="text-2xl md:text-3xl font-bold font-serif text-purple-300">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );

  const ComprehensionCard: React.FC<{ question: ComprehensionQuestion; index: number }> = ({ question, index }) => (
    <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700">
      <p className="font-semibold text-slate-200 mb-4">{question.question}</p>
      <button
        onClick={() => setActiveComprehension(activeComprehension === index ? null : index)}
        className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
      >
        <span>{t('examen.show_answer_points')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeComprehension === index ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeComprehension === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2">
              {question.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const AnalysisCard: React.FC<{ question: AnalysisQuestion; index: number }> = ({ question, index }) => (
    <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700">
      <blockquote className="border-l-4 border-pink-500 pl-4 italic text-slate-300 mb-4">"{question.quote}"</blockquote>
      <p className="font-semibold text-slate-200 mb-4">{question.question}</p>
      <button
        onClick={() => setActiveAnalysis(activeAnalysis === index ? null : index)}
        className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
      >
        <span>{t('examen.show_analysis_points')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeAnalysis === index ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeAnalysis === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2">
              {question.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
    const WritingCard: React.FC<{ prompt: WritingPrompt; index: number }> = ({ prompt, index }) => (
    <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700">
      <p className="font-semibold text-slate-200 mb-4">{prompt.prompt}</p>
      <textarea 
        rows={6} 
        className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500 mb-4"
        placeholder={t('examen.writing_placeholder')}
      ></textarea>
      <button
        onClick={() => setActiveWriting(activeWriting === index ? null : index)}
        className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
      >
        <span>{t('examen.show_writing_points')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeWriting === index ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeWriting === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2">
              {prompt.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('examen.title')}
        </h2>
        <p className="text-slate-400">{t('examen.subtitle')}</p>
      </div>

      <Section title={t('examen.comprehension_title')} icon={HelpCircle}>
        {Array.isArray(comprehensionQuestions) && comprehensionQuestions.map((q, i) => <ComprehensionCard key={i} question={q} index={i} />)}
      </Section>

      <Section title={t('examen.analysis_title')} icon={BookOpen}>
        {Array.isArray(analysisQuestions) && analysisQuestions.map((q, i) => <AnalysisCard key={i} question={q} index={i} />)}
      </Section>

      <Section title={t('examen.writing_title')} icon={Edit3}>
        {Array.isArray(writingPrompts) && writingPrompts.map((p, i) => <WritingCard key={i} prompt={p} index={i} />)}
      </Section>
    </motion.div>
  );
};

export default Examen;
