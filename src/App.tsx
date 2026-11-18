import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Microscope,
  FlaskConical,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { CURRICULUM_CHAPTERS, ALL_LESSONS } from './data/curriculum';
import { MicroscopeLab } from './components/MicroscopeLab';
import { ExperimentSimulator } from './components/ExperimentSimulator';
import { LessonWorkspace } from './components/LessonWorkspace';
import { ExamSection, LessonExamProgress } from './components/ExamSection';

type TopSection = 'chapters' | 'microscope' | 'experiments' | 'exams';

const STORAGE_KEY = 'primary6_science_exam_progress_v1';

export default function App() {
  const [section, setSection] = useState<TopSection>('chapters');
  const [monthFilter, setMonthFilter] = useState<'all' | 'october' | 'november'>('all');
  const [selectedLesson, setSelectedLesson] = useState<{
    chapterId: string;
    lessonId: string;
    tab?: 'notes' | 'microscope' | 'experiment' | 'exam';
  } | null>(null);
  const [examHubLessonId, setExamHubLessonId] = useState<string>('ch1-l1');
  const [heroImgError, setHeroImgError] = useState(false);

  const [examProgress, setExamProgress] = useState<Record<string, LessonExamProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(examProgress));
    } catch {
      // Ignore storage quota errors
    }
  }, [examProgress]);

  const handleExamProgressChange = (lessonId: string, progress: LessonExamProgress) => {
    setExamProgress((prev) => {
      const existing = prev[lessonId];
      if (
        existing &&
        existing.answeredCount === progress.answeredCount &&
        existing.correctCount === progress.correctCount
      ) {
        return prev;
      }
      return { ...prev, [lessonId]: progress };
    });
  };

  const openLesson = (
    chapterId: string,
    lessonId: string,
    tab: 'notes' | 'microscope' | 'experiment' | 'exam' = 'notes'
  ) => {
    setSelectedLesson({ chapterId, lessonId, tab });
    setSection('chapters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTop = (target: TopSection) => {
    setSection(target);
    if (target !== 'chapters') {
      setSelectedLesson(null);
    } else {
      setSelectedLesson(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeChapter = selectedLesson
    ? CURRICULUM_CHAPTERS.find((c) => c.id === selectedLesson.chapterId)
    : null;
  const activeLesson =
    activeChapter && selectedLesson
      ? activeChapter.lessons.find((l) => l.id === selectedLesson.lessonId)
      : null;

  const filteredChapters = CURRICULUM_CHAPTERS.filter((ch) => {
    if (monthFilter === 'october') return ch.monthLabel.includes('October');
    if (monthFilter === 'november') return ch.monthLabel.includes('November');
    return true;
  });

  const examHubEntry =
    ALL_LESSONS.find((item) => item.lesson.id === examHubLessonId) || ALL_LESSONS[0];

  const totalQuestionsAnswered = Object.values(examProgress).reduce(
    (sum, p) => sum + p.answeredCount,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => navigateTop('chapters')}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Primary 6 Science
          </button>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => navigateTop('chapters')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                section === 'chapters'
                  ? 'border-sky-600 text-slate-900'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Chapters
            </button>
            <button
              onClick={() => navigateTop('microscope')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                section === 'microscope'
                  ? 'border-sky-600 text-slate-900'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Microscope
            </button>
            <button
              onClick={() => navigateTop('experiments')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                section === 'experiments'
                  ? 'border-sky-600 text-slate-900'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Experiments
            </button>
            <button
              onClick={() => navigateTop('exams')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                section === 'exams'
                  ? 'border-sky-600 text-slate-900'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Exams
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTop('exams')}
              className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Practice Exams
            </button>
          </div>
        </div>

        {/* Mobile Compact Nav */}
        <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto">
          {(
            [
              { id: 'chapters', label: 'Chapters' },
              { id: 'microscope', label: 'Microscope' },
              { id: 'experiments', label: 'Experiments' },
              { id: 'exams', label: 'Exams' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTop(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                section === item.id
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1">
        {/* CHAPTERS / HOMEPAGE OR LESSON WORKSPACE */}
        {section === 'chapters' && activeChapter && activeLesson && (
          <LessonWorkspace
            chapter={activeChapter}
            lesson={activeLesson}
            initialTab={selectedLesson?.tab || 'notes'}
            onBackToChapters={() => setSelectedLesson(null)}
            onSelectLesson={(cId, lId, tab) => openLesson(cId, lId, tab)}
            onExamProgressChange={handleExamProgressChange}
          />
        )}

        {section === 'chapters' && (!activeChapter || !activeLesson) && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
            {/* Hero Section (2-column split with items-stretch) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
                <div className="bg-white border border-sky-200 rounded-2xl p-5 shadow-sm space-y-3.5">
                  <div className="text-xs font-bold text-sky-700">
                    Welcome · School Competition Project
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-sky-900">
                      Student Name
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mt-1">
                      Moaz Ahmed Ramadan Mohammed
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-sky-800">Grade</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">6B</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-xs font-bold text-sky-800">School</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        Moharam Bek Official Language School
                      </div>
                    </div>
                    <div className="sm:col-span-3 pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-sky-800 mr-2">Supervised by:</span>
                      <span className="text-sm font-bold text-slate-900">Mr. Hamdy Ramadan</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-sky-700">
                  6th Primary Science · October &amp; November Curriculum
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
                  Interactive Science Studio for Chapters 1 to 6
                </h1>
                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                  Study every textbook definition and activity from burning and respiration to digestion, blood circulation, photosynthesis, and plant water transport.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => openLesson('chapter-1', 'ch1-l1', 'notes')}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Start Chapter 1
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTop('microscope')}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Microscope className="w-4 h-4 text-sky-600" />
                    Microscope Explorer
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[260px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
                  {!heroImgError ? (
                    <img
                      src="/src/assets/images/hero_science_lab_1795024892016.jpg"
                      alt="6th primary science laboratory desk with microscope, glass beakers, green leafy plant, and anatomy notebook"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-full lg:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50 flex flex-col items-center justify-center p-8 text-center">
                      <Microscope className="w-12 h-12 text-sky-600 mb-3" />
                      <div className="text-base font-semibold text-slate-900">
                        Primary 6 Science Laboratory
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Chapters 1 to 6 · Interactive Microscope, Experiments &amp; Exams
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 4-Column Summary Strip directly below hero */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs text-slate-500">Curriculum Units</div>
                <div className="text-2xl font-bold text-slate-900 font-mono-data mt-1">
                  6 Chapters
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs text-slate-500">Structured Lessons</div>
                <div className="text-2xl font-bold text-slate-900 font-mono-data mt-1">
                  15 Lessons
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs text-slate-500">Hands-On Activities</div>
                <div className="text-2xl font-bold text-slate-900 font-mono-data mt-1">
                  9 Simulations
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs text-slate-500">Exam Practice</div>
                <div className="text-2xl font-bold text-slate-900 font-mono-data mt-1">
                  150 Questions
                  {totalQuestionsAnswered > 0 && (
                    <span className="text-xs font-normal text-emerald-700 ml-2">
                      ({totalQuestionsAnswered} done)
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Chapters List Section */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Chapters 1 to 6 &amp; Lessons
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Select any lesson to study textbook notes, open the microscope zoom view, run the experiment, or take its 10-question exam.
                  </p>
                </div>

                {/* Interactive Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
                  {[
                    { id: 'all', label: 'All Chapters (6)' },
                    { id: 'october', label: 'October (Ch. 1–3)' },
                    { id: 'november', label: 'November (Ch. 4–6)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setMonthFilter(tab.id as typeof monthFilter)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        monthFilter === tab.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sky-700">
                          Chapter {chapter.chapterNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{chapter.monthLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{chapter.lessons.length} Lessons</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        {chapter.title}
                      </h3>

                      <div className="divide-y divide-slate-100 border-t border-slate-100">
                        {chapter.lessons.map((lesson) => {
                          const prog = examProgress[lesson.id];
                          return (
                            <div key={lesson.id} className="py-3.5 first:pt-3 last:pb-0">
                              <div className="flex items-start justify-between gap-3">
                                <button
                                  onClick={() => openLesson(chapter.id, lesson.id, 'notes')}
                                  className="text-left group cursor-pointer"
                                >
                                  <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                                    Lesson {lesson.lessonNumber}: {lesson.title}
                                  </div>
                                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                                    {lesson.summary}
                                  </p>
                                </button>

                                {prog && prog.answeredCount > 0 && (
                                  <span className="text-xs font-mono-data text-emerald-700 shrink-0 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {prog.correctCount}/10
                                  </span>
                                )}
                              </div>

                              {/* Direct Feature Launchers */}
                              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => openLesson(chapter.id, lesson.id, 'notes')}
                                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <BookOpen className="w-3 h-3" />
                                  Notes
                                </button>
                                {lesson.microscopeSpecimenId && (
                                  <button
                                    onClick={() => openLesson(chapter.id, lesson.id, 'microscope')}
                                    className="px-2.5 py-1 text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <Microscope className="w-3 h-3" />
                                    Microscope
                                  </button>
                                )}
                                {lesson.experimentId && (
                                  <button
                                    onClick={() => openLesson(chapter.id, lesson.id, 'experiment')}
                                    className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <FlaskConical className="w-3 h-3" />
                                    Simulation
                                  </button>
                                )}
                                <button
                                  onClick={() => openLesson(chapter.id, lesson.id, 'exam')}
                                  className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <ClipboardCheck className="w-3 h-3" />
                                  Exam (10 Qs)
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About the Project Section */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold text-sky-700 mb-1.5">
                  School Competition Entry
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  About the Project
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5">
                  This interactive 6th-primary science website was created as a school project for Moharam Bek Official Language School in the West Educational Administration competition, bringing the October and November science curriculum (Chapters 1 to 6) to life through interactive microscope zoom views, experiment simulations, and lesson exams.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-3 bg-sky-50/70 border border-sky-200 rounded-xl p-5">
                  <div className="text-base font-bold text-sky-900 pb-2 border-b border-sky-200/80">
                    Student Name (Project Creator)
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 leading-snug">
                    Moaz Ahmed Ramadan Mohammed
                  </div>
                </div>
                <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-sm font-bold text-sky-900 pb-2 border-b border-slate-200">
                    School
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 mt-3 leading-snug">
                    Moharam Bek Official Language School
                  </div>
                </div>
                <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-sm font-bold text-sky-900 pb-2 border-b border-slate-200">
                    Grade
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-3">6B</div>
                </div>
                <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-sm font-bold text-sky-900 pb-2 border-b border-slate-200">
                    Supervised by
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-3">Mr. Hamdy Ramadan</div>
                </div>
                <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-sm font-bold text-sky-900 pb-2 border-b border-slate-200">
                    Educational Administration
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-3">Middle</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MICROSCOPE EXPLORER SECTION */}
        {section === 'microscope' && <MicroscopeLab />}

        {/* EXPERIMENTS SIMULATION SECTION */}
        {section === 'experiments' && <ExperimentSimulator />}

        {/* EXAMS HUB SECTION */}
        {section === 'exams' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <p className="text-xs font-medium text-emerald-700 mb-1">
                10 Questions Per Lesson · 150 Total Questions
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Lesson Exams Center
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                Every lesson exam includes 3 Give Reason, 3 What Happens If, 2 Choose, and 2 Scientific Term questions directly from the textbook.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Lesson Selector */}
              <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
                {CURRICULUM_CHAPTERS.map((ch) => (
                  <div key={ch.id}>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
                      Ch. {ch.chapterNumber}: {ch.title}
                    </div>
                    <div className="space-y-1">
                      {ch.lessons.map((l) => {
                        const isActive = examHubLessonId === l.id;
                        const prog = examProgress[l.id];
                        return (
                          <button
                            key={l.id}
                            onClick={() => setExamHubLessonId(l.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                              isActive
                                ? 'bg-sky-600 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="truncate">
                              L{l.lessonNumber}. {l.title}
                            </span>
                            {prog && prog.answeredCount > 0 && (
                              <span
                                className={`font-mono-data shrink-0 ${
                                  isActive ? 'text-sky-100' : 'text-emerald-700'
                                }`}
                              >
                                {prog.correctCount}/10
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </aside>

              {/* Right Active Exam */}
              <div className="lg:col-span-8">
                <ExamSection
                  lesson={examHubEntry.lesson}
                  chapterTitle={`Chapter ${examHubEntry.chapter.chapterNumber}: ${examHubEntry.chapter.title}`}
                  onProgressChange={handleExamProgressChange}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <div className="text-sm font-semibold text-slate-900">
              Designed &amp; Developed by Moaz Ahmed Ramadan Mohammed (Grade 6B) | Supervised by Mr. Hamdy Ramadan
            </div>
            <div className="text-xs text-slate-600">
              Moharam Bek Official Language School · Middle Educational Administration
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs font-medium text-slate-600 shrink-0">
            <button onClick={() => navigateTop('chapters')} className="hover:text-slate-900 cursor-pointer">
              Chapters
            </button>
            <button onClick={() => navigateTop('microscope')} className="hover:text-slate-900 cursor-pointer">
              Microscope
            </button>
            <button onClick={() => navigateTop('experiments')} className="hover:text-slate-900 cursor-pointer">
              Experiments
            </button>
            <button onClick={() => navigateTop('exams')} className="hover:text-slate-900 cursor-pointer">
              Exams
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
