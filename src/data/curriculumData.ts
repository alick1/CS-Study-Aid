import { SyllabusTopic } from '../types';

export const FORM_4_CURRICULUM: SyllabusTopic[] = [
  {
    id: '8.34',
    code: 'Topic 8.34',
    title: 'Hardware and Software Maintenance',
    category: 'Hardware & Systems',
    description: 'Diagnosing, troubleshooting, and repairing hardware malfunctions and software errors to maintain computer system reliability.',
    objectives: [
      'Replace malfunctioning components (RAM, Hard Drive, Input/Output peripherals)',
      'Troubleshoot and fix common software and hardware problems',
      'Demonstrate procedures for building a functional PC and system maintenance'
    ],
    contentOutline: [
      'Common system errors: POST beep codes, Blue Screen of Death (BSOD), driver conflicts',
      'Input/Output troubleshooting: Keyboard matrix issues, mouse sensor drift, display artifacts',
      'Storage diagnostics: S.M.A.R.T. monitoring, bad sectors, disk defragmentation vs SSD TRIM',
      'Memory issues: RAM parity errors, memory leaks, reseating DIMM modules',
      'Preventive maintenance: Thermal paste reapplication, dust cleaning, cable management'
    ],
    suggestedActivities: [
      'Maintaining hardware and software in the school computer lab',
      'Building a functional PC from individual modular components',
      'Simulating diagnostic routines using diagnostic boot disks'
    ],
    studyNotes: [
      {
        title: 'Hardware Diagnostics & Component Replacement',
        content: 'Computer maintenance requires a systematic approach known as the Scientific Troubleshooting Method: Identify the problem, establish a theory of probable cause, test the theory, establish a plan of action, verify full system functionality, and document findings.',
        subsections: [
          {
            subtitle: 'Power-On Self-Test (POST) and Beep Codes',
            body: 'When a computer powers up, the BIOS/UEFI runs POST to check core components before loading the OS. A single short beep signifies all checks passed. Repeating long beeps usually indicates RAM fault or missing memory. One long and two/three short beeps commonly point to display adapter (GPU) failure.'
          },
          {
            subtitle: 'Storage Drive Maintenance',
            body: 'Mechanical Hard Disk Drives (HDDs) suffer from fragmentation where files are split across non-contiguous sectors. Defragmentation reorganizes data to minimize read/write head movement. Note: Solid State Drives (SSDs) must NEVER be defragmented as it causes flash wear; SSDs rely on the TRIM command to manage deleted blocks.'
          },
          {
            subtitle: 'RAM and Memory Troubleshooting',
            body: 'Symptoms of failing RAM include sudden random restarts, corrupted file saves, and memory address exception errors. Remediation involves testing sticks individually with memtest, cleaning gold contacts with isopropyl alcohol, and reseating in alternating dual-channel slots.'
          }
        ],
        highlight: 'Safety Rule: Always disconnect mains power and ground yourself with an anti-static wrist strap before touching internal PC components to prevent Electrostatic Discharge (ESD).'
      },
      {
        title: 'Software Maintenance & Safe Environments',
        content: 'Software issues typically stem from registry corruption, corrupted system DLL files, driver conflicts, or malicious malware altering boot configuration.',
        subsections: [
          {
            subtitle: 'Safe Mode & Diagnostic Booting',
            body: 'Safe Mode boots the operating system with minimal drivers and system services. If a PC crashes in normal mode but runs steadily in Safe Mode, third-party software, background bloatware, or newly installed drivers are the root culprit.'
          },
          {
            subtitle: 'Driver Rollback and System Restore',
            body: 'Device drivers translate OS commands into hardware signals. If updating a graphics or network driver causes instability, Windows Device Manager offers "Roll Back Driver" to revert to the previous verified working version.'
          }
        ]
      }
    ],
    examTips: [
      'ZIMSEC structured questions frequently ask you to differentiate between symptoms of failing RAM versus failing Hard Drive.',
      'Remember: SSDs do not require defragmentation. Explicitly state that defragmenting SSDs reduces flash lifespan.',
      'Always mention ESD precautions when answering questions on PC assembly or component swapping.'
    ],
    keyTerms: [
      { term: 'POST (Power-On Self-Test)', definition: 'Diagnostic testing sequence executed by the computer firmware right after power-on.' },
      { term: 'S.M.A.R.T.', definition: 'Self-Monitoring, Analysis and Reporting Technology built into hard drives and SSDs to predict imminent disk failure.' },
      { term: 'Electrostatic Discharge (ESD)', definition: 'Sudden flow of electricity between two electrically charged objects caused by contact or static.' },
      { term: 'Safe Mode', definition: 'A diagnostic startup mode of an OS with minimal set of drivers and services.' }
    ]
  },
  {
    id: '8.35',
    code: 'Topic 8.35',
    title: 'Application of Computer Science',
    category: 'Applications & Emerging Tech',
    description: 'Real-world application models of computing in precision agriculture, smart ambient systems, and Geographic Information Systems (GIS).',
    objectives: [
      'Design models of Agricultural computer systems',
      'Explain and model Ambient computing and IoT systems',
      'Model Geographic Information Systems (GIS) for spatial analysis and resource management'
    ],
    contentOutline: [
      'Smart Agriculture: Soil moisture sensors, automated drip irrigation, drone surveillance, greenhouse telemetry',
      'Ambient Systems: Context-aware environments, smart home lighting, climate regulation, smart hospitals',
      'Geographic Information Systems (GIS): Spatial layers, GPS telemetry, wildlife conservation mapping in Zimbabwe, land tenure mapping'
    ],
    suggestedActivities: [
      'Constructing block diagram models of an automated agricultural greenhouse',
      'Designing sensor-actuator feedback loops for ambient smart classroom systems',
      'Mapping local Zimbabwean administrative zones or wildlife reserves using GIS concepts'
    ],
    studyNotes: [
      {
        title: 'Precision Agriculture & Automated Telemetry',
        content: 'In Zimbabwe, computerized agriculture transforms traditional farming into high-yield smart farming through sensor networks, microcontrollers, and cloud analytics.',
        subsections: [
          {
            subtitle: 'Automated Irrigation Loop',
            body: 'A soil moisture sensor measures electrical conductivity between probe pins. When moisture falls below the threshold (e.g. 35%), the microcontroller activates a relay driving a water pump solenoid valve. Once moisture reaches 75%, it automatically switches off, conserving water and electricity.'
          },
          {
            subtitle: 'Drone & Satellite Crop Scouting',
            body: 'Multispectral cameras mounted on unmanned aerial vehicles (UAVs) calculate Normalized Difference Vegetation Index (NDVI) to identify pest infestations and nitrogen deficiency long before they become visible to the human eye.'
          }
        ],
        highlight: 'Agriculture model components: Input (Sensors: pH, moisture, temperature) -> Processing (Microcontroller/PLC logic) -> Output (Actuators: pumps, ventilation fans, motorized sprayers).'
      },
      {
        title: 'Ambient Systems & Context-Aware Computing',
        content: 'Ambient intelligence (AmI) refers to electronic environments that are sensitive, adaptive, and responsive to the presence of people without requiring active human intervention.',
        subsections: [
          {
            subtitle: 'Key Characteristics',
            body: 'Embedded (in furniture/walls), Context-aware (knows who you are and current environment), Adaptive (tailors temperature and lighting based on user historical preferences), and Anticipatory (predicts needs).'
          }
        ]
      },
      {
        title: 'Geographic Information Systems (GIS)',
        content: 'A GIS captures, stores, checks, and displays data related to positions on Earth’s surface. It links spatial data (coordinates/polygons) with attribute data (descriptive statistics).',
        subsections: [
          {
            subtitle: 'Application in Zimbabwe Wildlife & Resources',
            body: 'National Parks (e.g., Hwange, Mana Pools) use GIS to monitor elephant collars, detect poaching hotspots via satellite tracking, and model human-wildlife conflict zones near communal settlements.'
          }
        ]
      }
    ],
    examTips: [
      'When asked to design a model, always illustrate the classic Input -> Process -> Output -> Feedback loop.',
      'Specify exact sensors: DHT11/22 for temperature/humidity, capacitive soil moisture sensor, PIR sensor for motion in ambient systems.',
      'GIS questions usually require explaining the distinction between Spatial Data (coordinates, vector shapes) and Attribute Data (tabular details).'
    ],
    keyTerms: [
      { term: 'GIS (Geographic Information System)', definition: 'System designed to capture, store, manipulate, analyze, and present spatial and geographic data.' },
      { term: 'Ambient Intelligence', definition: 'Computing technology seamlessly integrated into physical spaces to respond intelligently to human presence.' },
      { term: 'Actuator', definition: 'A mechanical or electrical component that moves or controls a mechanism (e.g., motor, valve, relay).' },
      { term: 'Telemetry', definition: 'Automated communications process by which measurements and data are collected at remote locations and transmitted for monitoring.' }
    ]
  },
  {
    id: '8.36',
    code: 'Topic 8.36',
    title: 'Data Representation (Logic Gates & Truth Tables)',
    category: 'Computer Systems & Architecture',
    description: 'Digital logic circuits, Boolean algebra, standard gate representations (AND, OR, NOT, NAND, NOR, XOR, XNOR), and multi-input truth table verification.',
    objectives: [
      'Represent basic and universal logic gates using standard IEEE/MIL symbols',
      'Construct complete truth tables with up to 3 inputs (A, B, C)',
      'Model and evaluate combinational electronic circuits using Boolean logic'
    ],
    contentOutline: [
      'Fundamental logic gates: NOT, AND, OR',
      'Universal gates: NAND, NOR (implementing any logic circuit using only NAND or NOR)',
      'Special gates: XOR (Exclusive-OR) and XNOR (Equivalence)',
      'Constructing 3-input truth tables (8 rows: 000 to 111)',
      'Boolean algebraic identities and Boolean minimization'
    ],
    suggestedActivities: [
      'Drawing schematic symbols for all 7 standard logic gates',
      'Constructing truth tables for compound expressions e.g. Q = (A AND B) OR (NOT C)',
      'Modelling an electronic security alarm circuit triggered by sensors'
    ],
    studyNotes: [
      {
        title: 'Logic Gate Definitions & Truth Behaviors',
        content: 'Logic gates are the physical building blocks of digital hardware. They take one or more binary inputs (0 = LOW/FALSE, 1 = HIGH/TRUE) and produce a single binary output.',
        subsections: [
          {
            subtitle: 'AND Gate (Conjunction)',
            body: 'Output Q is 1 if and ONLY if ALL inputs are 1. Expression: Q = A · B. For 3 inputs: Q = A · B · C.'
          },
          {
            subtitle: 'OR Gate (Disjunction)',
            body: 'Output Q is 1 if AT LEAST ONE input is 1. Expression: Q = A + B.'
          },
          {
            subtitle: 'NOT Gate (Inverter)',
            body: 'Single input gate that inverts the input state. Output Q = NOT A (or A with a bar over it).'
          },
          {
            subtitle: 'NAND & NOR (Universal Gates)',
            body: 'NAND is an AND followed by NOT: Q = NOT(A · B). Output is 0 only when both inputs are 1. NOR is an OR followed by NOT: Q = NOT(A + B). Output is 1 only when all inputs are 0.'
          },
          {
            subtitle: 'XOR (Exclusive OR) & XNOR',
            body: 'XOR outputs 1 if inputs are DIFFERENT (odd number of 1s): Q = A ⊕ B. XNOR outputs 1 if inputs are IDENTICAL (equality comparator): Q = NOT(A ⊕ B).'
          }
        ],
        highlight: 'Formula for truth table rows: For n binary inputs, there are 2^n possible combinations. 2 inputs = 4 rows; 3 inputs = 8 rows.'
      },
      {
        title: '3-Input Truth Table Construction',
        content: 'Systematic binary counting ensures no combinations are missed: 000, 001, 010, 011, 100, 101, 110, 111.',
        subsections: [
          {
            subtitle: 'Worked Example: Q = (A AND B) OR (NOT C)',
            body: 'Calculate intermediate column 1: (A AND B). Calculate intermediate column 2: (NOT C). Finally, OR the two intermediate columns to establish final output Q.'
          }
        ]
      }
    ],
    examTips: [
      'In ZIMSEC Paper 2 and Paper 3, carefully draw the inversion bubble on NAND, NOR, and NOT gates. Missing the circle turns a NAND gate into an AND gate!',
      'When simplifying circuits, remember the universal property: both NAND and NOR gates can independently synthesize any other logic function.',
      'Always add intermediate calculation columns in your truth tables to earn partial credit even if a final calculation error occurs.'
    ],
    keyTerms: [
      { term: 'Universal Gate', definition: 'A logic gate that can implement any Boolean function without using any other gate type (NAND and NOR).' },
      { term: 'Truth Table', definition: 'A mathematical table showing all possible combinations of input variables and their corresponding circuit output.' },
      { term: 'Combinational Logic', definition: 'A circuit where the output is determined solely by the present combination of inputs.' },
      { term: 'Boolean Expression', definition: 'An algebraic statement using variables and logical operators that evaluates to True (1) or False (0).' }
    ]
  },
  {
    id: '8.37',
    code: 'Topic 8.37',
    title: 'Communication Networks and Internet Technologies',
    category: 'Networking & Telecommunications',
    description: 'Protocol architecture (OSI 7 layers vs TCP/IP 4 layers), specialized networking hardware devices, and network modeling.',
    objectives: [
      'Explain the layers and functions of the TCP/IP suite and the OSI 7-layer Reference Model',
      'Explain the exact functions, operation layer, and differences among networking devices (Hub, Switch, Router, Bridge, Modem)',
      'Design and configure a structured network model with appropriate addressing'
    ],
    contentOutline: [
      'OSI 7-Layer Model: Physical, Data Link, Network, Transport, Session, Presentation, Application',
      'TCP/IP 4-Layer Model: Network Interface, Internet, Transport, Application',
      'Key Protocols: HTTP, HTTPS, FTP, SMTP, POP3, IMAP, TCP, UDP, IP, ARP, DNS, DHCP',
      'Networking hardware: Hubs (Layer 1 broadcast), Switches (Layer 2 MAC tables), Routers (Layer 3 IP routing), Bridges, Modems',
      'Traffic analysis and Wireshark packet capture analysis concepts'
    ],
    suggestedActivities: [
      'Creating a comparative table of OSI vs TCP/IP layer mappings',
      'Diagramming how a Switch filters collision domains while a Router separates broadcast domains',
      'Configuring IP addressing and subnet masks for a multi-department computer network'
    ],
    studyNotes: [
      {
        title: 'The OSI 7-Layer & TCP/IP Protocol Architecture',
        content: 'Network communication relies on layered protocols where each layer provides services to the layer above and receives services from the layer below.',
        subsections: [
          {
            subtitle: 'OSI Model Layers (Mnemonic: Please Do Not Throw Sausage Pizza Away)',
            body: '7. Application (User interface, HTTP/FTP); 6. Presentation (Data formatting, encryption/compression); 5. Session (Dialog management, session checkpoints); 4. Transport (End-to-end segmentation, error recovery, TCP/UDP); 3. Network (Logical addressing, packet routing, IP); 2. Data Link (Framing, physical MAC addressing, switch forwarding); 1. Physical (Transmission of raw bits over media, voltages/fiber pulses).'
          },
          {
            subtitle: 'TCP vs. UDP in the Transport Layer',
            body: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, guarantees packet ordering via 3-way handshakes and retransmissions. UDP (User Datagram Protocol) is connectionless, lightweight, and low-latency, preferred for VoIP, video streaming, and online gaming.'
          }
        ],
        highlight: 'Data Units: Application/Presentation/Session -> Data; Transport -> Segment; Network -> Packet; Data Link -> Frame; Physical -> Bits.'
      },
      {
        title: 'Networking Devices & Their OSI Operational Layers',
        content: 'Selecting the correct network device determines network throughput, collision domain size, and security boundaries.',
        subsections: [
          {
            subtitle: 'Hub (Layer 1)',
            body: 'A dumb physical-layer repeater. Any packet received on one port is broadcast out to ALL other ports, creating a single collision domain and generating severe network congestion.'
          },
          {
            subtitle: 'Switch (Layer 2)',
            body: 'An intelligent device that builds a MAC Address Table (CAM table). It inspects incoming frames and forwards traffic ONLY to the specific destination port, isolating collision domains per port.'
          },
          {
            subtitle: 'Router (Layer 3)',
            body: 'An internetworking device operating at the Network layer. It reads logical IP addresses in packet headers and uses routing tables to forward packets across different subnets and WANs. Routers break broadcast domains.'
          },
          {
            subtitle: 'Modem (Modulator-Demodulator)',
            body: 'Converts analog signals from telephone or fiber lines into digital signals that computers understand, and vice versa.'
          }
        ]
      }
    ],
    examTips: [
      'A classic exam trap: Hubs do NOT examine MAC addresses or IP addresses; they blindly broadcast. Only Switches examine MAC addresses, and Routers examine IP addresses.',
      'Remember which layers TCP and IP operate at: TCP is Layer 4 (Transport); IP is Layer 3 (Network).',
      'Be prepared to state which protocol is used for secure web browsing: HTTPS (using SSL/TLS on port 443).'
    ],
    keyTerms: [
      { term: 'Router', definition: 'A Layer 3 device that routes data packets across disparate computer networks based on IP addresses.' },
      { term: 'Switch', definition: 'A Layer 2 networking device that connects devices within a LAN and directs data frames based on MAC addresses.' },
      { term: 'Broadcast Domain', definition: 'A logical division of a computer network in which all nodes can reach each other by broadcast at the data link layer.' },
      { term: 'TCP 3-Way Handshake', definition: 'Process used in TCP to establish a connection using SYN, SYN-ACK, and ACK packets.' }
    ]
  },
  {
    id: '8.38',
    code: 'Topic 8.38',
    title: 'Security and Ethics (Unhu/Ubuntu/Vumunhu)',
    category: 'Security & Ethics',
    description: 'Data backup regimes, disaster recovery planning, data recovery tools, and ethical computing grounded in the Unhu/Ubuntu/Vumunhu philosophy.',
    objectives: [
      'Formulate and execute comprehensive data backup strategies',
      'Design an enterprise Disaster Recovery Plan (DRP)',
      'Utilize data recovery tools and describe file system recovery principles',
      'Demonstrate ethical practices under the African philosophy of Unhu/Ubuntu/Vumunhu'
    ],
    contentOutline: [
      'Backup regimes: Full, Incremental, Differential, and the 3-2-1 backup strategy',
      'Disaster Recovery Planning (DRP): Risk assessment, RTO (Recovery Time Objective), RPO (Recovery Point Objective)',
      'Data recovery mechanics: File deletion FAT/NTFS indicators, Recuva, master file table (MFT) scanning',
      'Unhu / Ubuntu / Vumunhu in computing: Digital citizenship, communal privacy protection, anti-cyberbullying, respect for digital copyright'
    ],
    suggestedActivities: [
      'Designing a backup schedule for a high school management system',
      'Simulating file restoration and using recovery software on partitioned drives',
      'Drafting an acceptable use policy (AUP) integrating Unhu/Ubuntu principles'
    ],
    studyNotes: [
      {
        title: 'Data Backup Regimes & Media Strategies',
        content: 'Data is the most valuable intangible asset of modern organizations. Systematic backups protect against hardware failure, ransomware attacks, human error, and natural catastrophes.',
        subsections: [
          {
            subtitle: 'Backup Types Comparison',
            body: '• Full Backup: Copies all selected data files. Longest backup duration and highest storage requirement, but fastest and simplest restore (single backup set needed).\n• Incremental Backup: Copies only files that have changed since the LAST backup (full or incremental). Fastest backup speed and least storage required, but slowest restore (requires full backup plus every subsequent incremental tape in sequence).\n• Differential Backup: Copies all files that have changed since the last FULL backup. Moderate backup time and storage, requires only the full backup plus the most recent differential backup to restore.'
          },
          {
            subtitle: 'The 3-2-1 Backup Strategy',
            body: 'Keep at least 3 copies of your data on 2 different physical media types (e.g., local server RAID and LTO magnetic tape), with 1 copy stored completely off-site or in secure cloud storage.'
          }
        ],
        highlight: 'Disaster Recovery Metrics: RTO (Recovery Time Objective = how quickly systems must be restored) and RPO (Recovery Point Objective = maximum acceptable data loss in hours/minutes).'
      },
      {
        title: 'Data Recovery Mechanics & Tools',
        content: 'When an operating system deletes a file, it does not immediately overwrite the binary data on magnetic or flash storage. Instead, it marks the file entry in the Master File Table (MFT) or File Allocation Table (FAT) as available space. Data recovery tools scan unallocated sectors to reconstruct headers and metadata before new data overwrites them.'
      },
      {
        title: 'Unhu / Ubuntu / Vumunhu in Digital Spaces',
        content: 'Unhu/Ubuntu/Vumunhu ("I am because we are") establishes human dignity, interconnectedness, mutual responsibility, and moral integrity as core community tenets.',
        subsections: [
          {
            subtitle: 'Ethical Applications',
            body: 'In computing, Unhu condemns hacking into school records, sharing defamatory deepfakes, cyberbullying, unauthorized surveillance, and distributing pirated software. A technopreneur guided by Unhu creates technology that elevates societal wellbeing rather than exploiting vulnerable communities.'
          }
        ]
      }
    ],
    examTips: [
      'In exam questions comparing Incremental vs. Differential backups, clearly state the exact sequence required to restore data.',
      'Explain that formatting or quick-deleting a disk does not erase contents immediately; recovery tools like Recuva can scavenge orphaned clusters until overwritten.',
      'Be ready to define how Unhu/Ubuntu applies to digital ethics: integrity, communal respect, privacy stewardship, and avoidance of malicious code.'
    ],
    keyTerms: [
      { term: 'Disaster Recovery Plan (DRP)', definition: 'A documented, structured approach describing how an organization can quickly resume work after an unplanned incident.' },
      { term: 'Incremental Backup', definition: 'A backup that copies only data that has changed since the most recent backup of any kind.' },
      { term: 'Differential Backup', definition: 'A backup that records only data that has changed since the last full backup.' },
      { term: 'Unhu / Ubuntu / Vumunhu', definition: 'Traditional African philosophy emphasizing shared humanity, ethical responsibility, honesty, and mutual respect.' }
    ]
  },
  {
    id: '8.39',
    code: 'Topic 8.39',
    title: 'System Analysis and Design',
    category: 'Software Engineering & SDLC',
    description: 'System documentation, end-user training methods, changeover implementation strategies, post-implementation evaluation, and maintenance categories.',
    objectives: [
      'Describe the distinct types of documentation (User vs Technical) and specify their detailed contents',
      'Outline the importance of user training and compare training delivery methods in software deployment',
      'Analyze the four major system implementation methods (Direct, Parallel, Pilot, Phased)',
      'Explain post-implementation evaluation techniques and the four types of system maintenance'
    ],
    contentOutline: [
      'Documentation: User Documentation (installation guide, troubleshooting FAQs, tutorials) vs Technical Documentation (DFDs, ERDs, schema, annotated code, test logs)',
      'User Training: Direct one-on-one, group seminars, self-paced interactive modules, user manuals',
      'Implementation / Changeover methods: Direct changeover, Parallel run, Pilot conversion, Phased adoption',
      'System Evaluation: Criteria (meets user requirements, performance benchmarks, usability, cost-benefit)',
      'System Maintenance: Corrective, Adaptive, Perfective, and Preventive maintenance'
    ],
    suggestedActivities: [
      'Writing sample user manual pages with screenshots for a new application',
      'Drafting a comparative risk matrix for Direct Changeover versus Parallel Running',
      'Categorizing real-world software tickets into Corrective, Adaptive, Perfective, or Preventive maintenance'
    ],
    studyNotes: [
      {
        title: 'Documentation: User vs. Technical',
        content: 'System documentation ensures that both ordinary end-users and maintenance software engineers can understand and interact with the software system throughout its lifecycle.',
        subsections: [
          {
            subtitle: 'User Documentation Contents',
            body: 'Designed for non-technical users. Includes: Minimum hardware/software requirements, installation and setup wizard instructions, step-by-step navigation guides with screenshots, input sample formats, troubleshooting guide, glossary of user terms, and helpdesk contact details.'
          },
          {
            subtitle: 'Technical Documentation Contents',
            body: 'Designed for software engineers and systems analysts. Includes: System architecture blueprints, Data Flow Diagrams (DFDs), Entity Relationship Diagrams (ERDs), complete Data Dictionaries, annotated source code with variable definitions, algorithm flowcharts, validation test scripts, and known bug logs.'
          }
        ]
      },
      {
        title: 'System Implementation & Changeover Methods',
        content: 'Transitioning from the legacy system to the newly built computer system involves critical tradeoffs between operational risk and financial expenditure.',
        subsections: [
          {
            subtitle: 'Direct Changeover (Big Bang)',
            body: 'The old system is stopped immediately on a specific date, and the new system is launched simultaneously. Advantages: Lowest cost, no duplicate data entry. Disadvantages: Catastrophic risk if the new system contains unforeseen bugs, with no backup fallback.'
          },
          {
            subtitle: 'Parallel Running',
            body: 'Both old and new systems run simultaneously for a trial period until the new system is verified. Advantages: Absolute safety and zero downtime risk; outputs can be compared. Disadvantages: Double workload for staff and high operational costs.'
          },
          {
            subtitle: 'Pilot Conversion',
            body: 'The new system is introduced into ONE branch or department first (e.g. one school campus). Once proven stable, it is rolled out across the entire organization. Risk is localized.'
          },
          {
            subtitle: 'Phased Implementation',
            body: 'The system is introduced in discrete modules (e.g. first Student Enrollment module, next Term Grading module, finally Fees Accounting module). Allows staff to adapt gradually.'
          }
        ],
        highlight: 'Maintenance Types: Corrective (fixing bugs), Adaptive (updating for new OS/statutes), Perfective (speeding up or adding requested features), Preventive (code refactoring before failure occurs).'
      }
    ],
    examTips: [
      'In essay questions comparing changeover strategies, evaluate both advantages and disadvantages, and state which is best suited for high-risk systems like hospital ICUs or banking.',
      'Do not confuse User documentation with Technical documentation. ERDs and source code belong strictly to Technical documentation.',
      'Remember the four maintenance types: CAP-P (Corrective, Adaptive, Perfective, Preventive).'
    ],
    keyTerms: [
      { term: 'Parallel Running', definition: 'Implementation method where old and new systems run concurrently to compare results and reduce operational risk.' },
      { term: 'User Documentation', definition: 'Guides and instructions written to assist everyday users in operating the system software effectively.' },
      { term: 'Corrective Maintenance', definition: 'Modifying software to rectify defects, bugs, or errors discovered after deployment.' },
      { term: 'Adaptive Maintenance', definition: 'Modifying software to keep it usable in a changing environment, such as a new OS or new tax laws.' }
    ]
  },
  {
    id: '8.40',
    code: 'Topic 8.40',
    title: 'Algorithm Design and Problem-Solving',
    category: 'Algorithms & Logic',
    description: 'Algorithmic problem-solving tools, standard flowchart conventions, formal pseudocode constructs, trace tables, and dry-running logic.',
    objectives: [
      'Design modular algorithms using formal flowcharts and standard pseudocode conventions',
      'Apply structured programming constructs: Sequence, Selection (IF, CASE), and Iteration (FOR, WHILE, REPEAT)',
      'Use trace tables to dry-run algorithms with normal, boundary, and erroneous test data to detect logic flaws'
    ],
    contentOutline: [
      'Flowchart symbols: Terminator (oval), Process (rectangle), Decision (diamond), Input/Output (parallelogram), Connectors',
      'Pseudocode constructs: IF...THEN...ELSE...ENDIF, CASE...OF, WHILE...DO...ENDWHILE, FOR...TO...NEXT, REPEAT...UNTIL',
      'Trace tables: Step-by-step column tracking of variable state changes per iteration loop',
      'Algorithm efficiency and modular top-down decomposition'
    ],
    suggestedActivities: [
      'Drawing flowcharts to calculate student grades based on ZIMSEC percentage boundaries',
      'Translating complex flowcharts into clean structured pseudocode',
      'Completing manual trace tables for nested loops to identify off-by-one errors'
    ],
    studyNotes: [
      {
        title: 'Algorithm Tools: Flowcharts & Pseudocode',
        content: 'An algorithm is a finite, unambiguous, step-by-step sequence of instructions designed to solve a specific computational problem.',
        subsections: [
          {
            subtitle: 'Standard Flowchart Symbols',
            body: '• Oval / Capsule: Start and End (Terminator)\n• Parallelogram: Input from user or Output to display\n• Rectangle: Processing step or arithmetic calculation\n• Diamond: Decision branch with two labeled exit paths (Yes/No or True/False)\n• Small Circle: Connector'
          },
          {
            subtitle: 'Iteration Constructs in Pseudocode',
            body: '1. FOR loop: Definite iteration where total count of iterations is known in advance (e.g. FOR count = 1 TO 10).\n2. WHILE...DO loop: Pre-condition loop; evaluates condition before entering body. If condition is false initially, loop executes 0 times.\n3. REPEAT...UNTIL loop: Post-condition loop; executes loop body at least ONCE before evaluating exit condition.'
          }
        ]
      },
      {
        title: 'Dry-Running with Trace Tables',
        content: 'A trace table is an inspection tool used to track changes in variables during manual dry-run execution of code or pseudocode.',
        subsections: [
          {
            subtitle: 'Dry Run Structure',
            body: 'Each variable has its own dedicated column, along with a condition column and an output column. Record variable values only when they change. Never skip rows, and trace exactly line by line.'
          }
        ],
        highlight: 'Exam Trap: REPEAT...UNTIL loops terminate when the condition becomes TRUE, whereas WHILE...DO loops continue as long as the condition remains TRUE.'
      }
    ],
    examTips: [
      'Label both decision arrows emerging from diamond boxes (e.g. "YES" and "NO"). Unlabeled arrows lose marks.',
      'In trace tables, do not write anything in variable columns if the value does not change on that step.',
      'Use standard uppercase keywords in pseudocode: INPUT, OUTPUT, IF, THEN, ELSE, ENDIF, WHILE, ENDWHILE.'
    ],
    keyTerms: [
      { term: 'Algorithm', definition: 'A clear, finite step-by-step procedure for solving a computational problem or performing a task.' },
      { term: 'Trace Table', definition: 'A technique used to test algorithms manually by charting variable values line by line.' },
      { term: 'Pseudocode', definition: 'A language-independent, human-readable description of an algorithm using structured English.' },
      { term: 'Dry Run', definition: 'Manual execution of an algorithm by a programmer using pen and paper to verify logic.' }
    ]
  },
  {
    id: '8.41',
    code: 'Topic 8.41',
    title: 'Programming Concepts & Testing',
    category: 'Software Engineering & SDLC',
    description: 'Practical coding implementations, Object-Oriented Programming (OOP) paradigms, error classification, and rigorous testing methodologies.',
    objectives: [
      'Develop project code using programming concepts in high-level languages (Visual Basic / Python)',
      'Apply core Object-Oriented principles: Encapsulation, Inheritance, and Polymorphism',
      'Distinguish and diagnose syntax, run-time, and logic errors with structured exception handling',
      'Formulate comprehensive test plans with normal, boundary, and erroneous test datasets'
    ],
    contentOutline: [
      'OOP Foundations: Classes, Objects, Attributes, Methods, Constructors',
      'Inheritance (child class deriving attributes/methods from parent class)',
      'Polymorphism (method overriding and interfaces)',
      'Encapsulation (private fields and public getters/setters)',
      'Types of Errors: Syntax, Run-time, Logic errors',
      'Testing techniques: Black-box vs. White-box testing, Unit testing, Integration testing',
      'Test Data Categories: Normal (expected), Extreme/Boundary (limits), Erroneous (invalid)'
    ],
    suggestedActivities: [
      'Writing an OOP class model for a School Student and Subclass Prefect in Python or VB',
      'Writing automated try/except or try/catch blocks to gracefully handle Divide-by-Zero errors',
      'Constructing a comprehensive test data matrix for a form validation rule'
    ],
    studyNotes: [
      {
        title: 'Core Object-Oriented Programming (OOP) Pillars',
        content: 'OOP models software around data, or objects, rather than functions and logic. It is a cornerstone requirement of ZIMSEC Form 4 practical assessment.',
        subsections: [
          {
            subtitle: '1. Encapsulation',
            body: 'Bundling data (attributes) and methods that operate on that data into a single class, while restricting direct access to internal components (using private variables accessed via getters/setters). Prevents unauthorized tampering.'
          },
          {
            subtitle: '2. Inheritance',
            body: 'Mechanism where a new class (subclass/child) inherits properties and behaviors from an existing class (superclass/parent). Promotes code reuse. Example: class Student inherits from class Person.'
          },
          {
            subtitle: '3. Polymorphism',
            body: 'Ability of different classes to respond to the same method call in different ways. Enables uniform method interfaces with specialized implementations (e.g. person.calculatePayment() behaving differently for Teacher vs Student).'
          }
        ]
      },
      {
        title: 'Error Classification & Debugging',
        content: 'Understanding how and when errors manifest is critical to software reliability.',
        subsections: [
          {
            subtitle: 'Syntax Errors',
            body: 'Violations of grammatical rules of the programming language (e.g. misspelled keywords, missing colon, unmatched parenthesis). Detected during parsing/compilation before execution.'
          },
          {
            subtitle: 'Run-Time Errors',
            body: 'Errors that occur while program is running (e.g. division by zero, file not found, index out of range). Causes program crash unless caught by error handling.'
          },
          {
            subtitle: 'Logic Errors',
            body: 'The program compiles and runs without crashing, but produces incorrect results due to flawed algorithmic logic (e.g. using + instead of *, or loop condition < 10 instead of <= 10).'
          }
        ],
        highlight: 'Test Data Types: For age validation (13-19): Normal = 15; Boundary/Extreme = 13 and 19; Erroneous = -5, 25, "Fifteen".'
      }
    ],
    examTips: [
      'ZIMSEC grade descriptors explicitly state Grade A candidates must demonstrate inheritance, polymorphism, and encapsulation.',
      'When asked to identify an error type, remember: if the program produces the wrong answer without crashing, it is ALWAYS a Logic Error.',
      'Always include all three test data categories (Normal, Boundary, Erroneous) in test plan questions.'
    ],
    keyTerms: [
      { term: 'Encapsulation', definition: 'The bundling of data with the methods that operate on that data, hiding internal state from outside code.' },
      { term: 'Inheritance', definition: 'A mechanism wherein a child class acquires all properties and behaviors of a parent class.' },
      { term: 'Polymorphism', definition: 'The ability of different objects to respond to the same message or method invocation in specialized ways.' },
      { term: 'Logic Error', definition: 'A bug that causes a program to operate incorrectly, but not to terminate abnormally (crash).' }
    ]
  },
  {
    id: '8.42',
    code: 'Topic 8.42',
    title: 'Databases & Advanced SQL',
    category: 'Databases & Information Systems',
    description: 'Relational database architecture, multi-table joins, complex SQL queries, database application connectivity (ODBC/ADO), and security.',
    objectives: [
      'Construct advanced SQL queries spanning multiple relational tables using INNER JOIN and aggregation',
      'Link database backends to software frontends using ODBC and ADO connection strings',
      'Apply robust database security measures (RBAC, SQL injection mitigation, encryption)'
    ],
    contentOutline: [
      'Relational schema: Primary keys, Foreign keys, Composite keys, Referential integrity',
      'Entity Relationship Diagrams (ERDs): One-to-One, One-to-Many, Many-to-Many relationships',
      'SQL commands: SELECT, FROM, WHERE, INNER JOIN, GROUP BY, HAVING, ORDER BY',
      'SQL Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
      'Connecting databases to applications: Connection strings, parameterized queries',
      'Database security: User privilege grants, view masking, data at rest encryption'
    ],
    suggestedActivities: [
      'Writing multi-table SQL queries joining Students and Marks tables',
      'Drawing ERDs for a school management system with cardinality indicators',
      'Demonstrating parameterized SQL statements to neutralize SQL injection vulnerabilities'
    ],
    studyNotes: [
      {
        title: 'Relational Database Design & Keys',
        content: 'A relational database organizes data into one or more tables (relations) of columns and rows, with a unique key identifying each row.',
        subsections: [
          {
            subtitle: 'Key Types',
            body: '• Primary Key: A field (or combination) that uniquely identifies each record in a table.\n• Foreign Key: A field in one table that uniquely identifies a row of another table, establishing a referential link.\n• Composite Key: A primary key composed of two or more attributes together.'
          },
          {
            subtitle: 'Referential Integrity',
            body: 'A database constraint ensuring that foreign key values in a child table must always correspond to an existing, valid primary key value in the parent table. Prevents orphan records.'
          }
        ]
      },
      {
        title: 'Advanced SQL Query Syntax',
        content: 'Structured Query Language (SQL) is the global standard for querying relational database management systems.',
        subsections: [
          {
            subtitle: 'Multi-Table INNER JOIN Example',
            body: 'SELECT Students.FullName, Courses.CourseName, Marks.Score\nFROM Marks\nINNER JOIN Students ON Marks.StudentID = Students.StudentID\nINNER JOIN Courses ON Marks.CourseID = Courses.CourseID\nWHERE Marks.Score >= 75\nORDER BY Marks.Score DESC;'
          },
          {
            subtitle: 'Aggregation with GROUP BY & HAVING',
            body: 'SELECT Department, COUNT(*) AS TotalStaff, AVG(Salary) AS AverageSalary\nFROM Employees\nGROUP BY Department\nHAVING AVG(Salary) > 500;'
          }
        ],
        highlight: 'WHERE filters rows BEFORE aggregation occurs; HAVING filters grouped rows AFTER aggregation.'
      }
    ],
    examTips: [
      'Remember the difference between WHERE and HAVING: WHERE filters individual records before grouping; HAVING filters aggregated groups.',
      'Always specify the ON clause when writing an INNER JOIN to define how tables connect.',
      'Highlight parameterized queries as the gold standard for preventing SQL injection attacks.'
    ],
    keyTerms: [
      { term: 'Primary Key', definition: 'A designated column in a table whose values are strictly unique and cannot be NULL.' },
      { term: 'Foreign Key', definition: 'A column in a table that references a primary key in another table to enforce a relationship.' },
      { term: 'Referential Integrity', definition: 'A database state where all foreign keys point to valid existing primary keys.' },
      { term: 'SQL Injection', definition: 'A code injection technique where malicious SQL statements are inserted into entry fields for execution.' }
    ]
  },
  {
    id: '8.43',
    code: 'Topic 8.43',
    title: 'Web Design and Web Security',
    category: 'Web Technologies & Security',
    description: 'Modern web development principles, Content Management Systems (CMS), web security protocols (HTTPS, XSS, CSRF, Cookies), and developer testing tools.',
    objectives: [
      'Develop structured, responsive websites using HTML, CSS, and modern web frameworks/CMS',
      'Apply vital web application security countermeasures (HTTPS/TLS, input validation, secure cookies)',
      'Test and debug web applications using browser developer tools and cross-platform verification'
    ],
    contentOutline: [
      'Web fundamentals: Semantic HTML5, CSS responsive layout, client-side scripting',
      'Content Management Systems (CMS): WordPress, Joomla, Drupal (templates, plugins, security patches)',
      'Web Security Threats: Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Man-in-the-Middle (MITM)',
      'Security Measures: SSL/TLS encryption, HTTPS, Content Security Policy (CSP), cookie security attributes (HttpOnly, Secure, SameSite)',
      'Testing & Debugging: DevTools Console, Network panel, responsive viewport emulation'
    ],
    suggestedActivities: [
      'Creating a responsive school portal homepage template with semantic tags',
      'Auditing website cookies for Secure and HttpOnly flags',
      'Using browser Developer Tools to identify broken links and script syntax errors'
    ],
    studyNotes: [
      {
        title: 'Modern Web Development & CMS Architecture',
        content: 'Websites range from custom hand-coded HTML/CSS/JavaScript applications to database-driven Content Management Systems.',
        subsections: [
          {
            subtitle: 'Content Management Systems (CMS)',
            body: 'A CMS (e.g. WordPress, Joomla) enables users to create and manage digital content without writing code from scratch. While convenient, CMS deployments require continuous patching because outdated plugins represent the primary vector for automated web exploits.'
          }
        ]
      },
      {
        title: 'Web Application Security Countermeasures',
        content: 'Web applications face constant exposure to public internet attacks.',
        subsections: [
          {
            subtitle: 'HTTPS & SSL/TLS Encryption',
            body: 'Hypertext Transfer Protocol Secure (HTTPS) encrypts HTTP requests and responses using TLS encryption. It prevents eavesdropping and Man-in-the-Middle packet interception.'
          },
          {
            subtitle: 'Cross-Site Scripting (XSS)',
            body: 'Attackers inject malicious JavaScript scripts into trusted websites viewed by other users. Defenses: Strict input sanitization, output encoding, and implementing Content Security Policy (CSP) headers.'
          },
          {
            subtitle: 'Secure Cookie Configuration',
            body: 'Session cookies must be marked with: "Secure" (transmitted solely over encrypted HTTPS), "HttpOnly" (inaccessible to JavaScript document.cookie, thwarting XSS session theft), and "SameSite=Strict" (prevents CSRF).'
          }
        ],
        highlight: 'Three critical cookie security flags: Secure (HTTPS only), HttpOnly (blocks JS access), and SameSite (blocks CSRF cross-origin sends).'
      }
    ],
    examTips: [
      'Be able to explain why HTTPS is indispensable for login and payment forms: it provides encryption, integrity, and authentication.',
      'Explain that the HttpOnly flag prevents malicious scripts from stealing user session cookies during an XSS exploit.',
      'Mention responsive design principles: viewport meta tag, flexible grid layouts, and CSS media queries.'
    ],
    keyTerms: [
      { term: 'HTTPS', definition: 'An extension of HTTP using Transport Layer Security (TLS) to encrypt internet communication.' },
      { term: 'Cross-Site Scripting (XSS)', definition: 'A security vulnerability where attackers inject malicious scripts into web pages viewed by other users.' },
      { term: 'HttpOnly Cookie', definition: 'A cookie attribute that blocks client-side scripts from accessing the cookie, mitigating session hijacking.' },
      { term: 'Responsive Design', definition: 'An approach to web design making web pages render well on a variety of devices and window screen sizes.' }
    ]
  },
  {
    id: '8.44',
    code: 'Topic 8.44',
    title: 'Technopreneurship',
    category: 'Technopreneurship & Innovation',
    description: 'Finance and funding sources for ICT startups, market research methodologies, and identifying optimal conditions for technological business locations.',
    objectives: [
      'Outline financial resource components and funding sources for ICT technological startups',
      'Conduct rigorous market research using qualitative and quantitative survey instruments',
      'Identify ideal physical and socioeconomic conditions for locating a technology enterprise'
    ],
    contentOutline: [
      'Startup Funding Sources: Bootstrapping (self-funding), Angel investors, Venture Capital (VC), Crowdfunding, Bank debt, Government grants (e.g. Zimbabwe Innovation Drive Fund)',
      'Market Research: Primary research (interviews, questionnaires, focus groups) vs. Secondary research (industry reports, census data)',
      'Competitor & Market Analysis: SWOT analysis, customer demographics, value proposition',
      'Ideal Business Location Factors: Reliable electrical power & solar backups, broadband fiber connectivity, proximity to skilled tech labor, incubation hubs, tax incentives'
    ],
    suggestedActivities: [
      'Developing a lean business canvas for a Zimbabwean educational mobile app',
      'Designing an online market survey questionnaire to test product-market fit',
      'Evaluating location criteria comparing an urban tech hub vs a rural service center'
    ],
    studyNotes: [
      {
        title: 'Funding Mechanisms for ICT Startups',
        content: 'A technopreneur combines technological innovation with entrepreneurial management skills to create sustainable digital enterprises.',
        subsections: [
          {
            subtitle: 'Major Financing Sources',
            body: '1. Bootstrapping: Financing the company using personal savings and initial customer revenue without external debt or equity dilution.\n2. Angel Investors: High-net-worth individuals providing early-stage capital in exchange for equity ownership or convertible debt.\n3. Venture Capital (VC): Investment funds that manage pooled capital of institutional investors to finance high-growth, high-risk tech firms.\n4. Crowdfunding: Raising small sums from large numbers of internet backers (e.g. Kickstarter, GoFundMe).\n5. Grants & Innovation Funds: Non-repayable funds provided by governments or international bodies (e.g. POTRAZ ICT Innovation Fund in Zimbabwe).'
          }
        ]
      },
      {
        title: 'Market Research & Business Location Selection',
        content: 'Thorough market validation prevents building products nobody wants.',
        subsections: [
          {
            subtitle: 'Market Research Methodologies',
            body: 'Primary Research collects firsthand fresh data through surveys, customer problem interviews, and prototype usability testing. Secondary Research analyzes existing published data such as government statistical bulletins, competitor financial filings, and academic whitepapers.'
          },
          {
            subtitle: 'Ideal Location Conditions for Tech Businesses',
            body: '• Infrastructure: Uninterrupted electricity supply (supplemented by commercial solar arrays) and high-speed fiber internet.\n• Talent Density: Proximity to universities and technical colleges producing software engineering graduates.\n• Ecosystem: Proximity to incubation hubs, co-working spaces, and legal advisors.\n• Cost & Regulatory: Reasonable commercial leasing rates and supportive municipal taxation.'
          }
        ],
        highlight: 'Key difference: Primary research yields specific, up-to-date, proprietary findings; Secondary research is cheaper and quicker to obtain but less tailored.'
      }
    ],
    examTips: [
      'Distinguish clearly between Angel Investors (individual people investing personal wealth) and Venture Capitalists (institutions investing pooled third-party funds).',
      'When discussing location factors for tech companies, always cite reliable internet bandwidth and stable electricity infrastructure.',
      'Remember the four quadrants of SWOT analysis: Strengths, Weaknesses (Internal) and Opportunities, Threats (External).'
    ],
    keyTerms: [
      { term: 'Technopreneur', definition: 'An entrepreneur who identifies opportunities to turn technological innovations into commercial businesses.' },
      { term: 'Bootstrapping', definition: 'Starting and growing a business using only personal finances or operating revenue without external investments.' },
      { term: 'Venture Capital', definition: 'Private equity financing provided by investment firms to startup companies with perceived high growth potential.' },
      { term: 'Primary Market Research', definition: 'Research collected firsthand directly from potential customers for a specific purpose.' }
    ]
  }
];
