
import React from 'react';
import { QuestionConfig, QuestionOption } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { User } from 'lucide-react';

interface Props {
  config: QuestionConfig;
}

export const PictureTiles: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();

  const handleSelect = (option: QuestionOption) => {
    handleAnswer(config.id as any, option.value);
    if (config.autoAdvance) {
      setTimeout(nextQuestion, 400);
    } else {
      nextQuestion();
    }
  };

  const isLightMode = config.theme === 'light';
  // Check if we have 4 options (Age) vs 2 (Gender)
  const isGrid = config.options && config.options.length > 2;

  // Conditional Image Logic
  const getOptionImage = (option: QuestionOption) => {
    if (config.componentProps?.conditionalImages && state.answers.gender) {
      const gender = state.answers.gender.toLowerCase();
      const imageSet = config.componentProps.conditionalImages[gender];
      if (imageSet && imageSet[option.value as string]) {
        return imageSet[option.value as string];
      }
    }
    return option.image;
  };

  return (
    <div className={`grid gap-4 w-full max-w-xl mx-auto ${isGrid ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
      {config.options?.map((option) => {
        const displayImage = getOptionImage(option);

        return (
          <button
            key={String(option.value)}
            onClick={() => handleSelect(option)}
            className={`
            group relative overflow-hidden rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col w-full
            ${isLightMode
                ? 'bg-white border-2 border-gray-100 hover:border-brand-teal text-brand-dark'
                : 'bg-white/10 border-2 border-transparent hover:border-brand-teal/50 text-white'
              }
          `}
          >
            <div className={`w-full relative ${isGrid ? 'aspect-square' : 'aspect-[3/4] md:aspect-[4/3]'} ${isLightMode ? 'bg-gray-200' : 'bg-gray-800'}`}>
              {/* Fallback Icon */}
              <div className={`absolute inset-0 flex items-center justify-center ${isLightMode ? 'text-gray-400' : 'text-white/20'}`}>
                <User size={isGrid ? 48 : 64} strokeWidth={1.5} />
              </div>

              {/* Image */}
              {displayImage && (
                <img
                  src={displayImage}
                  alt={option.label}
                  className="absolute inset-0 h-full w-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}

              {/* Overlay Gradient */}
              <div className={`absolute inset-0 transition-opacity duration-300 z-20 ${isLightMode ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90' : 'bg-gradient-to-t from-black/90 via-transparent to-transparent'}`} />

              {/* Label Area */}
              <div className="absolute bottom-0 left-0 w-full p-4 z-30 flex items-center justify-center text-center">
                <span className={`${isGrid ? 'text-xl' : 'text-2xl'} font-bold text-white tracking-wide drop-shadow-md`}>
                  {option.label}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
