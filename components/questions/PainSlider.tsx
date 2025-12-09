
import React, { useState } from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight } from 'lucide-react';

interface Props {
  config: QuestionConfig;
}

export const PainSlider: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const [val, setVal] = useState(state.answers[config.id as keyof typeof state.answers] as number || 5);

  const handleNext = () => {
    handleAnswer(config.id as any, val);
    nextQuestion();
  };

  const getLabel = (v: number) => {
    if (v === 0) return "No Pain";
    if (v <= 3) return "Mild";
    if (v <= 6) return "Moderate";
    if (v <= 9) return "Severe";
    return "Worst Imaginable";
  };

  return (
    <div className="w-full py-4 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mb-10">
        <span className="text-7xl font-bold text-white mb-2 drop-shadow-lg">{val}</span>
        <span className="px-4 py-1 rounded-full bg-white/10 text-white font-medium border border-white/10">
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
              onChange={(e) => setVal(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            {/* Thumb */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-10 w-10 bg-white border-4 border-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] pointer-events-none transition-all duration-75 z-10 flex items-center justify-center"
              style={{ left: `calc(${((val) / 10) * 100}% - 20px)` }} 
            >
                <div className="w-2 h-2 rounded-full bg-brand-dark/20" />
            </div>
          </div>

          {/* Markers */}
          <div className="flex justify-between mt-6 px-1 w-full text-white/50 text-xs font-medium uppercase tracking-wider">
             <div className="flex flex-col items-center gap-1"><span className="h-2 w-px bg-white/30"/><span>0</span></div>
             <div className="flex flex-col items-center gap-1 pl-4"><span className="h-2 w-px bg-white/30"/><span>4</span></div>
             <div className="flex flex-col items-center gap-1 pl-4"><span className="h-2 w-px bg-white/30"/><span>7</span></div>
             <div className="flex flex-col items-center gap-1"><span className="h-2 w-px bg-white/30"/><span>10</span></div>
          </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 rounded-2xl bg-white text-brand-teal text-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-teal hover:text-white transition-all duration-300 shadow-xl max-w-sm"
      >
        Continue <ArrowRight size={20} />
      </button>
    </div>
  );
};
