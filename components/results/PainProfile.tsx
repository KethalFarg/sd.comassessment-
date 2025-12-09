
import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ArrowRight, Activity, Clock, AlertCircle, BarChart3, CheckCircle2 } from 'lucide-react';

export const PainProfile: React.FC = () => {
    const { state, nextQuestion } = useQuiz();
    const { answers } = state;

    // Handle primary region display
    const primaryRegion = answers.primary_region || (answers.pain_regions && answers.pain_regions[0]) || 'affected area';
    const duration = answers.duration || answers.pain_duration || 'Not specified';

    return (
        <div className="pb-12 max-w-2xl mx-auto w-full">
            <div className="bg-brand-dark/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl" />

                {/* Header */}
                <div className="p-8 border-b border-white/10 relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Clinical Profile Summary</h2>
                    <p className="text-white/60">
                        We've mapped your symptoms against common decompression success patterns.
                    </p>
                </div>

                <div className="p-8 space-y-8 relative z-10">

                    {/* Zones & Mechanics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                            <div className="flex items-center gap-3 mb-3">
                                <Activity className="text-brand-lightTeal" size={20} />
                                <span className="text-sm font-bold text-white uppercase tracking-wide">Pain Zones</span>
                            </div>
                            <div className="space-y-1">
                                <div className="text-xl font-medium text-white">{primaryRegion}</div>
                                {answers.radiating_pain && (
                                    <div className="text-sm text-brand-coral flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        <span>+ Radiating Symptoms</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="text-brand-lightTeal" size={20} />
                                <span className="text-sm font-bold text-white uppercase tracking-wide">Chronicity</span>
                            </div>
                            <div className="text-xl font-medium text-white">{duration}</div>
                            <div className="text-sm text-white/50">Duration Factor</div>
                        </div>
                    </div>

                    {/* Impact Analysis */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-white/50 uppercase text-xs font-bold tracking-wider">
                            <BarChart3 size={14} /> Life Impact Analysis
                        </div>
                        <div className="space-y-3">
                            {answers.sleep_disruption && (
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                    <span className="text-white/80">Sleep Disruption</span>
                                    <span className="px-2 py-1 rounded bg-brand-coral/20 text-brand-coral text-xs font-bold">HIGH IMPACT</span>
                                </div>
                            )}
                            {answers.mood_impact && answers.mood_impact.length > 0 && !answers.mood_impact.includes("I'm handling it okay") && (
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                    <span className="text-white/80">Mood/Daily Life</span>
                                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 text-xs font-bold">MODERATE IMPACT</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                <span className="text-white/80">Pain Intensity Peak</span>
                                <span className="text-white font-bold">{answers.worst_pain_level || 0}/10</span>
                            </div>
                        </div>
                    </div>

                    {/* Mechanical Disc/Nerve Messaging */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-brand-teal/20 to-brand-lightTeal/10 border border-brand-teal/30 flex items-start gap-4">
                        <CheckCircle2 className="text-brand-lightTeal flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="text-white font-bold mb-1">Mechanical Pattern Identified</h4>
                            <p className="text-sm text-white/70 leading-relaxed mb-2">
                                Your answers suggest that mechanical disc and nerve irritation may be contributing to your pain.
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Your profile shows multiple markers consistent with patients who respond well to non-surgical decompression.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={nextQuestion}
                        className="w-full py-5 rounded-2xl bg-white text-brand-teal font-bold text-xl flex items-center justify-center gap-2 hover:bg-brand-lightTeal hover:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Generate My Full Report <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

