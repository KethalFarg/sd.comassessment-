import React, { useState } from 'react';
import { QuestionConfig, QuestionOption } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight, Check, X } from 'lucide-react';

const SHADOW_LIGHT = '5px 5px 10px rgba(1, 75, 92, 0.6), -4px -4px 8px rgba(255, 255, 255, 1)';
const SHADOW_PRESSED = 'inset 4px 4px 8px rgba(1, 75, 92, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.9)';

interface Props {
  config: QuestionConfig;
}

export const FullButtons: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [showMicroCopy, setShowMicroCopy] = useState(false);
  const isLight = config.theme === 'light';

  // Handle dynamic options from previous answers (Q4: primary-region)
  let options = config.options || [];
  if (config.componentProps?.dynamicFromPrevious) {
    const prevKey = config.componentProps.dynamicFromPrevious;
    const prevValues = state.answers[prevKey];
    if (prevValues && Array.isArray(prevValues)) {
      options = prevValues.map((val: string) => ({ value: val, label: val }));
    }
  }

  const handleSelect = (val: any) => {
    handleAnswer(config.id as any, val);

    // Check for inline micro-copy (Q21: biggest-concern)
    if (config.componentProps?.inlineMicroCopy) {
      setSelectedValue(val);
      setShowMicroCopy(true);
      const delay = config.componentProps?.autoAdvanceDelay || 3000;
      setTimeout(() => {
        nextQuestion();
      }, delay);
    } else if (config.autoAdvance) {
      setTimeout(nextQuestion, 300);
    } else {
      nextQuestion();
    }
  };

  const microCopyText = selectedValue && config.componentProps?.inlineMicroCopy?.[selectedValue];

  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = selectedValue === opt.value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => handleSelect(opt.value)}
            disabled={showMicroCopy}
            style={{
              boxShadow: isLight
                ? (isSelected ? SHADOW_PRESSED : SHADOW_LIGHT)
                : undefined
            }}
            className={`w-full py-4 px-6 rounded-2xl border transition-all active:scale-[0.98] flex items-center justify-center gap-3 backdrop-blur-sm ${isLight
              ? (isSelected
                ? 'bg-[#036c7e] border-[#036c7e] text-white font-bold scale-[0.98]'
                : 'bg-white border-[#036c7e] border-2 text-[#036c7e] font-bold hover:bg-[#036c7e]/5')
              : (isSelected
                ? 'bg-brand-teal/30 border-brand-teal text-white font-bold shadow-lg'
                : 'bg-white/10 hover:bg-white/20 border-white/5 hover:border-brand-teal/50 text-white font-medium shadow-lg')
              } ${showMicroCopy ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {Icon && <Icon size={20} className={isLight ? 'text-white' : 'text-brand-lightTeal'} />}
            <span className="text-lg">{opt.label}</span>
          </button>
        )
      })}

      {showMicroCopy && microCopyText && (
        <div className={`mt-4 p-4 rounded-xl border animate-fade-in ${isLight ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-brand-lightTeal/10 border-brand-lightTeal/30'
          }`}>
          <p className={`${isLight ? 'text-teal-900' : 'text-white/90'} text-sm leading-relaxed`}>{microCopyText}</p>
        </div>
      )}
    </div>
  );
};

export const YesNo: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const isLight = config.theme === 'light';

  // Handle conditional questions (Q5: radiating-pain)
  let questionText = config.question || '';
  if (config.componentProps?.conditionalQuestion && config.componentProps?.questions) {
    const primaryRegion = state.answers.primary_region || '';
    const questions = config.componentProps.questions;
    questionText = questions[primaryRegion] || questions['default'] || questionText;
  }

  const handleSelect = (option: QuestionOption) => {
    handleAnswer(config.id as any, option.value);
    setTimeout(nextQuestion, 300);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {questionText !== config.question && (
        <h2 className={`text-2xl md:text-3xl font-bold text-center leading-tight mt-6 md:mt-8 mb-2 ${isLight ? 'text-brand-dark' : 'text-white'}`}>
          {questionText}
        </h2>
      )}

      {config.componentProps?.VisualComponent && (
        <div className="w-full flex justify-center py-4">
          <config.componentProps.VisualComponent className="w-full h-auto max-h-48 text-[#036c7e]" />
        </div>
      )}

      {config.componentProps?.image && (
        <div className="w-full flex justify-center py-2">
          <img
            src={config.componentProps.image}
            alt="Reference"
            className="w-full h-auto max-h-60 object-contain rounded-xl shadow-sm mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
      )}

      <div className="flex gap-4 h-36 w-full">
        {config.options?.map((opt) => {
          const isYes = opt.label === 'Yes';
          const Icon = isYes ? Check : X; // Enforce specific icons

          return (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt)}
              style={{
                boxShadow: isLight
                  ? SHADOW_LIGHT
                  : undefined
              }}
              className={`flex-1 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm bg-white border-[#036c7e] text-[#036c7e] hover:bg-[#036c7e]/5 shadow-lg`}
            >
              <Icon size={40} strokeWidth={3} />
              <span className="text-xl font-bold">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const TextInput: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const [val, setVal] = useState(state.answers[config.id as keyof typeof state.answers] as string || '');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLight = config.theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.validation && !config.validation(val)) {
      setError(true);
      return;
    }

    setLoading(true);
    // Simulate API search
    setTimeout(() => {
      handleAnswer(config.id as any, val);
      nextQuestion();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">
      <div className="w-full relative max-w-sm">
        <input
          type="tel"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setError(false);
          }}
          placeholder={config.componentProps?.placeholder || "12345"}
          className={`w-full text-center text-3xl font-bold border-2 rounded-2xl py-5 focus:outline-none transition-colors shadow-inner ${isLight
            ? `bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#0590a8] ${error ? 'border-red-500' : 'border-gray-200'}`
            : `bg-white/10 text-white placeholder:text-white/20 focus:border-brand-teal ${error ? 'border-brand-coral' : 'border-white/10'}`
            }`}
          maxLength={5}
          disabled={loading}
        />
      </div>

      {error && (
        <div className={`flex items-center gap-2 animate-pulse ${isLight ? 'text-red-600' : 'text-brand-coral'}`}>
          <X size={16} />
          <span className="text-sm font-medium">Please enter a valid 5-digit ZIP code</span>
        </div>
      )}

      <button
        type="submit"
        disabled={val.length < 5 || loading}
        style={{
          boxShadow: isLight
            ? SHADOW_LIGHT
            : undefined
        }}
        className={`w-full max-w-sm py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isLight
          ? 'bg-[#0590a8] hover:bg-[#047c91] text-white hover:translate-y-[1px] active:shadow-inner'
          : 'bg-brand-teal hover:bg-brand-lightTeal text-white shadow-xl'
          }`}
      >
        {loading ? (
          <span className="animate-pulse">Checking Coverage...</span>
        ) : (
          <>Check Availability <ArrowRight size={20} /></>
        )}
      </button>
    </form>
  );
};
