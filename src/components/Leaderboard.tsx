import React, { useState } from 'react';
import { Trophy, Medal, Flame, Award, Sparkles, Filter, RotateCcw, EyeOff, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfileData } from '../types';

export const Leaderboard: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { getLeaderboard, currentUser, isStudent, isAdmin, resetLeaderboard } = useApp();
  const [sortBy, setSortBy] = useState<'xp' | 'badges' | 'quizzes'>('xp');
  const [anonymize, setAnonymize] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const rawEntries = getLeaderboard();
  const currentStudent = isStudent ? (currentUser as StudentProfileData) : null;

  const handleAdminReset = () => {
    if (window.confirm('Are you sure you want to reset the cohort leaderboard? All student XP will be reset to 0 for a new term/competition.')) {
      resetLeaderboard();
      setResetMessage('Leaderboard XP successfully reset to 0!');
      setTimeout(() => setResetMessage(''), 3000);
    }
  };

  const entries = [...rawEntries].sort((a, b) => {
    if (sortBy === 'xp') return b.xp - a.xp;
    if (sortBy === 'badges') return b.badgesCount - a.badgesCount || b.xp - a.xp;
    if (sortBy === 'quizzes') return b.quizzesCompleted - a.quizzesCompleted || b.xp - a.xp;
    return b.xp - a.xp;
  });

  const getDisplayName = (name: string, studentId: string) => {
    if (anonymize) return `Candidate ${studentId}`;
    return name;
  };

  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

  if (compact) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-base">Class Leaderboard</h3>
          </div>
          <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            Form 4 Cohort
          </span>
        </div>

        <div className="space-y-2">
          {entries.slice(0, 5).map((entry, idx) => {
            const isMe = currentStudent && currentStudent.id === entry.studentId;
            return (
              <div
                key={entry.studentId}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition ${
                  isMe
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-sm'
                    : idx === 0
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-slate-800/60 border-slate-700/60'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <div className="w-5 text-center font-black">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </div>
                  <span className="text-lg">{entry.avatar}</span>
                  <div className="truncate">
                    <span className="font-bold text-slate-200 truncate flex items-center gap-1.5">
                      {getDisplayName(entry.name, entry.studentId)}
                      {isMe && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">
                          YOU
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Lvl {entry.level} • {entry.badgesCount} Badges</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 font-mono font-bold text-emerald-400">
                  {entry.xp.toLocaleString()} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {resetMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <span>{resetMessage}</span>
          <button onClick={() => setResetMessage('')} className="font-bold text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-100">Form 4 Computer Science Hall of Fame</h2>
              <p className="text-xs text-slate-400">Honoring consistent study streaks, quiz mastery, and curriculum achievements</p>
            </div>
          </div>
        </div>

        {/* Controls: Filters, Anonymize Toggle, and Admin Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Anonymize Toggle */}
          <button
            onClick={() => setAnonymize(!anonymize)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              anonymize
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle between candidate names and student IDs"
          >
            {anonymize ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{anonymize ? 'IDs Only' : 'Show Names'}</span>
          </button>

          {/* Admin Reset Leaderboard Button */}
          {isAdmin && (
            <button
              onClick={handleAdminReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-800/60 text-amber-300 font-bold text-xs transition"
              title="Reset all student XP and rankings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Board</span>
            </button>
          )}

          {/* Filters */}
          <div className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setSortBy('xp')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                sortBy === 'xp' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Total XP
            </button>
            <button
              onClick={() => setSortBy('badges')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                sortBy === 'badges' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Badges
            </button>
            <button
              onClick={() => setSortBy('quizzes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                sortBy === 'quizzes' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Quizzes
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Silver 2nd */}
          <div className="order-2 md:order-1 bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 rounded-2xl p-6 text-center relative flex flex-col items-center justify-between shadow-lg">
            <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-slate-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md">
              <Medal className="w-3.5 h-3.5" /> 2ND PLACE
            </div>
            <div className="text-4xl my-3">{topThree[1].avatar}</div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-base flex items-center justify-center gap-1.5">
                {getDisplayName(topThree[1].name, topThree[1].studentId)}
                {currentStudent?.id === topThree[1].studentId && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">YOU</span>
                )}
              </h4>
              <p className="text-xs text-slate-400 font-mono">@{topThree[1].username}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 w-full flex justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Level</span>
                <span className="font-bold text-slate-200">{topThree[1].level}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Badges</span>
                <span className="font-bold text-amber-400">{topThree[1].badgesCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Points</span>
                <span className="font-bold text-emerald-400 font-mono">{topThree[1].xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Gold 1st */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 rounded-2xl p-6 text-center relative flex flex-col items-center justify-between shadow-xl shadow-amber-950/20 md:-translate-y-2">
            <div className="absolute -top-4 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md">
              <Trophy className="w-4 h-4" /> 1ST CHAMPION
            </div>
            <div className="text-5xl my-3 animate-bounce duration-1000">{topThree[0].avatar}</div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-lg flex items-center justify-center gap-1.5">
                {getDisplayName(topThree[0].name, topThree[0].studentId)}
                {currentStudent?.id === topThree[0].studentId && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">YOU</span>
                )}
              </h4>
              <p className="text-xs text-amber-300/80 font-mono">@{topThree[0].username}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 w-full flex justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Level</span>
                <span className="font-black text-amber-400 text-sm">{topThree[0].level}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Badges</span>
                <span className="font-black text-amber-400 text-sm">{topThree[0].badgesCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Points</span>
                <span className="font-black text-emerald-400 text-sm font-mono">{topThree[0].xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Bronze 3rd */}
          <div className="order-3 md:order-3 bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 rounded-2xl p-6 text-center relative flex flex-col items-center justify-between shadow-lg">
            <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-amber-700 text-amber-100 text-xs font-black flex items-center gap-1 shadow-md">
              <Medal className="w-3.5 h-3.5" /> 3RD PLACE
            </div>
            <div className="text-4xl my-3">{topThree[2].avatar}</div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-base flex items-center justify-center gap-1.5">
                {getDisplayName(topThree[2].name, topThree[2].studentId)}
                {currentStudent?.id === topThree[2].studentId && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">YOU</span>
                )}
              </h4>
              <p className="text-xs text-slate-400 font-mono">@{topThree[2].username}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 w-full flex justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Level</span>
                <span className="font-bold text-slate-200">{topThree[2].level}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Badges</span>
                <span className="font-bold text-amber-400">{topThree[2].badgesCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Points</span>
                <span className="font-bold text-emerald-400 font-mono">{topThree[2].xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-sm">Full Cohort Rankings</h3>
          <span className="text-xs text-slate-400">Total {entries.length} Enrolled Learners</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Learner</th>
                <th className="py-3.5 px-4 text-center">Level</th>
                <th className="py-3.5 px-4 text-center">Quizzes Done</th>
                <th className="py-3.5 px-4 text-center">Badges</th>
                <th className="py-3.5 px-4 text-right">Experience (XP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {entries.map((entry, idx) => {
                const isMe = currentStudent && currentStudent.id === entry.studentId;
                return (
                  <tr
                    key={entry.studentId}
                    className={`transition ${
                      isMe ? 'bg-emerald-950/40 font-semibold' : 'hover:bg-slate-850/60'
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-bold">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{entry.avatar}</span>
                        <div>
                          <div className="font-bold text-slate-100 flex items-center gap-1.5">
                            {getDisplayName(entry.name, entry.studentId)}
                            {isMe && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">@{entry.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                        Lvl {entry.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {entry.quizzesCompleted}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold">
                        <Award className="w-3 h-3" />
                        {entry.badgesCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                      {entry.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
