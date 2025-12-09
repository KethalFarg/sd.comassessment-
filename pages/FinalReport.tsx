
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Calendar, Phone, Lock, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

export const FinalReport: React.FC = () => {
    // This is a dummy layout for the "Final Result Page" requested.
    // Logic for tiers would go here later.
    return (
        <div className="pb-12 max-w-3xl mx-auto w-full text-brand-dark pt-4">
            
            {/* Top Badge */}
            <div className="flex justify-center mb-6">
                <div className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 border border-green-200 shadow-sm">
                    <ShieldCheck size={16} />
                    CLINICAL MATCH FOUND
                </div>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-8 px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    You appear to be a <span className="text-brand-teal">Strong Candidate</span> for Decompression Therapy.
                </h1>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                    Your assessment indicates a mechanical pain pattern that decompression is specifically designed to treat.
                </p>
            </div>

            {/* Tiered Result Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-10">
                <div className="bg-brand-dark p-6 md:p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="text-brand-lightTeal font-bold tracking-widest text-xs uppercase mb-2">Recommendation</div>
                            <h2 className="text-2xl font-bold">Schedule an Evaluation</h2>
                            <p className="text-white/70 mt-1">Confirm candidacy with a provider.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                            <span className="font-bold">High Priority</span>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl"></div>
                </div>

                <div className="p-6 md:p-10 bg-white">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} /> Why this matches:
                            </h3>
                            <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                                <li className="pl-4 border-l-2 border-green-200">
                                    Symptoms of <strong className="text-gray-800">nerve compression</strong> detected.
                                </li>
                                <li className="pl-4 border-l-2 border-green-200">
                                    History of <strong className="text-gray-800">chronic pain</strong> not fully resolved by standard care.
                                </li>
                                <li className="pl-4 border-l-2 border-green-200">
                                    Pain triggers consistent with <strong className="text-gray-800">disc pathology</strong>.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">Next Steps</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                A local provider has been notified of your potential match. They can verify your insurance coverage and discuss treatment options.
                            </p>
                            <div className="text-sm font-semibold text-brand-teal">
                                No obligation. Consultation recommended.
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-brand-teal hover:bg-brand-dark text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                        <Calendar size={20} />
                        Request Appointment
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secure request. A dedicated specialist will contact you shortly.
                    </p>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="border-t border-gray-200 pt-8 px-6 text-center">
                <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    This report is for informational purposes only and does not constitute a medical diagnosis. 
                    Spinal decompression may help many patients, but results vary. 
                    Only a licensed healthcare provider can determine if this therapy is right for you.
                </p>
            </div>
        </div>
    );
};
