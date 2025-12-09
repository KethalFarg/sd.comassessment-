
import React, { useState } from 'react';
import { QuestionConfig, QuestionOption } from '../../types';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight, Check, X } from 'lucide-react';

interface Props {
  config: QuestionConfig;
}

export const FullButtons: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [showMicroCopy, setShowMicroCopy] = useState(false);

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
            className={`w-full py-4 px-6 rounded-2xl border transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg backdrop-blur-sm ${isSelected
                ? 'bg-brand-teal/30 border-brand-teal text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 border-white/5 hover:border-brand-teal/50 text-white font-medium'
              } ${showMicroCopy ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {Icon && <Icon size={20} className="text-brand-lightTeal" />}
            <span className="text-lg">{opt.label}</span>
          </button>
        )
      })}

      {showMicroCopy && microCopyText && (
        <div className="mt-4 p-4 rounded-xl bg-brand-lightTeal/10 border border-brand-lightTeal/30 animate-fade-in">
          <p className="text-white/90 text-sm leading-relaxed">{microCopyText}</p>
        </div>
      )}
    </div>
  );
};

export const YesNo: React.FC<Props> = ({ config }) => {
  const { handleAnswer, nextQuestion, state } = useQuiz();

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
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
          {questionText}
        </h2>
      )}
      <div className="flex gap-4 h-36 w-full">
        {config.options?.map((opt) => {
          const isYes = opt.label === 'Yes';
          return (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt)}
              className={`flex-1 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm ${isYes
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                }`}
            >
              {opt.icon && <opt.icon size={32} className={isYes ? 'text-emerald-400' : 'text-red-400'} />}
              <span className="text-xl font-bold text-white">{opt.label}</span>
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
          className={`w-full text-center text-3xl font-bold bg-white/10 border-2 rounded-2xl py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal transition-colors shadow-inner ${error ? 'border-brand-coral' : 'border-white/10'
            }`}
          maxLength={5}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-brand-coral animate-pulse">
          <X size={16} />
          <span className="text-sm font-medium">Please enter a valid 5-digit ZIP code</span>
        </div>
      )}

      <button
        type="submit"
        disabled={val.length < 5 || loading}
        className="w-full max-w-sm py-4 rounded-2xl bg-brand-teal text-white text-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-lightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
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
