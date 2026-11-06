import React, { useState, useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  HelpCircle,
  BookOpen,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuizQuestion, Badge, StudentProfileData } from '../types';

export const QuizArena: React.FC = () => {
  const {
    questions,
    curriculum,
    selectedTopicId,
    setSelectedTopicId,
    submitQuizAttempt,
    currentUser,
    isStudent,
    setIsLoginModalOpen
  } = useApp();

  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [earnedRewards, setEarnedRewards] = useState<{ newBadges: Badge[]; xpGained: number; leveledUp: boolean } | null>(null);

  // Filter selection
  const [topicFilter, setTopicFilter] = useState<string>(selectedTopicId || 'all');

  useEffect(() => {
    if (selectedTopicId) {
      setTopicFilter(selectedTopicId);
    }
  }, [selectedTopicId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleStartQuiz = (topicId?: string) => {
    let pool = questions;
    const targetTopic = topicId || topicFilter;

    if (targetTopic !== 'all') {
      pool = questions.filter(q => q.topicId === targetTopic);
    }

    if (pool.length === 0) {
      pool = questions; // fallback
    }

    // Shuffle slightly
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 8);

    setActiveQuizQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setQuizFinished(false);
    setEarnedRewards(null);
    setTimeSeconds(0);
    setTimerRunning(true);
    setQuizStarted(true);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    const currentQ = activeQuizQuestions[currentQuestionIndex];
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: selectedAnswer }));
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setTimerRunning(false);
    setQuizFinished(true);

    let correct = 0;
    activeQuizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const total = activeQuizQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    const xpBase = correct * 40;
    const xpBonus = percentage >= 80 ? 50 : percentage >= 60 ? 20 : 0;
    const totalXp = xpBase + xpBonus;

    const currentTopicObj = curriculum.find(t => t.id === topicFilter);
    const topicTitle = currentTopicObj ? currentTopicObj.title : 'Comprehensive Form 4 Mock';

    if (isStudent && currentUser) {
      const rewards = submitQuizAttempt({
        studentId: (currentUser as StudentProfileData).id,
        quizId: `quiz-${topicFilter}-${Date.now()}`,
        topicId: topicFilter === 'all' ? '8.34' : topicFilter,
        topicTitle,
        score: percentage,
        correctCount: correct,
        totalQuestions: total,
        xpEarned: totalXp,
        timeSpentSeconds: timeSeconds
      });
      setEarnedRewards(rewards);
    }
  };

  const currentQ = activeQuizQuestions[currentQuestionIndex];

  // Format time mm:ss
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins}:${remainingSec < 10 ? '0' : ''}${remainingSec}`;
  };

  // Get ZIMSEC Grade Descriptor
  const getZimsecGrade = (score: number) => {
    if (score >= 75) return { grade: 'Grade A (Distinction)', color: 'text-emerald-400', desc: 'Distinguished problem-solving and algorithmic understanding' };
    if (score >= 60) return { grade: 'Grade B (Merit)', color: 'text-teal-400', desc: 'Good mastery of theory, networking, and data structures' };
    if (score >= 50) return { grade: 'Grade C (Credit / Pass)', color: 'text-amber-400', desc: 'Basic functional competence across core syllabus areas' };
    return { grade: 'Ungraded / Remedial Required', color: 'text-rose-400', desc: 'Needs revision of offline notes and remedial teacher guidance' };
  };

  return (
    <div className="space-y-6">
      {/* Quiz arena header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Exam Practice Arena
              </span>
              <span className="text-xs text-slate-400">Paper 1 MCQs & Paper 2 Questions</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 mt-2">
              Interactive Form 4 Examination Tests
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Earn XP points, unlock syllabus achievement badges, and climb the class leaderboard while reviewing official ZIMSEC specimen questions.
            </p>
          </div>

          {!quizStarted && (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStartQuiz('all')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition flex items-center space-x-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Full Form 4 Mock Exam</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quiz not started state: Select a topic quiz */}
      {!quizStarted && !quizFinished && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-200 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Select Topic to Test Knowledge</span>
            </h3>
            <span className="text-xs text-slate-400">{curriculum.length} Topics Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {curriculum.map(topic => {
              const topicQCount = questions.filter(q => q.topicId === topic.id).length;
              return (
                <div
                  key={topic.id}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-5 transition flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono font-bold text-emerald-400">{topic.code}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {topicQCount} Questions
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">{topic.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">{topic.category}</span>
                    <button
                      onClick={() => handleStartQuiz(topic.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-xs transition flex items-center space-x-1"
                    >
                      <span>Start Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Quiz Question Interface */}
      {quizStarted && !quizFinished && currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-4xl mx-auto">
          {/* Progress bar & Header */}
          <div className="flex items-center justify-between text-xs pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-emerald-400">
                Question {currentQuestionIndex + 1} of {activeQuizQuestions.length}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                {currentQ.topicTitle}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentQ.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formatTime(timeSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / activeQuizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h3>
            {currentQ.examYear && (
              <span className="text-[11px] text-slate-500 mt-1 block italic">
                Source: {currentQ.examYear}
              </span>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;

              let optionStyle = 'bg-slate-800/80 border-slate-750 text-slate-200 hover:border-slate-650';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-start space-x-3.5 ${optionStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {letter}
                  </div>
                  <div className="flex-1 mt-0.5 leading-snug">{option}</div>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (when answered) */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                selectedAnswer === currentQ.correctAnswerIndex
                  ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-200'
                  : 'bg-amber-950/40 border-amber-800/50 text-amber-200'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>
                  {selectedAnswer === currentQ.correctAnswerIndex
                    ? 'Correct! Great job!'
                    : 'Explanation & Concept Guide:'}
                </span>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setQuizStarted(false);
                setTimerRunning(false);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 transition"
            >
              Cancel Quiz
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition ${
                  selectedAnswer !== null
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5"
              >
                <span>
                  {currentQuestionIndex < activeQuizQuestions.length - 1 ? 'Next Question' : 'Finish & View Score'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Finished Summary View */}
      {quizFinished && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6 shadow-xl text-center">
          {/* Trophy Header */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-3xl">
            🏆
          </div>

          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Assessment Completed
            </span>
            <h2 className="text-2xl font-black text-slate-100 mt-1">
              Examination Result Report
            </h2>
            <p className="text-xs text-slate-400">Total Time: {formatTime(timeSeconds)}</p>
          </div>

          {/* Score Calculation Card */}
          {(() => {
            let correct = 0;
            activeQuizQuestions.forEach(q => {
              if (userAnswers[q.id] === q.correctAnswerIndex) correct++;
            });
            const pct = Math.round((correct / activeQuizQuestions.length) * 100);
            const grading = getZimsecGrade(pct);

            return (
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-center space-x-8">
                  <div>
                    <span className="text-4xl font-black text-emerald-400">{pct}%</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Overall Score</span>
                  </div>
                  <div className="h-10 w-px bg-slate-700" />
                  <div>
                    <span className="text-4xl font-black text-slate-100">
                      {correct} / {activeQuizQuestions.length}
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">Correct Answers</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className={`text-base font-extrabold ${grading.color}`}>
                    {grading.grade}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">{grading.desc}</p>
                </div>
              </div>
            );
          })()}

          {/* Rewards Pill */}
          {earnedRewards && (
            <div className="p-4 bg-emerald-950/50 border border-emerald-800/60 rounded-xl space-y-2 text-left">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Rewards Awarded: +{earnedRewards.xpGained} XP</span>
                {earnedRewards.leveledUp && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                    LEVEL UP!
                  </span>
                )}
              </div>
              {earnedRewards.newBadges.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {earnedRewards.newBadges.map(b => (
                    <div
                      key={b.id}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/40 text-xs text-amber-300"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span className="font-bold">{b.title} Badge Unlocked!</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isStudent && (
            <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-300 text-left flex items-center justify-between">
              <span>Sign in as a student to record this attempt and claim XP on the leaderboard!</span>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-center space-x-3">
            <button
              onClick={() => handleStartQuiz()}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizFinished(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs transition"
            >
              Back to Topics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
