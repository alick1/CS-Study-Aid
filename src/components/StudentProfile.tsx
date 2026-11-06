import React, { useState } from 'react';
import {
  UserCheck,
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  Shield,
  Clock,
  Sparkles,
  TrendingUp,
  Lock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Bell,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfileData, Badge } from '../types';

export const StudentProfile: React.FC = () => {
  const { currentUser, isStudent, curriculum, badges, setActiveTab, setSelectedTopicId, setIsLoginModalOpen, logout } = useApp();
  const [showSimulatedPushAlert, setShowSimulatedPushAlert] = useState(false);

  if (!isStudent || !currentUser) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
        <Shield className="w-12 h-12 text-emerald-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100">Learner Account Required</h2>
        <p className="text-xs text-slate-400">
          The application default status is signed out. Please sign in with your student credentials to view your private progress records, topic mastery, and personalized teacher feedback notes.
        </p>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition"
        >
          Sign In with Student ID
        </button>
      </div>
    );
  }

  const rawStudent = currentUser as StudentProfileData;
  const topicMastery: Record<string, number> = {
    '8.34': 0, '8.35': 0, '8.36': 0, '8.37': 0, '8.38': 0,
    '8.39': 0, '8.40': 0, '8.41': 0, '8.42': 0, '8.43': 0, '8.44': 0,
    ...(rawStudent?.topicMastery || {})
  };
  const quizAttempts = Array.isArray(rawStudent?.quizAttempts) ? rawStudent.quizAttempts : [];
  const badgesList = Array.isArray(rawStudent?.badges) ? rawStudent.badges : ['badge-first-quiz'];
  const teacherFeedback = Array.isArray(rawStudent?.teacherFeedback) ? rawStudent.teacherFeedback : [];

  const student: StudentProfileData = {
    ...rawStudent,
    level: typeof rawStudent?.level === 'number' && rawStudent.level > 0 ? rawStudent.level : 1,
    xp: typeof rawStudent?.xp === 'number' ? rawStudent.xp : 0,
    streakDays: typeof rawStudent?.streakDays === 'number' ? rawStudent.streakDays : 1,
    topicMastery,
    quizAttempts,
    badges: badgesList,
    teacherFeedback,
  };

  const xpNextLevel = student.level * 400;
  const xpCurrentLevelBase = (student.level - 1) * 400;
  const levelProgressPct = Math.min(
    100,
    Math.max(0, Math.round(((student.xp - xpCurrentLevelBase) / (xpNextLevel - xpCurrentLevelBase)) * 100))
  );

  const earnedBadgeSet = new Set(student.badges);

  // Curriculum Coverage calculation (Requirement: 51%+ weekly reminders)
  const totalTopics = curriculum.length || 11;
  const coveredTopics = curriculum.filter(
    t => ((student.topicMastery?.[t.id] ?? 0) >= 40) ||
         (student.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40) ?? false)
  );
  const coveragePct = Math.round((coveredTopics.length / totalTopics) * 100);
  const hasReached51 = coveragePct >= 51;
  const remainingTopics = curriculum.filter(
    t => !(((student.topicMastery?.[t.id] ?? 0) >= 40) ||
           (student.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40) ?? false))
  );

  return (
    <div className="space-y-6">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Top Student Session & Sign Out Bar */}
        <div className="mb-5 pb-4 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">● Private Student Portal</span>
            <span className="text-slate-400">• Only visible to you</span>
          </div>

          {/* Student Sign Out Button (Requirement) */}
          <button
            onClick={() => {
              logout();
              setActiveTab('dashboard');
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs transition shadow-sm"
            title="Sign out of student account"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="text-5xl sm:text-6xl p-3 bg-slate-800 rounded-2xl border border-slate-700 shadow-md">
              {student.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {student.id}
                </span>
                <span className="text-xs text-slate-400 font-mono">@{student.username}</span>
                <span className="text-xs text-slate-400 font-mono">• {student.gender}</span>
              </div>
              <h1 className="text-2xl font-black text-slate-100 mt-1">{student.name}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Enrolled: {student.enrolledDate} • Active: {student.lastActive}</span>
              </p>
            </div>
          </div>

          {/* Level & XP Gauge */}
          <div className="w-full md:w-64 bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-amber-300">Level {student.level} Scholar</span>
              <span className="font-mono text-emerald-400 font-bold">{student.xp} XP</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Current: {student.xp} XP</span>
              <span>Next: {xpNextLevel} XP</span>
            </div>
          </div>
        </div>

        {/* Daily Sign-In & Attendance Status Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center space-x-2.5">
            <span className="text-xl">🔥</span>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Active Streak</span>
              <span className="font-mono font-black text-slate-100 text-sm">{student.streakDays} Days</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 flex items-center space-x-2.5">
            <span className="text-xl">🎁</span>
            <div>
              <span className="text-[10px] text-emerald-400 block font-semibold">Sign-In Reward</span>
              <span className="font-mono font-black text-emerald-300 text-sm">+50 XP Awarded</span>
            </div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center space-x-2.5">
            <span className="text-xl">📊</span>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Quizzes Taken</span>
              <span className="font-mono font-black text-slate-100 text-sm">{student.quizAttempts.length} Completed</span>
            </div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center space-x-2.5">
            <span className="text-xl">🏅</span>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Badges Earned</span>
              <span className="font-mono font-black text-amber-300 text-sm">{student.badges.length} of {badges.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 51%+ Curriculum Automated Weekly Revision Push Reminders Section (Requirement) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className={`p-2.5 rounded-xl ${hasReached51 ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-slate-800 text-slate-400'}`}>
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-slate-100 text-base">
                  Automated Weekly Revision Push Reminders
                </h3>
                {hasReached51 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    51%+ Milestone Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    Threshold: 51% Coverage
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted weekly reminders of Form 4 syllabus topics that have yet to be covered.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
              Coverage: {coveragePct}% ({coveredTopics.length}/11 Topics)
            </span>
            {hasReached51 && (
              <button
                onClick={() => setShowSimulatedPushAlert(true)}
                className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition flex items-center space-x-1"
              >
                <span>Trigger Push Test</span>
              </button>
            )}
          </div>
        </div>

        {showSimulatedPushAlert && (
          <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-800/80 text-xs text-teal-200 flex items-start justify-between gap-3 animate-in fade-in">
            <div className="flex items-start space-x-2.5">
              <Bell className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <b className="text-teal-300 block mb-0.5">🔔 Weekly Study Push Notification:</b>
                <span>
                  You have completed {coveragePct}% of the Form 4 syllabus! Prioritize covering the {remainingTopics.length} remaining topics listed below before your final examinations.
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowSimulatedPushAlert(false)}
              className="text-teal-400 hover:text-white text-xs font-bold ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {hasReached51 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold">
                Topics Yet to be Covered ({remainingTopics.length} remaining):
              </span>
              <span className="text-[11px] text-teal-400 font-mono">
                Pushed weekly every Monday • Next push scheduled in 6 days
              </span>
            </div>

            {remainingTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {remainingTopics.map(topic => (
                  <div
                    key={topic.id}
                    className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 hover:border-teal-500/50 flex flex-col justify-between space-y-2 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-bold text-teal-400">{topic.code}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {(student.topicMastery?.[topic.id] ?? 0)}% Mastery
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-200">{topic.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{topic.category}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedTopicId(topic.id);
                          setActiveTab('curriculum');
                        }}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        Read Notes →
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTopicId(topic.id);
                          setActiveTab('quizzes');
                        }}
                        className="px-2 py-0.5 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[10px] font-bold transition"
                      >
                        Take Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Spectacular! You have covered 100% of all 11 Form 4 syllabus topics!</span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Syllabus Coverage: <b>{coveragePct}%</b> / 51% Target</span>
              <span className="text-slate-400">Cover {Math.ceil(11 * 0.51) - coveredTopics.length} more topic(s) to unlock</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(coveragePct / 51) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              When you complete at least 51% of the Form 4 syllabus, automated weekly push notifications will activate to guide your revision through all remaining exam topics.
            </p>
          </div>
        )}
      </div>

      {/* Grid: Teacher Feedback & Personal Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personalized Teacher Feedback (Primary focus) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <h3 className="font-extrabold text-slate-100 text-base">Personalized Teacher Feedback</h3>
              </div>
              <span className="text-xs text-slate-400">
                {student.teacherFeedback.length} Academic Notes
              </span>
            </div>

            {student.teacherFeedback.length > 0 ? (
              <div className="space-y-3">
                {student.teacherFeedback.map(fb => {
                  let sentimentBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
                  let icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;

                  if (fb.sentiment === 'urgent') {
                    sentimentBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
                    icon = <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />;
                  } else if (fb.sentiment === 'constructive') {
                    sentimentBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
                    icon = <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />;
                  }

                  return (
                    <div
                      key={fb.id}
                      className="p-4 rounded-xl bg-slate-850 border border-slate-750 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {icon}
                          <span className="font-bold text-slate-200">{fb.teacherName}</span>
                          {fb.topicTitle && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {fb.topicTitle}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${sentimentBadge}`}>
                            {fb.sentiment}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{fb.date}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 leading-relaxed pt-1 pl-6">
                        "{fb.message}"
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                No personalized notes from your teacher yet. Check back after your next mock exam!
              </div>
            )}
          </div>

          {/* Personal Quiz History */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-slate-100 text-base">Recent Test Attempts</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {student.quizAttempts.length} Completed
              </span>
            </div>

            {student.quizAttempts.length > 0 ? (
              <div className="space-y-2">
                {student.quizAttempts.map(att => (
                  <div
                    key={att.id}
                    className="p-3 rounded-xl bg-slate-850 border border-slate-750 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-200 block">{att.topicTitle}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {att.completedAt} • {att.correctCount}/{att.totalQuestions} Questions
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-black font-mono text-sm block ${
                          att.score >= 75
                            ? 'text-emerald-400'
                            : att.score >= 50
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {att.score}%
                      </span>
                      <span className="text-[10px] text-emerald-500 font-mono font-bold">
                        +{att.xpEarned} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                No quiz attempts recorded yet. Head over to the Quiz Arena to begin!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Topic Mastery Progress & Badges */}
        <div className="lg:col-span-5 space-y-6">
          {/* Form 4 Topic Mastery */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                <h3 className="font-extrabold text-slate-100 text-base">Syllabus Mastery</h3>
              </div>
              <span className="text-xs text-slate-400">11 Form 4 Topics</span>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {curriculum.map(topic => {
                const mastery = student.topicMastery?.[topic.id] ?? 0;
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      setActiveTab('curriculum');
                    }}
                    className="cursor-pointer group"
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-300 group-hover:text-emerald-300 transition truncate max-w-[200px]">
                        {topic.code} {topic.title}
                      </span>
                      <span className="font-mono font-bold text-slate-400">{mastery}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          mastery >= 75
                            ? 'bg-emerald-500'
                            : mastery >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${mastery}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges Earned Collection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-slate-100 text-base">Earned Badges</h3>
              </div>
              <span className="text-xs text-amber-400 font-bold font-mono">
                {student.badges.length} / {badges.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {badges.map(b => {
                const isEarned = earnedBadgeSet.has(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition ${
                      isEarned
                        ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                        : 'bg-slate-850/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-200 truncate">{b.title}</span>
                      {isEarned ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{b.description}</p>
                    <span className="mt-2 text-[10px] font-mono text-emerald-400">+{b.xpReward} XP</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
