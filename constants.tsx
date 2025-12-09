
import { QuestionConfig } from './types';
import {
    User, Activity, Zap, Pill, MoreHorizontal,
    Check, X, AlertCircle, Moon, Users,
    Briefcase, Car, Armchair,
    Move, Clock, DollarSign, Shield, ThumbsUp, Frown, HelpCircle
} from 'lucide-react';

// Sections for the Header Progress Bar
export const PROGRESS_SECTIONS = [
    { id: 'profile', label: 'Profile' },
    { id: 'spine', label: 'Spine' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'plan', label: 'Plan' }
];

export const QUIZ_CONFIG: QuestionConfig[] = [
    // ============================================
    // SECTION 1: PROFILE
    // ============================================

    // Q1: Gender (also serves as start screen)
    {
        id: 'gender',
        section: 'profile',
        theme: 'light',
        type: 'gender-landing',
        question: "Check Your Fit for Non-Surgical Spinal Decompression",
        subtext: "We'll compare your situation with clinical patterns commonly seen in patients who improve. Personalized insights in under 90 seconds.",
        autoAdvance: true,
        options: [
            { value: 'male', label: 'Male', image: 'https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/d8b4c17c-2fbb-421b-3286-f0b458b82a00/public' },
            { value: 'female', label: 'Female', image: 'https://imagedelivery.net/ye6TBwd9tSy8dGYL2VHjgg/cc3b2ad8-4a2e-420e-d5d5-1ef3bf24c000/public' },
        ],
        next: 'age'
    },

    // Q2: Age Range
    {
        id: 'age',
        section: 'profile',
        theme: 'dark',
        type: 'picture-tiles',
        question: "What's your age range?",
        autoAdvance: true,
        componentProps: {
            conditionalImages: {
                male: {
                    '18-34': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400',
                    '35-49': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
                    '50-64': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
                    '65+': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400'
                },
                female: {
                    '18-34': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400',
                    '35-49': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
                    '50-64': 'https://images.unsplash.com/photo-1566616213836-2a65d3a20959?auto=format&fit=crop&q=80&w=400&h=400', // Senior woman (actually 65+ usually but works)
                    '65+': 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400&h=400' // Generic senior (hands/neutral) or finding better
                }
            }
        },
        options: [
            { value: '18-34', label: '18–34', image: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&q=80&w=400&h=400' },
            { value: '35-49', label: '35–49', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400' },
            { value: '50-64', label: '50–64', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400' },
            { value: '65+', label: '65+', image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400&h=400' },
        ],
        next: 'pain-regions'
    },

    // Q3: Pain Regions (multi-select body map)
    {
        id: 'pain-regions',
        section: 'profile',
        theme: 'dark',
        type: 'tile-grid',
        question: "Tap all areas that hurt right now.",
        multiSelect: true,
        options: [
            { value: 'Neck', label: 'Neck', icon: Activity },
            { value: 'Low-back', label: 'Low-back', icon: Activity },
            { value: 'Buttock', label: 'Buttock', icon: Activity },
            { value: 'Leg(s)', label: 'Leg(s)', icon: Activity },
        ],
        next: (answers) => {
            const regions = answers['pain-regions'] || [];
            return regions.length >= 2 ? 'primary-region' : 'radiating-pain';
        }
    },

    // Q4: Primary Region (conditional - only if 2+ regions selected)
    {
        id: 'primary-region',
        section: 'profile',
        theme: 'dark',
        type: 'full-buttons',
        question: "Which area bothers you the most?",
        autoAdvance: true,
        options: [], // Will be populated dynamically from Q3 selections
        componentProps: { dynamicFromPrevious: 'pain-regions' }, // Fixed key
        next: 'radiating-pain'
    },

    // Q5: Radiating Pain (conditional prompts based on primary region)
    {
        id: 'radiating-pain',
        section: 'profile',
        theme: 'dark',
        type: 'yes-no',
        question: "", // Left empty to be handled by conditional logic in component
        subtext: "",
        componentProps: {
            conditionalQuestion: true,
            questions: {
                'Neck': "Does pain or tingling travel into your arm or hand?",
                'default': "Does pain ever travel into your buttock, leg, or foot, or feel sharp, electric, or shooting?"
            }
        },
        options: [
            { value: true, label: 'Yes', icon: Zap },
            { value: false, label: 'No', icon: X }
        ],
        next: 'info-social-proof'
    },

    // INFO SLIDE A
    {
        id: 'info-social-proof',
        theme: 'dark',
        type: 'info-slide',
        question: "You're not the only one dealing with this.",
        subtext: "Millions of people struggle with chronic back, neck, or nerve-related leg pain. Many explore non-surgical spinal decompression to reduce mechanical stress on irritated nerves and discs.\n\nNext, we'll map your pain pattern to see if it looks like the cases that often respond best.",
        componentProps: {
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&h=450"
        },
        next: 'avg-pain'
    },

    // ============================================
    // SECTION 2: SPINE
    // ============================================

    // Q6: Average Pain Level
    {
        id: 'avg-pain',
        section: 'spine',
        theme: 'dark',
        type: 'pain-slider',
        question: "On an average day, how bad is your pain?",
        subtext: "0 = No pain, 10 = Worst imaginable",
        next: 'worst-pain'
    },

    // Q7: Worst Pain Level
    {
        id: 'worst-pain',
        section: 'spine',
        theme: 'dark',
        type: 'pain-slider',
        question: "At its worst, how bad does it get?",
        subtext: "0 = No pain, 10 = Worst imaginable",
        next: 'movement-triggers'
    },

    // Q8: Movement Triggers
    {
        id: 'movement-triggers',
        section: 'spine',
        theme: 'dark',
        type: 'tile-grid',
        question: "Which movements flare your pain the fastest?",
        subtext: "Pick up to 3",
        multiSelect: true,
        maxSelections: 3,
        options: [
            { value: 'Sitting', label: 'Sitting', icon: Armchair },
            { value: 'Standing', label: 'Standing', icon: Activity },
            { value: 'Walking', label: 'Walking', icon: Activity },
            { value: 'Bending / lifting', label: 'Bending / lifting', icon: Move },
            { value: 'Driving', label: 'Driving', icon: Car },
            { value: 'Coughing / sneezing', label: 'Coughing / sneezing', icon: AlertCircle },
        ],
        next: 'duration'
    },

    // Q9: Duration
    {
        id: 'duration',
        section: 'spine',
        theme: 'dark',
        type: 'full-buttons',
        question: "How long has this been going on?",
        autoAdvance: true,
        options: [
            { value: 'Less than 3 months', label: 'Less than 3 months' },
            { value: '3–12 months', label: '3–12 months' },
            { value: '1–3 years', label: '1–3 years' },
            { value: 'More than 3 years', label: 'More than 3 years' },
        ],
        next: 'prior-surgery'
    },

    // Q10: Prior Spine Surgery
    {
        id: 'prior-surgery',
        section: 'spine',
        theme: 'dark',
        type: 'full-buttons',
        question: "Have you had spine surgery in the area that bothers you most?",
        autoAdvance: true,
        options: [
            { value: 'None', label: 'None' },
            { value: 'Microdiscectomy / laminectomy', label: 'Microdiscectomy / laminectomy' },
            { value: 'Disc replacement', label: 'Disc replacement' },
            { value: 'Fusion / rods / screws', label: 'Fusion / rods / screws' },
            { value: 'Other', label: 'Other' },
        ],
        next: (answers) => answers['prior-surgery'] === 'Fusion / rods / screws' ? 'medical-exit' : 'diagnosis'
    },

    // Q11: Doctor Diagnosis
    {
        id: 'diagnosis',
        section: 'spine',
        theme: 'dark',
        type: 'tile-grid',
        question: "Have doctors used any of these terms for your condition?",
        multiSelect: true,
        options: [
            { value: 'Herniated disc', label: 'Herniated disc', icon: Activity },
            { value: 'Bulging disc', label: 'Bulging disc', icon: Activity },
            { value: 'Degenerative disc disease', label: 'Degenerative disc disease', icon: Clock },
            { value: 'Sciatica', label: 'Sciatica', icon: Zap },
            { value: 'Spinal stenosis', label: 'Spinal stenosis', icon: Activity },
            { value: 'Not sure / Other / None', label: 'Not sure / Other / None', icon: HelpCircle },
        ],
        next: 'treatments-tried'
    },

    // Q12: Treatments Tried
    {
        id: 'treatments-tried',
        section: 'spine',
        theme: 'dark',
        type: 'tile-grid',
        question: "What have you already tried for this?",
        multiSelect: true,
        options: [
            { value: 'Physical therapy', label: 'Physical therapy', icon: Activity },
            { value: 'Chiropractic', label: 'Chiropractic', icon: Zap },
            { value: 'Injections', label: 'Injections', icon: Pill },
            { value: 'Pain medication', label: 'Pain medication', icon: Pill },
            { value: 'Other conservative care', label: 'Other conservative care', icon: MoreHorizontal },
        ],
        next: (answers) => {
            const treatments = answers['treatments-tried'] || [];
            return treatments.length > 0 ? 'relief-level' : 'zip-check';
        }
    },

    // Q13: Relief Level (conditional)
    {
        id: 'relief-level',
        section: 'spine',
        theme: 'dark',
        type: 'full-buttons',
        question: "How well did those treatments work?",
        autoAdvance: true,
        options: [
            { value: 'A little relief', label: 'A little relief' },
            { value: 'Relief, but temporary', label: 'Relief, but temporary' },
            { value: 'Works only if I keep doing it', label: 'Works only if I keep doing it' },
            { value: 'No real relief', label: 'No real relief' },
        ],
        next: 'zip-check'
    },

    // Q14: ZIP Code (mid-quiz placement)
    {
        id: 'zip-check',
        section: 'spine',
        theme: 'dark',
        type: 'text-input',
        question: "What is your ZIP/postal code?",
        subtext: "Let's confirm if a provider is near you.",
        validation: (val) => /^\d{5}$/.test(val),
        componentProps: { placeholder: "Enter ZIP Code" },
        next: 'info-nerve'
    },

    // INFO SLIDE B
    {
        id: 'info-nerve',
        theme: 'dark',
        type: 'info-slide',
        question: "Pain that travels is a mechanical clue.",
        subtext: "When pain or tingling travels into the arm or leg, it often points to pressure on a nerve from a spinal disc.\n\nThis assessment is checking how closely your pattern matches the type of disc-related, nerve-related pain that non-surgical decompression is designed to address.",
        componentProps: {
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800&h=450"
        },
        next: 'sleep-disruption'
    },

    // ============================================
    // SECTION 3: LIFESTYLE
    // ============================================

    // Q15: Sleep Disruption
    {
        id: 'sleep-disruption',
        section: 'lifestyle',
        theme: 'dark',
        type: 'yes-no',
        question: "Does your pain ever wake you up or keep you from sleeping?",
        options: [
            { value: true, label: 'Yes', icon: Moon },
            { value: false, label: 'No', icon: X }
        ],
        next: 'mood-impact'
    },

    // Q16: Mood Impact
    {
        id: 'mood-impact',
        section: 'lifestyle',
        theme: 'dark',
        type: 'tile-grid',
        question: "How has this pain been affecting your mood lately?",
        subtext: "Pick up to 2",
        multiSelect: true,
        maxSelections: 2,
        options: [
            { value: 'Frustrated / irritable', label: 'Frustrated / irritable', icon: Frown },
            { value: 'Anxious / worried', label: 'Anxious / worried', icon: AlertCircle },
            { value: 'Depressed / hopeless', label: 'Depressed / hopeless', icon: Frown },
            { value: 'Tired / drained', label: 'Tired / drained', icon: Clock },
            { value: "I'm handling it okay", label: "I'm handling it okay", icon: ThumbsUp },
        ],
        next: 'meds-current'
    },

    // Q17: Medication Use
    {
        id: 'meds-current',
        section: 'lifestyle',
        theme: 'dark',
        type: 'yes-no',
        question: "Are you currently taking pain medication for this?",
        options: [
            { value: true, label: 'Yes', icon: Pill },
            { value: false, label: 'No', icon: X }
        ],
        next: 'info-disc-rehab'
    },

    // INFO SLIDE C
    {
        id: 'info-disc-rehab',
        theme: 'dark',
        type: 'info-slide',
        question: "Treating the disc itself can change everything.",
        subtext: "Most treatments focus on muscles, joints, or temporarily reducing pain. If a disc is irritating a nerve, a mechanical approach that supports the disc itself may be needed.\n\nTrue spinal decompression uses precise pull-and-release cycles that adapt to your body in real time, helping to safely reduce disc pressure and support disc rehabilitation.",
        componentProps: {
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800&h=450"
        },
        next: 'upcoming-event'
    },

    // ============================================
    // SECTION 4: PLAN
    // ============================================

    // Q18: Upcoming Event
    {
        id: 'upcoming-event',
        section: 'plan',
        theme: 'dark',
        type: 'full-buttons',
        question: "Do you have an important event in the next 6–12 weeks where you'd love to feel better?",
        options: [
            { value: 'yes', label: 'Yes', inputType: 'text' },
            { value: 'no', label: 'No' },
        ],
        componentProps: {
            conditionalInput: true,
            inputPlaceholder: "What's the event?"
        },
        next: 'activity-goal'
    },

    // Q19: Activity Goal
    {
        id: 'activity-goal',
        section: 'plan',
        theme: 'dark',
        type: 'full-buttons',
        question: "What's the first thing you'd like to get back to?",
        autoAdvance: true,
        options: [
            { value: 'Working pain-free', label: 'Working pain-free' },
            { value: 'Playing with kids', label: 'Playing with kids' },
            { value: 'Sleeping through the night', label: 'Sleeping through the night' },
            { value: 'Exercising', label: 'Exercising' },
            { value: 'Traveling', label: 'Traveling' },
            { value: 'other', label: 'Other', inputType: 'text' },
        ],
        componentProps: {
            conditionalInput: true,
            inputPlaceholder: "What would you like to do?"
        },
        next: 'time-availability'
    },

    // Q20: Time Availability
    {
        id: 'time-availability',
        section: 'plan',
        theme: 'dark',
        type: 'full-buttons',
        question: "If this could actually help long-term, could you free up 2–3 brief visits per week?",
        autoAdvance: true,
        options: [
            { value: 'Yes', label: 'Yes' },
            { value: 'Probably', label: 'Probably' },
            { value: 'Not sure', label: 'Not sure' },
            { value: 'No', label: 'No' },
        ],
        next: 'biggest-concern'
    },

    // Q21: Biggest Concern (with inline micro-copy)
    {
        id: 'biggest-concern',
        section: 'plan',
        theme: 'dark',
        type: 'full-buttons',
        question: "What's your biggest concern about spinal decompression therapy?",
        options: [
            { value: 'Cost', label: 'Cost' },
            { value: 'Safety', label: 'Safety' },
            { value: 'Effectiveness', label: 'Effectiveness' },
            { value: 'Time', label: 'Time' },
        ],
        componentProps: {
            inlineMicroCopy: {
                'Cost': "Many patients spend less than they expect — and some avoid larger medical bills down the road.",
                'Safety': "Non-surgical and non-invasive. No incisions. Modern systems are computer-guided and designed to be gentle.",
                'Effectiveness': "Decompression is often considered for disc and nerve-related pain — especially when other conservative care hasn't helped enough.",
                'Time': "Sessions are brief. Most people stay active at work during their program — no 'recovery days' like surgery."
            },
            autoAdvanceDelay: 3000
        },
        next: 'name-email-capture'
    },

    // ============================================
    // LEAD CAPTURE & RESULTS FLOW
    // ============================================

    // Name + Email Capture
    {
        id: 'name-email-capture',
        theme: 'dark',
        type: 'form',
        componentProps: { formType: 'name-email' },
        next: 'mcclure-loading'
    },

    // McClure Loading Screen
    {
        id: 'mcclure-loading',
        theme: 'dark',
        type: 'loading',
        componentProps: { variant: 'mcclure' },
        next: 'pain-profile'
    },

    // Pain Profile
    {
        id: 'pain-profile',
        theme: 'dark',
        type: 'pain-profile',
        next: 'phone-capture'
    },

    // Phone + ZIP Capture (with loading)
    {
        id: 'phone-capture',
        theme: 'dark',
        type: 'phone-capture',
        next: 'final-report'
    },

    // Final Report
    {
        id: 'final-report',
        theme: 'light',
        type: 'final-report',
        next: 'done'
    },

    // Medical Exit (for fusion patients)
    {
        id: 'medical-exit',
        theme: 'dark',
        type: 'medical-exit',
        next: 'done'
    }
];
