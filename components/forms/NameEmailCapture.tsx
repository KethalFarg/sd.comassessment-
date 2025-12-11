import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { QUIZ_CONFIG } from '../../constants';

export const NameEmailCapture: React.FC = () => {
    const { handleAnswer, nextQuestion, state } = useQuiz();
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Get theme
    const config = QUIZ_CONFIG.find(q => q.id === state.currentStepId);
    const isLight = config?.theme === 'light';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate short delay
        setTimeout(() => {
            handleAnswer('firstName', firstName);
            handleAnswer('email', email);
            nextQuestion();
        }, 800);
    };

    return (
        <div className={`w-full max-w-md mx-auto backdrop-blur-md rounded-3xl p-8 shadow-2xl transition-all ${isLight
            ? 'bg-white border border-gray-100'
            : 'bg-white/5 border border-white/10'
            }`}>
            <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isLight ? 'bg-[#0590a8]/10' : 'bg-brand-teal/20'
                    }`}>
                    <Mail size={32} className={isLight ? 'text-[#0590a8]' : 'text-brand-lightTeal'} />
                </div>
            </div>

            <h2 className={`text-2xl font-bold text-center mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Let's generate your personalized profile.
            </h2>
            <p className={`text-center mb-8 ${isLight ? 'text-gray-500' : 'text-white/60'}`}>
                We'll analyze your answers and create a custom decompression fit assessment.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`block text-xs font-semibold uppercase mb-2 ml-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>First Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Enter your first name"
                        className={`w-full rounded-xl px-4 py-4 text-xl transition-colors font-medium focus:outline-none focus:border-[#0590a8] ${isLight
                            ? 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400'
                            : 'bg-white/10 border border-white/20 text-white placeholder:text-white/20 focus:border-brand-teal'
                            }`}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div>
                    <label className={`block text-xs font-semibold uppercase mb-2 ml-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Email Address</label>
                    <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full rounded-xl px-4 py-4 text-xl transition-colors font-medium focus:outline-none focus:border-[#0590a8] ${isLight
                            ? 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400'
                            : 'bg-white/10 border border-white/20 text-white placeholder:text-white/20 focus:border-brand-teal'
                            }`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!firstName || !email || loading}
                    className={`w-full mt-4 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isLight
                        ? 'bg-[#0590a8] hover:bg-[#047c91] text-white'
                        : 'bg-brand-teal hover:bg-brand-lightTeal text-white hover:shadow-brand-teal/20'
                        }`}
                >
                    {loading ? 'Generating...' : <>Generate My Profile <ArrowRight size={20} /></>}
                </button>
            </form>

            <div className={`flex items-center justify-center gap-1.5 mt-6 text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
                <Lock size={12} />
                <span>Secure. No spam. Privacy guaranteed.</span>
            </div>
        </div>
    );
};
