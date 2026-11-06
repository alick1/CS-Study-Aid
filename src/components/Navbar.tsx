import React from 'react';
import {
  BookOpen,
  LayoutDashboard,
  Trophy,
  BrainCircuit,
  Award,
  Users,
  Wifi,
  Download,
  LogIn,
  LogOut,
  UserCheck,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfileData, AdminProfileData } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    isStudent,
    isAdmin,
    activeTab,
    setActiveTab,
    setIsLoginModalOpen,
    setIsOfflinePackModalOpen,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const student = isStudent ? (currentUser as StudentProfileData) : null;
  const adminUser = isAdmin && currentUser && 'role' in currentUser ? (currentUser as AdminProfileData) : null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'curriculum', label: 'Form 4 Syllabus', icon: BookOpen },
    { id: 'quizzes', label: 'Quiz Arena', icon: Trophy },
    { id: 'labs', label: 'Interactive Labs', icon: BrainCircuit },
    { id: 'badges', label: 'Badges & Ranks', icon: Award },
    ...(isStudent ? [{ id: 'my-progress', label: 'My Progress', icon: UserCheck }] : []),
    ...(isAdmin ? [{ id: 'teacher-portal', label: 'Teacher Portal', icon: Users }] : [])
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Syllabus Badge */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-black text-xl text-white">
              Z4
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  ZimCS4
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Form 4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Zimbabwe MoPSE 2024–2030</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & User Profile / Login */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Offline Status indicator */}
            <button
              onClick={() => setIsOfflinePackModalOpen(true)}
              title="Click to view offline study materials and backup tools"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900/60 transition"
            >
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Ready</span>
              <Download className="w-3 h-3 ml-0.5" />
            </button>

            {/* Current User Pill or Login Button */}
            {currentUser ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-700">
                {isStudent && student ? (
                  <div
                    onClick={() => setActiveTab('my-progress')}
                    className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-750 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer transition"
                    title={`Student ID: ${student.id} | XP: ${student.xp}`}
                  >
                    <span className="text-xl" role="img" aria-label="avatar">
                      {student.avatar}
                    </span>
                    <div className="text-left text-xs">
                      <div className="font-bold text-slate-100 flex items-center gap-1">
                        {student.name}
                        <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                          Lvl {student.level}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        {student.xp} XP • {student.id}
                      </div>
                    </div>
                  </div>
                ) : isAdmin && adminUser ? (
                  <div
                    onClick={() => setActiveTab('teacher-portal')}
                    className="flex items-center space-x-2 bg-indigo-950/80 hover:bg-indigo-900/80 px-3 py-1.5 rounded-lg border border-indigo-700/60 cursor-pointer transition"
                    title={`Logged in as ${adminUser.name} (@${adminUser.username})`}
                  >
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <div className="text-left text-xs">
                      <div className="font-bold text-indigo-200 truncate max-w-[140px]">{adminUser.name}</div>
                      <div className="text-[10px] text-indigo-300 font-mono">@{adminUser.username} • Faculty</div>
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={logout}
                  title="Logout / Switch User"
                  className="flex items-center space-x-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg border border-transparent hover:border-rose-900/40 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline text-[11px] font-semibold">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsOfflinePackModalOpen(true)}
              className="p-2 text-emerald-400 bg-slate-800 rounded-lg"
              title="Offline Pack"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="text-xs">
                  <span className="font-semibold text-slate-200">
                    {isStudent && student ? student.name : adminUser ? adminUser.name : 'Administrator'}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {isStudent && student ? student.id : adminUser ? `@${adminUser.username} • Faculty` : 'Admin Portal'}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded bg-rose-500/10 border border-rose-500/30 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login (Student or Admin)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
