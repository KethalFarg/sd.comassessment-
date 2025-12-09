
export interface QuizAnswers {
  gender?: 'male' | 'female';
  age_range?: string;
  zip_code?: string;
  pain_regions?: string[];
  primary_region?: string;
  pain_duration?: string;
  avg_pain_level?: number;
  worst_pain_level?: number;
  radiating_pain?: boolean;
  radiating_areas?: string[];
  movement_triggers?: string[];
  triggers?: string[];
  surgery_check?: boolean;
  surgery_type?: string;
  diagnoses?: string[];
  treatments_tried?: string[];
  relief_level?: string;
  treatment_effect?: string;
  sleep_disruption?: boolean;
  mood_impact?: string[];
  meds_current?: boolean;
  upcoming_event?: boolean;
  upcoming_event_details?: string;
  activity_goal?: string;
  activity_goal_other?: string;
  time_availability?: string;
  biggest_concern?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export type QuestionType =
  | 'picture-tiles'
  | 'text-input'
  | 'tile-grid'
  | 'full-buttons'
  | 'yes-no'
  | 'pain-slider'
  | 'image-buttons'
  | 'icon-buttons'
  | 'info-slide'
  | 'loading'
  | 'form'
  | 'pain-profile'
  | 'final-report'
  | 'body-map'
  | 'split-image-options'
  | 'medical-exit'
  | 'phone-capture'; // New

export interface QuestionOption {
  value: string | boolean | number;
  label: string;
  icon?: any;
  image?: string;
  subtext?: string;
  inputType?: 'text';
}

export interface QuestionConfig {
  id: string;
  section?: string;
  type: QuestionType;
  theme?: 'light' | 'dark';
  question?: string;
  subtext?: string;
  options?: QuestionOption[];
  multiSelect?: boolean;
  maxSelections?: number;
  autoAdvance?: boolean;
  validation?: (value: any) => boolean;
  next?: string | ((answers: QuizAnswers) => string);
  componentProps?: any;
}

export interface QuizState {
  currentStepId: string;
  history: string[];
  answers: QuizAnswers;
  isSoftExit: boolean;
  completed: boolean;
}
