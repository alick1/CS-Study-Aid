import React, { useState } from 'react';
import {
  X,
  Download,
  WifiOff,
  CheckCircle2,
  FileText,
  Upload,
  HardDrive,
  Copy,
  Printer,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrintNotesModal } from './PrintNotesModal';

export const OfflineStudyPackModal: React.FC = () => {
  const {
    isOfflinePackModalOpen,
    setIsOfflinePackModalOpen,
    curriculum,
    exportDataJSON,
    importDataJSON
  } = useApp();

  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  if (!isOfflinePackModalOpen) return null;

  const handleDownloadStudyNotesDoc = () => {
    let doc = `# ZIMBABWE FORM 4 COMPUTER SCIENCE SYLLABUS COMPREHENSIVE STUDY GUIDE\n`;
    doc += `Ministry of Primary and Secondary Education (2024 - 2030)\n`;
    doc += `Generated for Offline Study: ${new Date().toLocaleDateString()}\n\n`;

    curriculum.forEach(topic => {
      doc += `========================================================\n`;
      doc += `## ${topic.code}: ${topic.title} (${topic.category})\n`;
      doc += `========================================================\n\n`;
      doc += `Overview: ${topic.description}\n\n`;

      doc += `### Syllabus Assessment Objectives:\n`;
      topic.objectives.forEach(obj => {
        doc += `- ${obj}\n`;
      });
      doc += `\n`;

      doc += `### Core Study Notes:\n`;
      topic.studyNotes.forEach(note => {
        doc += `#### ${note.title}\n${note.content}\n\n`;
        if (note.subsections) {
          note.subsections.forEach(sub => {
            doc += `* ${sub.subtitle}:\n  ${sub.body}\n\n`;
          });
        }
        if (note.highlight) {
          doc += `NOTE: ${note.highlight}\n\n`;
        }
      });

      doc += `### Key Terminology:\n`;
      topic.keyTerms.forEach(kt => {
        doc += `- **${kt.term}**: ${kt.definition}\n`;
      });
      doc += `\n`;

      doc += `### ZIMSEC Examination Advice:\n`;
      topic.examTips.forEach(tip => {
        doc += `- [Exam Tip] ${tip}\n`;
      });
      doc += `\n\n`;
    });

    const blob = new Blob([doc], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZimCS_Form4_Offline_Study_Guide.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zimcs4_lab_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const res = importDataJSON(importText);
    setImportStatus(res);
    if (res.success) {
      setTimeout(() => {
        setIsOfflinePackModalOpen(false);
        setImportStatus(null);
        setImportText('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-100">Offline Study & Backup Toolkit</h2>
              <p className="text-xs text-slate-400">Guaranteed access for schools and students with low connectivity</p>
            </div>
          </div>
          <button
            onClick={() => setIsOfflinePackModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Offline Status Callout */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-start space-x-3 text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold block text-sm mb-0.5">100% Offline Capability Active</span>
              All 11 Form 4 syllabus modules, comprehensive notes, glossaries, and examination practice questions are stored in your device's browser local memory. You can continue reading and practicing even when completely disconnected from the Internet!
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="p-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <Printer className="w-5 h-5 text-teal-400 group-hover:scale-110 transition" />
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Dialog
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-100 block text-xs">Print Notes Dialog</span>
                <span className="text-[11px] text-slate-400">Open print dialog box for current or all syllabus topics.</span>
              </div>
            </button>

            <button
              onClick={handleDownloadStudyNotesDoc}
              className="p-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <FileText className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
                <Download className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <span className="font-bold text-slate-100 block text-xs">Download Study Notes (.md)</span>
                <span className="text-[11px] text-slate-400">Download complete textbook & notes to read on mobile or laptop.</span>
              </div>
            </button>

            <button
              onClick={handleExportJSON}
              className="p-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <HardDrive className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition" />
                <Download className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <span className="font-bold text-slate-100 block text-xs">Export Lab Backup (.json)</span>
                <span className="text-[11px] text-slate-400">Export student scores and questions to flash drive for lab computers.</span>
              </div>
            </button>
          </div>

          {/* Import JSON Section */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Restore Lab Backup (Flash Drive / Offline Transfer)</span>
              </span>
            </div>

            {importStatus && (
              <div
                className={`p-3 rounded-xl border ${
                  importStatus.success
                    ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/50 border-rose-800 text-rose-300'
                }`}
              >
                {importStatus.message}
              </div>
            )}

            <textarea
              rows={3}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="Paste JSON backup contents here to restore across computers..."
              className="w-full bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleImportSubmit}
              disabled={!importText.trim()}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                importText.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Restore Data from Backup
            </button>
          </div>
        </div>
      </div>

      <PrintNotesModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        allTopics={curriculum}
      />
    </div>
  );
};
