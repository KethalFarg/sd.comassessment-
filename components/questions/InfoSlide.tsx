
import React, { useEffect, useState } from 'react';
import { QuestionConfig } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight } from 'lucide-react';

interface Props {
  config: QuestionConfig;
}

export const InfoSlide: React.FC<Props> = ({ config }) => {
  const { nextQuestion } = useQuiz();
  // Default to dark theme for this flow per requirements unless specified light
  const isLight = config.theme === 'light'; 
  const isMcClure = config.componentProps?.variant === 'mcclure-chart';

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isMcClure) {
        setTimeout(() => setProgress(89), 300);
    }
  }, [isMcClure]);

  return (
    <div className={`flex flex-col h-full ${isLight ? 'text-brand-dark' : 'text-white'}`}>
      
      {/* Visual Area */}
      {config.componentProps?.image && (
          <div className="w-full h-48 md:h-64 mb-6 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 relative bg-gray-900 border border-white/10">
             <img 
               src={config.componentProps.image} 
               alt="Insight"
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
          </div>
      )}

      {/* McClure Chart Variant */}
      {isMcClure && (
          <div className="flex items-center justify-center mb-10 py-6">
              <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                      <circle cx="96" cy="96" r="88" className="stroke-white/10 fill-none" strokeWidth="12" />
                      <circle 
                        cx="96" cy="96" r="88" 
                        className="stroke-brand-lightTeal fill-none transition-all duration-[2000ms] ease-out" 
                        strokeWidth="12" 
                        strokeDasharray={553} 
                        strokeDashoffset={553 - (553 * progress) / 100} 
                        strokeLinecap="round"
                      />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-white">{progress}%</span>
                      <span className="text-xs text-white/60 mt-1">Improvement</span>
                  </div>
              </div>
          </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center text-center justify-center px-4">
        {!config.componentProps?.image && !isMcClure && (
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-md bg-white/10 text-brand-lightTeal">
                 <span className="text-3xl">💡</span>
            </div>
        )}
        
        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isLight ? 'text-brand-dark' : 'text-white'}`}>
            {config.question}
        </h2>
        
        <p className={`text-lg leading-relaxed mb-8 max-w-md ${isLight ? 'text-gray-600' : 'text-white/80'}`}>
           {config.subtext}
        </p>

        {isMcClure && (
            <p className="text-xs text-white/40 max-w-xs mx-auto">
                Patient-reported outcomes. Results vary. Evaluation required.
            </p>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-auto pt-6 w-full flex justify-center pb-4">
        <button 
          onClick={nextQuestion}
          className="px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-2 bg-white text-brand-teal hover:bg-brand-lightTeal hover:text-white"
        >
          Continue <ArrowRight size={20}/>
        </button>
      </div>
    </div>
  );
};
