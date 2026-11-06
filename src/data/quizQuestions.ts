import { QuizQuestion, Badge } from '../types';

export const FORM_4_QUESTIONS: QuizQuestion[] = [
  // 8.34 Hardware and Software Maintenance
  {
    id: 'q-834-1',
    topicId: '8.34',
    topicTitle: 'Hardware and Software Maintenance',
    paperType: 'Paper 1 (MCQ)',
    question: 'A desktop computer powers on, all cooling fans spin rapidly, but the monitor displays nothing and the motherboard emits continuous repeating long beeps. Which component is most likely malfunctioning or improperly seated?',
    options: ['Hard Disk Drive (HDD)', 'Random Access Memory (RAM)', 'Sound Card', 'Optical Drive'],
    correctAnswerIndex: 1,
    explanation: 'Standard POST (Power-On Self-Test) BIOS beep codes indicate a memory fault (RAM) when continuous repeating long beeps are sounded.',
    difficulty: 'Standard',
    examYear: '2024 Exam Specimen'
  },
  {
    id: 'q-834-2',
    topicId: '8.34',
    topicTitle: 'Hardware and Software Maintenance',
    paperType: 'Paper 1 (MCQ)',
    question: 'Why should disk defragmentation NOT be performed on a Solid State Drive (SSD)?',
    options: [
      'SSDs lack read/write heads and defragmentation causes unnecessary flash cell write wear',
      'Defragmentation will accidentally delete the operating system bootloader',
      'SSDs only store binary data in magnetic sectors',
      'Windows OS permanently locks all SSD partition tables'
    ],
    correctAnswerIndex: 0,
    explanation: 'Unlike mechanical HDDs with moving heads, SSDs access all flash memory cells with equal electronic speed. Defragmenting writes large volumes of data, degrading NAND flash endurance without any performance benefit.',
    difficulty: 'Distinction',
    examYear: '2025 ZIMSEC Sample'
  },
  {
    id: 'q-834-3',
    topicId: '8.34',
    topicTitle: 'Hardware and Software Maintenance',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which tool or precaution is essential to prevent Electrostatic Discharge (ESD) when swapping a motherboard CPU in a computer lab?',
    options: ['Rubber gloves with talcum powder', 'Anti-static wrist strap clipped to bare metal chassis ground', 'A plastic screwdriver', 'Insulating copper wire loop'],
    correctAnswerIndex: 1,
    explanation: 'An anti-static wrist strap equalizes electrical potential between the technician and the computer chassis, safely bleeding static charges to ground before they can puncture microchips.',
    difficulty: 'Foundation'
  },

  // 8.35 Application of Computer Science
  {
    id: 'q-835-1',
    topicId: '8.35',
    topicTitle: 'Application of Computer Science',
    paperType: 'Paper 1 (MCQ)',
    question: 'In an automated smart greenhouse farming system in Chiredzi, which sequence accurately represents the control loop for drip irrigation?',
    options: [
      'Actuator (Pump) -> Soil Moisture Sensor -> Microcontroller Logic',
      'Soil Moisture Sensor (Input) -> Microcontroller Decision Logic (Processing) -> Relay/Pump Actuator (Output)',
      'Display Monitor -> Relay Switch -> Solar Inverter',
      'GPS Satellite -> Water Valve -> Temperature Sensor'
    ],
    correctAnswerIndex: 1,
    explanation: 'The classic automated control architecture requires Sensors (input) to sample environmental metrics, a Microcontroller (processor) to execute threshold logic, and Actuators (output) to trigger physical mechanisms.',
    difficulty: 'Standard'
  },
  {
    id: 'q-835-2',
    topicId: '8.35',
    topicTitle: 'Application of Computer Science',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which technology integrates spatial coordinates (latitude and longitude) with attribute descriptive data to monitor elephant migration corridors across Hwange National Park?',
    options: ['Geographic Information System (GIS)', 'Content Management System (CMS)', 'Automated Teller Machine (ATM)', 'Dynamic Host Configuration Protocol (DHCP)'],
    correctAnswerIndex: 0,
    explanation: 'GIS (Geographic Information System) is specifically designed to store, manipulate, analyze, and visualize spatial georeferenced data along with contextual attribute records.',
    difficulty: 'Foundation',
    examYear: '2024 Past Paper'
  },
  {
    id: 'q-835-3',
    topicId: '8.35',
    topicTitle: 'Application of Computer Science',
    paperType: 'Paper 1 (MCQ)',
    question: 'An "Ambient System" installed in a modern high school computer laboratory is best characterized as being:',
    options: [
      'Entirely dependent on manual keystrokes and command line arguments',
      'Context-aware, non-intrusive, and automatically adaptive to occupants in the environment',
      'Isolated from any sensors, wireless antennas, or electrical power',
      'A stand-alone spreadsheet macro executed only by the teacher'
    ],
    correctAnswerIndex: 1,
    explanation: 'Ambient Intelligence (AmI) systems are context-aware, embedded unobtrusively within the physical environment, and adapt automatically to human presence and behaviors.',
    difficulty: 'Standard'
  },

  // 8.36 Data Representation (Logic Gates & Truth Tables)
  {
    id: 'q-836-1',
    topicId: '8.36',
    topicTitle: 'Data Representation (Logic Gates & Truth Tables)',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which logic gate produces an output of 1 ONLY when its two inputs are different from each other (one is 1 and the other is 0)?',
    options: ['AND Gate', 'OR Gate', 'XOR (Exclusive-OR) Gate', 'NOR Gate'],
    correctAnswerIndex: 2,
    explanation: 'The XOR (Exclusive-OR) gate outputs 1 (TRUE) if and only if its inputs are dissimilar (0 and 1, or 1 and 0). If both are 1 or both are 0, it outputs 0.',
    difficulty: 'Standard',
    examYear: '2024 Exam'
  },
  {
    id: 'q-836-2',
    topicId: '8.36',
    topicTitle: 'Data Representation (Logic Gates & Truth Tables)',
    paperType: 'Paper 1 (MCQ)',
    question: 'Why are NAND and NOR gates designated as "Universal Gates" in computer architecture?',
    options: [
      'They operate at the universal speed of light in copper conduits',
      'Any Boolean logic circuit (including AND, OR, NOT) can be constructed using only that single gate type',
      'They can accept an infinite number of analog input voltages',
      'They were standardized by the United Nations education council'
    ],
    correctAnswerIndex: 1,
    explanation: 'NAND and NOR gates are termed universal because any basic logic function (NOT, AND, OR, XOR) can be constructed entirely from combinational configurations of NAND or NOR gates alone.',
    difficulty: 'Distinction'
  },
  {
    id: 'q-836-3',
    topicId: '8.36',
    topicTitle: 'Data Representation (Logic Gates & Truth Tables)',
    paperType: 'Paper 1 (MCQ)',
    question: 'How many rows are present in the truth table of a combinational logic circuit with three binary inputs (A, B, C)?',
    options: ['3 rows', '6 rows', '8 rows', '16 rows'],
    correctAnswerIndex: 2,
    explanation: 'For n binary inputs, there are 2^n possible input combinations. For 3 inputs, 2^3 = 8 rows (from 000 up to 111).',
    difficulty: 'Foundation'
  },

  // 8.37 Communication Networks & Internet Technologies
  {
    id: 'q-837-1',
    topicId: '8.37',
    topicTitle: 'Communication Networks and Internet Technologies',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which statement correctly contrasts a Network Switch with a Network Hub?',
    options: [
      'A Switch broadcasts data frames to all ports, whereas a Hub inspects MAC addresses',
      'A Switch inspects incoming frame MAC addresses and forwards to the target port; a Hub blindly repeats data out all ports',
      'A Hub operates at OSI Layer 3 (Network), while a Switch operates at OSI Layer 7 (Application)',
      'Hubs provide hardware firewall filtering, whereas Switches do not'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hubs operate at Layer 1 and blindly broadcast all incoming traffic to every port, creating collisions. Switches operate at Layer 2, maintain a MAC address table, and direct frames only to the designated recipient port.',
    difficulty: 'Standard',
    examYear: '2025 Specimen'
  },
  {
    id: 'q-837-2',
    topicId: '8.37',
    topicTitle: 'Communication Networks and Internet Technologies',
    paperType: 'Paper 1 (MCQ)',
    question: 'In the OSI 7-Layer Reference Model, at which layer do IP addresses, logical network routing, and packet forwarding operate?',
    options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'],
    correctAnswerIndex: 2,
    explanation: 'OSI Layer 3 is the Network Layer, responsible for logical addressing (IPv4/IPv6), path determination, and routing across subnets.',
    difficulty: 'Standard'
  },
  {
    id: 'q-837-3',
    topicId: '8.37',
    topicTitle: 'Communication Networks and Internet Technologies',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which Transport Layer protocol should be chosen when developing a real-time live video streaming application where speed is prioritized over guaranteed packet delivery retransmissions?',
    options: ['TCP (Transmission Control Protocol)', 'UDP (User Datagram Protocol)', 'FTP (File Transfer Protocol)', 'SMTP (Simple Mail Transfer Protocol)'],
    correctAnswerIndex: 1,
    explanation: 'UDP is connectionless and low-latency without handshake overhead or retransmission delays, making it ideal for live video streaming and VoIP where dropped frames are preferred over buffering delays.',
    difficulty: 'Standard'
  },

  // 8.38 Security and Ethics (Unhu/Ubuntu/Vumunhu)
  {
    id: 'q-838-1',
    topicId: '8.38',
    topicTitle: 'Security and Ethics (Unhu/Ubuntu/Vumunhu)',
    paperType: 'Paper 1 (MCQ)',
    question: 'A school conducts a full backup on Sunday night, followed by daily backups Monday through Friday that copy only files that have changed since the preceding daily backup. What backup type is being used on weekdays?',
    options: ['Full Backup', 'Differential Backup', 'Incremental Backup', 'Mirror Backup'],
    correctAnswerIndex: 2,
    explanation: 'An Incremental backup backs up only data that has changed since the LAST backup of any type (full or incremental). It saves space and time during backup execution.',
    difficulty: 'Standard',
    examYear: '2024 Exam'
  },
  {
    id: 'q-838-2',
    topicId: '8.38',
    topicTitle: 'Security and Ethics (Unhu/Ubuntu/Vumunhu)',
    paperType: 'Paper 1 (MCQ)',
    question: 'When a user accidentally deletes an important document on a FAT32 or NTFS drive, why can file recovery software like Recuva frequently restore it?',
    options: [
      'The OS never deletes anything from RAM',
      'The file data clusters remain on the disk; only the file entry pointer and allocation status are marked as reusable',
      'Recuva contacts the cloud manufacturer to regenerate the file from telemetry',
      'The CPU automatically caches all text files in BIOS firmware'
    ],
    correctAnswerIndex: 1,
    explanation: 'Quick deletion removes only the file directory record and flags the storage blocks as available for future writes. The actual binary data remains on the physical platter or flash blocks until overwritten by new files.',
    difficulty: 'Distinction'
  },
  {
    id: 'q-838-3',
    topicId: '8.38',
    topicTitle: 'Security and Ethics (Unhu/Ubuntu/Vumunhu)',
    paperType: 'Paper 1 (MCQ)',
    question: 'In the context of the Zimbabwean curriculum philosophy of Unhu/Ubuntu/Vumunhu, which action exemplifies ethical computing practice?',
    options: [
      'Accessing another student’s private login account to view their test score rankings',
      'Distributing crack keys and pirated commercial operating systems to save money',
      'Respecting intellectual property, protecting peer privacy, and reporting digital security vulnerabilities responsibly',
      'Deploying keyloggers on shared library PCs for personal amusement'
    ],
    correctAnswerIndex: 2,
    explanation: 'Unhu/Ubuntu centers on human dignity, mutual respect, communal integrity, and moral honesty in both physical and digital communal life.',
    difficulty: 'Foundation'
  },

  // 8.39 System Analysis and Design
  {
    id: 'q-839-1',
    topicId: '8.39',
    topicTitle: 'System Analysis and Design',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which of the following items belongs strictly in Technical Documentation rather than User Documentation?',
    options: [
      'Step-by-step user login instructions',
      'Entity-Relationship Diagrams (ERDs), Data Dictionary, and Annotated Source Code',
      'Troubleshooting guide for printer paper jams',
      'Customer support helpdesk telephone numbers'
    ],
    correctAnswerIndex: 1,
    explanation: 'Technical documentation is intended for system analysts and programmers who maintain or modify the software. It contains technical schemas, ERDs, DFDs, data dictionaries, and commented source code.',
    difficulty: 'Standard'
  },
  {
    id: 'q-839-2',
    topicId: '8.39',
    topicTitle: 'System Analysis and Design',
    paperType: 'Paper 1 (MCQ)',
    question: 'A large commercial hospital adopts a new Electronic Health Records system by running both the old paper records and the new computerized database simultaneously for two months. Which implementation changeover method is this?',
    options: ['Direct Changeover', 'Parallel Running', 'Pilot Conversion', 'Phased Implementation'],
    correctAnswerIndex: 1,
    explanation: 'Parallel running operates both old and new systems concurrently. If the new system fails, the legacy system serves as a live safeguard, eliminating life-threatening downtime risks.',
    difficulty: 'Foundation',
    examYear: '2024 Exam'
  },
  {
    id: 'q-839-3',
    topicId: '8.39',
    topicTitle: 'System Analysis and Design',
    paperType: 'Paper 1 (MCQ)',
    question: 'A software company modifies its school payroll application to accommodate a revised national tax rate announced by the Ministry of Finance. What type of maintenance is this?',
    options: ['Corrective Maintenance', 'Adaptive Maintenance', 'Perfective Maintenance', 'Preventive Maintenance'],
    correctAnswerIndex: 1,
    explanation: 'Adaptive maintenance alters a software solution to keep it operational and compliant when external environments, statutes, hardware, or operating systems change.',
    difficulty: 'Standard'
  },

  // 8.40 Algorithm Design and Problem-Solving
  {
    id: 'q-840-1',
    topicId: '8.40',
    topicTitle: 'Algorithm Design and Problem-Solving',
    paperType: 'Paper 1 (MCQ)',
    question: 'What is the primary difference between a WHILE...DO loop and a REPEAT...UNTIL loop in structured algorithms?',
    options: [
      'WHILE loops are post-condition loops; REPEAT loops are pre-condition loops',
      'A WHILE loop tests its condition before executing and may run 0 times; a REPEAT loop tests after executing and always runs at least once',
      'REPEAT loops only evaluate mathematical formulas involving square roots',
      'WHILE loops cannot be converted into flowcharts'
    ],
    correctAnswerIndex: 1,
    explanation: 'WHILE...DO is a pre-condition loop that checks the condition prior to entering the body. If the condition is initially false, the loop executes 0 times. REPEAT...UNTIL evaluates condition at the end and always executes at least once.',
    difficulty: 'Standard'
  },
  {
    id: 'q-840-2',
    topicId: '8.40',
    topicTitle: 'Algorithm Design and Problem-Solving',
    paperType: 'Paper 1 (MCQ)',
    question: 'In a standard flowchart, which geometric symbol is strictly reserved for Input and Output operations (e.g. INPUT StudentMark or OUTPUT "Pass")?',
    options: ['Rectangle', 'Diamond', 'Parallelogram', 'Oval / Capsule'],
    correctAnswerIndex: 2,
    explanation: 'In standard flowcharting conventions, the Parallelogram signifies Input/Output operations. Rectangles indicate Processing, Diamonds indicate Decisions, and Ovals indicate Start/Stop.',
    difficulty: 'Foundation'
  },

  // 8.41 Programming
  {
    id: 'q-841-1',
    topicId: '8.41',
    topicTitle: 'Programming Concepts & Testing',
    paperType: 'Paper 1 (MCQ)',
    question: 'In Object-Oriented Programming (OOP), what term describes bundling data attributes and methods inside a class while restricting direct external access to prevent unintended tampering?',
    options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Recursion'],
    correctAnswerIndex: 2,
    explanation: 'Encapsulation is the principle of hiding internal object states and requiring all interactions to be performed through authorized public methods/getters/setters.',
    difficulty: 'Standard',
    examYear: '2024 Exam'
  },
  {
    id: 'q-841-2',
    topicId: '8.41',
    topicTitle: 'Programming Concepts & Testing',
    paperType: 'Paper 1 (MCQ)',
    question: 'A programmer writes a function to compute exam averages: Average = (Mark1 + Mark2) / 3. The program runs without syntax errors or crashes, but calculates incorrect grades. What category of error is present?',
    options: ['Syntax Error', 'Run-time Error', 'Logic Error', 'Linker Error'],
    correctAnswerIndex: 2,
    explanation: 'A Logic error occurs when the program compiles and executes without crashing, but yields an incorrect or unintended result due to flawed mathematical or procedural logic in the code.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-841-3',
    topicId: '8.41',
    topicTitle: 'Programming Concepts & Testing',
    paperType: 'Paper 1 (MCQ)',
    question: 'An input field accepts student percentage marks from 0 to 100 inclusive. When creating a test data plan, what values represent Boundary (Extreme) test data?',
    options: ['50 and 75', '0 and 100', '-1 and 101', '"Ninety" and NULL'],
    correctAnswerIndex: 1,
    explanation: 'Boundary (or Extreme) data represents the exact upper and lower boundary values that should still be accepted as valid. Here, 0 and 100 are boundary values.',
    difficulty: 'Standard'
  },

  // 8.42 Databases
  {
    id: 'q-842-1',
    topicId: '8.42',
    topicTitle: 'Databases & Advanced SQL',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which SQL clause is used to filter groups of records AFTER an aggregate function like COUNT() or AVG() has been applied?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    correctAnswerIndex: 1,
    explanation: 'WHERE filters individual table rows BEFORE aggregation. The HAVING clause is specifically used to filter aggregated group results produced by GROUP BY.',
    difficulty: 'Distinction'
  },
  {
    id: 'q-842-2',
    topicId: '8.42',
    topicTitle: 'Databases & Advanced SQL',
    paperType: 'Paper 1 (MCQ)',
    question: 'What ensures that a Foreign Key value in the Enrollments table must always match a valid Primary Key in the Students table, preventing orphan records?',
    options: ['Entity Encryption', 'Referential Integrity Constraint', 'De-normalization', 'Dynamic SQL Injection'],
    correctAnswerIndex: 1,
    explanation: 'Referential integrity is a relational database property enforcing that relationships between tables remain consistent and foreign keys cannot point to nonexistent records.',
    difficulty: 'Standard'
  },

  // 8.43 Web Design & Web Security
  {
    id: 'q-843-1',
    topicId: '8.43',
    topicTitle: 'Web Design and Web Security',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which cookie flag prevents client-side JavaScript from accessing session cookies via document.cookie, helping protect against Cross-Site Scripting (XSS) session theft?',
    options: ['Secure', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'],
    correctAnswerIndex: 1,
    explanation: 'Setting the HttpOnly flag on a cookie instructs the browser that the cookie should not be exposed through client-side scripts, protecting session tokens from XSS theft.',
    difficulty: 'Distinction'
  },
  {
    id: 'q-843-2',
    topicId: '8.43',
    topicTitle: 'Web Design and Web Security',
    paperType: 'Paper 1 (MCQ)',
    question: 'Why is HTTPS preferred over plain HTTP for school student portal login portals?',
    options: [
      'HTTPS compresses images so the webpage renders in greyscale',
      'HTTPS uses Transport Layer Security (TLS) to encrypt user credentials, preventing eavesdropping on public Wi-Fi',
      'HTTPS removes the need for web hosting servers',
      'HTTPS automatically translates web pages into Shona and Ndebele'
    ],
    correctAnswerIndex: 1,
    explanation: 'HTTPS encrypts all data transmitted between client browser and web server using TLS, guaranteeing confidentiality, authentication, and data integrity.',
    difficulty: 'Foundation'
  },

  // 8.44 Technopreneurship
  {
    id: 'q-844-1',
    topicId: '8.44',
    topicTitle: 'Technopreneurship',
    paperType: 'Paper 1 (MCQ)',
    question: 'What term describes financing a tech startup solely using personal savings and early customer revenue without surrendering company equity or taking bank loans?',
    options: ['Venture Capital', 'Angel Investment', 'Bootstrapping', 'Syndicate Loan'],
    correctAnswerIndex: 2,
    explanation: 'Bootstrapping refers to building and scaling a business using personal finances and operating cash flow, retaining 100% equity and control without external seed investment.',
    difficulty: 'Standard',
    examYear: '2024 Exam'
  },
  {
    id: 'q-844-2',
    topicId: '8.44',
    topicTitle: 'Technopreneurship',
    paperType: 'Paper 1 (MCQ)',
    question: 'Which factor is most critical when evaluating the physical location for an ICT software development and data processing enterprise in Zimbabwe?',
    options: [
      'Proximity to deep water shipping harbors',
      'Reliable power supply (with commercial solar/inverter backup) and high-speed broadband fiber connectivity',
      'Abundant heavy machinery manufacturing workshops',
      'Large warehouse bays for physical timber storage'
    ],
    correctAnswerIndex: 1,
    explanation: 'Software development enterprises fundamentally depend on uninterrupted electricity, robust backup power, and low-latency, high-bandwidth internet connectivity.',
    difficulty: 'Foundation'
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge-logic-master',
    title: 'Logic Master',
    description: 'Mastered logic gates, truth tables, and combinational circuits (8.36)',
    icon: 'Cpu',
    category: 'mastery',
    xpReward: 150
  },
  {
    id: 'badge-network-architect',
    title: 'Network Architect',
    description: 'Demonstrated mastery in OSI 7 layers, TCP/IP, and networking hardware (8.37)',
    icon: 'Network',
    category: 'mastery',
    xpReward: 150
  },
  {
    id: 'badge-cyber-guardian',
    title: 'Cyber Guardian',
    description: 'Excellence in data backups, disaster recovery, and Unhu/Ubuntu ethics (8.38)',
    icon: 'ShieldCheck',
    category: 'mastery',
    xpReward: 150
  },
  {
    id: 'badge-sdlc-analyst',
    title: 'Systems Analyst',
    description: 'Mastered system documentation, user training, and changeover strategies (8.39)',
    icon: 'FileCode2',
    category: 'mastery',
    xpReward: 150
  },
  {
    id: 'badge-code-craftsman',
    title: 'OOP Programmer',
    description: 'Flawlessly applied OOP encapsulation, inheritance, and test planning (8.41)',
    icon: 'Terminal',
    category: 'mastery',
    xpReward: 150
  },
  {
    id: 'badge-database-guru',
    title: 'Database Guru',
    description: 'Constructed advanced SQL JOINs, aggregations, and security controls (8.42)',
    icon: 'Database',
    category: 'mastery',
    xpReward: 150
  },
  {
    id: 'badge-hardware-guru',
    title: 'Hardware Guru',
    description: 'Diagnosed PC faults, POST beep codes, and storage maintenance (8.34)',
    icon: 'Wrench',
    category: 'mastery',
    xpReward: 120
  },
  {
    id: 'badge-techno-founder',
    title: 'Techno Founder',
    description: 'Mastered tech finance, bootstrapping, and market research strategy (8.44)',
    icon: 'Sparkles',
    category: 'mastery',
    xpReward: 120
  },
  {
    id: 'badge-first-quiz',
    title: 'First Step',
    description: 'Completed your very first Form 4 revision quiz',
    icon: 'Award',
    category: 'special',
    xpReward: 50
  },
  {
    id: 'badge-perfect-score',
    title: 'A-Grade Scholar',
    description: 'Scored 100% on a Form 4 examination assessment',
    icon: 'Trophy',
    category: 'exam',
    xpReward: 200
  },
  {
    id: 'badge-study-streak',
    title: 'Consistent Learner',
    description: 'Maintained a 3+ day consecutive revision streak',
    icon: 'Flame',
    category: 'streak',
    xpReward: 100
  },
  {
    id: 'badge-zimsec-distinction',
    title: 'ZIMSEC Distinction',
    description: 'Reached Level 5 with over 1,500 total XP',
    icon: 'Crown',
    category: 'exam',
    xpReward: 300
  }
];
