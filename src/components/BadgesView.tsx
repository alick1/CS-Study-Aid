import React from 'react';
import {
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Trophy,
  Flame,
  ShieldCheck,
  Cpu,
  Network,
  Database,
  Terminal,
  FileCode2,
  Wrench
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfileData } from '../types';

export const BadgesView: React.FC = () => {
  const { badges, currentUser, isStudent, setActiveTab } = useApp();
  const student = isStudent ? (currentUser as StudentProfileData) : null;
  const earnedBadgeSet = new Set(student?.badges || []);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Network': return <Network className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'FileCode2': return <FileCode2 className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'Database': return <Database className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Trophy': return <Trophy className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gamified Recognition
              </span>
              <span className="text-xs text-slate-400">Honoring Academic Excellence</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 mt-2">
              Badges, Ranks & Honours
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Earn distinguished honours as you demonstrate topic mastery across the Zimbabwe Form 4 curriculum, complete timed tests, and build continuous study streaks.
            </p>
          </div>

          {student && (
            <div className="bg-slate-950/80 px-5 py-3 rounded-xl border border-slate-800 text-right">
              <span className="text-xs text-slate-400 block">Personal Collection</span>
              <span className="text-xl font-black text-amber-300 font-mono">
                {student.badges.length} / {badges.length} Unlocked
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map(badge => {
          const isEarned = earnedBadgeSet.has(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition relative overflow-hidden ${
                isEarned
                  ? 'bg-gradient-to-b from-amber-950/20 to-slate-900 border-amber-500/50 shadow-lg shadow-amber-950/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-70'
              }`}
            >
              {isEarned && (
                <div className="absolute top-3 right-3 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isEarned
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-600 border border-slate-700'
                  }`}
                >
                  {getBadgeIcon(badge.icon)}
                </div>

                <h3 className={`font-bold text-sm ${isEarned ? 'text-slate-100' : 'text-slate-400'}`}>
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold">+{badge.xpReward} XP</span>
                <span
                  className={`font-semibold uppercase text-[10px] px-2 py-0.5 rounded ${
                    isEarned
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isEarned ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
