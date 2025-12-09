import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { QuestionConfig } from '../../types';
import betterJointLogo from '@/src/assets/better-joint-logo.png';

interface GenderLandingProps {
    config?: QuestionConfig;
}

export const GenderLanding: React.FC<GenderLandingProps> = ({ config }) => {
    const { handleAnswer, nextQuestion } = useQuiz();

    const handleSelect = (gender: string) => {
        handleAnswer(config?.id || 'gender', gender);
        setTimeout(() => {
            nextQuestion();
        }, 300);
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden flex flex-col bg-[#014B5C]">
            {/* Main Background Gradient: Dark Teal (Left) -> Lighter Teal (Right) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#014B5C] via-[#0D5F73] to-[#1A7285] z-0" />

            {/* Dramatic Lightening Effect on Right Column */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/40 via-white/20 to-transparent z-0 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-y-0 right-0 w-3/5 bg-gradient-to-l from-[#2D7A8C]/50 to-transparent z-0 pointer-events-none" />

            {/* Decorative Accents (Circles) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {/* Large subtle circle top-left */}
                <div className="absolute -left-[10%] -top-[10%] w-[60vh] h-[60vh] rounded-full bg-white/5 mix-blend-overlay" />
                {/* Smaller circle near headline */}
                <div className="absolute left-[5%] top-[15%] w-[40vh] h-[40vh] rounded-full bg-teal-400/10 mix-blend-screen blur-[100px]" />
                {/* Another accent circle lower down */}
                <div className="absolute -left-[5%] top-[40%] w-[50vh] h-[50vh] rounded-full bg-[#0D5F73]/40 blur-3xl mix-blend-multiply" />
            </div>

            {/* Logo - Top Left (Aligned with Content) */}
            <div className="absolute top-6 left-8 lg:top-10 lg:left-32 xl:left-48 z-50">
                <img src="https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/d6d1306d-faaa-4903-087c-83f8d2c0bf00/public" alt="Spinal Decompression" className="h-12 lg:h-16 w-auto" />
            </div>

            <div className="flex flex-col lg:flex-row h-full w-full relative z-20 flex-grow items-center">
                {/* Left Column: Content */}
                <div className="w-full lg:w-1/2 p-8 lg:px-32 xl:px-48 flex flex-col justify-center items-start">
                    <div className="max-w-2xl w-full mx-auto lg:mx-0 pt-24 lg:pt-0">

                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                            Check Your Fit for Non-Surgical Spinal Decompression
                        </h1>

                        <p className="text-sm font-bold tracking-widest text-white/90 uppercase mb-8">
                            1-MINUTE TEST
                        </p>

                        <div className="w-full">
                            <p className="text-xl text-white mb-6 font-medium">
                                Start by selecting your gender
                            </p>

                            <div className="flex gap-4 w-full max-w-md">
                                <button
                                    onClick={() => handleSelect('female')}
                                    className="flex-1 bg-[#0098b0] hover:bg-[#007a8d] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-lg"
                                >
                                    Female
                                </button>
                                <button
                                    onClick={() => handleSelect('male')}
                                    className="flex-1 bg-[#f2674b] hover:bg-[#d14d33] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-lg"
                                >
                                    Male
                                </button>
                            </div>

                            <p className="mt-10 text-xs text-white/60 leading-relaxed max-w-md">
                                By pressing "Female" or "Male" button you confirm you agree to our <span className="underline cursor-pointer hover:text-white transition-colors">Terms & Conditions</span>, <span className="underline cursor-pointer hover:text-white transition-colors">Privacy Policy</span>, <span className="underline cursor-pointer hover:text-white transition-colors">Subscription Terms</span> and <span className="underline cursor-pointer hover:text-white transition-colors">Cookie Policy</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Images */}
                <div className="w-full lg:w-1/2 relative hidden lg:flex items-center justify-center p-12 lg:pr-24">
                    <div className="flex gap-6 items-center justify-center h-full w-full relative z-30">
                        {/* Female Card */}
                        <div
                            onClick={() => handleSelect('female')}
                            className="relative w-1/2 max-w-[320px] aspect-[3/5] rounded-[2.5rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ring-4 ring-white/10 hover:ring-white/30"
                        >
                            <img
                                src="https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/cc3b2ad8-4a2e-420e-d5d5-1ef3bf24c000/public"
                                alt="Female Illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Male Card */}
                        <div
                            onClick={() => handleSelect('male')}
                            className="relative w-1/2 max-w-[320px] aspect-[3/5] rounded-[2.5rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ring-4 ring-white/10 hover:ring-white/30"
                        >
                            <img
                                src="https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/d8b4c17c-2fbb-421b-3286-f0b458b82a00/public"
                                alt="Male Illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Image Section */}
                <div className="lg:hidden w-full pb-12 px-6">
                    <div className="flex gap-4">
                        <div
                            onClick={() => handleSelect('female')}
                            className="w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform ring-2 ring-white/10"
                        >
                            <img
                                src="https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/cc3b2ad8-4a2e-420e-d5d5-1ef3bf24c000/public"
                                alt="Female"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            onClick={() => handleSelect('male')}
                            className="w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform ring-2 ring-white/10"
                        >
                            <img
                                src="https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/d8b4c17c-2fbb-421b-3286-f0b458b82a00/public"
                                alt="Male"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
