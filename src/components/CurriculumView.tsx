import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  Lightbulb,
  FileText,
  PlayCircle,
  Printer,
  ChevronRight,
  Sparkles,
  Bookmark,
  Layers,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SyllabusTopic } from '../types';
import { PrintNotesModal } from './PrintNotesModal';

export const CurriculumView: React.FC = () => {
  const { curriculum, selectedTopicId, setSelectedTopicId, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printScope, setPrintScope] = useState<'current' | 'all'>('current');
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);

  const handleOpenPrintDialog = (scope: 'current' | 'all' = 'current', targetTopicId?: string) => {
    if (targetTopicId) {
      setSelectedTopicId(targetTopicId);
    }
    setPrintScope(scope);
    setPrintFeedback(
      scope === 'all'
        ? 'Opening Print Dialog for Full Syllabus (All 11 Topics)...'
        : 'Opening Print Dialog for Topic Notes...'
    );

    // Trigger system print dialog box immediately
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.error('System print call error:', err);
        setIsPrintModalOpen(true);
      }
    }, 120);

    setTimeout(() => {
      setPrintFeedback(null);
    }, 3500);
  };

  const categories = ['All', 'Hardware & Systems', 'Applications & Emerging Tech', 'Computer Systems & Architecture', 'Networking & Telecommunications', 'Security & Ethics', 'Software Engineering & SDLC', 'Algorithms & Logic', 'Databases & Information Systems', 'Web Technologies & Security', 'Technopreneurship & Innovation'];

  const filteredTopics = curriculum.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.keyTerms.some(kt => kt.term.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const currentTopic: SyllabusTopic =
    curriculum.find(t => t.id === selectedTopicId) || filteredTopics[0] || curriculum[0];

  const handleStartTopicQuiz = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('quizzes');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                MoPSE Forms 1-4 (2024–2030)
              </span>
              <span className="text-xs text-slate-400 font-medium">Form 4 Examination Level</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 mt-2">
              Form 4 Computer Science Study Syllabus Hub
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Fully aligned with topics 8.34 to 8.44: hardware maintenance, logic gates, networking devices & protocols, disaster recovery, software engineering SDLC, advanced SQL, web security, and technopreneurship.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenPrintDialog('current')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition active:scale-95"
              title="Open Print Dialog Box to print notes (Ctrl + P)"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Print Notes</span>
            </button>

            <button
              onClick={() => handleOpenPrintDialog('all')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition"
              title="Open Print Dialog Box for All 11 Form 4 Topics"
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Print All (11 Topics)</span>
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition"
              title="Customize Print Options, Preview, or Download HTML"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Options</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search syllabus topics, keywords (e.g. logic gates, SQL, OSI, Unhu, backup)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex overflow-x-auto pb-1 md:pb-0 gap-1.5 text-xs">
            {categories.slice(0, 4).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Topic Navigator & In-Depth Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Topics list */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
            <span>Form 4 Topics ({filteredTopics.length})</span>
            <span className="text-[10px] text-emerald-400 font-normal">Offline Ready</span>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredTopics.map(topic => {
              const isSelected = currentTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-emerald-400">{topic.code}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium truncate max-w-[140px]">
                      {topic.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 leading-snug">{topic.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{topic.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane: Comprehensive Study Material */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Header of selected topic */}
          <div className="pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentTopic.code}
                </span>
                <span className="text-xs font-semibold text-slate-400">{currentTopic.category}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenPrintDialog('current', currentTopic.id)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/50 text-xs font-semibold transition active:scale-95"
                  title="Open Print Dialog Box for this topic's notes"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Print Topic Notes</span>
                </button>

                <button
                  onClick={() => handleStartTopicQuiz(currentTopic.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Practice Questions on {currentTopic.code}</span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-100">{currentTopic.title}</h2>
            <p className="text-slate-300 text-sm mt-2">{currentTopic.description}</p>
          </div>

          {/* Syllabus Objectives */}
          <div className="bg-slate-850/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Syllabus Assessment Objectives (Learners should be able to):
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {currentTopic.objectives.map((obj, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Study Notes */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>In-Depth Curriculum Notes</span>
            </h3>

            {currentTopic.studyNotes.map((section, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-750 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-teal-300">{section.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{section.content}</p>

                {section.subsections && (
                  <div className="space-y-3 pt-2">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs">
                        <span className="font-bold text-slate-100 block mb-1">{sub.subtitle}</span>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">{sub.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.highlight && (
                  <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{section.highlight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Terminology & Definitions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>Key Terms & Glossaries for this Topic</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTopic.keyTerms.map((kt, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/80 text-xs">
                  <span className="font-bold text-amber-300 block mb-1">{kt.term}</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{kt.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Tips & Pitfalls */}
          <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-800/40 rounded-xl p-5 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>ZIMSEC Form 4 Exam Advice & Common Mistakes</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {currentTopic.examTips.map((tip, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Print Notes & Revision Pack Dialog Box */}
      <PrintNotesModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        currentTopic={currentTopic}
        allTopics={curriculum}
      />
    </div>
  );
};
