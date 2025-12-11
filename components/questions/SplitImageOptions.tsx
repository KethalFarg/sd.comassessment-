
import React from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';

const SHADOW_LIGHT = '5px 5px 10px rgba(1, 75, 92, 0.6), -4px -4px 8px rgba(255, 255, 255, 1)';
const SHADOW_PRESSED = 'inset 4px 4px 8px rgba(1, 75, 92, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.9)';

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

  const { image, reverse } = config.componentProps || {};
  const isLight = config.theme === 'light';

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 w-full h-full items-center justify-center max-w-5xl mx-auto px-4`}>
      {/* Image Side - 5/12 to match Body Map */}
      <div className="w-full md:w-5/12 flex justify-center items-center">
        <div className="relative w-full">
          {image && (
            <img
              src={image}
              alt="Visual"
              className="w-full h-auto object-contain max-h-[60vh]"
            />
          )}
        </div>
      </div>

      {/* Buttons Side - 7/12 to match Body Map */}
      <div className="w-full md:w-7/12 flex flex-col justify-center gap-4">
        {config.options?.map((option) => (
          <button
            key={String(option.value)}
            onClick={() => handleSelect(String(option.value))}
            style={{
              boxShadow: isLight
                ? SHADOW_LIGHT
                : undefined
            }}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] text-center backdrop-blur-sm border-2 ${isLight
              ? 'bg-white text-[#036c7e] border-[#036c7e] hover:bg-[#036c7e]/5'
              : 'bg-white/10 hover:bg-white/20 border-white/5 hover:border-brand-teal/50 text-white shadow-lg'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
