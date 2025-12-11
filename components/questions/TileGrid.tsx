
import React, { useState } from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight, Check } from 'lucide-react';

const SHADOW_LIGHT = '5px 5px 10px rgba(1, 75, 92, 0.6), -4px -4px 8px rgba(255, 255, 255, 1)';
const SHADOW_PRESSED = 'inset 4px 4px 8px rgba(1, 75, 92, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.9)';

interface Props {
  config: QuestionConfig;
}

export const TileGrid: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const initialSelected = (state.answers[config.id as keyof typeof state.answers] as string[]) || [];
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const isLight = config.theme === 'light';

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

          const isMovement = config.id === 'movement-triggers';
          const isDiagnosis = config.id === 'diagnosis';

          return (
            <button
              key={String(option.value)}
              onClick={() => config.multiSelect ? toggleSelect(option.value as string) : handleSingleSelect(option.value as string)}
              style={{
                boxShadow: isLight
                  ? (isSelected ? SHADOW_PRESSED : SHADOW_LIGHT)
                  : undefined
              }}
              className={`relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 min-h-[7rem] backdrop-blur-sm ${isLight
                ? (isDiagnosis
                  ? `bg-white border-[#036c7e] flex-col justify-between aspect-square hover:bg-[#036c7e]/5 ${isSelected ? 'ring-2 ring-[#036c7e] scale-[0.98]' : ''}`
                  : (isMovement
                    ? `bg-white border-[#036c7e] flex-col justify-center hover:bg-[#036c7e]/5 ${isSelected ? 'ring-2 ring-[#036c7e] scale-[0.98]' : ''}`
                    : (isSelected
                      ? 'bg-[#036c7e] flex-col justify-center border-[#036c7e] scale-[0.98]'
                      : 'bg-[#0590a8] flex-col justify-center border-transparent hover:bg-[#047c91] hover:scale-[1.02] hover:translate-y-[1px]')))
                : (isSelected
                  ? 'bg-brand-teal/20 flex-col justify-center border-brand-teal shadow-[0_0_15px_rgba(2,152,179,0.2)]'
                  : 'bg-white/5 flex-col justify-center border-transparent hover:bg-white/10 hover:border-white/10 shadow-md')
                }`}
            >
              {config.multiSelect && isSelected && (
                <div className={`absolute top-2 right-2 z-10 rounded-full p-0.5 ${isLight ? 'bg-[#036c7e]' : 'bg-brand-teal'}`}>
                  <Check size={12} className="text-white" />
                </div>
              )}

              {isDiagnosis ? (
                <>
                  {(option.image || Icon) && (
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 bg-white mb-3 flex items-center justify-center">
                      {option.image ? (
                        <img src={option.image} alt={option.label} className="w-full h-full object-cover" />
                      ) : (
                        Icon && <Icon className={`w-full h-full text-[#036c7e] ${option.value === 'Not sure / Other / None' ? 'scale-100 p-2' : 'scale-150'}`} />
                      )}
                    </div>
                  )}
                  <span className="text-sm font-bold text-[#036c7e] text-center w-full">{option.label}</span>
                </>
              ) : (
                <>
                  {Icon && (
                    isMovement ? (
                      <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#0590a8] to-[#014B5C] text-white shadow-[0_4px_8px_rgba(1,75,92,0.3),inset_2px_2px_4px_rgba(255,255,255,0.2)] border border-[#014B5C]/20">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#f0f9fa] flex items-center justify-center shadow-inner">
                          <Icon size={28} strokeWidth={2.5} className="text-[#036c7e]" />
                        </div>
                      </div>
                    ) : (
                      <Icon size={28} className={`mb-3 ${isLight ? 'text-white' : (isSelected ? 'text-brand-lightTeal' : 'text-white/60')}`} />
                    )
                  )}
                  <span className={`text-sm font-bold text-center leading-tight ${isLight ? (isMovement ? 'text-[#036c7e]' : 'text-white') : (isSelected ? 'text-white' : 'text-white/80')}`}>
                    {option.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {config.multiSelect && (
        <div className={`mt-6 w-full flex justify-center transition-opacity duration-300 ${selected.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={handleContinue}
            style={{
              boxShadow: isLight
                ? SHADOW_LIGHT
                : undefined
            }}
            className={`w-full max-w-sm py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isLight
              ? 'bg-[#f2654a] text-white hover:bg-[#d9553b] hover:translate-y-[1px] active:shadow-inner'
              : 'bg-[#f2654a] text-white hover:bg-[#d9553b] shadow-xl'
              }`}
          >
            Continue <ArrowRight size={20} />
          </button>
        </div>
      )}
    </>
  );
};
