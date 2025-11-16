import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { addQuizResult, markSectionVisited } from '../../lib/storage';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const QuizRapide: React.FC = () => {
  const { t } = useTranslation();
  const questions: Question[] = useMemo(() => t('quiz_rapide.questions', { returnObjects: true }), [t]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Save result when quiz is completed
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && !quizCompleted && quizStarted) {
      const percentage = (score / questions.length) * 100;
      addQuizResult({
        date: new Date().toISOString(),
        score,
        totalQuestions: questions.length,
        percentage,
      });
      markSectionVisited('quiz');
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions.length, score, quizCompleted, quizStarted]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setQuizStarted(true);
    setQuizCompleted(false);
  };

  const getFinalMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return t('quiz_rapide.final_message_good');
    if (percentage >= 50) return t('quiz_rapide.final_message_medium');
    return t('quiz_rapide.final_message_bad');
  };

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center flex flex-col items-center justify-center min-h-[50vh]"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('quiz_rapide.title')}
        </h2>
        <p className="text-slate-400 mb-8">{t('quiz_rapide.subtitle')}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setQuizStarted(true)}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/30"
        >
          {t('quiz_rapide.start_button')}
        </motion.button>
      </motion.div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center flex flex-col items-center justify-center min-h-[50vh]"
      >
        <Award className="w-24 h-24 text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold font-serif mb-2">{t('quiz_rapide.score_text')}: {score} / {questions.length}</h2>
        <p className="text-slate-300 mb-8 max-w-md">{getFinalMessage()}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/30"
        >
          {t('quiz_rapide.restart_button')}
        </motion.button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <p className="text-sm text-purple-300 mb-2">Question {currentQuestionIndex + 1} / {questions.length}</p>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
            initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
            <h3 className="text-lg md:text-xl font-semibold text-slate-200 mb-6 text-center leading-relaxed">
              {currentQuestion.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = option === selectedAnswer;
                let buttonClass = 'bg-slate-800/50 hover:bg-slate-700/70 border-slate-700';
                if (isAnswered) {
                  if (isCorrect) {
                    buttonClass = 'bg-green-500/30 border-green-500 text-white';
                  } else if (isSelected) {
                    buttonClass = 'bg-red-500/30 border-red-500 text-white';
                  } else {
                     buttonClass = 'bg-slate-800/50 border-slate-700 opacity-50';
                  }
                }
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`p-4 rounded-lg border text-start transition-all duration-300 ${buttonClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <div className="bg-slate-800 rounded-lg p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-bold">
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Bonne réponse !' : 'Mauvaise réponse.'}
                </span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="mt-4 w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/30"
            >
              {t('quiz_rapide.next_button')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizRapide;
