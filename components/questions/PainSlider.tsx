
import React, { useState } from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight } from 'lucide-react';

const SHADOW_LIGHT = '5px 5px 10px rgba(1, 75, 92, 0.6), -4px -4px 8px rgba(255, 255, 255, 1)';

interface Props {
  config: QuestionConfig;
}

export const PainSlider: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const existingAnswer = state.answers[config.id as keyof typeof state.answers] as number | undefined;
  const [val, setVal] = useState(existingAnswer !== undefined ? existingAnswer : 0);
  const [hasInteracted, setHasInteracted] = useState(existingAnswer !== undefined);
  const isLight = config.theme === 'light';

  const handleNext = () => {
    handleAnswer(config.id as any, val);
    nextQuestion();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(parseInt(e.target.value));
    setHasInteracted(true);
  }

  const getLabel = (v: number) => {
    if (v === 0) return "No Pain";
    if (v <= 3) return "Mild";
    if (v <= 6) return "Moderate";
    if (v <= 9) return "Severe";
    return "Worst Imaginable";
  };

  const getColor = (v: number) => {
    if (v <= 3) return '#10b981'; // emerald-500
    if (v <= 6) return '#eab308'; // yellow-500
    return '#dc2626'; // red-600
  };

  return (
    <div className="w-full py-4 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mb-10">
        <span
          className="text-7xl font-bold mb-2 drop-shadow-lg transition-colors duration-300"
          style={{ color: getColor(val) }}
        >
          {val}
        </span>
        <span className={`px-4 py-1.5 rounded-full font-medium border shadow-sm ${isLight ? 'bg-gradient-to-r from-[#036c7e] to-[#0590a8] text-white border-transparent' : 'bg-white/10 text-white border-white/10'}`}>
          {getLabel(val)}
        </span>
      </div>

      <div className="w-full max-w-lg px-4 relative mb-12">
        {/* Track */}
        <div className="relative w-full h-3 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-600 shadow-inner">
          <input
            type="range"
            min="0"
            max="10"
            value={val}
            onChange={handleChange}
            style={{ touchAction: 'none' }}
            className="absolute w-full h-16 -top-6 opacity-0 cursor-pointer z-20"
          />
          {/* Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-10 w-10 border-4 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] pointer-events-none transition-all duration-75 z-10 flex items-center justify-center ${isLight ? 'bg-white border-gray-100' : 'bg-white border-white'}`}
            style={{ left: `calc(${((val) / 10) * 100}% - 20px)` }}
          >
            <div className="w-2 h-2 rounded-full bg-brand-dark/20" />
          </div>
        </div>

        {/* Markers */}
        <div className={`flex justify-between mt-6 px-1 w-full text-xs font-medium uppercase tracking-wider ${isLight ? 'text-gray-400' : 'text-white/50'}`}>
          <div className="flex flex-col items-center gap-1"><span className={`h-2 w-px ${isLight ? 'bg-gray-300' : 'bg-white/30'}`} /><span>0</span></div>
          <div className="flex flex-col items-center gap-1 pl-4"><span className={`h-2 w-px ${isLight ? 'bg-gray-300' : 'bg-white/30'}`} /><span>4</span></div>
          <div className="flex flex-col items-center gap-1 pl-4"><span className={`h-2 w-px ${isLight ? 'bg-gray-300' : 'bg-white/30'}`} /><span>7</span></div>
          <div className="flex flex-col items-center gap-1"><span className={`h-2 w-px ${isLight ? 'bg-gray-300' : 'bg-white/30'}`} /><span>10</span></div>
        </div>
      </div>

      <div className={`w-full flex justify-center transition-opacity duration-300 ${hasInteracted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={handleNext}
          style={{
            boxShadow: isLight
              ? SHADOW_LIGHT
              : undefined
          }}
          className={`w-full max-w-sm py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isLight
            ? 'bg-[#f2654a] text-white hover:bg-[#d9553b] hover:translate-y-[1px] active:shadow-inner'
            : 'bg-white text-brand-teal hover:bg-brand-teal hover:text-white shadow-xl'
            }`}
        >
          Continue <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
