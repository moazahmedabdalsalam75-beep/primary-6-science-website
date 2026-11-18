import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Eye, RotateCcw, Award } from 'lucide-react';
import { ExamQuestion, LessonData } from '../data/curriculum';

export interface LessonExamProgress {
  answeredCount: number;
  correctCount: number;
}

interface ExamSectionProps {
  lesson: LessonData;
  chapterTitle: string;
  onProgressChange?: (lessonId: string, progress: LessonExamProgress) => void;
}

interface QuestionState {
  textInput: string;
  selectedOption?: 'a' | 'b' | 'c' | 'd';
  revealed: boolean;
  selfCorrect?: boolean;
  termChecked?: boolean;
  termCorrect?: boolean;
}

export const ExamSection: React.FC<ExamSectionProps> = ({
  lesson,
  chapterTitle,
  onProgressChange,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'gr' | 'whi' | 'choose' | 'term'>('all');
  const [states, setStates] = useState<Record<string, QuestionState>>({});

  useEffect(() => {
    setStates({});
    setFilterType('all');
  }, [lesson.id]);

  const getState = (id: string): QuestionState =>
    states[id] || { textInput: '', revealed: false };

  const updateState = (id: string, patch: Partial<QuestionState>) => {
    setStates((prev) => {
      const next = {
        ...prev,
        [id]: { ...(prev[id] || { textInput: '', revealed: false }), ...patch },
      };
      return next;
    });
  };

  // Calculate score out of 10
  const computeProgress = (currentStates: Record<string, QuestionState>): LessonExamProgress => {
    let answeredCount = 0;
    let correctCount = 0;

    for (const q of lesson.exam) {
      const st = currentStates[q.id];
      if (!st) continue;

      if (q.type === 'choose') {
        if (st.selectedOption) {
          answeredCount += 1;
          if (st.selectedOption === q.correctKey) correctCount += 1;
        }
      } else if (q.type === 'term') {
        if (st.termChecked || st.revealed) {
          answeredCount += 1;
          if (st.termCorrect || st.selfCorrect) correctCount += 1;
        }
      } else {
        if (st.revealed && st.selfCorrect !== undefined) {
          answeredCount += 1;
          if (st.selfCorrect) correctCount += 1;
        }
      }
    }

    return { answeredCount, correctCount };
  };

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(lesson.id, computeProgress(states));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, lesson.id]);

  const progress = computeProgress(states);

  const handleCheckTerm = (q: Extract<ExamQuestion, { type: 'term' }>) => {
    const st = getState(q.id);
    const normalized = st.textInput.trim().toLowerCase().replace(/\s+/g, ' ');
    const isMatch = q.acceptedAnswers.some((ans) => ans.toLowerCase() === normalized);
    updateState(q.id, {
      termChecked: true,
      termCorrect: isMatch,
      revealed: true,
    });
  };

  const handleReset = () => {
    setStates({});
  };

  const visibleQuestions = lesson.exam.filter(
    (q) => filterType === 'all' || q.type === filterType
  );

  const grCount = lesson.exam.filter((q) => q.type === 'gr').length;
  const whiCount = lesson.exam.filter((q) => q.type === 'whi').length;
  const chooseCount = lesson.exam.filter((q) => q.type === 'choose').length;
  const termCount = lesson.exam.filter((q) => q.type === 'term').length;

  return (
    <div className="space-y-6">
      {/* Exam Header Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>{chapterTitle}</span>
            <span aria-hidden="true">·</span>
            <span>Lesson {lesson.lessonNumber} Exam</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">10 Questions</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">{lesson.title} — Practice Exam</h3>
          <p className="text-xs text-slate-600 mt-1 tabular-nums">
            {grCount} Give Reason · {whiCount} What Happens If · {chooseCount} Choose · {termCount} Scientific Term
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-right">
            <div className="text-[11px] text-slate-500 font-medium">Exam Score</div>
            <div className="text-base font-bold text-slate-900 font-mono-data">
              {progress.correctCount} / {lesson.exam.length}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Exam
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
        {[
          { id: 'all', label: 'All (10)' },
          { id: 'gr', label: 'Give Reason (3)' },
          { id: 'whi', label: 'What Happens If (3)' },
          { id: 'choose', label: 'Choose (2)' },
          { id: 'term', label: 'Scientific Term (2)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as typeof filterType)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filterType === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {visibleQuestions.map((q) => {
          const originalIndex = lesson.exam.findIndex((item) => item.id === q.id) + 1;
          const st = getState(q.id);

          return (
            <div
              key={q.id}
              className="bg-white border border-slate-200 rounded-xl p-5 transition-colors"
            >
              {/* Question Type Kicker */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-sky-700">
                  Question {originalIndex} ·{' '}
                  {q.type === 'gr'
                    ? 'Give Reason (G.R.)'
                    : q.type === 'whi'
                    ? 'What Happens If'
                    : q.type === 'choose'
                    ? 'Choose the Correct Answer'
                    : 'Write the Scientific Term'}
                </span>
              </div>

              <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed mb-4">
                {q.type === 'gr' && <span className="text-slate-500 mr-1.5">Give reason:</span>}
                {q.type === 'whi' && <span className="text-slate-500 mr-1.5">What happens if:</span>}
                {q.question}
              </p>

              {/* G.R. & What Happens If */}
              {(q.type === 'gr' || q.type === 'whi') && (
                <div className="space-y-3">
                  <textarea
                    rows={2}
                    value={st.textInput}
                    onChange={(e) => updateState(q.id, { textInput: e.target.value })}
                    placeholder="Type your answer here before checking..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => updateState(q.id, { revealed: true })}
                      className="px-3.5 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {st.revealed ? 'Model Answer Shown' : 'Check Model Answer'}
                    </button>

                    {st.revealed && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateState(q.id, { selfCorrect: true })}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1 cursor-pointer ${
                            st.selfCorrect === true
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Got It Right
                        </button>
                        <button
                          onClick={() => updateState(q.id, { selfCorrect: false })}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1 cursor-pointer ${
                            st.selfCorrect === false
                              ? 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Needs Review
                        </button>
                      </div>
                    )}
                  </div>

                  {st.revealed && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-slate-900">
                      <span className="font-semibold text-emerald-900">Textbook Answer: </span>
                      {q.answer}
                    </div>
                  )}
                </div>
              )}

              {/* Choose (MCQ) */}
              {q.type === 'choose' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = st.selectedOption === opt.key;
                    const isCorrect = q.correctKey === opt.key;
                    const showResult = Boolean(st.selectedOption);

                    let btnStyle =
                      'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';
                    if (showResult && isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (showResult && isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => updateState(q.id, { selectedOption: opt.key })}
                        className={`px-3.5 py-2.5 text-sm rounded-lg border text-left transition-colors flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                      >
                        <span>
                          <span className="font-mono-data font-semibold mr-2">({opt.key})</span>
                          {opt.label}
                        </span>
                        {showResult && isCorrect && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                            Correct
                          </span>
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-rose-700 shrink-0">
                            <XCircle className="w-4 h-4" />
                            Incorrect
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Scientific Term */}
              {q.type === 'term' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={st.textInput}
                      onChange={(e) =>
                        updateState(q.id, {
                          textInput: e.target.value,
                          termChecked: false,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckTerm(q);
                      }}
                      placeholder="Write the scientific term..."
                      className="flex-1 rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                    <button
                      onClick={() => handleCheckTerm(q)}
                      className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Check Term
                    </button>
                    <button
                      onClick={() => updateState(q.id, { revealed: true })}
                      className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Show Answer
                    </button>
                  </div>

                  {st.termChecked && (
                    <div
                      className={`rounded-lg px-4 py-2.5 text-sm flex items-center gap-2 border ${
                        st.termCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}
                    >
                      {st.termCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Correct scientific term: {q.answer}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>
                            Not quite. Textbook answer: <strong>{q.answer}</strong>
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {st.revealed && !st.termChecked && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 text-sm text-emerald-900">
                      <strong>Scientific Term:</strong> {q.answer}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {progress.answeredCount === lesson.exam.length && (
        <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <div className="text-base font-semibold">Lesson Exam Complete</div>
              <div className="text-xs text-slate-300 tabular-nums">
                You scored {progress.correctCount} out of {lesson.exam.length} on {lesson.title}.
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-medium bg-white text-slate-900 hover:bg-slate-100 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
