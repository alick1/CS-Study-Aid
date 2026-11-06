import React, { useState } from 'react';
import { X, Shield, GraduationCap, Lock, KeyRound, AlertCircle, CheckCircle2, User, LogOut, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdminProfileData } from '../types';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginAsStudent,
    loginAsAdmin,
    logout,
    currentUser,
    isAdmin,
    students,
    teachers,
    setActiveTab
  } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'student' | 'admin'>('student');

  // Student form state
  const [studentIdentifier, setStudentIdentifier] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentError, setStudentError] = useState('');

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('Admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [alreadyLoggedInTeacherName, setAlreadyLoggedInTeacherName] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const currentTeacher = isAdmin && currentUser && 'role' in currentUser ? (currentUser as AdminProfileData) : null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    if (!studentIdentifier || !studentPassword) {
      setStudentError('Please provide both your Student ID / Username and Password.');
      return;
    }

    const res = loginAsStudent(studentIdentifier, studentPassword);
    if (!res.success) {
      setStudentError(res.error || 'Login failed.');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAlreadyLoggedInTeacherName(null);

    if (!adminUsername || !adminPassword) {
      setAdminError('Please provide both teacher username and password.');
      return;
    }

    const res = loginAsAdmin(adminUsername, adminPassword);
    if (!res.success) {
      if (res.alreadyLoggedIn) {
        setAlreadyLoggedInTeacherName(res.teacherName || 'Teacher');
      }
      setAdminError(res.error || 'Admin login failed.');
    } else {
      setActiveTab('teacher-portal');
    }
  };

  const handleQuickStudentSelect = (studentId: string, username: string, pw: string) => {
    setStudentIdentifier(studentId);
    setStudentPassword(pw);
    setStudentError('');
  };

  const handleQuickTeacherSelect = (username: string, pw?: string) => {
    setAdminUsername(username);
    if (pw) setAdminPassword(pw);
    setAdminError('');
    setAlreadyLoggedInTeacherName(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-100">ZimCS4 Portal Access</h2>
              <p className="text-xs text-slate-400">Secure Authentication & Multi-Teacher Management</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => {
              setActiveTabLocal('student');
              setStudentError('');
            }}
            className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center space-x-2 transition border-b-2 ${
              activeTab === 'student'
                ? 'border-emerald-500 text-emerald-400 bg-slate-850/70'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Learner / Student Login</span>
          </button>
          <button
            onClick={() => {
              setActiveTabLocal('admin');
              setAdminError('');
              setAlreadyLoggedInTeacherName(null);
            }}
            className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center space-x-2 transition border-b-2 ${
              activeTab === 'admin'
                ? 'border-indigo-500 text-indigo-400 bg-slate-850/70'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Login as Administrator</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'student' ? (
            <div>
              <div className="mb-4 p-3 bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-start space-x-2.5">
                <span className="text-xl">🎁</span>
                <div>
                  <span className="font-bold text-emerald-300 block mb-0.5">Daily Attendance & Sign-In Reward:</span>
                  <span>Every sign-in awards <b className="text-white bg-emerald-700/50 px-1.5 py-0.2 rounded font-mono">+50 XP points</b> towards your Form 4 cohort leaderboard standing! Your personal academic results remain completely private to you.</span>
                </div>
              </div>

              {studentError && (
                <div className="mb-4 p-3 bg-rose-950/50 border border-rose-800/50 rounded-xl text-xs text-rose-300 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{studentError}</span>
                </div>
              )}

              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Student ID or Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={studentIdentifier}
                      onChange={e => setStudentIdentifier(e.target.value)}
                      placeholder="e.g. CS2026-001 or Student1"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={studentPassword}
                      onChange={e => setStudentPassword(e.target.value)}
                      placeholder="e.g. student1"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition flex items-center justify-center space-x-2"
                >
                  <span>Sign In as Learner (+50 XP Bonus)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Seed Data Fast Selector */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Seed Learners (Click to auto-populate):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {students.slice(0, 5).map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleQuickStudentSelect(s.id, s.username, s.password)}
                      className={`p-2 rounded-lg text-left border transition text-xs flex items-center justify-between ${
                        studentIdentifier === s.id
                          ? 'bg-emerald-950/60 border-emerald-500 text-white'
                          : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="text-base">{s.avatar}</span>
                        <div className="truncate">
                          <span className="font-semibold block truncate">{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{s.username} • {s.id}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-amber-300 font-bold flex-shrink-0">
                        {s.xp} XP
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Requirement: Check if teacher is already logged in, and notify */}
              {currentTeacher ? (
                <div className="mb-5 p-4 bg-indigo-950/70 border-2 border-indigo-500/80 rounded-2xl text-xs text-indigo-200 space-y-3 shadow-lg">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-black text-sm text-slate-100 block">
                        Teacher Account Currently Active!
                      </span>
                      <span className="text-indigo-300">
                        You are already logged in as <b>{currentTeacher.name}</b> (@{currentTeacher.username})
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    Role: <span className="text-emerald-400 font-semibold">{currentTeacher.title}</span>. You already have full access to class rosters, curriculum, and learner feedback.
                  </p>

                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginModalOpen(false);
                        setActiveTab('teacher-portal');
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
                    >
                      <span>Go to Teacher Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setAdminError('');
                        setAlreadyLoggedInTeacherName(null);
                      }}
                      className="py-2 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/60 font-bold text-xs flex items-center space-x-1.5 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-300">
                  <span className="font-semibold block mb-0.5">Teacher & Administrator Authentication:</span>
                  Log in to track class-wide mastery, enroll learners, add new teachers, and publish personalized feedback.
                </div>
              )}

              {adminError && (
                <div className="mb-4 p-3 bg-amber-950/50 border border-amber-800/60 rounded-xl text-xs text-amber-200 flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                    <span>{adminError}</span>
                  </div>
                  {alreadyLoggedInTeacherName && (
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setAdminError('');
                        setAlreadyLoggedInTeacherName(null);
                      }}
                      className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] whitespace-nowrap"
                    >
                      Log Out Now
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Teacher / Admin Username
                  </label>
                  <div className="relative">
                    <Shield className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={adminUsername}
                      onChange={e => setAdminUsername(e.target.value)}
                      placeholder="e.g. Admin or Teacher2"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Default credentials: <b>Admin</b> / <b>admin</b></span>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminUsername('Admin');
                      setAdminPassword('admin');
                      setAdminError('');
                    }}
                    className="text-indigo-400 hover:text-indigo-300 underline font-medium"
                  >
                    Auto-Fill Default Admin
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-900/30 transition"
                >
                  Access Teacher / Admin Dashboard
                </button>
              </form>

              {/* Registered Teachers Quick List */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Registered Teachers in System ({teachers.length}):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                  {teachers.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleQuickTeacherSelect(t.username, t.password)}
                      className={`p-2 rounded-lg text-left border transition text-xs flex items-center justify-between ${
                        adminUsername.toLowerCase() === t.username.toLowerCase()
                          ? 'bg-indigo-950/60 border-indigo-500 text-white'
                          : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="truncate">
                        <span className="font-semibold block truncate text-slate-200">{t.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">@{t.username} • {t.title.split(' ')[0]}</span>
                      </div>
                      {t.isDefaultMaster && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                          Default
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

