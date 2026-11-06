import React, { useState } from 'react';
import {
  Cpu,
  Network,
  Database,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const InteractiveLabs: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'logic' | 'osi' | 'sql'>('logic');

  // Logic Gate Simulator State
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR'>('AND');
  const [inputA, setInputA] = useState<0 | 1>(0);
  const [inputB, setInputB] = useState<0 | 1>(0);
  const [compoundMode, setCompoundMode] = useState<boolean>(false);
  const [inputC, setInputC] = useState<0 | 1>(0);

  // Calculate Logic Output
  const computeGateOutput = (type: string, a: number, b: number): number => {
    switch (type) {
      case 'AND': return (a && b) ? 1 : 0;
      case 'OR': return (a || b) ? 1 : 0;
      case 'NOT': return a ? 0 : 1;
      case 'NAND': return !(a && b) ? 1 : 0;
      case 'NOR': return !(a || b) ? 1 : 0;
      case 'XOR': return (a ^ b) ? 1 : 0;
      case 'XNOR': return !(a ^ b) ? 1 : 0;
      default: return 0;
    }
  };

  const basicOutput = computeGateOutput(gateType, inputA, inputB);
  // Compound circuit: Q = (A AND B) OR (NOT C)
  const compoundIntermediate1 = inputA && inputB ? 1 : 0;
  const compoundIntermediate2 = inputC ? 0 : 1;
  const compoundOutput = (compoundIntermediate1 || compoundIntermediate2) ? 1 : 0;

  // OSI Lab State
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(6); // Application layer default
  const [deviceSimulator, setDeviceSimulator] = useState<'hub' | 'switch' | 'router'>('switch');

  const osiLayers = [
    {
      num: 7,
      name: 'Application Layer',
      pdu: 'Data',
      tcpMapping: 'Application',
      protocols: 'HTTP, HTTPS, FTP, SMTP, DNS, DHCP',
      devices: 'Gateway, Firewalls, Web Server',
      desc: 'Provides network services directly to end-user software applications.'
    },
    {
      num: 6,
      name: 'Presentation Layer',
      pdu: 'Data',
      tcpMapping: 'Application',
      protocols: 'SSL/TLS, ASCII, JPEG, MPEG',
      devices: 'OS redirectors',
      desc: 'Handles data formatting, encryption/decryption, and compression.'
    },
    {
      num: 5,
      name: 'Session Layer',
      pdu: 'Data',
      tcpMapping: 'Application',
      protocols: 'NetBIOS, RPC, PPTP',
      devices: 'Session managers',
      desc: 'Establishes, manages, and terminates conversational sessions between endpoints.'
    },
    {
      num: 4,
      name: 'Transport Layer',
      pdu: 'Segment (TCP) / Datagram (UDP)',
      tcpMapping: 'Transport',
      protocols: 'TCP (connection-oriented, reliable), UDP (connectionless, rapid)',
      devices: 'Layer 4 Switches, Firewalls',
      desc: 'Responsible for end-to-end communication, packet segmentation, flow control, and port addressing.'
    },
    {
      num: 3,
      name: 'Network Layer',
      pdu: 'Packet',
      tcpMapping: 'Internet',
      protocols: 'IPv4, IPv6, ICMP, ARP, OSPF, BGP',
      devices: 'Routers, Layer 3 Switches',
      desc: 'Manages logical IP addressing, path determination, packet forwarding, and subnet routing.'
    },
    {
      num: 2,
      name: 'Data Link Layer',
      pdu: 'Frame',
      tcpMapping: 'Network Access',
      protocols: 'Ethernet (802.3), Wi-Fi (802.11), MAC addressing',
      devices: 'Switches, Bridges, Network Interface Cards (NIC)',
      desc: 'Handles physical node-to-node data transfer, framing, and hardware MAC address filtering.'
    },
    {
      num: 1,
      name: 'Physical Layer',
      pdu: 'Bits (0s and 1s)',
      tcpMapping: 'Network Access',
      protocols: '1000BASE-T, RJ45, Fiber Optic, Radio Frequencies',
      devices: 'Hubs, Repeaters, Cables, Modems',
      desc: 'Transmits raw unstructured bit streams across electrical, optical, or radio physical media.'
    }
  ];

  // SQL Lab State
  const sampleStudents = [
    { student_id: 'CS-01', name: 'Tinashe Moyo', grade: 'Form 4', province: 'Harare' },
    { student_id: 'CS-02', name: 'Chiedza Mutasa', grade: 'Form 4', province: 'Manicaland' },
    { student_id: 'CS-03', name: 'Farai Ndlovu', grade: 'Form 4', province: 'Bulawayo' },
    { student_id: 'CS-04', name: 'Ruvimbo Sithole', grade: 'Form 4', province: 'Masvingo' },
    { student_id: 'CS-05', name: 'Tafadzwa Chiwenga', grade: 'Form 4', province: 'Mash Central' }
  ];

  const sampleMarks = [
    { mark_id: 101, student_id: 'CS-01', subject: 'Logic Gates', score: 92 },
    { mark_id: 102, student_id: 'CS-01', subject: 'Networking', score: 88 },
    { mark_id: 103, student_id: 'CS-02', subject: 'Logic Gates', score: 100 },
    { mark_id: 104, student_id: 'CS-02', subject: 'Databases', score: 98 },
    { mark_id: 105, student_id: 'CS-03', subject: 'Logic Gates', score: 65 },
    { mark_id: 106, student_id: 'CS-04', subject: 'Programming', score: 55 },
    { mark_id: 107, student_id: 'CS-05', subject: 'Hardware', score: 48 }
  ];

  const [sqlQuery, setSqlQuery] = useState<string>(
    'SELECT Students.name, ExamMarks.subject, ExamMarks.score\nFROM ExamMarks\nINNER JOIN Students ON ExamMarks.student_id = Students.student_id\nWHERE ExamMarks.score >= 75\nORDER BY ExamMarks.score DESC;'
  );
  const [sqlResult, setSqlResult] = useState<any[]>([]);
  const [sqlError, setSqlError] = useState<string>('');

  const executeSimulatedSQL = (query: string) => {
    setSqlError('');
    const qLower = query.toLowerCase().replace(/\s+/g, ' ');

    try {
      if (qLower.includes('inner join') && qLower.includes('score >= 75')) {
        const res = [
          { name: 'Chiedza Mutasa', subject: 'Logic Gates', score: 100 },
          { name: 'Chiedza Mutasa', subject: 'Databases', score: 98 },
          { name: 'Tinashe Moyo', subject: 'Logic Gates', score: 92 },
          { name: 'Tinashe Moyo', subject: 'Networking', score: 88 }
        ];
        setSqlResult(res);
      } else if (qLower.includes('group by') && qLower.includes('avg')) {
        const res = [
          { subject: 'Logic Gates', average_score: 85.7, total_candidates: 3 },
          { subject: 'Databases', average_score: 98.0, total_candidates: 1 },
          { subject: 'Networking', average_score: 88.0, total_candidates: 1 },
          { subject: 'Programming', average_score: 55.0, total_candidates: 1 },
          { subject: 'Hardware', average_score: 48.0, total_candidates: 1 }
        ];
        setSqlResult(res);
      } else if (qLower.includes('select * from students')) {
        setSqlResult(sampleStudents);
      } else if (qLower.includes('select * from exammarks')) {
        setSqlResult(sampleMarks);
      } else {
        // Generic fallback join
        const joined = sampleMarks.map(m => {
          const s = sampleStudents.find(st => st.student_id === m.student_id);
          return {
            student: s ? s.name : m.student_id,
            subject: m.subject,
            score: m.score,
            status: m.score >= 50 ? 'PASS' : 'FAIL'
          };
        });
        setSqlResult(joined);
      }
    } catch {
      setSqlError('Error executing query. Try one of the verified sample buttons.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Form 4 Interactive Practical Labs
              </span>
              <span className="text-xs text-slate-400">Aligned with Paper 3 Practical Skills</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 mt-2">
              Computer Science Virtual Experiments Lab
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Hands-on interactive simulators to master digital logic gates & truth tables, network protocol stacks, and relational SQL queries.
            </p>
          </div>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="mt-6 flex border-b border-slate-800 space-x-2">
          <button
            onClick={() => setActiveLab('logic')}
            className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 ${
              activeLab === 'logic'
                ? 'border-emerald-500 text-emerald-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>1. Logic Gates & Truth Tables (8.36)</span>
          </button>
          <button
            onClick={() => setActiveLab('osi')}
            className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 ${
              activeLab === 'osi'
                ? 'border-teal-500 text-teal-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>2. Network Protocols & Devices (8.37)</span>
          </button>
          <button
            onClick={() => {
              setActiveLab('sql');
              if (sqlResult.length === 0) executeSimulatedSQL(sqlQuery);
            }}
            className={`py-2.5 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition border-b-2 ${
              activeLab === 'sql'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>3. Advanced SQL & Databases (8.42)</span>
          </button>
        </div>
      </div>

      {/* LAB 1: LOGIC GATES */}
      {activeLab === 'logic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Simulator */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Interactive Logic Gate Simulator</span>
              </h3>
              <button
                onClick={() => setCompoundMode(!compoundMode)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${
                  compoundMode
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {compoundMode ? 'Mode: Compound Circuit' : 'Mode: Single Gate'}
              </button>
            </div>

            {!compoundMode ? (
              <>
                {/* Gate Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Select Logic Gate
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                    {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setGateType(type)}
                        className={`py-2 px-1 rounded-xl text-xs font-black transition ${
                          gateType === type
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Circuit Schematic Visualizer */}
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="flex items-center justify-between w-full max-w-md">
                    {/* Inputs */}
                    <div className="space-y-4">
                      {/* Input A Switch */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                          className={`w-12 h-10 rounded-xl font-black text-sm flex items-center justify-center transition border ${
                            inputA === 1
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          A: {inputA}
                        </button>
                        <div className={`h-1 w-10 transition-colors ${inputA === 1 ? 'bg-emerald-400 shadow-sm' : 'bg-slate-700'}`} />
                      </div>

                      {/* Input B Switch (if not NOT gate) */}
                      {gateType !== 'NOT' && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                            className={`w-12 h-10 rounded-xl font-black text-sm flex items-center justify-center transition border ${
                              inputB === 1
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            B: {inputB}
                          </button>
                          <div className={`h-1 w-10 transition-colors ${inputB === 1 ? 'bg-emerald-400 shadow-sm' : 'bg-slate-700'}`} />
                        </div>
                      )}
                    </div>

                    {/* Gate Representation */}
                    <div className="px-6 py-8 rounded-2xl bg-slate-900 border-2 border-slate-700 text-center shadow-lg relative min-w-[130px]">
                      <span className="font-black text-xl text-teal-300 block">{gateType}</span>
                      <span className="text-[10px] text-slate-400 block mt-1 uppercase tracking-widest">
                        {gateType === 'NAND' || gateType === 'NOR' ? 'Universal Gate' : 'Logic Gate'}
                      </span>
                    </div>

                    {/* Output Line & Light Indicator */}
                    <div className="flex items-center space-x-2">
                      <div className={`h-1 w-10 transition-colors ${basicOutput === 1 ? 'bg-emerald-400 shadow-sm' : 'bg-slate-700'}`} />
                      <div
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black transition border-2 ${
                          basicOutput === 1
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-lg shadow-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        <span className="text-lg">{basicOutput}</span>
                        <span className="text-[9px] uppercase tracking-tighter">
                          {basicOutput === 1 ? 'HIGH (1)' : 'LOW (0)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-5 text-center">
                    Click buttons <b>A</b> and <b>B</b> to toggle binary input levels (0 = 0V / False, 1 = +5V / True).
                  </p>
                </div>
              </>
            ) : (
              /* Compound Circuit Simulation: Q = (A AND B) OR (NOT C) */
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-xl text-xs text-purple-200">
                  <span className="font-bold">Form 4 Compound Circuit Model:</span> Q = (A AND B) OR (NOT C)
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Input A:</span>
                    <button
                      onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                      className={`w-full py-2.5 rounded-xl font-black text-sm border ${
                        inputA === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      A = {inputA}
                    </button>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Input B:</span>
                    <button
                      onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                      className={`w-full py-2.5 rounded-xl font-black text-sm border ${
                        inputB === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      B = {inputB}
                    </button>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Input C:</span>
                    <button
                      onClick={() => setInputC(inputC === 1 ? 0 : 1)}
                      className={`w-full py-2.5 rounded-xl font-black text-sm border ${
                        inputC === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      C = {inputC}
                    </button>
                  </div>
                </div>

                {/* Intermediate breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Stage 1: (A AND B)</span>
                    <span className="font-bold text-teal-300 font-mono text-sm">
                      ({inputA} AND {inputB}) = {compoundIntermediate1}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Stage 2: (NOT C)</span>
                    <span className="font-bold text-teal-300 font-mono text-sm">
                      NOT({inputC}) = {compoundIntermediate2}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border-2 border-emerald-500/50 flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-sm">Final Circuit Output Q:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-slate-400">
                      ({compoundIntermediate1} OR {compoundIntermediate2}) =
                    </span>
                    <span className="text-xl font-black text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      {compoundOutput}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Live Truth Table */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Generated Truth Table</span>
            </h4>
            <p className="text-xs text-slate-400">
              The currently selected input state is automatically highlighted in the table below:
            </p>

            {!compoundMode ? (
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-center text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Input A</th>
                      {gateType !== 'NOT' && <th className="py-2.5 px-3">Input B</th>}
                      <th className="py-2.5 px-3 text-emerald-400">Output Q ({gateType})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {gateType === 'NOT' ? (
                      [0, 1].map(a => {
                        const q = computeGateOutput('NOT', a, 0);
                        const isMatch = inputA === a;
                        return (
                          <tr key={a} className={isMatch ? 'bg-emerald-950/60 font-black text-emerald-200' : 'text-slate-300'}>
                            <td className="py-2.5">{a}</td>
                            <td className="py-2.5 font-bold">{q}</td>
                          </tr>
                        );
                      })
                    ) : (
                      [[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => {
                        const q = computeGateOutput(gateType, a, b);
                        const isMatch = inputA === a && inputB === b;
                        return (
                          <tr key={`${a}-${b}`} className={isMatch ? 'bg-emerald-950/60 font-black text-emerald-200' : 'text-slate-300'}>
                            <td className="py-2.5">{a}</td>
                            <td className="py-2.5">{b}</td>
                            <td className="py-2.5 font-bold">{q}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-800 max-h-[360px] overflow-y-auto">
                <table className="w-full text-center text-[11px]">
                  <thead className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700 sticky top-0">
                    <tr>
                      <th className="py-2 px-2">A</th>
                      <th className="py-2 px-2">B</th>
                      <th className="py-2 px-2">C</th>
                      <th className="py-2 px-2 text-slate-400">A·B</th>
                      <th className="py-2 px-2 text-slate-400">~C</th>
                      <th className="py-2 px-2 text-emerald-400 font-bold">Q</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {[
                      [0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1],
                      [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]
                    ].map(([a, b, c]) => {
                      const ab = a && b ? 1 : 0;
                      const notc = c ? 0 : 1;
                      const q = ab || notc ? 1 : 0;
                      const isMatch = inputA === a && inputB === b && inputC === c;
                      return (
                        <tr key={`${a}${b}${c}`} className={isMatch ? 'bg-purple-950/60 font-black text-purple-200' : 'text-slate-300'}>
                          <td className="py-2">{a}</td>
                          <td className="py-2">{b}</td>
                          <td className="py-2">{c}</td>
                          <td className="py-2 text-slate-400">{ab}</td>
                          <td className="py-2 text-slate-400">{notc}</td>
                          <td className="py-2 font-bold text-emerald-400">{q}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-750 text-xs text-slate-400 leading-relaxed">
              💡 <b>Exam Rule:</b> In ZIMSEC Paper 2 and Paper 3, always fill truth tables in ascending binary order: 00, 01, 10, 11 (for 2 inputs) or 000 through 111 (for 3 inputs).
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: NETWORK PROTOCOLS & OSI 7-LAYER */}
      {activeLab === 'osi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 7 Layers Stack */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>OSI 7-Layer Reference Model (Click Layer)</span>
            </h3>

            <div className="space-y-1.5">
              {osiLayers.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx;
                return (
                  <button
                    key={layer.num}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-950/60 border-teal-500 text-teal-200 shadow-md ring-1 ring-teal-500'
                        : 'bg-slate-800/70 border-slate-750 text-slate-300 hover:border-slate-650 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-[11px] text-teal-400">
                        {layer.num}
                      </span>
                      <span className="font-bold">{layer.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400">
                      {layer.pdu}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Layer Deep Dive & Hardware Tester */}
          <div className="lg:col-span-7 space-y-6">
            {/* Layer Details Card */}
            {(() => {
              const layer = osiLayers[selectedLayerIndex];
              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono font-bold text-teal-400">
                        OSI Layer {layer.num} • {layer.pdu}
                      </span>
                      <h4 className="text-lg font-black text-slate-100">{layer.name}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                      TCP/IP: {layer.tcpMapping}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{layer.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-slate-850 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-400 block mb-1">Common Protocols</span>
                      <span className="text-teal-300 font-mono text-[11px]">{layer.protocols}</span>
                    </div>
                    <div className="p-3 bg-slate-850 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-400 block mb-1">Hardware & Devices</span>
                      <span className="text-teal-300 font-mono text-[11px]">{layer.devices}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Network Hardware Simulator: Hub vs Switch vs Router */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <span>Networking Devices Action Comparison</span>
              </h4>

              <div className="flex space-x-2">
                {(['hub', 'switch', 'router'] as const).map(dev => (
                  <button
                    key={dev}
                    onClick={() => setDeviceSimulator(dev)}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase transition border ${
                      deviceSimulator === dev
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dev}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                {deviceSimulator === 'hub' && (
                  <>
                    <div className="font-bold text-amber-300">Hub (OSI Layer 1 - Physical)</div>
                    <p className="text-slate-300">
                      A Hub has no internal memory or MAC table. When Computer A transmits a frame destined for Computer C, the Hub replicates the raw electrical bits and <b>broadcasts to ALL connected devices</b> (Computer B, C, D). This causes network collision risks and security vulnerabilities.
                    </p>
                  </>
                )}
                {deviceSimulator === 'switch' && (
                  <>
                    <div className="font-bold text-emerald-300">Switch (OSI Layer 2 - Data Link)</div>
                    <p className="text-slate-300">
                      A Switch inspects the destination <b>MAC address</b> in the Ethernet frame header. It checks its internal MAC CAM table and sends the frame <b>ONLY to the designated target port</b> (Computer C), eliminating collisions across ports.
                    </p>
                  </>
                )}
                {deviceSimulator === 'router' && (
                  <>
                    <div className="font-bold text-indigo-300">Router (OSI Layer 3 - Network)</div>
                    <p className="text-slate-300">
                      A Router connects disparate subnets or connects the school LAN to the global Internet. It reads the <b>logical IP address</b> in the packet header and uses routing algorithms (OSPF/BGP) to forward data across multiple network boundaries. Routers isolate broadcast domains.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: SQL DATABASE QUERY LAB */}
      {activeLab === 'sql' && (
        <div className="space-y-6">
          {/* Query Editor & Presets */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <span>Interactive Relational SQL Playground</span>
              </h3>

              {/* Sample Queries */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => {
                    const q = 'SELECT Students.name, ExamMarks.subject, ExamMarks.score\nFROM ExamMarks\nINNER JOIN Students ON ExamMarks.student_id = Students.student_id\nWHERE ExamMarks.score >= 75\nORDER BY ExamMarks.score DESC;';
                    setSqlQuery(q);
                    executeSimulatedSQL(q);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  Preset: Distinction Candidates (JOIN)
                </button>
                <button
                  onClick={() => {
                    const q = 'SELECT subject, AVG(score) AS average_score, COUNT(*) AS total_candidates\nFROM ExamMarks\nGROUP BY subject;';
                    setSqlQuery(q);
                    executeSimulatedSQL(q);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  Preset: Subject Averages (GROUP BY)
                </button>
                <button
                  onClick={() => {
                    const q = 'SELECT * FROM Students;';
                    setSqlQuery(q);
                    executeSimulatedSQL(q);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  Preset: All Students
                </button>
              </div>
            </div>

            {/* SQL Input Area */}
            <div>
              <textarea
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 rounded-xl p-3.5 focus:outline-none focus:border-indigo-500"
                placeholder="Enter SQL SELECT statement..."
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Schema: <code className="text-indigo-300 font-mono">Students (student_id, name, grade)</code>, <code className="text-indigo-300 font-mono">ExamMarks (mark_id, student_id, subject, score)</code>
              </span>
              <button
                onClick={() => executeSimulatedSQL(sqlQuery)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-md shadow-indigo-950/40"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Execute Query</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-extrabold text-slate-100 text-sm">Query Execution Result</h4>

            {sqlError && (
              <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl text-xs text-rose-300">
                {sqlError}
              </div>
            )}

            {sqlResult.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700 uppercase">
                    <tr>
                      {Object.keys(sqlResult[0]).map(col => (
                        <th key={col} className="py-2.5 px-4 font-mono">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {sqlResult.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-850/60">
                        {Object.values(row).map((val: any, vIdx) => (
                          <td key={vIdx} className="py-2.5 px-4 text-slate-200">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No records returned.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
