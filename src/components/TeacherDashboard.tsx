import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Trash2,
  MessageSquarePlus,
  BookOpen,
  PlusCircle,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Shield,
  FileSpreadsheet,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  LogOut,
  GraduationCap,
  KeyRound,
  UserCheck,
  RotateCcw,
  Trophy,
  Award,
  Bell,
  Send,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfileData, QuizQuestion, AdminProfileData } from '../types';

export const TeacherDashboard: React.FC = () => {
  const {
    students,
    teachers,
    curriculum,
    questions,
    addStudent,
    removeStudent,
    addTeacher,
    removeTeacher,
    updateTeacherPassword,
    resetLeaderboard,
    resetAchievements,
    resetCohortPerformance,
    addTeacherFeedback,
    deleteTeacherFeedback,
    addQuizQuestion,
    deleteQuizQuestion,
    awardPointsToStudent,
    isAdmin,
    currentUser,
    logout,
    setActiveTab,
    setIsLoginModalOpen
  } = useApp();

  const [activeSection, setActiveSection] = useState<'roster' | 'feedback' | 'curriculum-bank' | 'teachers' | 'reset-controls'>('roster');

  // Teacher password modal state
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [targetTeacherForPassword, setTargetTeacherForPassword] = useState<AdminProfileData | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  // Reset controls modal / confirmation states
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetActionType, setResetActionType] = useState<'leaderboard' | 'achievements' | 'all'>('leaderboard');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  // Weekly reminder dispatch modal state
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [targetStudentForReminder, setTargetStudentForReminder] = useState<StudentProfileData | null>(null);
  const [reminderCustomNote, setReminderCustomNote] = useState('');
  const [reminderSuccessMessage, setReminderSuccessMessage] = useState('');

  // Teacher modal / form states
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherUsername, setNewTeacherUsername] = useState('');
  const [newTeacherPassword, setNewTeacherPassword] = useState('');
  const [newTeacherTitle, setNewTeacherTitle] = useState('');
  const [addTeacherError, setAddTeacherError] = useState('');
  const [addTeacherSuccess, setAddTeacherSuccess] = useState('');

  // Modal / Form states
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentID, setNewStudentID] = useState(`CS2026-00${students.length + 1}`);
  const [newStudentUsername, setNewStudentUsername] = useState(`Student${students.length + 1}`);
  const [newStudentPassword, setNewStudentPassword] = useState(`student${students.length + 1}`);
  const [newStudentAvatar, setNewStudentAvatar] = useState('🧑🏾‍🎓');
  const [newStudentGender, setNewStudentGender] = useState<'Male' | 'Female'>('Male');
  const [addStudentError, setAddStudentError] = useState('');

  // Feedback form state
  const [selectedStudentForFeedback, setSelectedStudentForFeedback] = useState<string>(
    students[0]?.id || ''
  );
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackTopicId, setFeedbackTopicId] = useState('8.34');
  const [feedbackSentiment, setFeedbackSentiment] = useState<'positive' | 'constructive' | 'urgent'>('positive');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  // Add Question form state
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [qTopicId, setQTopicId] = useState('8.36');
  const [qText, setQText] = useState('');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qCorrectIndex, setQCorrectIndex] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qDifficulty, setQDifficulty] = useState<'Foundation' | 'Standard' | 'Distinction'>('Standard');

  if (!isAdmin) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
        <Shield className="w-12 h-12 text-indigo-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100">Teacher Administrator Access Only</h2>
        <p className="text-xs text-slate-400">
          To manage learners, write personalized academic feedback, and review curriculum questions, please sign in as an Administrator.
        </p>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
        >
          Login as Administrator (Admin / admin)
        </button>
      </div>
    );
  }

  // Calculate cohort performance metrics
  const totalStudents = students.length;
  const allAttempts = students.flatMap(s => s.quizAttempts);
  const classAvgScore =
    allAttempts.length > 0
      ? Math.round(allAttempts.reduce((acc, a) => acc + a.score, 0) / allAttempts.length)
      : 0;
  const distinctionStudents = students.filter(s => {
    const scores = s.quizAttempts.map(a => a.score);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return avg >= 75;
  }).length;
  const interventionStudents = students.filter(s => {
    const scores = s.quizAttempts.map(a => a.score);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return scores.length > 0 && avg < 50;
  }).length;

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setAddStudentError('');

    if (!newStudentName || !newStudentID || !newStudentUsername || !newStudentPassword) {
      setAddStudentError('All student fields are required.');
      return;
    }

    const res = addStudent({
      id: newStudentID.trim(),
      name: newStudentName.trim(),
      username: newStudentUsername.trim(),
      password: newStudentPassword.trim(),
      avatar: newStudentAvatar,
      gender: newStudentGender,
      enrolledDate: new Date().toISOString().split('T')[0]
    });

    if (!res.success) {
      setAddStudentError(res.error || 'Failed to add student.');
    } else {
      setIsAddStudentOpen(false);
      setNewStudentName('');
      setNewStudentID(`CS2026-00${students.length + 2}`);
      setNewStudentUsername(`Student${students.length + 2}`);
      setNewStudentPassword(`student${students.length + 2}`);
    }
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    const topicObj = curriculum.find(t => t.id === feedbackTopicId);

    addTeacherFeedback(selectedStudentForFeedback, {
      teacherName: 'Mr. C. Gumbo',
      topicId: feedbackTopicId,
      topicTitle: topicObj ? topicObj.title : 'General Computer Science',
      message: feedbackMessage.trim(),
      sentiment: feedbackSentiment
    });

    setFeedbackMessage('');
    setFeedbackSuccess('Personalized feedback note published to student portal!');
    setTimeout(() => setFeedbackSuccess(''), 3000);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qOptA || !qOptB || !qOptC || !qOptD || !qExplanation) return;

    const topicObj = curriculum.find(t => t.id === qTopicId);

    addQuizQuestion({
      topicId: qTopicId,
      topicTitle: topicObj ? topicObj.title : 'Form 4 Assessment',
      paperType: 'Paper 1 (MCQ)',
      question: qText.trim(),
      options: [qOptA.trim(), qOptB.trim(), qOptC.trim(), qOptD.trim()],
      correctAnswerIndex: qCorrectIndex,
      explanation: qExplanation.trim(),
      difficulty: qDifficulty,
      examYear: 'Teacher Continuous Assessment'
    });

    setIsAddQuestionOpen(false);
    setQText('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQExplanation('');
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    setAddTeacherError('');

    if (!newTeacherName.trim() || !newTeacherUsername.trim() || !newTeacherPassword.trim()) {
      setAddTeacherError('All teacher fields are required.');
      return;
    }

    const res = addTeacher({
      name: newTeacherName.trim(),
      username: newTeacherUsername.trim(),
      password: newTeacherPassword.trim(),
      title: newTeacherTitle.trim() || 'Computer Science Teacher'
    });

    if (!res.success) {
      setAddTeacherError(res.error || 'Failed to add teacher.');
    } else {
      setIsAddTeacherOpen(false);
      setNewTeacherName('');
      setNewTeacherUsername('');
      setNewTeacherPassword('');
      setNewTeacherTitle('');
      setAddTeacherSuccess('New teacher account created successfully!');
      setTimeout(() => setAddTeacherSuccess(''), 3000);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    if (!targetTeacherForPassword) return;
    if (!newPasswordInput.trim()) {
      setPasswordChangeError('Password cannot be empty.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }
    if (newPasswordInput.trim().length < 3) {
      setPasswordChangeError('Password must be at least 3 characters.');
      return;
    }

    const res = updateTeacherPassword(targetTeacherForPassword.id, newPasswordInput.trim());
    if (!res.success) {
      setPasswordChangeError(res.error || 'Failed to update password.');
    } else {
      setPasswordChangeSuccess(`Password for ${targetTeacherForPassword.name} updated successfully!`);
      setTimeout(() => {
        setIsChangePasswordOpen(false);
        setPasswordChangeSuccess('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
        setTargetTeacherForPassword(null);
      }, 1500);
    }
  };

  const handleExecuteReset = () => {
    if (resetActionType === 'leaderboard') {
      resetLeaderboard();
      setResetSuccessMessage('Class Leaderboard rankings and XP have been reset to 0 for a fresh term!');
    } else if (resetActionType === 'achievements') {
      resetAchievements();
      setResetSuccessMessage('Learner achievements and badges have been reset for all students!');
    } else if (resetActionType === 'all') {
      resetCohortPerformance();
      setResetSuccessMessage('Complete cohort performance, XP, and test scores have been reset!');
    }
    setIsResetConfirmOpen(false);
    setTimeout(() => setResetSuccessMessage(''), 4000);
  };

  const handleDispatchWeeklyReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudentForReminder) return;

    // Remaining topics for this student
    const unmastered = curriculum.filter(
      t => (targetStudentForReminder.topicMastery?.[t.id] || 0) < 40 &&
           !targetStudentForReminder.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40)
    );

    const topicNames = unmastered.map(t => `${t.code}`).join(', ');
    const defaultMsg = `Automated Weekly Revision Push (51%+ Milestone): You have ${unmastered.length} remaining Form 4 topics to complete before your ZIMSEC examination. Focus this week on: ${topicNames}.`;
    const messageToSend = reminderCustomNote.trim() || defaultMsg;

    addTeacherFeedback(targetStudentForReminder.id, {
      teacherName: currentTeacher?.name || 'Mr. C. Gumbo',
      topicId: unmastered[0]?.id || '8.34',
      topicTitle: 'Weekly Revision Push: Topics Yet to Cover',
      message: messageToSend,
      sentiment: 'constructive'
    });

    setReminderSuccessMessage(`Weekly revision reminder successfully pushed to ${targetStudentForReminder.name}!`);
    setTimeout(() => {
      setIsReminderModalOpen(false);
      setReminderSuccessMessage('');
      setReminderCustomNote('');
      setTargetStudentForReminder(null);
    }, 1500);
  };

  const activeFeedbackStudent = students.find(s => s.id === selectedStudentForFeedback);
  const currentTeacher = currentUser && 'role' in currentUser ? (currentUser as AdminProfileData) : null;

  if (!isAdmin || !currentTeacher) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
        <Shield className="w-12 h-12 text-indigo-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100">Teacher Portal Authentication Required</h2>
        <p className="text-xs text-slate-400">
          The application default status is signed out. This portal is reserved for authorized Zimbabwe Computer Science teachers and school administrators. Please sign in with your faculty credentials.
        </p>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
        >
          Teacher / Admin Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner with Teacher Profile & Logout Option */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Top Active Account Bar with Logout Option */}
        <div className="pb-4 mb-5 border-b border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold">
              👨🏾‍🏫
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-100">
                  Signed in as: <span className="text-emerald-400">{currentTeacher?.name || 'Administrator'}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">(@{currentTeacher?.username || 'Admin'})</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  {currentTeacher?.title || 'Teacher & Admin'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Ability for admin / teacher to set their own password */}
            <button
              onClick={() => {
                setTargetTeacherForPassword(currentTeacher || teachers[0]);
                setNewPasswordInput('');
                setConfirmPasswordInput('');
                setPasswordChangeError('');
                setPasswordChangeSuccess('');
                setIsChangePasswordOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs transition shadow-sm w-fit"
              title="Set or update your teacher login password"
            >
              <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
              <span>Set My Password</span>
            </button>

            {/* Teacher Logout Option (Requirement) */}
            <button
              onClick={() => {
                logout();
                setActiveTab('dashboard');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs transition shadow-sm w-fit"
              title="Log out from Teacher Administrator account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Administrator & Teacher Suite
              </span>
              <span className="text-xs text-slate-400">Class of 2026 • Form 4 Computer Science</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 mt-2">
              Teacher Instruction & Assessment Control Centre
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Monitor individual learner mastery across all 11 topics, dispatch personalized academic guidance, manage class rosters, and review exam questions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Ability to add new teachers button (Requirement) */}
            <button
              onClick={() => setIsAddTeacherOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Teacher</span>
            </button>
            <button
              onClick={() => setIsAddStudentOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll New Learner</span>
            </button>
          </div>
        </div>

        {/* Cohort Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-900/40">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Enrolled Learners</span>
            <span className="text-2xl font-black text-slate-100 font-mono">{totalStudents}</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Cohort Average</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">{classAvgScore}%</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Distinction Candidates (A)</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{distinctionStudents}</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block">Staff / Teachers</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">{teachers.length} Teachers</span>
          </div>
        </div>
      </div>

      {addTeacherSuccess && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{addTeacherSuccess}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-1 sm:pb-0">
        <button
          onClick={() => setActiveSection('roster')}
          className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 whitespace-nowrap ${
            activeSection === 'roster'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Learner Roster & Progress</span>
        </button>
        <button
          onClick={() => setActiveSection('feedback')}
          className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 whitespace-nowrap ${
            activeSection === 'feedback'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Personalized Feedback Manager</span>
        </button>
        <button
          onClick={() => setActiveSection('curriculum-bank')}
          className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 whitespace-nowrap ${
            activeSection === 'curriculum-bank'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Curriculum & Questions Reviewer</span>
        </button>
        <button
          onClick={() => setActiveSection('teachers')}
          className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 whitespace-nowrap ${
            activeSection === 'teachers'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Staff & Teachers ({teachers.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('reset-controls')}
          className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 whitespace-nowrap ${
            activeSection === 'reset-controls'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Reset Leaderboard & Badges</span>
        </button>
      </div>

      {/* SECTION 1: LEARNER ROSTER */}
      {activeSection === 'roster' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-slate-200 text-sm">Class of Learners</h3>
            <span className="text-xs text-slate-400">Total {students.length} Registered</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Learner</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Login Username</th>
                  <th className="py-3 px-4 text-center">Level / XP</th>
                  <th className="py-3 px-4 text-center">Avg Score</th>
                  <th className="py-3 px-4 text-center">Curriculum (51%+ Push)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {students.map(s => {
                  const scores = s.quizAttempts.map(a => a.score);
                  const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
                  const coveredCount = curriculum.filter(
                    t => (s.topicMastery?.[t.id] || 0) >= 40 || s.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40)
                  ).length;
                  const coveragePct = Math.round((coveredCount / curriculum.length) * 100);
                  const reached51 = coveragePct >= 51;

                  return (
                    <tr key={s.id} className="hover:bg-slate-850/60 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{s.avatar}</span>
                          <div>
                            <span className="font-bold text-slate-100 block">{s.name}</span>
                            <span className="text-[10px] text-slate-400">Joined {s.enrolledDate}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        {s.id}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {s.username}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                          Lvl {s.level} ({s.xp} XP)
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-bold font-mono ${
                            avg >= 75 ? 'text-emerald-400' : avg >= 50 ? 'text-amber-400' : 'text-rose-400'
                          }`}
                        >
                          {avg}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-mono font-bold text-slate-200">{coveragePct}%</span>
                            <span className="text-[10px] text-slate-400">({coveredCount}/11)</span>
                          </div>
                          {reached51 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                              <Bell className="w-2.5 h-2.5 text-teal-300" />
                              <span>51%+ Push Active</span>
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-800">
                              Needs {Math.ceil(11 * 0.51) - coveredCount} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {reached51 && (
                            <button
                              onClick={() => {
                                setTargetStudentForReminder(s);
                                setReminderCustomNote('');
                                setReminderSuccessMessage('');
                                setIsReminderModalOpen(true);
                              }}
                              className="px-2 py-1 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-700/60 text-teal-300 text-[11px] font-semibold transition flex items-center space-x-1"
                              title="Dispatch weekly reminder of remaining topics"
                            >
                              <Send className="w-3 h-3" />
                              <span>Push Reminder</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              awardPointsToStudent(s.id, 50, 'Teacher Recognition Bonus');
                            }}
                            className="px-2 py-1 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-700/60 text-amber-300 text-[11px] font-semibold transition"
                            title="Award +50 Recognition / Attendance Points to this learner"
                          >
                            +50 XP
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudentForFeedback(s.id);
                              setActiveSection('feedback');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 text-[11px] font-semibold transition"
                          >
                            Feedback
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove learner ${s.name} (${s.id}) from the system?`)) {
                                removeStudent(s.id);
                              }
                            }}
                            title="Remove Learner"
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: PERSONALIZED FEEDBACK MANAGER */}
      {activeSection === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Compose Feedback */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-indigo-400" />
              <span>Compose Personalized Guidance</span>
            </h3>

            {feedbackSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{feedbackSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSendFeedback} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Target Learner
                </label>
                <select
                  value={selectedStudentForFeedback}
                  onChange={e => setSelectedStudentForFeedback(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.id} - @{s.username})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Relevant Form 4 Syllabus Topic
                </label>
                <select
                  value={feedbackTopicId}
                  onChange={e => setFeedbackTopicId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {curriculum.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.code}: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Feedback Tone / Urgency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['positive', 'constructive', 'urgent'] as const).map(tone => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setFeedbackSentiment(tone)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold uppercase transition border ${
                        feedbackSentiment === tone
                          ? tone === 'positive'
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : tone === 'constructive'
                            ? 'bg-amber-600 border-amber-500 text-white'
                            : 'bg-rose-600 border-rose-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Personalized Comment & Study Advice
                </label>
                <textarea
                  value={feedbackMessage}
                  onChange={e => setFeedbackMessage(e.target.value)}
                  rows={4}
                  placeholder="e.g. Great improvement on Truth Tables! Remember that pre-condition WHILE loops can execute zero times. Download the offline study pack for Topic 8.40."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-950/40 transition"
              >
                Send Feedback to Learner Portal
              </button>
            </form>
          </div>

          {/* Right: Selected Student Feedback History & Progress */}
          <div className="lg:col-span-6 space-y-6">
            {activeFeedbackStudent ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">{activeFeedbackStudent.avatar}</span>
                  <div>
                    <h4 className="font-extrabold text-slate-100 text-sm">
                      {activeFeedbackStudent.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeFeedbackStudent.id} • Lvl {activeFeedbackStudent.level} • {activeFeedbackStudent.xp} XP
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Active Feedback Records ({activeFeedbackStudent.teacherFeedback.length})
                  </span>

                  {activeFeedbackStudent.teacherFeedback.map(fb => (
                    <div
                      key={fb.id}
                      className="p-3.5 rounded-xl bg-slate-850 border border-slate-750 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{fb.topicTitle || 'General'}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-slate-500 font-mono">{fb.date}</span>
                          <button
                            onClick={() => deleteTeacherFeedback(activeFeedbackStudent.id, fb.id)}
                            className="text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-300 leading-relaxed italic">"{fb.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* SECTION 3: CURRICULUM & QUESTIONS REVIEWER */}
      {activeSection === 'curriculum-bank' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div>
              <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Form 4 Examination Question Bank</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Total {questions.length} Questions across all Form 4 Syllabus Modules
              </p>
            </div>

            <button
              onClick={() => setIsAddQuestionOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Custom Examination Question</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-emerald-400">{q.topicId}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {q.difficulty}
                      </span>
                      <button
                        onClick={() => deleteQuizQuestion(q.id)}
                        className="text-slate-500 hover:text-rose-400"
                        title="Delete question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs leading-snug">{q.question}</h4>

                  <div className="mt-3 space-y-1 text-[11px]">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-1.5 rounded-lg border ${
                          oIdx === q.correctAnswerIndex
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold'
                            : 'bg-slate-850 border-slate-800 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-400 italic">
                  💡 {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: TEACHERS & STAFF MANAGEMENT */}
      {activeSection === 'teachers' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Authorized Teachers & Department Staff</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Teachers have administrative access to manage learners, review syllabus questions, and provide feedback.
                </p>
              </div>

              <button
                onClick={() => setIsAddTeacherOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md w-fit"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add New Teacher</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Teacher</th>
                    <th className="py-3 px-4">Login Username</th>
                    <th className="py-3 px-4">Department Title / Role</th>
                    <th className="py-3 px-4 text-center">Account Type</th>
                    <th className="py-3 px-4 text-center">Date Registered</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {teachers.map(t => {
                    const isCurrent = currentTeacher?.id === t.id || currentTeacher?.username.toLowerCase() === t.username.toLowerCase();
                    return (
                      <tr key={t.id} className="hover:bg-slate-850/60 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-sm font-bold text-indigo-300">
                              👨🏾‍🏫
                            </div>
                            <div>
                              <span className="font-bold text-slate-100 flex items-center gap-1.5">
                                {t.name}
                                {isCurrent && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">
                                    YOU
                                  </span>
                                )}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">ID: {t.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-indigo-300">
                          @{t.username}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {t.title}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {t.isDefaultMaster ? (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                              Primary HoD (Master)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase">
                              Instructor
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                          {t.enrolledDate || '2026-01-01'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                setTargetTeacherForPassword(t);
                                setNewPasswordInput('');
                                setConfirmPasswordInput('');
                                setPasswordChangeError('');
                                setPasswordChangeSuccess('');
                                setIsChangePasswordOpen(true);
                              }}
                              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 text-[11px] font-semibold transition"
                              title="Set or update password"
                            >
                              <KeyRound className="w-3 h-3" />
                              <span>Set Password</span>
                            </button>
                            {!t.isDefaultMaster ? (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to remove teacher account "${t.name}" (@${t.username})?`)) {
                                    removeTeacher(t.id);
                                  }
                                }}
                                className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                                title="Remove teacher account"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start space-x-3">
            <KeyRound className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block mb-0.5">Faculty Credentials & Login Policy:</span>
              Newly created teachers can immediately sign into the system through the <b>Login as Administrator</b> tab using their designated username and password. Teachers and admins can set or update their password at any time.
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: RESET LEADERBOARD & ACHIEVEMENTS CONTROLS */}
      {activeSection === 'reset-controls' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Term Administration & Gamification Reset
              </span>
              <span className="text-xs text-slate-400">Teacher & Admin Authority</span>
            </div>
            <h3 className="text-xl font-black text-slate-100 mt-2">
              Cohort Leaderboard, Badges & Term Rollover Controls
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Reset gamified cohort rankings, XP scores, and achievement badges to begin a new school term, mock exam season, or diagnostic assessment cycle. Registered learner accounts and credentials remain safe.
            </p>
          </div>

          {resetSuccessMessage && (
            <div className="p-4 bg-emerald-950/70 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold">{resetSuccessMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {/* Card 1: Reset Leaderboard */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Reset Class Leaderboard</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Resets all learners' XP to 0, resets their level to Level 1, and clears past quiz attempt logs. Allows a fresh competition leaderboard for the new term.
                </p>
              </div>
              <button
                onClick={() => {
                  setResetActionType('leaderboard');
                  setIsResetConfirmOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600 border border-amber-500/40 text-amber-300 hover:text-white font-bold text-xs transition flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Leaderboard (XP & Levels)</span>
              </button>
            </div>

            {/* Card 2: Reset Achievements & Badges */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Reset Learner Achievements</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Clears earned badges across all students back to the starter badge. Students can re-unlock badges by mastering Form 4 topics again.
                </p>
              </div>
              <button
                onClick={() => {
                  setResetActionType('achievements');
                  setIsResetConfirmOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white font-bold text-xs transition flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Achievements & Badges</span>
              </button>
            </div>

            {/* Card 3: Reset Full Cohort Diagnostic Performance */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Full Cohort Diagnostic Reset</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Resets leaderboard XP, badges, AND clears topic mastery percentages to 0% for a full start-of-year baseline assessment. Student accounts are preserved.
                </p>
              </div>
              <button
                onClick={() => {
                  setResetActionType('all');
                  setIsResetConfirmOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white font-bold text-xs transition flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Mastery & Leaderboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>Enroll New Form 4 Learner</span>
              </h3>
              <button onClick={() => setIsAddStudentOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            {addStudentError && (
              <div className="p-3 bg-rose-950/50 border border-rose-800/50 rounded-xl text-xs text-rose-300">
                {addStudentError}
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tendai Chikore"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Student ID</label>
                  <input
                    type="text"
                    value={newStudentID}
                    onChange={e => setNewStudentID(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-100 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Gender</label>
                  <select
                    value={newStudentGender}
                    onChange={e => setNewStudentGender(e.target.value as 'Male' | 'Female')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-100 text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Avatar</label>
                  <select
                    value={newStudentAvatar}
                    onChange={e => setNewStudentAvatar(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-100 text-xs"
                  >
                    <option value="👨🏾‍🎓">👨🏾‍🎓 Male Grad</option>
                    <option value="👩🏾‍🎓">👩🏾‍🎓 Female Grad</option>
                    <option value="👨🏾‍💻">👨🏾‍💻 Male Coder</option>
                    <option value="👩🏾‍💻">👩🏾‍💻 Female Coder</option>
                    <option value="🧑🏾‍🎓">🧑🏾‍🎓 Neutral Grad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Username</label>
                  <input
                    type="text"
                    value={newStudentUsername}
                    onChange={e => setNewStudentUsername(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Password</label>
                  <input
                    type="text"
                    value={newStudentPassword}
                    onChange={e => setNewStudentPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Add Learner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM QUESTION */}
      {isAddQuestionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Create Form 4 Test Question</span>
              </h3>
              <button onClick={() => setIsAddQuestionOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs max-h-[500px] overflow-y-auto pr-1">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Syllabus Topic</label>
                <select
                  value={qTopicId}
                  onChange={e => setQTopicId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                >
                  {curriculum.map(t => (
                    <option key={t.id} value={t.id}>{t.code}: {t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Question Text</label>
                <textarea
                  rows={2}
                  value={qText}
                  onChange={e => setQText(e.target.value)}
                  placeholder="Enter multiple choice question..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-slate-400 font-semibold">Options (A, B, C, D)</label>
                <input
                  type="text"
                  placeholder="Option A"
                  value={qOptA}
                  onChange={e => setQOptA(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Option B"
                  value={qOptB}
                  onChange={e => setQOptB(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  value={qOptC}
                  onChange={e => setQOptC(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={qOptD}
                  onChange={e => setQOptD(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Correct Answer</label>
                  <select
                    value={qCorrectIndex}
                    onChange={e => setQCorrectIndex(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Difficulty</label>
                  <select
                    value={qDifficulty}
                    onChange={e => setQDifficulty(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Standard">Standard</option>
                    <option value="Distinction">Distinction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Explanation</label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={e => setQExplanation(e.target.value)}
                  placeholder="Explain why this option is correct for student review..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddQuestionOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TEACHER */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>Create New Teacher Account</span>
              </h3>
              <button onClick={() => setIsAddTeacherOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            {addTeacherError && (
              <div className="p-3 bg-rose-950/50 border border-rose-800/50 rounded-xl text-xs text-rose-300">
                {addTeacherError}
              </div>
            )}

            <form onSubmit={handleCreateTeacher} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Teacher Full Name & Title</label>
                <input
                  type="text"
                  placeholder="e.g. Mrs. T. Sibanda or Mr. P. Mutero"
                  value={newTeacherName}
                  onChange={e => setNewTeacherName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Subject Specialization / Department Title</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science Teacher - Networks & Security"
                  value={newTeacherTitle}
                  onChange={e => setNewTeacherTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Login Username</label>
                  <input
                    type="text"
                    placeholder="e.g. SibandaT or Teacher3"
                    value={newTeacherUsername}
                    onChange={e => setNewTeacherUsername(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Login Password</label>
                  <input
                    type="text"
                    placeholder="e.g. sibanda2026"
                    value={newTeacherPassword}
                    onChange={e => setNewTeacherPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                The new teacher will be granted full administrator access to track student progress and publish feedback notes.
              </p>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save & Authorize Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SET / CHANGE TEACHER PASSWORD */}
      {isChangePasswordOpen && targetTeacherForPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span>Set Teacher Password</span>
              </h3>
              <button onClick={() => setIsChangePasswordOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs space-y-1">
              <div className="font-bold text-indigo-200">
                Updating credentials for: <span className="text-white">{targetTeacherForPassword.name}</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                Username: @{targetTeacherForPassword.username} • {targetTeacherForPassword.title}
              </div>
            </div>

            {passwordChangeError && (
              <div className="p-3 bg-rose-950/60 border border-rose-800/60 rounded-xl text-xs text-rose-300">
                {passwordChangeError}
              </div>
            )}

            {passwordChangeSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{passwordChangeSuccess}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">New Password</label>
                <input
                  type="text"
                  placeholder="Enter new password (min. 3 characters)"
                  value={newPasswordInput}
                  onChange={e => setNewPasswordInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Confirm New Password</label>
                <input
                  type="text"
                  placeholder="Re-enter new password to verify"
                  value={confirmPasswordInput}
                  onChange={e => setConfirmPasswordInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                The password will take effect immediately for future logins under the Administrator portal tab.
              </p>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET CONFIRMATION */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>Confirm Reset Action</span>
              </h3>
              <button onClick={() => setIsResetConfirmOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl text-xs text-amber-200 leading-relaxed">
              {resetActionType === 'leaderboard' && (
                <>
                  You are about to <b>reset the cohort leaderboard</b>. All learners will have their XP reset to 0, level reset to 1, and past quiz attempt logs cleared. Student enrollment and accounts will NOT be deleted.
                </>
              )}
              {resetActionType === 'achievements' && (
                <>
                  You are about to <b>reset all learner badges & achievements</b>. All students will revert back to the starter badge to compete for badges afresh this term.
                </>
              )}
              {resetActionType === 'all' && (
                <>
                  You are about to <b>reset entire cohort diagnostic performance</b>. All XP, badges, and topic mastery percentages will be reset to 0% for a fresh term baseline assessment.
                </>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Are you sure you want to proceed with this rollover action?
            </p>

            <div className="pt-2 flex justify-end space-x-2 text-xs">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Confirm & Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DISPATCH WEEKLY PUSH REMINDER */}
      {isReminderModalOpen && targetStudentForReminder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-400" />
                <span>Weekly Revision Push (51%+ Milestone)</span>
              </h3>
              <button onClick={() => setIsReminderModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            {reminderSuccessMessage && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{reminderSuccessMessage}</span>
              </div>
            )}

            <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-200 flex items-center gap-2">
                  <span className="text-lg">{targetStudentForReminder.avatar}</span>
                  <span>{targetStudentForReminder.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({targetStudentForReminder.id})</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[10px]">
                  51%+ Milestone Achieved
                </span>
              </div>

              {/* List of Remaining Uncompleted Topics */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 text-[11px] font-semibold block mb-1.5">
                  Remaining Form 4 Topics to Cover:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {curriculum
                    .filter(
                      t => (targetStudentForReminder.topicMastery?.[t.id] || 0) < 40 &&
                           !targetStudentForReminder.quizAttempts?.some(qa => qa.topicId === t.id && qa.score >= 40)
                    )
                    .map(topic => (
                      <span
                        key={topic.id}
                        className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono"
                      >
                        <b className="text-teal-400">{topic.code}:</b> {topic.title}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleDispatchWeeklyReminder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Custom Teacher Revision Guidance (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Add specific instructions for this week's study focus..."
                  value={reminderCustomNote}
                  onChange={e => setReminderCustomNote(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsReminderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Weekly Reminder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
