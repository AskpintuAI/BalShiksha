import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function speak(text: string, langCode: string = 'en-US') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map internal language names to BCP 47 codes
    const langMap: Record<string, string> = {
      'english': 'en-US',
      'hindi': 'hi-IN',
      'tamil': 'ta-IN',
      'chinese': 'zh-CN',
      'numbers': 'en-US' // Default numbers to English if not specified
    };

    utterance.lang = langMap[langCode] || langCode;
    utterance.rate = 0.9;
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  }
}
