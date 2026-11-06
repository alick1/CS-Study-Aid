import React, { useState } from 'react';
import {
  Trophy,
  BookOpen,
  BrainCircuit,
  Award,
  TrendingUp,
  FileText,
  Users,
  LogOut,
  LogIn,
  ArrowRight,
  PieChart,
  BarChart3,
  Calendar,
  Sparkles,
  Layers,
  GraduationCap,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Eye,
  Check,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfileData } from '../types';
import { Leaderboard } from './Leaderboard';

export const Dashboard: React.FC = () => {
  const {
    currentUser,
    isStudent,
    isAdmin,
    students,
    curriculum,
    setActiveTab,
    setSelectedTopicId,
    setIsLoginModalOpen,
    logout
  } = useApp();

  const [selectedGenderTab, setSelectedGenderTab] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedQuartileFilter, setSelectedQuartileFilter] = useState<'All' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<StudentProfileData | null>(null);

  const student = isStudent ? (currentUser as StudentProfileData) : null;

  // 1. General Cohort Stats
  const totalStudents = students.length;
  const allAttempts = students.flatMap(s => s.quizAttempts || []);
  const classAvgScore =
    allAttempts.length > 0
      ? Math.round(allAttempts.reduce((acc, a) => acc + a.score, 0) / allAttempts.length)
      : 0;

  // 2. Gender Distribution Analysis & Grouped Students
  const maleStudents = students.filter(s => s.gender === 'Male');
  const femaleStudents = students.filter(s => s.gender === 'Female');
  const maleCount = maleStudents.length;
  const femaleCount = femaleStudents.length;
  const malePercentage = totalStudents > 0 ? Math.round((maleCount / totalStudents) * 100) : 0;
  const femalePercentage = totalStudents > 0 ? Math.round((femaleCount / totalStudents) * 100) : 0;

  // Helper for Student Average Mastery
  const getStudentAvgMastery = (s: StudentProfileData) => {
    const scores = Object.values(s.topicMastery || {});
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  };

  // 3. Curriculum Coverage in Quartiles (e.g., how many covered 0-25%, 26-50%, 51-75%, 76-100%)
  const totalTopics = curriculum.length; // 11 topics

  const studentsWithCoverage = students.map(s => {
    // A topic is considered covered if mastery >= 40% or attempted in a quiz with score >= 40%
    const coveredTopics = curriculum.filter(
      t => (s.topicMastery?.[t.id] || 0) >= 40 || s.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40)
    );
    const coveredCount = coveredTopics.length;
    const coveragePct = Math.round((coveredCount / totalTopics) * 100);
    const avgMastery = getStudentAvgMastery(s);

    let quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4' = 'Q1';
    let quartileLabel = 'Quartile 1 (0%–25%)';
    if (coveragePct > 75) {
      quartile = 'Q4';
      quartileLabel = 'Quartile 4 (76%–100%)';
    } else if (coveragePct > 50) {
      quartile = 'Q3';
      quartileLabel = 'Quartile 3 (51%–75%)';
    } else if (coveragePct > 25) {
      quartile = 'Q2';
      quartileLabel = 'Quartile 2 (26%–50%)';
    }

    return {
      student: s,
      coveredCount,
      coveredTopics,
      coveragePct,
      avgMastery,
      quartile,
      quartileLabel
    };
  });

  // Signed-in student specific weekly reminder evaluation (Requirement: 51%+ weekly reminders)
  const studentCoveredCount = student
    ? curriculum.filter(
        t => (student.topicMastery?.[t.id] || 0) >= 40 || student.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40)
      ).length
    : 0;
  const studentCoveragePct = student ? Math.round((studentCoveredCount / totalTopics) * 100) : 0;
  const studentReached51 = studentCoveragePct >= 51;
  const studentRemainingTopics = student
    ? curriculum.filter(
        t => !((student.topicMastery?.[t.id] || 0) >= 40 || student.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40))
      )
    : [];

  const quartile1 = studentsWithCoverage.filter(item => item.quartile === 'Q1');
  const quartile2 = studentsWithCoverage.filter(item => item.quartile === 'Q2');
  const quartile3 = studentsWithCoverage.filter(item => item.quartile === 'Q3');
  const quartile4 = studentsWithCoverage.filter(item => item.quartile === 'Q4');

  const avgCohortCoverage = studentsWithCoverage.length > 0
    ? Math.round(studentsWithCoverage.reduce((acc, item) => acc + item.coveragePct, 0) / studentsWithCoverage.length)
    : 0;

  // 4. Topic-by-Topic Cohort Mastery for Visualisation
  const topicMasteryAverages = curriculum.map(topic => {
    const scores = students.map(s => s.topicMastery?.[topic.id] || 0);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return {
      topic,
      avg
    };
  });

  // 5. ZIMSEC Examination Structure Summary & Weights
  const examPapers = [
    {
      code: 'Paper 1',
      title: 'Theory Multiple Choice (MCQ)',
      duration: '1 Hour',
      questions: '40 Compulsory Items',
      weight: 10,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      description: 'Tests core foundational knowledge, computing recall, binary definitions, and basic logic interpretation.'
    },
    {
      code: 'Paper 2',
      title: 'Structured Theory Paper',
      duration: '2 Hours',
      questions: '10–12 Structured Questions',
      weight: 30,
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      description: 'In-depth problem analysis, algorithm dry runs, DFDs, ERDs, network topologies, and maintenance evaluation.'
    },
    {
      code: 'Paper 3',
      title: 'Practical Examination',
      duration: '3 Hours',
      questions: 'Hands-on Programming, Databases & Web',
      weight: 40,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      description: '100% practical skills in coding (Python/Visual Basic), advanced multi-table SQL queries, and responsive web development.'
    },
    {
      code: 'SBCA Project',
      title: 'School-Based Continuous Assessment',
      duration: 'Terms 1–3',
      questions: '7 Project Lifecycle Stages',
      weight: 20,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      description: 'Full software project following the SDLC: Problem identification, investigation, design, refinement, and evaluation.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner: General Cohort Analytics (NO private student info displayed by default) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* User Session Bar: if signed in, show status & explicit sign out option */}
        {currentUser && (
          <div className="mb-5 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl">{student ? student.avatar : '👨🏾‍🏫'}</span>
              <div>
                <span className="font-bold text-slate-200">
                  Currently Signed In: <span className="text-emerald-400">{currentUser.name}</span>
                </span>
                <span className="text-slate-400 font-mono ml-2">
                  ({isStudent && student ? student.id : `@${currentUser.username} • Faculty`})
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isStudent && (
                <button
                  onClick={() => setActiveTab('my-progress')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition"
                >
                  View My Private Progress
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('teacher-portal')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold transition"
                >
                  Open Teacher Portal
                </button>
              )}
              {/* Explicit Sign Out Button (Requirement: Allow students to be able to sign out when signed) */}
              <button
                onClick={logout}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 font-semibold text-xs transition"
                title="Sign out of current account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Zimbabwe MoPSE (2024–2030)
              </span>
              <span className="text-xs text-slate-400 font-mono">Form 4 Computer Science • Cohort Analytics</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-2">
              Form 4 Examination & Cohort Performance Hub
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-3xl leading-relaxed">
              Official syllabus progression, gender demographic distribution, curriculum quartile coverage analytics, and ZIMSEC O' Level assessment structure overview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!currentUser && (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Learner / Teacher Sign In</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('curriculum')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Form 4 Syllabus (8.34 – 8.44)</span>
            </button>
          </div>
        </div>

        {/* General Cohort KPI Highlights (No personal details) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Total Enrolled Learners</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-100 font-mono">{totalStudents}</span>
              <span className="text-[11px] text-slate-400">Candidates</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Cohort Average Test Score</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-emerald-400 font-mono">{classAvgScore}%</span>
              <span className="text-[11px] text-emerald-500">ZIMSEC Standard</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Avg Syllabus Coverage</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-indigo-400 font-mono">{avgCohortCoverage}%</span>
              <span className="text-[11px] text-indigo-300">Across Cohort</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Syllabus Scope</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-amber-400 font-mono">11 Topics</span>
              <span className="text-[11px] text-amber-300">8.34 to 8.44</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signed-in Student Weekly Revision Push Reminder (Requirement: 51%+ weekly reminders) */}
      {isStudent && student && studentReached51 && (
        <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-teal-950/80 border border-teal-500/40 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-teal-900/40">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-500/30">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-slate-100 text-sm">
                    Automated Weekly Revision Push Reminder
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    51%+ Milestone Active ({studentCoveragePct}%)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Great work {student.name}! You have covered {studentCoveredCount} of 11 topics. Here are the remaining topics to complete before your examinations:
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('my-progress')}
              className="text-xs text-teal-300 hover:text-white font-bold flex items-center space-x-1 underline w-fit"
            >
              <span>View Full Study Agenda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {studentRemainingTopics.map(topic => (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setActiveTab('curriculum');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-teal-500/60 text-xs cursor-pointer transition flex items-center space-x-2"
              >
                <span className="font-mono font-bold text-teal-400">{topic.code}</span>
                <span className="text-slate-200">{topic.title}</span>
                <span className="text-[10px] text-teal-300 font-bold">Study Notes →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Row: Graph 2 (Gender Distribution) & Graph 3 (Curriculum Quartiles) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GRAPH 1: Enrolled Students by Gender */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-teal-400" />
                <h3 className="font-extrabold text-slate-100 text-sm">Enrolled Students by Gender</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Form 4 Enrollment ({totalStudents} Candidates)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Gender distribution breakdown across the active Form 4 Computer Science cohort:
            </p>
          </div>

          {/* Visual Gender Proportional SVG Donut Chart & Metrics */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" className="stroke-slate-800" strokeWidth="12" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    className="stroke-blue-500 transition-all duration-700"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.76"
                    strokeDashoffset={238.76 * (1 - malePercentage / 100)}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    className="stroke-pink-500 transition-all duration-700"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.76"
                    strokeDashoffset={238.76 * (1 - femalePercentage / 100)}
                    style={{ transform: `rotate(${(malePercentage / 100) * 360}deg)`, transformOrigin: '50% 50%' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-slate-100 font-mono">{totalStudents}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold">Total</span>
                </div>
              </div>

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 text-blue-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                    👨🏾‍🎓 Male Learners
                  </span>
                  <span className="font-mono font-bold text-slate-200">{maleCount} ({malePercentage}%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 text-pink-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block"></span>
                    👩🏾‍🎓 Female Learners
                  </span>
                  <span className="font-mono font-bold text-slate-200">{femaleCount} ({femalePercentage}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex shadow-inner mt-1">
                  <div className="bg-blue-500 h-full" style={{ width: `${malePercentage}%` }} />
                  <div className="bg-pink-500 h-full" style={{ width: `${femalePercentage}%` }} />
                </div>
              </div>
            </div>

            {/* Gender Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-300 flex items-center gap-1">
                    <span>👨🏾‍🎓</span> Male
                  </span>
                  <span className="font-mono font-bold text-blue-400">{malePercentage}%</span>
                </div>
                <div className="text-xl font-black text-slate-100 font-mono">
                  {maleCount} <span className="text-xs text-slate-400 font-normal">Students</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-800/40 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-pink-300 flex items-center gap-1">
                    <span>👩🏾‍🎓</span> Female
                  </span>
                  <span className="font-mono font-bold text-pink-400">{femalePercentage}%</span>
                </div>
                <div className="text-xl font-black text-slate-100 font-mono">
                  {femaleCount} <span className="text-xs text-slate-400 font-normal">Students</span>
                </div>
              </div>
            </div>

            {/* Enrolled Students Breakdown by Gender List */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Enrolled Candidates by Gender:
              </span>

              {/* Male Learners */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-blue-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>👨🏾‍🎓</span> Male Candidates ({maleCount})
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Form 4 CS</span>
                </div>
                <div className="space-y-1.5">
                  {maleStudents.map(s => {
                    const cov = studentsWithCoverage.find(item => item.student.id === s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedStudentForDetail(s)}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-blue-900/30 hover:border-blue-500/60 transition cursor-pointer flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-base">{s.avatar}</span>
                          <div>
                            <span className="font-bold text-slate-200 group-hover:text-blue-300 transition block">
                              {s.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{s.id} • Lvl {s.level}</span>
                          </div>
                        </div>
                        <div className="text-right flex items-center space-x-2">
                          <div>
                            <span className="font-mono font-bold text-blue-400 block">
                              {cov?.coveragePct ?? 0}% Coverage
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {cov?.coveredCount ?? 0}/11 Topics
                            </span>
                          </div>
                          <Eye className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Female Learners */}
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-semibold text-pink-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>👩🏾‍🎓</span> Female Candidates ({femaleCount})
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Form 4 CS</span>
                </div>
                <div className="space-y-1.5">
                  {femaleStudents.map(s => {
                    const cov = studentsWithCoverage.find(item => item.student.id === s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedStudentForDetail(s)}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-pink-900/30 hover:border-pink-500/60 transition cursor-pointer flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-base">{s.avatar}</span>
                          <div>
                            <span className="font-bold text-slate-200 group-hover:text-pink-300 transition block">
                              {s.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{s.id} • Lvl {s.level}</span>
                          </div>
                        </div>
                        <div className="text-right flex items-center space-x-2">
                          <div>
                            <span className="font-mono font-bold text-pink-400 block">
                              {cov?.coveragePct ?? 0}% Coverage
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {cov?.coveredCount ?? 0}/11 Topics
                            </span>
                          </div>
                          <Eye className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400 transition" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            💡 <b>MoPSE Gender Policy:</b> Promoting inclusive STEM and computer science participation across both female and male high school candidates.
          </div>
        </div>

        {/* GRAPH 2: Percentage of Curriculum Covered in Quartiles */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold text-slate-100 text-sm">Curriculum Coverage by Learners (Quartiles)</h3>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-400">
              Avg: {avgCohortCoverage}% Covered
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Enrolled learners categorized into 4 progression quartiles based on completion of the 11 Form 4 syllabus modules:
          </p>

          {/* Quartile Distribution Bars & Enrolled Learners Lists */}
          <div className="space-y-4 pt-1">
            {/* Quartile 1: 0% - 25% */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">
                  Quartile 1: <span className="text-rose-400">0% – 25% Coverage</span> (Starter / Remedial Pace)
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {quartile1.length} Learners ({totalStudents > 0 ? Math.round((quartile1.length / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalStudents > 0 ? (quartile1.length / totalStudents) * 100 : 0}%` }}
                />
              </div>

              {/* Students in Quartile 1 */}
              <div className="pt-1.5 space-y-1">
                {quartile1.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">No candidates currently in this quartile</span>
                ) : (
                  quartile1.map(({ student: s, coveragePct, coveredCount, avgMastery }) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudentForDetail(s)}
                      className="p-2 rounded-lg bg-slate-900/80 border border-rose-900/30 hover:border-rose-500/50 transition cursor-pointer flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{s.avatar}</span>
                        <div>
                          <span className="font-bold text-slate-200 group-hover:text-rose-300 transition">
                            {s.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono ml-1.5">({s.gender} • {s.id})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {coveragePct}% ({coveredCount}/11 topics)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Mastery: {avgMastery}%</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quartile 2: 26% - 50% */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">
                  Quartile 2: <span className="text-amber-400">26% – 50% Coverage</span> (Developing Progression)
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {quartile2.length} Learners ({totalStudents > 0 ? Math.round((quartile2.length / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalStudents > 0 ? (quartile2.length / totalStudents) * 100 : 0}%` }}
                />
              </div>

              {/* Students in Quartile 2 */}
              <div className="pt-1.5 space-y-1">
                {quartile2.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">No candidates currently in this quartile</span>
                ) : (
                  quartile2.map(({ student: s, coveragePct, coveredCount, avgMastery }) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudentForDetail(s)}
                      className="p-2 rounded-lg bg-slate-900/80 border border-amber-900/30 hover:border-amber-500/50 transition cursor-pointer flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{s.avatar}</span>
                        <div>
                          <span className="font-bold text-slate-200 group-hover:text-amber-300 transition">
                            {s.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono ml-1.5">({s.gender} • {s.id})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {coveragePct}% ({coveredCount}/11 topics)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Mastery: {avgMastery}%</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quartile 3: 51% - 75% */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">
                  Quartile 3: <span className="text-teal-400">51% – 75% Coverage</span> (Proficient Pace • 51%+ Milestone)
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {quartile3.length} Learners ({totalStudents > 0 ? Math.round((quartile3.length / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalStudents > 0 ? (quartile3.length / totalStudents) * 100 : 0}%` }}
                />
              </div>

              {/* Students in Quartile 3 */}
              <div className="pt-1.5 space-y-1">
                {quartile3.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">No candidates currently in this quartile</span>
                ) : (
                  quartile3.map(({ student: s, coveragePct, coveredCount, avgMastery }) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudentForDetail(s)}
                      className="p-2 rounded-lg bg-slate-900/80 border border-teal-900/30 hover:border-teal-500/50 transition cursor-pointer flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{s.avatar}</span>
                        <div>
                          <span className="font-bold text-slate-200 group-hover:text-teal-300 transition">
                            {s.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono ml-1.5">({s.gender} • {s.id})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          {coveragePct}% ({coveredCount}/11 topics)
                        </span>
                        <span className="text-[10px] text-teal-400 font-semibold">51%+ Active</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quartile 4: 76% - 100% */}
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">
                  Quartile 4: <span className="text-emerald-400">76% – 100% Coverage</span> (Exam Ready / Distinction)
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {quartile4.length} Learners ({totalStudents > 0 ? Math.round((quartile4.length / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalStudents > 0 ? (quartile4.length / totalStudents) * 100 : 0}%` }}
                />
              </div>

              {/* Students in Quartile 4 */}
              <div className="pt-1.5 space-y-1">
                {quartile4.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">No candidates currently in this quartile</span>
                ) : (
                  quartile4.map(({ student: s, coveragePct, coveredCount, avgMastery }) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudentForDetail(s)}
                      className="p-2 rounded-lg bg-slate-900/80 border border-emerald-900/30 hover:border-emerald-500/50 transition cursor-pointer flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{s.avatar}</span>
                        <div>
                          <span className="font-bold text-slate-200 group-hover:text-emerald-300 transition">
                            {s.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono ml-1.5">({s.gender} • {s.id})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {coveragePct}% ({coveredCount}/11 topics)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          {coveragePct === 100 ? '⭐ Complete' : 'Distinction Ready'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
            <span>🎯 <b>51%+ Coverage Threshold:</b> Eligible learners receive automated weekly revision push reminders.</span>
          </div>
        </div>
      </div>

      {/* ENROLLED STUDENTS ACADEMIC PROGRESS MATRIX (All 5 Candidates Data by Gender & Curriculum Coverage) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Cohort Roster ({totalStudents} Enrolled)
              </span>
              <span className="text-xs text-slate-400 font-mono">Form 4 CS Candidates</span>
            </div>
            <h2 className="text-xl font-black text-slate-100 mt-1">
              Enrolled Learners Directory & Curriculum Coverage Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Detailed candidate breakdown displaying individual curriculum coverage, gender demographic, quartile pacing, and topic mastery:
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Gender filter */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['All', 'Male', 'Female'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGenderTab(g)}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    selectedGenderTab === g
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g === 'All' ? 'All Genders' : g === 'Male' ? '👨🏾‍🎓 Male' : '👩🏾‍🎓 Female'}
                </button>
              ))}
            </div>

            {/* Quartile filter */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['All', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map(q => (
                <button
                  key={q}
                  onClick={() => setSelectedQuartileFilter(q)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    selectedQuartileFilter === q
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidate by name, username, or student ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Filtered Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4 font-bold">Candidate</th>
                <th className="py-3 px-3 font-bold">Gender</th>
                <th className="py-3 px-3 font-bold">Curriculum Coverage</th>
                <th className="py-3 px-3 font-bold">Quartile Tier</th>
                <th className="py-3 px-3 font-bold">Avg Mastery</th>
                <th className="py-3 px-3 font-bold">XP & Level</th>
                <th className="py-3 px-3 font-bold text-right">Topic Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {studentsWithCoverage
                .filter(item => {
                  if (selectedGenderTab !== 'All' && item.student.gender !== selectedGenderTab) return false;
                  if (selectedQuartileFilter !== 'All' && item.quartile !== selectedQuartileFilter) return false;
                  if (searchTerm.trim()) {
                    const q = searchTerm.toLowerCase();
                    return (
                      item.student.name.toLowerCase().includes(q) ||
                      item.student.id.toLowerCase().includes(q) ||
                      item.student.username.toLowerCase().includes(q)
                    );
                  }
                  return true;
                })
                .map(({ student: s, coveragePct, coveredCount, avgMastery, quartile, quartileLabel }) => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-850/60 transition group cursor-pointer"
                    onClick={() => setSelectedStudentForDetail(s)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl p-1 bg-slate-800 rounded-xl">{s.avatar}</span>
                        <div>
                          <div className="font-extrabold text-slate-100 group-hover:text-emerald-400 transition flex items-center space-x-1.5">
                            <span>{s.name}</span>
                            {coveragePct >= 51 && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-teal-500/20 text-teal-300 border border-teal-500/30">
                                51%+
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {s.id} • @{s.username} • Enrolled {s.enrolledDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          s.gender === 'Female'
                            ? 'bg-pink-950/60 text-pink-300 border border-pink-800/40'
                            : 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                        }`}
                      >
                        <span>{s.gender === 'Female' ? '👩🏾‍🎓' : '👨🏾‍🎓'}</span>
                        <span>{s.gender}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="font-bold text-slate-200">{coveragePct}%</span>
                          <span className="text-slate-400">{coveredCount}/11 Topics</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              coveragePct >= 75
                                ? 'bg-emerald-500'
                                : coveragePct >= 50
                                ? 'bg-teal-500'
                                : coveragePct >= 25
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${coveragePct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono border ${
                          quartile === 'Q4'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : quartile === 'Q3'
                            ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                            : quartile === 'Q2'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {quartile} ({quartile === 'Q4' ? '76-100%' : quartile === 'Q3' ? '51-75%' : quartile === 'Q2' ? '26-50%' : '0-25%'})
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5 font-mono">
                        <span
                          className={`font-black text-xs ${
                            avgMastery >= 75
                              ? 'text-emerald-400'
                              : avgMastery >= 50
                              ? 'text-teal-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {avgMastery}%
                        </span>
                        <span className="text-[10px] text-slate-500">Overall</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-mono text-xs">
                        <span className="font-bold text-amber-400">{s.xp} XP</span>
                        <span className="text-slate-400 text-[10px] block">Level {s.level}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedStudentForDetail(s);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition inline-flex items-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Inspect Syllabus</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED STUDENT SYLLABUS TOPIC COVERAGE INSPECTION MODAL */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="text-3xl p-2 bg-slate-800 rounded-2xl">{selectedStudentForDetail.avatar}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-black text-slate-100">{selectedStudentForDetail.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedStudentForDetail.gender === 'Female'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {selectedStudentForDetail.gender}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Candidate ID: {selectedStudentForDetail.id} • Enrolled {selectedStudentForDetail.enrolledDate} • {selectedStudentForDetail.xp} XP (Level {selectedStudentForDetail.level})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Quick Summary Gauge */}
            {(() => {
              const cov = studentsWithCoverage.find(item => item.student.id === selectedStudentForDetail.id);
              return (
                <div className="grid grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-semibold">Syllabus Coverage</span>
                    <span className="text-lg font-black font-mono text-emerald-400">
                      {cov?.coveragePct ?? 0}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">({cov?.coveredCount ?? 0}/11 topics)</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-semibold">Quartile Tier</span>
                    <span className="text-lg font-black font-mono text-indigo-400">
                      {cov?.quartile ?? 'Q1'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{cov?.quartileLabel}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-semibold">Avg Topic Mastery</span>
                    <span className="text-lg font-black font-mono text-teal-400">
                      {cov?.avgMastery ?? 0}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">Cohort Average</span>
                  </div>
                </div>
              );
            })()}

            {/* 11 Topics Mastery & Coverage Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                11 Form 4 Topics Mastery Breakdown:
              </h4>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {curriculum.map(topic => {
                  const mastery = selectedStudentForDetail.topicMastery?.[topic.id] || 0;
                  const isCovered = mastery >= 40 || selectedStudentForDetail.quizAttempts?.some(qa => qa.topicId === topic.id && qa.score >= 40);

                  return (
                    <div
                      key={topic.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        isCovered
                          ? 'bg-slate-950/60 border-slate-800'
                          : 'bg-rose-950/20 border-rose-900/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${isCovered ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                        <div>
                          <span className="font-mono font-bold text-emerald-400 mr-1.5">{topic.code}</span>
                          <span className="text-slate-200 font-semibold">{topic.title}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 font-mono">
                        <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              mastery >= 75
                                ? 'bg-emerald-500'
                                : mastery >= 40
                                ? 'bg-teal-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${mastery}%` }}
                          />
                        </div>
                        <span className={`font-bold w-10 text-right ${isCovered ? 'text-slate-200' : 'text-rose-400'}`}>
                          {mastery}%
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            isCovered
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {isCovered ? 'Covered' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: O' LEVEL EXAMINATION SUMMARY & WEIGHTING (Requirement 5) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official ZIMSEC Specification
              </span>
              <span className="text-xs text-slate-400">Form 4 National Examination Scheme</span>
            </div>
            <h2 className="text-xl font-black text-slate-100 mt-1">
              O' Level Examination Paper Summary & Mark Weightings
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            Total Composite: 100%
          </span>
        </div>

        {/* Visual Proportional Weighting Ribbon */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Overall Assessment Weighting Architecture:</span>
            <span>100% Total Grade Composition</span>
          </div>
          <div className="w-full h-6 rounded-xl bg-slate-800 overflow-hidden flex shadow-md">
            <div
              style={{ width: '10%' }}
              className="bg-emerald-600 h-full flex items-center justify-center text-[10px] font-bold text-white"
              title="Paper 1: 10%"
            >
              P1 (10%)
            </div>
            <div
              style={{ width: '30%' }}
              className="bg-blue-600 h-full flex items-center justify-center text-[10px] font-bold text-white border-l border-slate-900"
              title="Paper 2: 30%"
            >
              Paper 2: Structured (30%)
            </div>
            <div
              style={{ width: '40%' }}
              className="bg-indigo-600 h-full flex items-center justify-center text-[10px] font-bold text-white border-l border-slate-900"
              title="Paper 3: 40%"
            >
              Paper 3: Practical (40%)
            </div>
            <div
              style={{ width: '20%' }}
              className="bg-amber-600 h-full flex items-center justify-center text-[10px] font-bold text-white border-l border-slate-900"
              title="SBCA: 20%"
            >
              SBCA (20%)
            </div>
          </div>
        </div>

        {/* The 4 Paper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {examPapers.map(paper => (
            <div
              key={paper.code}
              className="p-5 rounded-2xl bg-slate-850 border border-slate-750 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    {paper.code}
                  </span>
                  <span className={`font-mono font-black text-sm ${paper.textColor}`}>
                    {paper.weight}% Weight
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-100">{paper.title}</h4>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  ⏱️ {paper.duration} • {paper.questions}
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{paper.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                Continuous & Summative alignment
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: SYLLABUS SUMMARY & COHORT TOPIC MASTERY RADAR (Requirement 4 & 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Summary of the 11 Form 4 Topics (Requirement 4) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Form 4 Syllabus Summary (8.34 – 8.44)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official curriculum core knowledge, values, and practical competencies:
              </p>
            </div>
            <button
              onClick={() => setActiveTab('curriculum')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>View Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {curriculum.map(topic => (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setActiveTab('curriculum');
                }}
                className="p-3.5 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800 transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-emerald-400">{topic.code}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 truncate max-w-[120px]">
                      {topic.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-200 group-hover:text-emerald-300 transition">
                    {topic.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{topic.description}</p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
                  <span>{topic.objectives.length} Objectives</span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">Read Topic →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cohort Topic Mastery Visualisation (Requirement 6) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <span>Cohort Average Mastery per Topic</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Visual comparison of class mastery across all 11 topics to guide teacher interventions:
            </p>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {topicMasteryAverages.map(({ topic, avg }) => (
              <div key={topic.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300 truncate max-w-[200px]">
                    <span className="font-mono text-emerald-400 mr-1.5">{topic.code}</span>
                    {topic.title}
                  </span>
                  <span className="font-mono font-bold text-slate-200">{avg}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      avg >= 75
                        ? 'bg-emerald-500'
                        : avg >= 50
                        ? 'bg-teal-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>High Mastery ($\ge$ 75%): <b className="text-emerald-400">Green</b></span>
            <span>Needs Focus ($&lt;$ 50%): <b className="text-rose-400">Rose</b></span>
          </div>
        </div>
      </div>

      {/* SECTION 6: CLASS LEADERBOARD (Requirement 1) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Form 4 Cohort Leaderboard & Hall of Fame</span>
          </h2>
          <span className="text-xs text-slate-400">Gamified Standings (Public XP & Badges)</span>
        </div>

        <Leaderboard compact={false} />
      </div>
    </div>
  );
};
