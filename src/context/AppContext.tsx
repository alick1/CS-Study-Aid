import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfileData,
  AdminProfileData,
  QuizAttempt,
  QuizQuestion,
  SyllabusTopic,
  Badge,
  TeacherFeedbackNote,
  LeaderboardEntry
} from '../types';
import { INITIAL_STUDENTS, DEFAULT_ADMIN, INITIAL_TEACHERS } from '../data/seedData';
import { FORM_4_CURRICULUM } from '../data/curriculumData';
import { FORM_4_QUESTIONS, BADGES_LIST } from '../data/quizQuestions';

interface AppContextType {
  currentUser: StudentProfileData | AdminProfileData | null;
  isStudent: boolean;
  isAdmin: boolean;
  students: StudentProfileData[];
  teachers: AdminProfileData[];
  curriculum: SyllabusTopic[];
  questions: QuizQuestion[];
  badges: Badge[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isOfflinePackModalOpen: boolean;
  setIsOfflinePackModalOpen: (open: boolean) => void;
  signInBonusToast: { studentName: string; points: number; totalXp: number; streak: number } | null;
  dismissSignInBonusToast: () => void;
  loginAsStudent: (studentIdOrUsername: string, password: string) => { success: boolean; error?: string; pointsAwarded?: number };
  loginAsAdmin: (username: string, password: string) => { success: boolean; error?: string; alreadyLoggedIn?: boolean; teacherName?: string };
  logout: () => void;
  awardPointsToStudent: (studentId: string, points: number, reason?: string) => void;
  addStudent: (student: Omit<StudentProfileData, 'badges' | 'topicMastery' | 'quizAttempts' | 'teacherFeedback' | 'xp' | 'level' | 'streakDays' | 'lastActive'>) => { success: boolean; error?: string };
  removeStudent: (studentId: string) => void;
  addTeacher: (teacher: { name: string; username: string; password: string; title: string }) => { success: boolean; error?: string };
  removeTeacher: (teacherId: string) => { success: boolean; error?: string };
  updateTeacherPassword: (teacherId: string, newPassword: string) => { success: boolean; error?: string };
  resetLeaderboard: () => void;
  resetAchievements: () => void;
  resetCohortPerformance: () => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => { newBadges: Badge[]; xpGained: number; leveledUp: boolean };
  addTeacherFeedback: (studentId: string, feedback: Omit<TeacherFeedbackNote, 'id' | 'date'>) => void;
  deleteTeacherFeedback: (studentId: string, feedbackId: string) => void;
  addQuizQuestion: (question: Omit<QuizQuestion, 'id'>) => void;
  updateQuizQuestion: (question: QuizQuestion) => void;
  deleteQuizQuestion: (questionId: string) => void;
  getLeaderboard: () => LeaderboardEntry[];
  triggerConfetti: () => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => { success: boolean; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENTS: 'zimcs4_students_v1',
  TEACHERS: 'zimcs4_teachers_v1',
  CURRICULUM: 'zimcs4_curriculum_v1',
  QUESTIONS: 'zimcs4_questions_v1',
  CURRENT_USER_ID: 'zimcs4_active_user_v1',
  CURRENT_USER_ROLE: 'zimcs4_active_role_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [teachers, setTeachers] = useState<AdminProfileData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_TEACHERS;
  });

  const [students, setStudents] = useState<StudentProfileData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge each student with INITIAL_STUDENTS to guarantee gender and valid topicMastery exist
          const merged: StudentProfileData[] = parsed.map((s: Partial<StudentProfileData>) => {
            const seed = INITIAL_STUDENTS.find(init => init.id === s.id);
            const gender: 'Male' | 'Female' =
              s.gender === 'Male' || s.gender === 'Female'
                ? s.gender
                : seed?.gender || (s.name?.toLowerCase().includes('chiedza') || s.name?.toLowerCase().includes('ruvimbo') ? 'Female' : 'Male');

            // Ensure topicMastery is populated
            const topicMastery =
              seed && (!s.topicMastery || Object.keys(s.topicMastery).length === 0)
                ? seed.topicMastery
                : { ...(seed?.topicMastery || {}), ...(s.topicMastery || {}) };

            return {
              ...(seed || {}),
              ...s,
              gender,
              topicMastery,
              quizAttempts: s.quizAttempts || seed?.quizAttempts || [],
              badges: s.badges || seed?.badges || ['badge-first-quiz']
            } as StudentProfileData;
          });

          // Ensure all 5 initial seed students exist in the list
          INITIAL_STUDENTS.forEach(seed => {
            if (!merged.some(m => m.id === seed.id)) {
              merged.push(seed);
            }
          });

          return merged;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS;
  });

  const [curriculum, setCurriculum] = useState<SyllabusTopic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRICULUM);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return FORM_4_CURRICULUM;
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return FORM_4_QUESTIONS;
  });

  // Ensure the default status on launching the application is strictly signed out
  const [currentUser, setCurrentUser] = useState<StudentProfileData | AdminProfileData | null>(null);

  // Clear any existing stored user session on launch so app launches in signed-out state
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ROLE);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    } catch {
      // ignore
    }
  }, []);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isOfflinePackModalOpen, setIsOfflinePackModalOpen] = useState<boolean>(false);
  const [signInBonusToast, setSignInBonusToast] = useState<{
    studentName: string;
    points: number;
    totalXp: number;
    streak: number;
  } | null>(null);

  const dismissSignInBonusToast = () => setSignInBonusToast(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
    } catch (err) {
      console.warn('Teacher storage sync error', err);
    }
  }, [teachers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (err) {
      console.warn('Storage sync error', err);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRICULUM, JSON.stringify(curriculum));
    } catch (err) {
      console.warn('Storage sync error', err);
    }
  }, [curriculum]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    } catch (err) {
      console.warn('Storage sync error', err);
    }
  }, [questions]);

  // Keep currentUser synced with students list if student or teachers list if admin
  useEffect(() => {
    if (currentUser && 'role' in currentUser && currentUser.role === 'admin') {
      const freshTeacher = teachers.find(t => t.id === (currentUser as AdminProfileData).id || t.username.toLowerCase() === currentUser.username.toLowerCase());
      if (freshTeacher) {
        setCurrentUser(freshTeacher);
        try {
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, 'admin');
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, freshTeacher.id);
        } catch {
          // ignore
        }
      }
    } else if (currentUser && 'id' in currentUser) {
      const fresh = students.find(s => s.id === (currentUser as StudentProfileData).id);
      if (fresh) {
        setCurrentUser(fresh);
        try {
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, 'student');
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, fresh.id);
        } catch {
          // ignore
        }
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ROLE);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      } catch {
        // ignore
      }
    }
  }, [students, teachers]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const awardPointsToStudent = (studentId: string, points: number, reason?: string) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const newXp = (s.xp || 0) + points;
          const newLevel = Math.floor(newXp / 100) + 1;
          const updated = { ...s, xp: newXp, level: newLevel };
          if (currentUser && 'id' in currentUser && currentUser.id === s.id) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return s;
      })
    );
    triggerConfetti();
  };

  const loginAsStudent = (studentIdOrUsername: string, password: string) => {
    const cleanId = studentIdOrUsername.trim().toLowerCase();
    const cleanPw = password.trim();

    const matched = students.find(
      s => (s.id.toLowerCase() === cleanId || s.username.toLowerCase() === cleanId) && s.password === cleanPw
    );

    if (matched) {
      // Requirement: Award sign in points
      const SIGN_IN_BONUS_XP = 50;
      const today = new Date().toISOString().split('T')[0];
      const isConsecutiveDay = matched.lastActive !== today;
      const newStreak = isConsecutiveDay ? matched.streakDays + 1 : matched.streakDays;
      const newXp = (matched.xp || 0) + SIGN_IN_BONUS_XP;
      const newLevel = Math.floor(newXp / 100) + 1;

      const updatedStudent: StudentProfileData = {
        ...matched,
        xp: newXp,
        level: newLevel,
        lastActive: today,
        streakDays: newStreak
      };

      setStudents(prev => prev.map(s => s.id === matched.id ? updatedStudent : s));
      setCurrentUser(updatedStudent);
      setIsLoginModalOpen(false);

      // Trigger celebratory sign-in points toast and confetti
      triggerConfetti();
      setSignInBonusToast({
        studentName: matched.name,
        points: SIGN_IN_BONUS_XP,
        totalXp: newXp,
        streak: newStreak
      });

      return { success: true, pointsAwarded: SIGN_IN_BONUS_XP };
    }

    return { success: false, error: 'Invalid Student ID or password. Try Student ID "CS2026-001" and password "student1".' };
  };

  const loginAsAdmin = (username: string, password: string) => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPw = password.trim();

    // Requirement: Check if teacher is already logged in, and notify if they attempt to login again
    if (currentUser && 'role' in currentUser && currentUser.role === 'admin') {
      const activeAdmin = currentUser as AdminProfileData;
      if (activeAdmin.username.toLowerCase() === cleanUser) {
        return {
          success: false,
          alreadyLoggedIn: true,
          teacherName: activeAdmin.name,
          error: `You are already logged in as teacher "${activeAdmin.name}" (@${activeAdmin.username}).`
        };
      } else {
        return {
          success: false,
          alreadyLoggedIn: true,
          teacherName: activeAdmin.name,
          error: `Teacher "${activeAdmin.name}" is already logged in. Please log out first if you wish to switch accounts.`
        };
      }
    }

    // Match against registered teachers or default Admin
    const matched = teachers.find(
      t => t.username.toLowerCase() === cleanUser && (t.password === cleanPw || (t.username.toLowerCase() === 'admin' && cleanPw === 'admin'))
    );

    if (matched) {
      setCurrentUser(matched);
      setIsLoginModalOpen(false);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Default username is "Admin" and password is "admin".'
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ROLE);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  };

  const addTeacher = (teacherData: { name: string; username: string; password: string; title: string }) => {
    const cleanUser = teacherData.username.trim().toLowerCase();
    const userExists = teachers.some(t => t.username.toLowerCase() === cleanUser) ||
                       students.some(s => s.username.toLowerCase() === cleanUser);

    if (userExists) {
      return { success: false, error: `Username "${teacherData.username}" is already taken.` };
    }

    const newTeacher: AdminProfileData = {
      id: `TCHR-${Date.now().toString().slice(-4)}`,
      name: teacherData.name.trim(),
      username: teacherData.username.trim(),
      password: teacherData.password.trim(),
      title: teacherData.title.trim() || 'Computer Science Teacher',
      role: 'admin',
      enrolledDate: new Date().toISOString().split('T')[0],
      isDefaultMaster: false
    };

    setTeachers(prev => [...prev, newTeacher]);
    return { success: true };
  };

  const removeTeacher = (teacherId: string) => {
    const target = teachers.find(t => t.id === teacherId);
    if (!target) return { success: false, error: 'Teacher not found.' };

    if (target.isDefaultMaster || target.username.toLowerCase() === 'admin') {
      return { success: false, error: 'The primary Admin account cannot be removed from the system.' };
    }

    setTeachers(prev => prev.filter(t => t.id !== teacherId));
    if (currentUser && 'role' in currentUser && (currentUser as AdminProfileData).id === teacherId) {
      logout();
    }
    return { success: true };
  };

  const updateTeacherPassword = (teacherId: string, newPassword: string) => {
    const cleanPw = newPassword.trim();
    if (cleanPw.length < 3) {
      return { success: false, error: 'Password must be at least 3 characters long.' };
    }

    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) {
      return { success: false, error: 'Teacher not found.' };
    }

    const updatedTeacher = { ...teacher, password: cleanPw };
    setTeachers(prev => prev.map(t => t.id === teacherId ? updatedTeacher : t));

    if (currentUser && 'role' in currentUser && (currentUser as AdminProfileData).id === teacherId) {
      setCurrentUser(updatedTeacher);
    }

    return { success: true };
  };

  const resetLeaderboard = () => {
    setStudents(prev => prev.map(s => ({
      ...s,
      xp: 0,
      level: 1,
      quizAttempts: []
    })));
  };

  const resetAchievements = () => {
    setStudents(prev => prev.map(s => ({
      ...s,
      badges: ['badge-first-quiz']
    })));
  };

  const resetCohortPerformance = () => {
    setStudents(prev => prev.map(s => ({
      ...s,
      xp: 0,
      level: 1,
      badges: ['badge-first-quiz'],
      quizAttempts: [],
      topicMastery: {
        '8.34': 0, '8.35': 0, '8.36': 0, '8.37': 0, '8.38': 0,
        '8.39': 0, '8.40': 0, '8.41': 0, '8.42': 0, '8.43': 0, '8.44': 0
      }
    })));
  };

  const addStudent = (studentData: Omit<StudentProfileData, 'badges' | 'topicMastery' | 'quizAttempts' | 'teacherFeedback' | 'xp' | 'level' | 'streakDays' | 'lastActive'>) => {
    const idExists = students.some(s => s.id.toLowerCase() === studentData.id.toLowerCase());
    const userExists = students.some(s => s.username.toLowerCase() === studentData.username.toLowerCase());

    if (idExists) return { success: false, error: `Student ID ${studentData.id} is already registered.` };
    if (userExists) return { success: false, error: `Username ${studentData.username} is already taken.` };

    const newStudent: StudentProfileData = {
      ...studentData,
      xp: 0,
      level: 1,
      streakDays: 1,
      lastActive: new Date().toISOString().split('T')[0],
      badges: ['badge-first-quiz'],
      topicMastery: {
        '8.34': 0, '8.35': 0, '8.36': 0, '8.37': 0, '8.38': 0,
        '8.39': 0, '8.40': 0, '8.41': 0, '8.42': 0, '8.43': 0, '8.44': 0
      },
      quizAttempts: [],
      teacherFeedback: [
        {
          id: `fb-init-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          teacherName: 'Mr. C. Gumbo',
          message: `Welcome to Form 4 Computer Science, ${studentData.name}! Begin reviewing Topic 8.34 and take the diagnostic test.`,
          sentiment: 'positive'
        }
      ]
    };

    setStudents(prev => [newStudent, ...prev]);
    return { success: true };
  };

  const removeStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    if (currentUser && 'id' in currentUser && currentUser.id === studentId) {
      logout();
    }
  };

  const calculateLevel = (xp: number) => {
    if (xp >= 1600) return 5;
    if (xp >= 1100) return 4;
    if (xp >= 700) return 3;
    if (xp >= 350) return 2;
    return 1;
  };

  const submitQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    if (!currentUser || !('id' in currentUser)) {
      return { newBadges: [], xpGained: 0, leveledUp: false };
    }

    const student = currentUser as StudentProfileData;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `att-${Date.now()}`,
      completedAt: formattedDate
    };

    const newXp = student.xp + attemptData.xpEarned;
    const oldLevel = student.level;
    const newLevel = calculateLevel(newXp);
    const leveledUp = newLevel > oldLevel;

    // Update topic mastery
    const existingMastery = student.topicMastery?.[attemptData.topicId] || 0;
    const updatedMastery = Math.min(100, Math.max(existingMastery, attemptData.score));

    // Check newly earned badges
    const currentBadgeIds = new Set(student.badges || []);
    const earnedBadges: Badge[] = [];

    // Badge logic
    if (!currentBadgeIds.has('badge-first-quiz')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-first-quiz');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }

    if (attemptData.score === 100 && !currentBadgeIds.has('badge-perfect-score')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-perfect-score');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }

    if (newXp >= 1500 && newLevel >= 5 && !currentBadgeIds.has('badge-zimsec-distinction')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-zimsec-distinction');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }

    // Topic mastery badges
    if (attemptData.topicId === '8.36' && attemptData.score >= 80 && !currentBadgeIds.has('badge-logic-master')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-logic-master');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.37' && attemptData.score >= 80 && !currentBadgeIds.has('badge-network-architect')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-network-architect');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.38' && attemptData.score >= 80 && !currentBadgeIds.has('badge-cyber-guardian')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-cyber-guardian');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.39' && attemptData.score >= 80 && !currentBadgeIds.has('badge-sdlc-analyst')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-sdlc-analyst');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.41' && attemptData.score >= 80 && !currentBadgeIds.has('badge-code-craftsman')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-code-craftsman');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.42' && attemptData.score >= 80 && !currentBadgeIds.has('badge-database-guru')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-database-guru');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.34' && attemptData.score >= 80 && !currentBadgeIds.has('badge-hardware-guru')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-hardware-guru');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }
    if (attemptData.topicId === '8.44' && attemptData.score >= 80 && !currentBadgeIds.has('badge-techno-founder')) {
      const b = BADGES_LIST.find(x => x.id === 'badge-techno-founder');
      if (b) { earnedBadges.push(b); currentBadgeIds.add(b.id); }
    }

    const updatedBadges = Array.from(currentBadgeIds);

    const updatedStudent: StudentProfileData = {
      ...student,
      xp: newXp,
      level: newLevel,
      badges: updatedBadges,
      topicMastery: {
        ...(student.topicMastery || {}),
        [attemptData.topicId]: updatedMastery
      },
      quizAttempts: [newAttempt, ...(student.quizAttempts || [])]
    };

    setStudents(prev => prev.map(s => s.id === student.id ? updatedStudent : s));
    setCurrentUser(updatedStudent);

    if (earnedBadges.length > 0 || leveledUp || attemptData.score === 100) {
      triggerConfetti();
    }

    return {
      newBadges: earnedBadges,
      xpGained: attemptData.xpEarned,
      leveledUp
    };
  };

  const addTeacherFeedback = (studentId: string, feedback: Omit<TeacherFeedbackNote, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newNote: TeacherFeedbackNote = {
      ...feedback,
      id: `fb-${Date.now()}`,
      date: today
    };

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          teacherFeedback: [newNote, ...s.teacherFeedback]
        };
      }
      return s;
    }));
  };

  const deleteTeacherFeedback = (studentId: string, feedbackId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          teacherFeedback: s.teacherFeedback.filter(fb => fb.id !== feedbackId)
        };
      }
      return s;
    }));
  };

  const addQuizQuestion = (question: Omit<QuizQuestion, 'id'>) => {
    const newQ: QuizQuestion = {
      ...question,
      id: `q-custom-${Date.now()}`
    };
    setQuestions(prev => [newQ, ...prev]);
  };

  const updateQuizQuestion = (updatedQ: QuizQuestion) => {
    setQuestions(prev => prev.map(q => q.id === updatedQ.id ? updatedQ : q));
  };

  const deleteQuizQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const getLeaderboard = (): LeaderboardEntry[] => {
    return students
      .map(s => {
        const scores = s.quizAttempts.map(a => a.score);
        const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        return {
          studentId: s.id,
          name: s.name,
          username: s.username,
          avatar: s.avatar,
          xp: s.xp,
          level: s.level,
          badgesCount: s.badges.length,
          averageScore: avg,
          quizzesCompleted: s.quizAttempts.length
        };
      })
      .sort((a, b) => b.xp - a.xp || b.averageScore - a.averageScore);
  };

  const resetToDefaults = () => {
    setTeachers(INITIAL_TEACHERS);
    setStudents(INITIAL_STUDENTS);
    setCurriculum(FORM_4_CURRICULUM);
    setQuestions(FORM_4_QUESTIONS);
    setCurrentUser(null);
    localStorage.clear();
  };

  const exportDataJSON = () => {
    const exportBundle = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      teachers,
      curriculum,
      questions,
      students
    };
    return JSON.stringify(exportBundle, null, 2);
  };

  const importDataJSON = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.teachers && Array.isArray(data.teachers)) {
        setTeachers(data.teachers);
      }
      if (data.students && Array.isArray(data.students)) {
        setStudents(data.students);
      }
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
      if (data.curriculum && Array.isArray(data.curriculum)) {
        setCurriculum(data.curriculum);
      }
      return { success: true, message: 'Data imported successfully!' };
    } catch {
      return { success: false, message: 'Invalid JSON format or corrupted backup file.' };
    }
  };

  const isStudent = currentUser !== null && 'id' in currentUser;
  const isAdmin = currentUser !== null && 'role' in currentUser && currentUser.role === 'admin';

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isStudent,
        isAdmin,
        students,
        teachers,
        curriculum,
        questions,
        badges: BADGES_LIST,
        activeTab,
        setActiveTab,
        selectedTopicId,
        setSelectedTopicId,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isOfflinePackModalOpen,
        setIsOfflinePackModalOpen,
        signInBonusToast,
        dismissSignInBonusToast,
        awardPointsToStudent,
        loginAsStudent,
        loginAsAdmin,
        logout,
        addStudent,
        removeStudent,
        addTeacher,
        removeTeacher,
        updateTeacherPassword,
        resetLeaderboard,
        resetAchievements,
        resetCohortPerformance,
        submitQuizAttempt,
        addTeacherFeedback,
        deleteTeacherFeedback,
        addQuizQuestion,
        updateQuizQuestion,
        deleteQuizQuestion,
        getLeaderboard,
        triggerConfetti,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
