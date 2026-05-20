export type Language = 'english' | 'hindi' | 'tamil' | 'chinese' | 'numbers';

export interface LearningItem {
  id: string;
  value: string;
  label: string;
  imageUrl: string;
  emoji?: string;       // ✅ NEW: emoji for reliable display
  audioText: string;
  translation?: string;
  signLanguageIcon?: string;
  localized?: {
    [key: string]: { label: string; audio: string };
  };
}

export type Level = string;

export interface UserStats {
  score: number;
  unlockedLevels: string[];
  completedItems: string[];
}
