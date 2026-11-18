import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Microscope, FlaskConical, ClipboardCheck } from 'lucide-react';
import { ChapterData, LessonData, ALL_LESSONS } from '../data/curriculum';
import { MicroscopeLab } from './MicroscopeLab';
import { ExperimentSimulator } from './ExperimentSimulator';
import { ExamSection, LessonExamProgress } from './ExamSection';

interface LessonWorkspaceProps {
  chapter: ChapterData;
  lesson: LessonData;
  initialTab?: 'notes' | 'microscope' | 'experiment' | 'exam';
  onBackToChapters: () => void;
  onSelectLesson: (chapterId: string, lessonId: string, tab?: 'notes' | 'microscope' | 'experiment' | 'exam') => void;
  onExamProgressChange: (lessonId: string, progress: LessonExamProgress) => void;
}

export const LessonWorkspace: React.FC<LessonWorkspaceProps> = ({
  chapter,
  lesson,
  initialTab = 'notes',
  onBackToChapters,
  onSelectLesson,
  onExamProgressChange,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'microscope' | 'experiment' | 'exam'>(
    initialTab
  );

  useEffect(() => {
    setActiveTab(initialTab);
  }, [lesson.id, initialTab]);

  const currentIdx = ALL_LESSONS.findIndex((item) => item.lesson.id === lesson.id);
  const prevItem = currentIdx > 0 ? ALL_LESSONS[currentIdx - 1] : null;
  const nextItem = currentIdx < ALL_LESSONS.length - 1 ? ALL_LESSONS[currentIdx + 1] : null;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb & Lesson Switcher */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToChapters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Chapters
          </button>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>Chapter {chapter.chapterNumber}: {chapter.title}</span>
            <span aria-hidden="true">·</span>
            <span>{chapter.monthLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Lesson {lesson.lessonNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">{lesson.summary}</p>
        </div>
      </div>

      {/* Lesson Mode Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 mb-6 w-fit">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Lesson Notes
        </button>

        {lesson.microscopeSpecimenId && (
          <button
            onClick={() => setActiveTab('microscope')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'microscope'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            Microscope / Zoom
          </button>
        )}

        {lesson.experimentId && (
          <button
            onClick={() => setActiveTab('experiment')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'experiment'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Experiment Simulation
          </button>
        )}

        <button
          onClick={() => setActiveTab('exam')}
          className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'exam'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          Lesson Exam (10 Questions)
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Definitions */}
          {lesson.definitions.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4">Key Definitions</h2>
              <div className="space-y-4">
                {lesson.definitions.map((def) => (
                  <div key={def.term} className="bg-sky-50/70 border border-sky-200 rounded-lg p-4">
                    <div className="text-sm font-bold text-sky-950">{def.term}</div>
                    <p className="text-sm text-slate-800 mt-1 leading-relaxed">{def.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Facts */}
          {lesson.keyFacts.map((block) => (
            <div key={block.label} className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-900 mb-3">{block.label}</h2>
              <ul className="space-y-2.5">
                {block.items.map((item, idx) => (
                  <li key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed flex gap-3">
                    <span className="font-mono-data text-xs font-semibold text-sky-700 mt-1 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Textbook Activity */}
          {lesson.activity && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-medium text-amber-700">Textbook Activity</div>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    {lesson.activity.title}
                  </h2>
                </div>
                {lesson.experimentId && (
                  <button
                    onClick={() => setActiveTab('experiment')}
                    className="px-3.5 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    Launch Interactive Simulation
                  </button>
                )}
              </div>

              {lesson.activity.materials && (
                <div className="mb-4 text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                  <span className="font-semibold text-slate-900">Materials: </span>
                  {lesson.activity.materials.join(' · ')}
                </div>
              )}

              <div className="space-y-2 mb-4">
                {lesson.activity.steps.map((step, i) => (
                  <div key={i} className="text-sm text-slate-700 flex gap-2.5">
                    <span className="font-mono-data text-xs font-semibold text-slate-500 mt-0.5">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {lesson.activity.explanation && (
                <div className="mb-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm text-slate-800">
                  <span className="font-semibold text-slate-900">Explanation: </span>
                  {lesson.activity.explanation}
                </div>
              )}

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 text-sm text-slate-900">
                <span className="font-semibold text-emerald-900">Conclusion: </span>
                {lesson.activity.conclusion}
              </div>
            </div>
          )}

          {/* Let's Expand */}
          {lesson.letsExpand && lesson.letsExpand.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-900 mb-3">Let&apos;s Expand</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lesson.letsExpand.map((item) => (
                  <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Action Strip to Microscope / Experiment / Exam */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-sm text-slate-700">
              Ready to practice or inspect this lesson interactively?
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.microscopeSpecimenId && (
                <button
                  onClick={() => setActiveTab('microscope')}
                  className="px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Microscope className="w-3.5 h-3.5" />
                  Open Microscope View
                </button>
              )}
              {lesson.experimentId && (
                <button
                  onClick={() => setActiveTab('experiment')}
                  className="px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Open Experiment Lab
                </button>
              )}
              <button
                onClick={() => setActiveTab('exam')}
                className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                Start 10-Question Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'microscope' && lesson.microscopeSpecimenId && (
        <MicroscopeLab initialSpecimenId={lesson.microscopeSpecimenId} embedded />
      )}

      {activeTab === 'experiment' && lesson.experimentId && (
        <ExperimentSimulator initialExperimentId={lesson.experimentId} embedded />
      )}

      {activeTab === 'exam' && (
        <ExamSection
          lesson={lesson}
          chapterTitle={`Chapter ${chapter.chapterNumber}: ${chapter.title}`}
          onProgressChange={onExamProgressChange}
        />
      )}

      {/* Prev / Next Lesson Navigation */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
        {prevItem ? (
          <button
            onClick={() => onSelectLesson(prevItem.chapter.id, prevItem.lesson.id)}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-xs">
              Previous: {prevItem.lesson.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextItem && (
          <button
            onClick={() => onSelectLesson(nextItem.chapter.id, nextItem.lesson.id)}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <span className="truncate max-w-[200px] sm:max-w-xs">
              Next: {nextItem.lesson.title}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
};
