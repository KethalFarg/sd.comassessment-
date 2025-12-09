
import React from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';

interface Props {
  config: QuestionConfig;
}

export const SplitImageOptions: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion } = useQuiz();

  const handleSelect = (val: string) => {
    handleAnswer(config.id as any, val);
    if (config.autoAdvance) setTimeout(nextQuestion, 300);
    else nextQuestion();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full items-center justify-center">
       {/* Left: Silhouette Placeholder */}
       {/* Removed glass pane styling (bg, border, shadow) and reduced size */}
       <div className="w-full md:w-5/12 relative flex items-center justify-center py-4">
            <img 
                src="https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/31559b2d-771f-4b70-855d-f8b90c9fdc00/public" 
                alt="Spine Silhouette"
                className="h-[220px] w-auto object-contain opacity-90 drop-shadow-2xl filter contrast-125"
            />
            {/* Pulse effect on spine - scaled down */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-16 bg-brand-coral/30 blur-xl animate-pulse-slow rounded-full pointer-events-none" />
       </div>

       {/* Right: Buttons */}
       <div className="w-full md:w-7/12 flex flex-col justify-center gap-3">
          {config.options?.map((option) => (
              <button
                key={String(option.value)}
                onClick={() => handleSelect(String(option.value))}
                className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/5 hover:border-brand-teal/50 text-white font-medium text-lg transition-all active:scale-[0.98] text-left shadow-lg backdrop-blur-sm"
              >
                {option.label}
              </button>
          ))}
       </div>
    </div>
  );
};
