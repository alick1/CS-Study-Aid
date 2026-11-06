export type UserRole = 'student' | 'admin';

export interface StudentProfileData {
  id: string; // e.g. "CS2026-001"
  name: string;
  username: string; // e.g. "Student1"
  password: string; // e.g. "student1"
  avatar: string;
  gender: 'Male' | 'Female';
  enrolledDate: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActive: string;
  badges: string[]; // Badge IDs
  topicMastery: Record<string, number>; // topicId -> percentage 0-100
  quizAttempts: QuizAttempt[];
  teacherFeedback: TeacherFeedbackNote[];
}

export interface AdminProfileData {
  id: string;
  username: string; // "Admin"
  password?: string;
  name: string;
  role: 'admin';
  title: string;
  enrolledDate?: string;
  isDefaultMaster?: boolean;
}

export interface TeacherFeedbackNote {
  id: string;
  date: string;
  teacherName: string;
  topicId?: string;
  topicTitle?: string;
  message: string;
  sentiment: 'positive' | 'constructive' | 'urgent';
  acknowledged?: boolean;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  topicId: string;
  topicTitle: string;
  score: number; // percentage
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  completedAt: string;
  timeSpentSeconds: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'mastery' | 'streak' | 'exam' | 'special';
  xpReward: number;
}

export interface SyllabusTopic {
  id: string; // e.g. "8.34"
  code: string;
  title: string;
  category: string;
  description: string;
  objectives: string[];
  contentOutline: string[];
  suggestedActivities: string[];
  studyNotes: StudyNoteSection[];
  examTips: string[];
  keyTerms: { term: string; definition: string }[];
}

export interface StudyNoteSection {
  title: string;
  content: string;
  subsections?: { subtitle: string; body: string }[];
  highlight?: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  paperType: 'Paper 1 (MCQ)' | 'Paper 2 (Structured)' | 'Practical';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'Foundation' | 'Standard' | 'Distinction';
  examYear?: string;
}

export interface LeaderboardEntry {
  studentId: string;
  name: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  badgesCount: number;
  averageScore: number;
  quizzesCompleted: number;
}
