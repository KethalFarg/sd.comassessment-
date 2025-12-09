
import React, { useState } from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight, Check } from 'lucide-react';

interface Props {
  config: QuestionConfig;
}

export const BodyMapSelector: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const initialSelected = (state.answers[config.id as keyof typeof state.answers] as string[]) || [];
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggleSelect = (value: string) => {
    let newSelected;
    if (selected.includes(value)) {
      newSelected = selected.filter(v => v !== value);
    } else {
      if (config.maxSelections && selected.length >= config.maxSelections) {
         newSelected = [...selected.slice(0, config.maxSelections - 1), value];
      } else {
        newSelected = [...selected, value];
      }
    }
    setSelected(newSelected);
  };

  const handleContinue = () => {
    handleAnswer(config.id as any, selected);
    nextQuestion();
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 w-full h-full">
      {/* Image Side */}
      <div className="w-5/12 flex justify-center items-center">
        <div className="relative w-full max-h-[50vh] flex items-center justify-center">
             <img
               src={config.componentProps?.image}
               alt="Body Map"
               className="w-full h-auto object-contain max-h-[50vh] drop-shadow-2xl filter brightness-110 contrast-110"
             />
        </div>
      </div>

      {/* Buttons Side */}
      <div className="w-7/12 flex flex-col gap-2 justify-center">
         {config.options?.map((option) => {
             const isSelected = selected.includes(String(option.value));
             return (
                 <button
                    key={String(option.value)}
                    onClick={() => toggleSelect(String(option.value))}
                    className={`
                        group relative w-full py-2 px-1 md:py-3 md:px-4 rounded-lg md:rounded-xl border transition-all duration-200
                        flex items-center justify-center text-center text-sm md:text-base font-medium backdrop-blur-sm
                        ${isSelected
                            ? 'bg-brand-teal/20 border-brand-teal text-white shadow-[0_0_10px_rgba(2,152,179,0.3)]'
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                        }
                    `}
                 >
                    <span>{option.label}</span>
                 </button>
             );
         })}

         {/* Continue Button */}
         <div className={`mt-2 transition-all duration-500 transform ${selected.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button
                onClick={handleContinue}
                className="w-full py-3 rounded-full bg-white text-brand-teal font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-brand-lightTeal hover:text-white transition-all shadow-xl"
            >
                Continue <ArrowRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};
