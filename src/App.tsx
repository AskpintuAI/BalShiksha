/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  Home, 
  Gamepad2, 
  Accessibility, 
  Ear,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn, speak } from '@/src/lib/utils';
import { BASIC_NUMBERS, LANGUAGES, ENGLISH_CONTENT, HINDI_CONTENT, TAMIL_CONTENT, CHINESE_CONTENT } from '@/src/data/mockContent';
import { LearningItem, Language, Level } from '@/src/types';

const QUIZ_TOTAL = 5; // Quiz mein 5 sawaal aayenge

export default function App() {
  const [currentLang, setCurrentLang]   = useState<Language | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);

  // Dynamic levels mapping
  const getLevelsForLang = (lang: Language | null) => {
    if (!lang) return [];
    let content: Record<string, LearningItem[]> | null = null;
    if (lang === 'hindi')   content = HINDI_CONTENT;
    else if (lang === 'english') content = ENGLISH_CONTENT;
    else if (lang === 'tamil')   content = TAMIL_CONTENT;
    else if (lang === 'chinese') content = CHINESE_CONTENT;
    if (!content) return [];
    return Object.keys(content).map((key, idx) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/-(\d+)/, ' Step $1'),
    }));
  };

  const levels = getLevelsForLang(currentLang);
  const [items, setItems]             = useState<LearningItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ NEW: proper quiz state
  const [showQuiz, setShowQuiz]         = useState(false);
  const [quizItems, setQuizItems]       = useState<LearningItem[]>([]);  // 5 random items for quiz
  const [quizQIndex, setQuizQIndex]     = useState(0);                   // which question we're on
  const [quizOptions, setQuizOptions]   = useState<LearningItem[]>([]);  // 4 options
  const [quizScore, setQuizScore]       = useState(0);
  const [quizDone, setQuizDone]         = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [answerLocked, setAnswerLocked] = useState(false); // prevent double-click

  const [accessibilityMode, setAccessibilityMode] = useState<'none' | 'audio'>('none');
  const [highContrast, setHighContrast] = useState(false);
  const [numberVoiceLang, setNumberVoiceLang] = useState<Language>('english');

  const currentItem = items[currentIndex];

  // Helper to get localized text for numbers
  const getLocalizedNumText = (item: LearningItem | undefined) => {
    if (!item) return { label: '', audio: '' };
    if (currentLang === 'numbers' && item.localized?.[numberVoiceLang]) {
      return item.localized[numberVoiceLang];
    }
    return { label: item.label, audio: item.audioText };
  };

  const currentDisplay = getLocalizedNumText(currentItem);

  // ✅ When quiz starts: pick 5 random unique items from the level
  useEffect(() => {
    if (showQuiz && items.length > 0) {
      const shuffled = [...items].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, Math.min(QUIZ_TOTAL, items.length));
      setQuizItems(picked);
      setQuizQIndex(0);
      setQuizScore(0);
      setQuizDone(false);
      setLastAnswerCorrect(null);
      setAnswerLocked(false);
    }
  }, [showQuiz, items]);

  // ✅ Generate 4 answer options for current quiz question
  useEffect(() => {
    if (!showQuiz || quizDone) return;
    const correctItem = quizItems[quizQIndex];
    if (!correctItem || items.length < 2) return;

    const others = items.filter(i => i.id !== correctItem.id);
    const wrong = [...others].sort(() => Math.random() - 0.5).slice(0, Math.min(3, others.length));
    // Fill up to 4 if not enough items
    while (wrong.length < 3 && wrong.length < items.length - 1) {
      const extra = items.find(i => i.id !== correctItem.id && !wrong.includes(i));
      if (extra) wrong.push(extra); else break;
    }
    const opts = [...wrong, correctItem].sort(() => Math.random() - 0.5);
    setQuizOptions(opts);
    setLastAnswerCorrect(null);
    setAnswerLocked(false);

    // Speak the question
    setTimeout(() => {
      const langToSpeak = currentLang === 'numbers' ? numberVoiceLang : currentLang!;
      speak(correctItem.audioText, langToSpeak);
    }, 400);
  }, [quizQIndex, quizItems, showQuiz, quizDone]);

  // Load content when language or level changes
  useEffect(() => {
    if (currentLang === 'numbers') {
      const dynamicNumbers: LearningItem[] = Array.from({ length: 90 }).map((_, i) => ({
        id: `dyn-n-${i + 11}`,
        value: (i + 11).toString(),
        emoji: '⭐',
        label: `${i + 11} Stars`,
        imageUrl: '',
        audioText: (i + 11).toString(),
      }));
      setItems([...BASIC_NUMBERS, ...dynamicNumbers]);
      setCurrentLevel('vowels');
    } else if (currentLang && currentLevel) {
      let content: Record<string, LearningItem[]> | null = null;
      if (currentLang === 'hindi')   content = HINDI_CONTENT;
      else if (currentLang === 'english') content = ENGLISH_CONTENT;
      else if (currentLang === 'tamil')   content = TAMIL_CONTENT;
      else if (currentLang === 'chinese') content = CHINESE_CONTENT;
      setItems(content?.[currentLevel] || []);
    } else {
      setItems([]);
    }
    setCurrentIndex(0);
    setShowQuiz(false);
  }, [currentLang, currentLevel]);

  const handleNext = () => {
    if (currentLang === 'numbers' && (currentIndex + 1) % 10 === 0 && !showQuiz) {
      setShowQuiz(true);
      return;
    }
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const next = items[currentIndex + 1];
      const lang = currentLang === 'numbers' ? numberVoiceLang : currentLang!;
      speak(getLocalizedNumText(next).audio, lang);
    } else {
      setShowQuiz(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prev = items[currentIndex - 1];
      const lang = currentLang === 'numbers' ? numberVoiceLang : currentLang!;
      speak(getLocalizedNumText(prev).audio, lang);
    } else {
      currentLang === 'numbers' ? setCurrentLang(null) : setCurrentLevel(null);
    }
  };

  const resetGame = () => {
    setCurrentLang(null);
    setCurrentLevel(null);
    setShowQuiz(false);
    setCurrentIndex(0);
    setQuizScore(0);
    setQuizDone(false);
  };

  // ✅ Quiz answer handler – shows 5 different questions
  const handleQuizAnswer = (selectedItem: LearningItem) => {
    if (answerLocked) return;
    setAnswerLocked(true);

    const correct = selectedItem.id === quizItems[quizQIndex]?.id;
    setLastAnswerCorrect(correct);

    if (correct) {
      setQuizScore(s => s + 1);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#FFD700', '#FFA500', '#00FF00', '#FF69B4'] });
      speak('Excellent!', 'en-US');
    } else {
      speak("Not quite! Try the next one!", 'en-US');
    }

    setTimeout(() => {
      if (quizQIndex < quizItems.length - 1) {
        setQuizQIndex(qi => qi + 1);
      } else {
        setQuizDone(true);
        const total = quizItems.length;
        const sc = quizScore + (correct ? 1 : 0);
        if (sc >= total - 1) {
          speak(`Amazing! You got ${sc} out of ${total}! Great job!`, 'en-US');
          confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
        } else {
          speak(`You got ${sc} out of ${total}. Keep practicing!`, 'en-US');
        }
      }
    }, 1200);
  };

  // Emoji display helper
  const getEmoji = (item: LearningItem | undefined) => item?.emoji || '❓';

  const currentQuizItem = quizItems[quizQIndex];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-sans p-4 md:p-8 flex flex-col",
      highContrast ? "bg-black text-white" : "bg-[#FFF9F0] text-slate-800"
    )}>
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex justify-between items-center mb-8">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={resetGame}
          className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3 text-orange-500 cursor-pointer"
        >
          <div className="bg-orange-100 p-2 rounded-2xl">🎓</div>
          BalShiksha
        </motion.h1>

        <div className="flex gap-2 items-center">
          {currentLang === 'numbers' && (
            <div className="flex bg-white rounded-2xl p-1 shadow-sm border overflow-hidden">
              {(['english', 'hindi', 'tamil', 'chinese'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setNumberVoiceLang(l); speak(currentItem?.audioText || '1', l); }}
                  className={cn(
                    "px-2 py-1 rounded-xl text-[10px] font-bold transition-all",
                    numberVoiceLang === l ? "bg-orange-500 text-white" : "text-slate-400"
                  )}
                >
                  {l.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setHighContrast(!highContrast)} className="p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow" title="High Contrast">
            <Accessibility className={cn("w-6 h-6", highContrast ? "text-orange-500" : "text-slate-400")} />
          </button>
          <button onClick={() => setAccessibilityMode(accessibilityMode === 'audio' ? 'none' : 'audio')} className="p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow" title="Audio Assist">
            <Ear className={cn("w-6 h-6", accessibilityMode === 'audio' ? "text-orange-500" : "text-slate-400")} />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">

          {/* ── Language Selector ── */}
          {!currentLang ? (
            <motion.div key="lang-selector"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full"
            >
              {LANGUAGES.map((lang) => (
                <motion.button key={lang.id}
                  whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { setCurrentLang(lang.id as Language); speak(`Let's learn ${lang.name}!`, 'en-US'); }}
                  className={cn("relative aspect-square rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-white font-bold text-xl shadow-xl overflow-hidden group", lang.color)}
                >
                  <div className="text-6xl group-hover:scale-125 transition-transform">{lang.icon}</div>
                  <div className="z-10">{lang.name}</div>
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-9xl -mr-8 -mt-8 rotate-12">{lang.icon}</div>
                </motion.button>
              ))}
            </motion.div>

          /* ── Level Selector ── */
          ) : (currentLang !== 'numbers' && !currentLevel) ? (
            <motion.div key="level-selector"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            >
              <div className="col-span-full mb-4">
                <button onClick={() => setCurrentLang(null)} className="flex items-center gap-2 font-bold text-slate-400 hover:text-slate-600">
                  <ChevronLeft className="w-5 h-5" /> Change Language
                </button>
                <h2 className="text-4xl font-black mt-4 text-slate-800">Choose your step!</h2>
              </div>
              {levels.map((step, idx) => (
                <motion.button key={step.id} whileHover={{ x: 10 }}
                  onClick={() => { setCurrentLevel(step.id); speak(`Going to ${step.name}`, 'en-US'); }}
                  className="p-8 rounded-3xl text-left border-4 border-transparent hover:border-orange-200 bg-white shadow-xl flex items-center justify-between group"
                >
                  <div>
                    <div className="text-orange-500 font-black mb-1">STEP {idx + 1}</div>
                    <div className="text-2xl font-bold text-slate-700">{step.name}</div>
                  </div>
                  <ChevronRight className="w-8 h-8 text-orange-200 group-hover:text-orange-500 transition-colors" />
                </motion.button>
              ))}
            </motion.div>

          /* ── Quiz Screen ── */
          ) : showQuiz ? (
            <motion.div key="quiz"
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="w-full bg-white rounded-[40px] p-6 md:p-8 shadow-2xl flex flex-col items-center gap-6 border-8 border-orange-100"
            >
              {/* Quiz Header */}
              <div className="w-full flex justify-between items-center">
                <button onClick={resetGame} className="flex items-center gap-2 font-bold text-slate-400 hover:text-slate-600">
                  <Home className="w-5 h-5" /> Home
                </button>
                <div className="bg-yellow-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-yellow-700">Score: {quizScore} / {quizItems.length}</span>
                </div>
              </div>

              {/* ── Quiz Done Screen ── */}
              {quizDone ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-6 py-8"
                >
                  <div className="text-8xl">
                    {quizScore >= quizItems.length - 1 ? '🏆' : quizScore >= Math.ceil(quizItems.length / 2) ? '🌟' : '💪'}
                  </div>
                  <h2 className="text-4xl font-black text-center">
                    {quizScore >= quizItems.length - 1 ? 'Outstanding!' : quizScore >= Math.ceil(quizItems.length / 2) ? 'Well Done!' : 'Keep Practicing!'}
                  </h2>
                  <div className="text-2xl font-bold text-slate-600">
                    {quizScore} out of {quizItems.length} correct!
                  </div>
                  {/* Score dots */}
                  <div className="flex gap-3">
                    {quizItems.map((_, i) => (
                      <div key={i} className={cn("w-4 h-4 rounded-full", i < quizScore ? "bg-green-400" : "bg-red-200")} />
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => { setShowQuiz(false); setCurrentIndex(0); }}
                      className="px-6 py-4 bg-orange-500 text-white rounded-2xl font-black flex items-center gap-2 hover:bg-orange-600"
                    >
                      <RefreshCw className="w-5 h-5" /> Review Again
                    </button>
                    <button onClick={resetGame}
                      className="px-6 py-4 bg-slate-200 text-slate-700 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-300"
                    >
                      <Home className="w-5 h-5" /> Home
                    </button>
                  </div>
                </motion.div>

              ) : (
                /* ── Active Quiz Question ── */
                <>
                  {/* Progress bar */}
                  <div className="w-full bg-orange-100 rounded-full h-3">
                    <div className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((quizQIndex) / quizItems.length) * 100}%` }} />
                  </div>
                  <p className="text-sm text-slate-400 font-bold">Question {quizQIndex + 1} of {quizItems.length}</p>

                  {/* Question prompt */}
                  <div className="text-center flex flex-col items-center gap-3">
                    <h2 className="text-2xl font-black">
                      Which picture matches this sound?
                    </h2>
                    {/* Show the letter + play button */}
                    <div className="flex items-center gap-4 bg-orange-50 px-8 py-4 rounded-2xl">
                      <span className={cn(
                        "font-black text-orange-500",
                        (currentQuizItem?.value?.length || 0) > 2 ? "text-5xl" : "text-7xl"
                      )}>
                        {currentQuizItem?.value}
                      </span>
                      <button
                        onClick={() => speak(currentQuizItem?.audioText || '', currentLang === 'numbers' ? numberVoiceLang : currentLang!)}
                        className="p-3 bg-orange-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Answer feedback */}
                  {lastAnswerCorrect !== null && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className={cn("flex items-center gap-2 font-bold text-lg px-6 py-2 rounded-full",
                        lastAnswerCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}
                    >
                      {lastAnswerCorrect
                        ? <><CheckCircle className="w-5 h-5" /> Excellent! 🎉</>
                        : <><XCircle className="w-5 h-5" /> The answer was: {getEmoji(currentQuizItem)} {currentQuizItem?.label}</>
                      }
                    </motion.div>
                  )}

                  {/* ✅ 4 options as EMOJI cards */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {quizOptions.map((item) => (
                      <motion.button key={item.id}
                        whileHover={!answerLocked ? { scale: 1.03 } : {}}
                        whileTap={!answerLocked ? { scale: 0.97 } : {}}
                        onClick={() => handleQuizAnswer(item)}
                        disabled={answerLocked}
                        className={cn(
                          "aspect-square bg-slate-50 rounded-3xl p-4 flex flex-col items-center justify-center gap-3 border-4 transition-all",
                          answerLocked
                            ? item.id === currentQuizItem?.id
                              ? "border-green-400 bg-green-50"
                              : lastAnswerCorrect === false && item.id === quizOptions.find(o => o.id !== currentQuizItem?.id && answerLocked)?.id
                                ? "border-red-200 bg-red-50 opacity-50"
                                : "border-slate-100 opacity-50"
                            : "border-transparent hover:border-orange-300 hover:bg-orange-50 cursor-pointer"
                        )}
                      >
                        {/* Show emoji as the picture */}
                        <span className="text-7xl leading-none select-none">
                          {getEmoji(item)}
                        </span>
                        <span className="font-bold text-base text-slate-700 text-center">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

          /* ── Learning Card ── */
          ) : (
            <motion.div key="learning"
              initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
              className="w-full flex flex-col items-center gap-8"
            >
              {/* Main Card */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => speak(currentDisplay.audio, currentLang === 'numbers' ? numberVoiceLang : currentLang!)}
                className={cn(
                  "relative w-full bg-white rounded-[50px] shadow-2xl border-8 flex overflow-hidden cursor-pointer active:shadow-inner transition-all group",
                  "aspect-video md:aspect-[16/9]",
                  highContrast ? "border-white bg-black" : "border-white hover:border-orange-200"
                )}
              >
                {/* Left: Letter */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-orange-50 border-r-4 border-dashed border-orange-100 group-hover:from-orange-50 transition-colors">
                  <motion.div
                    key={`val-${currentItem?.id}`}
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={cn(
                      "font-black leading-none text-orange-500 drop-shadow-lg select-none",
                      (currentItem?.value?.length || 0) > 2 ? "text-[6rem] md:text-[9rem]" : "text-[10rem] md:text-[14rem]"
                    )}
                  >
                    {currentItem?.value}
                  </motion.div>
                </div>

                {/* ✅ Right: EMOJI (replaces broken images) */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
                  {currentLang === 'numbers' ? (
                    // Numbers: show repeated emoji
                    <div className="w-full h-full flex flex-wrap items-center justify-center gap-1 content-center overflow-hidden">
                      {Array.from({ length: Math.min(parseInt(currentItem?.value || '1'), 20) }).map((_, i) => (
                        <motion.span
                          key={`e-${currentItem?.id}-${i}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className={cn(
                            "select-none leading-none",
                            parseInt(currentItem?.value || '1') > 9 ? "text-3xl" : "text-5xl"
                          )}
                        >
                          {getEmoji(currentItem)}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    // Alphabet: show big single emoji
                    <motion.span
                      key={`e-${currentItem?.id}`}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-[8rem] md:text-[10rem] leading-none select-none group-hover:scale-110 transition-transform mb-2"
                    >
                      {getEmoji(currentItem)}
                    </motion.span>
                  )}

                  {/* Label text */}
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={cn(
                      "font-bold tracking-tight text-center",
                      currentLang === 'numbers' ? "text-3xl font-black text-orange-500 mt-2" : "text-3xl text-slate-700 mt-2"
                    )}
                  >
                    {parseInt(currentItem?.value || '0') > 20 && currentLang === 'numbers'
                      ? `Count: ${currentItem?.value}`
                      : currentDisplay.label}
                  </motion.div>
                </div>

                {/* Speaker icon */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white p-5 rounded-full shadow-lg group-hover:scale-125 transition-all">
                  <Volume2 className="w-8 h-8" />
                </div>
              </motion.button>

              {/* Navigation */}
              <div className="flex gap-4 items-center w-full max-w-lg">
                <button onClick={handleBack}
                  className="flex-1 bg-slate-200 text-slate-600 py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-2 hover:bg-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-7 h-7" />
                  {currentIndex === 0 ? "EXIT" : "BACK"}
                </button>
                <div className="w-20 text-center font-black text-xl text-slate-400">
                  {currentIndex + 1}/{items.length}
                </div>
                <button onClick={handleNext}
                  className="flex-[2] bg-green-500 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                >
                  {currentIndex === items.length - 1 ? "QUIZ! 🎯" : "NEXT"}
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-10 flex justify-center gap-8 opacity-40 font-bold uppercase tracking-widest text-xs">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" />
          Progress: {items.length ? Math.round((currentIndex / items.length) * 100) : 0}%
        </div>
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4" /> BalShiksha
        </div>
      </footer>
    </div>
  );
}
