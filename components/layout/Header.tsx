import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { PROGRESS_SECTIONS } from '../../constants';

export const Header: React.FC = () => {
  const { prevQuestion, state, getCurrentSection, getQuestionIndex } = useQuiz();
  const currentSectionId = getCurrentSection();
  const { current, total } = getQuestionIndex();

  // Check if we are in a tracked section
  const isValidSection = PROGRESS_SECTIONS.some(s => s.id === currentSectionId);

  return (
    <div className="absolute top-0 left-0 z-50 w-full pt-6 pb-2 px-6 bg-transparent">
      {/* Top Row: Back | Section Title | Count */}
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-4">
        {/* Left: Back Button */}
        <button
          onClick={prevQuestion}
          disabled={state.history.length === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm ${state.history.length === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Center: Current Section Label (Only if valid section) */}
        <div className="text-center pointer-events-none">
          {isValidSection && (
            <span className="text-white font-semibold text-lg tracking-wide uppercase opacity-90">
              {PROGRESS_SECTIONS.find(s => s.id === currentSectionId)?.label || ''}
            </span>
          )}
        </div>

        {/* Right: Counter (Only if valid section and count > 0) */}
        <div className="w-10 flex justify-end">
          {isValidSection && current > 0 && (
            <span className="text-white/60 font-medium text-sm whitespace-nowrap">
              Question {current} of {total}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Row: Segmented Progress Bar (Only show if valid section) */}
      {isValidSection && (
        <div className="max-w-2xl mx-auto flex gap-1.5 h-1.5">
          {PROGRESS_SECTIONS.map((section, idx) => {
            // Determine active state
            const currentIdx = PROGRESS_SECTIONS.findIndex(s => s.id === currentSectionId);
            const isCompleted = idx < currentIdx;
            const isActive = idx === currentIdx;

            return (
              <div key={section.id} className="flex-1 rounded-full overflow-hidden bg-white/10">
                <div
                  className={`h-full transition-all duration-500 ease-out ${isCompleted ? 'bg-brand-teal w-full' :
                      isActive ? 'bg-[#f2654a] w-full' :
                        'w-0'
                    }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};