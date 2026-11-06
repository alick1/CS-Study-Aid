import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  FileText,
  Download,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Layers,
  Settings2,
  ExternalLink
} from 'lucide-react';
import { SyllabusTopic } from '../types';

interface PrintNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic?: SyllabusTopic;
  allTopics: SyllabusTopic[];
  initialScope?: 'current' | 'all';
}

export const PrintNotesModal: React.FC<PrintNotesModalProps> = ({
  isOpen,
  onClose,
  currentTopic,
  allTopics,
  initialScope = 'current'
}) => {
  const [printScope, setPrintScope] = useState<'current' | 'all'>(initialScope);
  const [includeObjectives, setIncludeObjectives] = useState<boolean>(true);
  const [includeNotes, setIncludeNotes] = useState<boolean>(true);
  const [includeKeyTerms, setIncludeKeyTerms] = useState<boolean>(true);
  const [includeExamTips, setIncludeExamTips] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [printTriggered, setPrintTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (initialScope) {
      setPrintScope(initialScope);
    }
  }, [initialScope]);

  const activeTopic = currentTopic || allTopics[0];
  const topicsToPrint = printScope === 'current' ? [activeTopic] : allTopics;

  // Trigger system print dialog box
  const handleOpenPrintDialog = () => {
    setPrintTriggered(true);
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.error('System print call error:', err);
      }
    }, 150);

    setTimeout(() => {
      setPrintTriggered(false);
    }, 3000);
  };

  // Build standalone printable HTML document for download/offline print
  const handleDownloadPrintableHtml = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ZIMSEC Form 4 Computer Science - Study Notes</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #111827;
      background: #ffffff;
      padding: 30px;
      max-width: 850px;
      margin: 0 auto;
    }
    h1 { font-size: 22px; margin-bottom: 4px; color: #065f46; border-bottom: 2px solid #059669; padding-bottom: 6px; }
    h2 { font-size: 18px; margin-top: 24px; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
    h3 { font-size: 15px; margin-top: 18px; color: #0f172a; }
    h4 { font-size: 13px; margin-top: 12px; color: #334155; }
    p { font-size: 12px; color: #374151; margin: 6px 0; }
    ul { font-size: 12px; color: #374151; padding-left: 20px; }
    li { margin-bottom: 4px; }
    .header-box { text-align: center; border-bottom: 2px double #94a3b8; padding-bottom: 12px; margin-bottom: 24px; }
    .header-title { font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; }
    .header-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #e0f2fe; color: #0369a1; }
    .note-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 12px; }
    .term-box { border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; background: #f8fafc; }
    .term-name { font-weight: bold; color: #9a3412; font-size: 12px; }
    .term-def { font-size: 11px; color: #475569; }
    .tip-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 8px 12px; margin-bottom: 8px; font-size: 11px; }
    .page-break { page-break-after: always; break-after: page; }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body onload="window.print()">
  <div class="header-box">
    <div class="header-title">Republic of Zimbabwe — Ministry of Primary and Secondary Education</div>
    <div style="font-size: 14px; font-weight: bold; margin-top: 4px; color: #065f46;">ZIMSEC FORM 4 COMPUTER SCIENCE (8.34 – 8.44)</div>
    <div class="header-sub">Comprehensive Revision & Study Guide • Official Syllabus Reference (2024–2030)</div>
    <div class="header-sub">Printed on: ${new Date().toLocaleDateString()} • Candidate Study Pack</div>
  </div>
`;

    topicsToPrint.forEach((topic, idx) => {
      html += `
  <div style="margin-bottom: 24px;">
    <div style="display: flex; justify-content: space-between; align-items: baseline;">
      <h1>${topic.code}: ${topic.title}</h1>
      <span class="badge">${topic.category}</span>
    </div>
    <p><em>${topic.description}</em></p>
`;

      if (includeObjectives && topic.objectives.length > 0) {
        html += `
    <h3>Syllabus Assessment Objectives:</h3>
    <ul>
      ${topic.objectives.map(obj => `<li>${obj}</li>`).join('')}
    </ul>
`;
      }

      if (includeNotes && topic.studyNotes.length > 0) {
        html += `<h3>In-Depth Curriculum Notes:</h3>`;
        topic.studyNotes.forEach(note => {
          html += `
    <div class="note-card">
      <h4 style="color: #0d9488; margin-top: 0;">${note.title}</h4>
      <p>${note.content}</p>
`;
          if (note.subsections && note.subsections.length > 0) {
            note.subsections.forEach(sub => {
              html += `
      <div style="margin-top: 8px; padding-left: 8px; border-left: 2px solid #cbd5e1;">
        <strong style="font-size: 12px; color: #1e293b;">${sub.subtitle}</strong>
        <p style="margin: 2px 0 0 0;">${sub.body}</p>
      </div>
`;
            });
          }
          if (note.highlight) {
            html += `
      <div style="margin-top: 8px; background: #fef3c7; border: 1px solid #fde68a; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #92400e;">
        <strong>Syllabus Note:</strong> ${note.highlight}
      </div>
`;
          }
          html += `</div>`;
        });
      }

      if (includeKeyTerms && topic.keyTerms.length > 0) {
        html += `
    <h3>Key Terminology & Definitions:</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      ${topic.keyTerms
        .map(
          kt => `
      <div class="term-box">
        <div class="term-name">${kt.term}</div>
        <div class="term-def">${kt.definition}</div>
      </div>
`
        )
        .join('')}
    </div>
`;
      }

      if (includeExamTips && topic.examTips.length > 0) {
        html += `
    <h3>ZIMSEC Exam Tips & Pitfalls:</h3>
    ${topic.examTips
      .map(
        tip => `
    <div class="tip-box">
      <strong>✓ Exam Tip:</strong> ${tip}
    </div>
`
      )
      .join('')}
`;
      }

      html += `</div>`;
      if (idx < topicsToPrint.length - 1) {
        html += `<div class="page-break"></div>`;
      }
    });

    html += `
</body>
</html>
`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZimCS_Form4_${printScope === 'current' ? activeTopic.code.replace(' ', '_') : 'Complete_Syllabus'}_Notes.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy plain text
  const handleCopyText = () => {
    let text = `REPUBLIC OF ZIMBABWE - MINISTRY OF PRIMARY AND SECONDARY EDUCATION\n`;
    text += `ZIMSEC FORM 4 COMPUTER SCIENCE NOTES\n\n`;

    topicsToPrint.forEach(t => {
      text += `=====================================================\n`;
      text += `${t.code}: ${t.title} (${t.category})\n`;
      text += `=====================================================\n`;
      text += `Overview: ${t.description}\n\n`;

      if (includeObjectives) {
        text += `Objectives:\n`;
        t.objectives.forEach(o => {
          text += `* ${o}\n`;
        });
        text += `\n`;
      }

      if (includeNotes) {
        text += `Study Notes:\n`;
        t.studyNotes.forEach(n => {
          text += `[${n.title}]\n${n.content}\n`;
          if (n.subsections) {
            n.subsections.forEach(s => {
              text += `  - ${s.subtitle}: ${s.body}\n`;
            });
          }
        });
        text += `\n`;
      }

      if (includeKeyTerms) {
        text += `Key Terms:\n`;
        t.keyTerms.forEach(kt => {
          text += `* ${kt.term}: ${kt.definition}\n`;
        });
        text += `\n`;
      }

      if (includeExamTips) {
        text += `Exam Tips:\n`;
        t.examTips.forEach(tip => {
          text += `[Tip] ${tip}\n`;
        });
        text += `\n`;
      }
      text += `\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ON-SCREEN PRINT DIALOG BOX MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-extrabold text-base sm:text-lg text-slate-100">
                    Print Notes Dialog Box
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ZIMSEC Form 4
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Prepare, customize, and trigger print output for Form 4 Computer Science notes
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Close print dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Two columns (Options & Live Print Preview) */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            {/* Left: Print Settings / Actions */}
            <div className="md:col-span-5 p-5 bg-slate-900/90 border-r border-slate-800 overflow-y-auto space-y-5 text-xs">
              {/* Primary Action Button */}
              <div className="space-y-2">
                <button
                  onClick={handleOpenPrintDialog}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/40 transition flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Open System Print Dialog (Ctrl + P)</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center">
                  Launches your browser's native print / Save as PDF window
                </p>
              </div>

              {printTriggered && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-pulse">
                  <Printer className="w-4 h-4 flex-shrink-0" />
                  <span>Print dialog sent to browser! Check your print popup or preview window.</span>
                </div>
              )}

              {/* Scope Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="font-bold text-slate-300 block text-xs">Print Scope:</label>
                <div className="space-y-1.5">
                  <label
                    onClick={() => setPrintScope('current')}
                    className={`p-3 rounded-xl border flex items-start space-x-2.5 cursor-pointer transition ${
                      printScope === 'current'
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-850/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="scope"
                      checked={printScope === 'current'}
                      onChange={() => setPrintScope('current')}
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-bold block text-xs text-slate-100">
                        Current Topic Only ({activeTopic.code})
                      </span>
                      <span className="text-[11px] text-slate-400 line-clamp-1">
                        {activeTopic.title}
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setPrintScope('all')}
                    className={`p-3 rounded-xl border flex items-start space-x-2.5 cursor-pointer transition ${
                      printScope === 'all'
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-850/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="scope"
                      checked={printScope === 'all'}
                      onChange={() => setPrintScope('all')}
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-bold block text-xs text-slate-100">
                        Complete Form 4 Syllabus (All 11 Topics)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Full comprehensive study guide (8.34 – 8.44)
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Sections to Include */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="font-bold text-slate-300 block text-xs">Included Content Sections:</label>
                <div className="space-y-1.5">
                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeObjectives}
                      onChange={e => setIncludeObjectives(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Assessment Objectives</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNotes}
                      onChange={e => setIncludeNotes(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>In-Depth Study Notes & Subsections</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeKeyTerms}
                      onChange={e => setIncludeKeyTerms(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Key Terminology & Definitions</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeExamTips}
                      onChange={e => setIncludeExamTips(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>ZIMSEC Exam Tips & Pitfalls</span>
                  </label>
                </div>
              </div>

              {/* Alternative Export Options */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="font-bold text-slate-400 block text-[11px] uppercase tracking-wider">
                  Direct Export & Offline Options:
                </span>

                <button
                  onClick={handleDownloadPrintableHtml}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition flex items-center justify-between text-xs font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Download Printable HTML (.html)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Auto-prints</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition flex items-center justify-between text-xs font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Notes'}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Plain text</span>
                </button>
              </div>
            </div>

            {/* Right: Live Print Preview */}
            <div className="md:col-span-7 p-4 sm:p-6 bg-slate-950 overflow-y-auto flex flex-col items-center">
              <div className="w-full max-w-xl bg-white text-slate-900 rounded-lg shadow-xl p-6 sm:p-8 space-y-6 text-xs selection:bg-emerald-200">
                {/* Formal ZIMSEC Header */}
                <div className="text-center pb-4 border-b-2 border-slate-300 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    Republic of Zimbabwe • Ministry of Primary and Secondary Education
                  </div>
                  <h1 className="text-base font-black text-emerald-800 tracking-tight">
                    ZIMSEC FORM 4 COMPUTER SCIENCE EXAMINATION NOTES
                  </h1>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Heritage-Based Curriculum 2024–2030 • Candidate Study Pack
                  </div>
                </div>

                {/* Topics Preview List */}
                {topicsToPrint.map(topic => (
                  <div key={topic.id} className="space-y-4 pb-4 border-b border-slate-200 last:border-b-0">
                    <div className="flex items-baseline justify-between border-b border-slate-200 pb-1">
                      <h2 className="text-sm font-black text-slate-900">
                        {topic.code}: {topic.title}
                      </h2>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {topic.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 italic">{topic.description}</p>

                    {includeObjectives && topic.objectives.length > 0 && (
                      <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                        <strong className="text-[11px] text-emerald-800 uppercase block">
                          Syllabus Assessment Objectives:
                        </strong>
                        <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
                          {topic.objectives.map((obj, i) => (
                            <li key={i}>{obj}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {includeNotes && topic.studyNotes.length > 0 && (
                      <div className="space-y-3">
                        <strong className="text-[11px] text-slate-800 uppercase block">
                          Core Study Notes:
                        </strong>
                        {topic.studyNotes.map((note, nIdx) => (
                          <div key={nIdx} className="bg-slate-50/70 p-3 rounded border border-slate-200 space-y-1.5">
                            <h3 className="font-bold text-xs text-teal-800">{note.title}</h3>
                            <p className="text-[11px] text-slate-700 leading-relaxed">{note.content}</p>
                            {note.subsections && (
                              <div className="space-y-1 pt-1">
                                {note.subsections.map((sub, sIdx) => (
                                  <div key={sIdx} className="pl-2 border-l-2 border-slate-300">
                                    <span className="font-bold text-[10px] text-slate-800 block">
                                      {sub.subtitle}
                                    </span>
                                    <p className="text-[10px] text-slate-600 leading-normal">{sub.body}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {includeKeyTerms && topic.keyTerms.length > 0 && (
                      <div className="space-y-2">
                        <strong className="text-[11px] text-slate-800 uppercase block">
                          Key Terminology:
                        </strong>
                        <div className="grid grid-cols-2 gap-2">
                          {topic.keyTerms.map((kt, kIdx) => (
                            <div key={kIdx} className="p-2 rounded bg-amber-50/60 border border-amber-200/80 text-[10px]">
                              <span className="font-bold text-amber-900 block">{kt.term}</span>
                              <span className="text-slate-600">{kt.definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {includeExamTips && topic.examTips.length > 0 && (
                      <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded space-y-1">
                        <strong className="text-[10px] font-bold text-emerald-900 uppercase block">
                          ZIMSEC Examination Advice:
                        </strong>
                        <ul className="text-[10px] text-slate-700 space-y-0.5">
                          {topic.examTips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start space-x-1">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3.5 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              Ready to print {topicsToPrint.length} topic{topicsToPrint.length > 1 ? 's' : ''} ({printScope === 'current' ? activeTopic.code : 'All 11 Modules'})
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={handleOpenPrintDialog}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center space-x-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* DEDICATED PRINT MEDIA CONTAINER (Active only when window.print() is called) */}
      <div className="print-only">
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#000000', background: '#ffffff' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              Republic of Zimbabwe • Ministry of Primary and Secondary Education
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '4px 0', color: '#065f46' }}>
              ZIMSEC FORM 4 COMPUTER SCIENCE EXAMINATION STUDY NOTES
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563' }}>
              Forms 1–4 Heritage-Based Curriculum (2024–2030) • {printScope === 'current' ? activeTopic.code : 'Complete Syllabus (8.34 – 8.44)'}
            </div>
          </div>

          {topicsToPrint.map((topic, idx) => (
            <div key={topic.id} style={{ marginBottom: '28px', pageBreakAfter: idx < topicsToPrint.length - 1 ? 'always' : 'auto' }}>
              <div style={{ borderBottom: '1px solid #9ca3af', paddingBottom: '4px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '16px', margin: 0, color: '#111827' }}>
                  {topic.code}: {topic.title} ({topic.category})
                </h2>
                <p style={{ fontSize: '12px', color: '#4b5563', margin: '2px 0 0 0' }}>{topic.description}</p>
              </div>

              {includeObjectives && topic.objectives.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '13px', margin: '6px 0 4px 0', color: '#047857' }}>Syllabus Objectives:</h3>
                  <ul style={{ fontSize: '11px', margin: 0, paddingLeft: '20px' }}>
                    {topic.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {includeNotes && topic.studyNotes.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '13px', margin: '6px 0 4px 0', color: '#1e3a8a' }}>Core Notes:</h3>
                  {topic.studyNotes.map((note, nIdx) => (
                    <div key={nIdx} style={{ marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '12px', margin: '4px 0 2px 0', color: '#0f172a' }}>{note.title}</h4>
                      <p style={{ fontSize: '11px', margin: 0 }}>{note.content}</p>
                      {note.subsections && note.subsections.map((sub, sIdx) => (
                        <div key={sIdx} style={{ paddingLeft: '10px', marginTop: '4px', borderLeft: '2px solid #cbd5e1' }}>
                          <strong style={{ fontSize: '11px' }}>{sub.subtitle}: </strong>
                          <span style={{ fontSize: '11px' }}>{sub.body}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {includeKeyTerms && topic.keyTerms.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '13px', margin: '6px 0 4px 0', color: '#c2410c' }}>Key Terms:</h3>
                  <div style={{ fontSize: '11px' }}>
                    {topic.keyTerms.map((kt, kIdx) => (
                      <div key={kIdx} style={{ marginBottom: '4px' }}>
                        <strong>{kt.term}: </strong>
                        <span>{kt.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {includeExamTips && topic.examTips.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '13px', margin: '6px 0 4px 0', color: '#047857' }}>ZIMSEC Exam Tips:</h3>
                  <ul style={{ fontSize: '11px', margin: 0, paddingLeft: '20px' }}>
                    {topic.examTips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
