
import React, { useState } from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { Check, ArrowRight } from 'lucide-react';

interface Props {
  config: QuestionConfig;
}

export const TileGrid: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const initialSelected = (state.answers[config.id as keyof typeof state.answers] as string[]) || [];
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggleSelect = (value: string) => {
    let newSelected;
    if (config.multiSelect) {
        if (selected.includes(value)) {
            newSelected = selected.filter(v => v !== value);
        } else {
            if (config.maxSelections && selected.length >= config.maxSelections) {
                newSelected = [...selected.slice(0, config.maxSelections - 1), value];
            } else {
                newSelected = [...selected, value];
            }
        }
    } else {
        newSelected = [value];
    }
    setSelected(newSelected);
  };

  const handleContinue = () => {
    handleAnswer(config.id as any, selected);
    nextQuestion();
  };

  // If single select, auto advance slightly delayed
  const handleSingleSelect = (val: string) => {
      handleAnswer(config.id as any, val);
      setTimeout(nextQuestion, 200);
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {config.options?.map((option) => {
          const isSelected = selected.includes(option.value as string);
          const Icon = option.icon;
          
          return (
            <button
              key={String(option.value)}
              onClick={() => config.multiSelect ? toggleSelect(option.value as string) : handleSingleSelect(option.value as string)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 min-h-[7rem] backdrop-blur-sm ${
                isSelected 
                  ? 'bg-brand-teal/20 border-brand-teal shadow-[0_0_15px_rgba(2,152,179,0.2)]' 
                  : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {config.multiSelect && isSelected && (
                <div className="absolute top-2 right-2 bg-brand-teal rounded-full p-0.5">
                  <Check size={12} className="text-white" />
                </div>
              )}
              
              {Icon && <Icon size={28} className={`mb-3 ${isSelected ? 'text-brand-lightTeal' : 'text-white/60'}`} />}
              <span className={`text-sm font-medium text-center leading-tight ${isSelected ? 'text-white' : 'text-white/80'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {config.multiSelect && (
        <div className={`mt-6 w-full transition-opacity duration-300 ${selected.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl bg-white text-brand-teal text-lg font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl"
            >
            Continue <ArrowRight size={20} />
            </button>
        </div>
      )}
    </>
  );
};
