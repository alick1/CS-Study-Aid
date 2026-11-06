import { StudentProfileData, AdminProfileData } from '../types';

export const DEFAULT_ADMIN: AdminProfileData = {
  id: 'TCHR-001',
  username: 'Admin',
  password: 'admin',
  name: 'Mr. C. Gumbo',
  role: 'admin',
  title: 'Senior Computer Science Teacher & HoD',
  enrolledDate: '2025-09-01',
  isDefaultMaster: true
};

export const INITIAL_TEACHERS: AdminProfileData[] = [
  DEFAULT_ADMIN,
  {
    id: 'TCHR-002',
    username: 'Teacher2',
    password: 'teacher2',
    name: 'Mrs. F. Mutsvangwa',
    role: 'admin',
    title: 'Computer Science Instructor (Databases & Web)',
    enrolledDate: '2026-01-10',
    isDefaultMaster: false
  }
];

export const INITIAL_STUDENTS: StudentProfileData[] = [
  {
    id: 'CS2026-001',
    name: 'Tinashe Moyo',
    username: 'Student1',
    password: 'student1',
    avatar: '👨🏾‍🎓',
    gender: 'Male',
    enrolledDate: '2026-01-15',
    xp: 1420,
    level: 4,
    streakDays: 4,
    lastActive: '2026-10-08',
    badges: ['badge-first-quiz', 'badge-logic-master', 'badge-network-architect', 'badge-database-guru', 'badge-study-streak'],
    topicMastery: {
      '8.34': 85,
      '8.35': 90,
      '8.36': 92,
      '8.37': 88,
      '8.38': 80,
      '8.39': 75,
      '8.40': 85,
      '8.41': 78,
      '8.42': 94,
      '8.43': 30,
      '8.44': 25
    },
    quizAttempts: [
      {
        id: 'att-1-1',
        studentId: 'CS2026-001',
        quizId: 'quiz-836',
        topicId: '8.36',
        topicTitle: 'Data Representation (Logic Gates & Truth Tables)',
        score: 100,
        correctCount: 3,
        totalQuestions: 3,
        xpEarned: 150,
        completedAt: '2026-10-07 14:22',
        timeSpentSeconds: 110
      },
      {
        id: 'att-1-2',
        studentId: 'CS2026-001',
        quizId: 'quiz-837',
        topicId: '8.37',
        topicTitle: 'Communication Networks and Internet Technologies',
        score: 100,
        correctCount: 3,
        totalQuestions: 3,
        xpEarned: 150,
        completedAt: '2026-10-08 10:15',
        timeSpentSeconds: 95
      },
      {
        id: 'att-1-3',
        studentId: 'CS2026-001',
        quizId: 'quiz-842',
        topicId: '8.42',
        topicTitle: 'Databases & Advanced SQL',
        score: 100,
        correctCount: 2,
        totalQuestions: 2,
        xpEarned: 120,
        completedAt: '2026-10-08 16:40',
        timeSpentSeconds: 80
      }
    ],
    teacherFeedback: [
      {
        id: 'fb-1-1',
        date: '2026-10-06',
        teacherName: 'Mr. C. Gumbo',
        topicId: '8.36',
        topicTitle: 'Logic Gates & Truth Tables',
        message: 'Excellent grasp of 3-input truth tables and NAND equivalence, Tinashe! Focus next on writing pseudocode trace tables for Topic 8.40.',
        sentiment: 'positive'
      },
      {
        id: 'fb-1-2',
        date: '2026-09-28',
        teacherName: 'Mr. C. Gumbo',
        topicId: '8.39',
        topicTitle: 'System Analysis & Design',
        message: 'Review the distinction between User and Technical documentation. Remember that Data Dictionaries belong strictly in technical manuals.',
        sentiment: 'constructive'
      }
    ]
  },
  {
    id: 'CS2026-002',
    name: 'Chiedza Mutasa',
    username: 'Student2',
    password: 'student2',
    avatar: '👩🏾‍🎓',
    gender: 'Female',
    enrolledDate: '2026-01-12',
    xp: 1950,
    level: 5,
    streakDays: 7,
    lastActive: '2026-10-09',
    badges: [
      'badge-first-quiz',
      'badge-logic-master',
      'badge-network-architect',
      'badge-cyber-guardian',
      'badge-sdlc-analyst',
      'badge-code-craftsman',
      'badge-database-guru',
      'badge-hardware-guru',
      'badge-techno-founder',
      'badge-perfect-score',
      'badge-zimsec-distinction'
    ],
    topicMastery: {
      '8.34': 95,
      '8.35': 92,
      '8.36': 100,
      '8.37': 98,
      '8.38': 95,
      '8.39': 94,
      '8.40': 96,
      '8.41': 92,
      '8.42': 98,
      '8.43': 90,
      '8.44': 95
    },
    quizAttempts: [
      {
        id: 'att-2-1',
        studentId: 'CS2026-002',
        quizId: 'quiz-834',
        topicId: '8.34',
        topicTitle: 'Hardware and Software Maintenance',
        score: 100,
        correctCount: 3,
        totalQuestions: 3,
        xpEarned: 150,
        completedAt: '2026-10-06 09:30',
        timeSpentSeconds: 75
      },
      {
        id: 'att-2-2',
        studentId: 'CS2026-002',
        quizId: 'quiz-838',
        topicId: '8.38',
        topicTitle: 'Security and Ethics (Unhu/Ubuntu/Vumunhu)',
        score: 100,
        correctCount: 3,
        totalQuestions: 3,
        xpEarned: 150,
        completedAt: '2026-10-07 11:20',
        timeSpentSeconds: 65
      },
      {
        id: 'att-2-3',
        studentId: 'CS2026-002',
        quizId: 'quiz-841',
        topicId: '8.41',
        topicTitle: 'Programming Concepts & Testing',
        score: 100,
        correctCount: 3,
        totalQuestions: 3,
        xpEarned: 150,
        completedAt: '2026-10-08 15:10',
        timeSpentSeconds: 85
      }
    ],
    teacherFeedback: [
      {
        id: 'fb-2-1',
        date: '2026-10-08',
        teacherName: 'Mr. C. Gumbo',
        topicId: '8.41',
        topicTitle: 'Programming & OOP',
        message: 'Outstanding performance Chiedza! You are comfortably operating at ZIMSEC Grade A distinction level. Continue mentoring your peers in OOP polymorphism.',
        sentiment: 'positive'
      }
    ]
  },
  {
    id: 'CS2026-003',
    name: 'Farai Ndlovu',
    username: 'Student3',
    password: 'student3',
    avatar: '👨🏾‍💻',
    gender: 'Male',
    enrolledDate: '2026-01-20',
    xp: 980,
    level: 3,
    streakDays: 2,
    lastActive: '2026-10-07',
    badges: ['badge-first-quiz', 'badge-cyber-guardian', 'badge-hardware-guru', 'badge-techno-founder'],
    topicMastery: {
      '8.34': 80,
      '8.35': 75,
      '8.36': 65,
      '8.37': 70,
      '8.38': 85,
      '8.39': 68,
      '8.40': 25,
      '8.41': 30,
      '8.42': 75,
      '8.43': 20,
      '8.44': 25
    },
    quizAttempts: [
      {
        id: 'att-3-1',
        studentId: 'CS2026-003',
        quizId: 'quiz-834',
        topicId: '8.34',
        topicTitle: 'Hardware and Software Maintenance',
        score: 67,
        correctCount: 2,
        totalQuestions: 3,
        xpEarned: 90,
        completedAt: '2026-10-05 16:15',
        timeSpentSeconds: 120
      },
      {
        id: 'att-3-2',
        studentId: 'CS2026-003',
        quizId: 'quiz-838',
        topicId: '8.38',
        topicTitle: 'Security and Ethics (Unhu/Ubuntu/Vumunhu)',
        score: 100,
        correctCount: 3,
        totalQuestions: 3,
        xpEarned: 150,
        completedAt: '2026-10-07 14:05',
        timeSpentSeconds: 105
      }
    ],
    teacherFeedback: [
      {
        id: 'fb-3-1',
        date: '2026-10-04',
        teacherName: 'Mr. C. Gumbo',
        topicId: '8.36',
        topicTitle: 'Data Representation',
        message: 'Farai, spend more time in the interactive Logic Gates lab. You need practice on evaluating compound circuits with XOR and NOR gates.',
        sentiment: 'constructive'
      }
    ]
  },
  {
    id: 'CS2026-004',
    name: 'Ruvimbo Sithole',
    username: 'Student4',
    password: 'student4',
    avatar: '👩🏾‍💻',
    gender: 'Female',
    enrolledDate: '2026-02-01',
    xp: 620,
    level: 2,
    streakDays: 1,
    lastActive: '2026-10-05',
    badges: ['badge-first-quiz', 'badge-hardware-guru'],
    topicMastery: {
      '8.34': 72,
      '8.35': 65,
      '8.36': 25,
      '8.37': 20,
      '8.38': 65,
      '8.39': 15,
      '8.40': 30,
      '8.41': 20,
      '8.42': 25,
      '8.43': 15,
      '8.44': 68
    },
    quizAttempts: [
      {
        id: 'att-4-1',
        studentId: 'CS2026-004',
        quizId: 'quiz-834',
        topicId: '8.34',
        topicTitle: 'Hardware and Software Maintenance',
        score: 67,
        correctCount: 2,
        totalQuestions: 3,
        xpEarned: 85,
        completedAt: '2026-10-04 10:20',
        timeSpentSeconds: 140
      },
      {
        id: 'att-4-2',
        studentId: 'CS2026-004',
        quizId: 'quiz-844',
        topicId: '8.44',
        topicTitle: 'Technopreneurship',
        score: 50,
        correctCount: 1,
        totalQuestions: 2,
        xpEarned: 50,
        completedAt: '2026-10-05 11:35',
        timeSpentSeconds: 90
      }
    ],
    teacherFeedback: [
      {
        id: 'fb-4-1',
        date: '2026-10-03',
        teacherName: 'Mr. C. Gumbo',
        topicId: '8.40',
        topicTitle: 'Algorithm Design',
        message: 'Ruvimbo, remember that pre-condition WHILE loops evaluate before entering, unlike REPEAT...UNTIL loops. Please revise the offline notes for 8.40.',
        sentiment: 'urgent'
      }
    ]
  },
  {
    id: 'CS2026-005',
    name: 'Tafadzwa Chiwenga',
    username: 'Student5',
    password: 'student5',
    avatar: '🧑🏾‍🎓',
    gender: 'Male',
    enrolledDate: '2026-02-10',
    xp: 310,
    level: 1,
    streakDays: 0,
    lastActive: '2026-09-30',
    badges: ['badge-first-quiz'],
    topicMastery: {
      '8.34': 50,
      '8.35': 15,
      '8.36': 20,
      '8.37': 10,
      '8.38': 45,
      '8.39': 25,
      '8.40': 15,
      '8.41': 20,
      '8.42': 15,
      '8.43': 10,
      '8.44': 20
    },
    quizAttempts: [
      {
        id: 'att-5-1',
        studentId: 'CS2026-005',
        quizId: 'quiz-834',
        topicId: '8.34',
        topicTitle: 'Hardware and Software Maintenance',
        score: 33,
        correctCount: 1,
        totalQuestions: 3,
        xpEarned: 40,
        completedAt: '2026-09-30 08:45',
        timeSpentSeconds: 150
      }
    ],
    teacherFeedback: [
      {
        id: 'fb-5-1',
        date: '2026-09-30',
        teacherName: 'Mr. C. Gumbo',
        topicId: '8.34',
        topicTitle: 'Hardware Maintenance',
        message: 'Tafadzwa, you need urgent remedial review in BIOS POST codes and ESD protection. Please meet me during free period or download the offline study pack.',
        sentiment: 'urgent'
      }
    ]
  }
];
