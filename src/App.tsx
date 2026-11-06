/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CurriculumView } from './components/CurriculumView';
import { QuizArena } from './components/QuizArena';
import { InteractiveLabs } from './components/InteractiveLabs';
import { BadgesView } from './components/BadgesView';
import { StudentProfile } from './components/StudentProfile';
import { TeacherDashboard } from './components/TeacherDashboard';
import { LoginModal } from './components/LoginModal';
import { OfflineStudyPackModal } from './components/OfflineStudyPackModal';

const AppContent: React.FC = () => {
  const { activeTab, signInBonusToast, dismissSignInBonusToast } = useApp();

  React.useEffect(() => {
    if (signInBonusToast) {
      const timer = setTimeout(() => {
        dismissSignInBonusToast();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [signInBonusToast, dismissSignInBonusToast]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      {/* Sign-In Points Celebration Toast Banner */}
      {signInBonusToast && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-xl px-4 py-3 sm:py-3.5 border-b border-emerald-400/30 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl animate-bounce flex-shrink-0">🎉</span>
              <div>
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    Sign-In Points Awarded! +{signInBonusToast.points} XP
                  </span>
                  <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold font-mono">
                    🔥 {signInBonusToast.streak} Day Streak
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Welcome back, <span className="font-bold underline text-white">{signInBonusToast.studentName}</span>! Your daily attendance bonus has boosted your cohort leaderboard standing to <span className="font-mono font-bold text-white">{signInBonusToast.totalXp} XP</span>.
                </p>
              </div>
            </div>

            <button
              onClick={dismissSignInBonusToast}
              className="px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-xs font-bold border border-white/20 transition flex-shrink-0 text-white"
            >
              Awesome! ✕
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'curriculum' && <CurriculumView />}
        {activeTab === 'quizzes' && <QuizArena />}
        {activeTab === 'labs' && <InteractiveLabs />}
        {activeTab === 'badges' && <BadgesView />}
        {activeTab === 'my-progress' && <StudentProfile />}
        {activeTab === 'teacher-portal' && <TeacherDashboard />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 text-slate-500 py-6 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">ZimCS4 Tutor</span>
            <span>•</span>
            <span>Zimbabwe Ministry of Primary & Secondary Education (2024–2030)</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Form 4 Examination Preparation</span>
            <span>•</span>
            <span>100% Offline Capability</span>
            <span>•</span>
            <span>Unhu / Ubuntu / Vumunhu Ethical Framework</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal />
      <OfflineStudyPackModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
