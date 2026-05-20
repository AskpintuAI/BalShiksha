import { LearningItem } from '../types';

export interface LocalizedLabel {
  english: { label: string; audio: string };
  hindi: { label: string; audio: string };
  tamil: { label: string; audio: string };
  chinese: { label: string; audio: string };
}

export interface NumberItem extends LearningItem {
  localized: {
    english: { label: string; audio: string };
    hindi: { label: string; audio: string };
    tamil: { label: string; audio: string };
    chinese: { label: string; audio: string };
    [key: string]: { label: string; audio: string };
  };
}

// ✅ Number emojis - each number has a UNIQUE animal/object emoji
export const BASIC_NUMBERS: NumberItem[] = [
  { id: 'n1',  value: '1',  emoji: '🐄', imageUrl: '', label: '1 Cow',         audioText: 'One. One Cow.',
    localized: { english: { label: '1 Cow', audio: 'One. One Cow.' }, hindi: { label: '१ गाय', audio: 'एक. एक गाय.' }, tamil: { label: '1 பசு', audio: 'ஒன்று. ஒரு பசு.' }, chinese: { label: '1 头牛', audio: '一. 一头牛.' } }},
  { id: 'n2',  value: '2',  emoji: '🐘', imageUrl: '', label: '2 Elephants',   audioText: 'Two. Two Elephants.',
    localized: { english: { label: '2 Elephants', audio: 'Two. Two Elephants.' }, hindi: { label: '२ हाथी', audio: 'दो. दो हाथी.' }, tamil: { label: '2 யானைகள்', audio: 'இரண்டு. இரண்டு யானைகள்.' }, chinese: { label: '2 只大象', audio: '二. 两只大象.' } }},
  { id: 'n3',  value: '3',  emoji: '🐱', imageUrl: '', label: '3 Cats',        audioText: 'Three. Three Cats.',
    localized: { english: { label: '3 Cats', audio: 'Three. Three Cats.' }, hindi: { label: '३ बिल्लियाँ', audio: 'तीन. तीन बिल्लियाँ.' }, tamil: { label: '3 பூனைகள்', audio: 'மூன்று. மூன்று பூனைகள்.' }, chinese: { label: '3 只猫', audio: '三. 三只猫.' } }},
  { id: 'n4',  value: '4',  emoji: '🍎', imageUrl: '', label: '4 Apples',      audioText: 'Four. Four Apples.',
    localized: { english: { label: '4 Apples', audio: 'Four. Four Apples.' }, hindi: { label: '४ सेब', audio: 'चार. चार सेब.' }, tamil: { label: '4 ஆப்பிள்கள்', audio: 'நான்கு. நான்கு ஆப்பிள்கள்.' }, chinese: { label: '4 个苹果', audio: '四. 四个苹果.' } }},
  { id: 'n5',  value: '5',  emoji: '⭐', imageUrl: '', label: '5 Stars',       audioText: 'Five. Five Stars.',
    localized: { english: { label: '5 Stars', audio: 'Five. Five Stars.' }, hindi: { label: '५ तारे', audio: 'पाँच. पाँच तारे.' }, tamil: { label: '5 நட்சத்திரங்கள்', audio: 'ஐந்து. ஐந்து நட்சத்திரங்கள்.' }, chinese: { label: '5 颗星', audio: '五. 五颗星.' } }},
  { id: 'n6',  value: '6',  emoji: '🍌', imageUrl: '', label: '6 Bananas',     audioText: 'Six. Six Bananas.',
    localized: { english: { label: '6 Bananas', audio: 'Six. Six Bananas.' }, hindi: { label: '६ केले', audio: 'छह. छह केले.' }, tamil: { label: '6 வாழைப்பழங்கள்', audio: 'ஆறு. ஆறு வாழைப்பழங்கள்.' }, chinese: { label: '6 根香蕉', audio: '六. 六根香蕉.' } }},
  { id: 'n7',  value: '7',  emoji: '🚗', imageUrl: '', label: '7 Cars',        audioText: 'Seven. Seven Cars.',
    localized: { english: { label: '7 Cars', audio: 'Seven. Seven Cars.' }, hindi: { label: '७ कारें', audio: 'सात. सात कारें.' }, tamil: { label: '7 கார்கள்', audio: 'ஏழு. ஏழு கார்கள்.' }, chinese: { label: '7 辆车', audio: '七. 七辆车.' } }},
  { id: 'n8',  value: '8',  emoji: '🐦', imageUrl: '', label: '8 Birds',       audioText: 'Eight. Eight Birds.',
    localized: { english: { label: '8 Birds', audio: 'Eight. Eight Birds.' }, hindi: { label: '८ पक्षी', audio: 'आठ. आठ पक्षी.' }, tamil: { label: '8 பறவைகள்', audio: 'எட்டு. எட்டு பறவைகள்.' }, chinese: { label: '8 只鸟', audio: '八. 八只鸟.' } }},
  { id: 'n9',  value: '9',  emoji: '🌸', imageUrl: '', label: '9 Flowers',     audioText: 'Nine. Nine Flowers.',
    localized: { english: { label: '9 Flowers', audio: 'Nine. Nine Flowers.' }, hindi: { label: '९ फूल', audio: 'नौ. नौ फूल.' }, tamil: { label: '9 மலர்கள்', audio: 'ஒன்பது. ஒன்பது மலர்கள்.' }, chinese: { label: '9 朵花', audio: '九. 九朵花.' } }},
  { id: 'n10', value: '10', emoji: '🦋', imageUrl: '', label: '10 Butterflies', audioText: 'Ten. Ten Butterflies.',
    localized: { english: { label: '10 Butterflies', audio: 'Ten. Ten Butterflies.' }, hindi: { label: '१० तितलियाँ', audio: 'दस. दस तितलियाँ.' }, tamil: { label: '10 பட்டாம்பூச்சிகள்', audio: 'பத்து. பத்து பட்டாம்பூச்சிகள்.' }, chinese: { label: '10 只蝴蝶', audio: '十. 十只蝴蝶.' } }},
];

// ✅ ENGLISH - Every letter has correct matching emoji
export const ENGLISH_CONTENT: Record<string, LearningItem[]> = {
  vowels: [
    { id: 'ev1', value: 'A', emoji: '🍎', label: 'Apple',   imageUrl: '', audioText: 'A for Apple' },
    { id: 'ev2', value: 'E', emoji: '🥚', label: 'Egg',     imageUrl: '', audioText: 'E for Egg' },
    { id: 'ev3', value: 'I', emoji: '🏔️', label: 'Igloo',   imageUrl: '', audioText: 'I for Igloo' },
    { id: 'ev4', value: 'O', emoji: '🍊', label: 'Orange',  imageUrl: '', audioText: 'O for Orange' },
    { id: 'ev5', value: 'U', emoji: '☂️', label: 'Umbrella', imageUrl: '', audioText: 'U for Umbrella' },
  ],
  'consonants-1': [
    { id: 'ec1',  value: 'B', emoji: '🏀', label: 'Ball',   imageUrl: '', audioText: 'B for Ball' },
    { id: 'ec2',  value: 'C', emoji: '🐱', label: 'Cat',    imageUrl: '', audioText: 'C for Cat' },
    { id: 'ec3',  value: 'D', emoji: '🐕', label: 'Dog',    imageUrl: '', audioText: 'D for Dog' },
    { id: 'ec4',  value: 'F', emoji: '🐟', label: 'Fish',   imageUrl: '', audioText: 'F for Fish' },
    { id: 'ec5',  value: 'G', emoji: '🍇', label: 'Grapes', imageUrl: '', audioText: 'G for Grapes' },
  ],
  'consonants-2': [
    { id: 'ec6',  value: 'H', emoji: '🎩', label: 'Hat',    imageUrl: '', audioText: 'H for Hat' },
    { id: 'ec7',  value: 'J', emoji: '🏺', label: 'Jug',    imageUrl: '', audioText: 'J for Jug' },
    { id: 'ec8',  value: 'K', emoji: '🪁', label: 'Kite',   imageUrl: '', audioText: 'K for Kite' },
    { id: 'ec9',  value: 'L', emoji: '🦁', label: 'Lion',   imageUrl: '', audioText: 'L for Lion' },
    { id: 'ec10', value: 'M', emoji: '🐒', label: 'Monkey', imageUrl: '', audioText: 'M for Monkey' },
  ],
  'consonants-3': [
    { id: 'ec11', value: 'N', emoji: '🪺', label: 'Nest',   imageUrl: '', audioText: 'N for Nest' },
    { id: 'ec12', value: 'P', emoji: '🦜', label: 'Parrot', imageUrl: '', audioText: 'P for Parrot' },
    { id: 'ec13', value: 'Q', emoji: '👑', label: 'Queen',  imageUrl: '', audioText: 'Q for Queen' },
    { id: 'ec14', value: 'R', emoji: '🐇', label: 'Rabbit', imageUrl: '', audioText: 'R for Rabbit' },
    { id: 'ec15', value: 'S', emoji: '☀️', label: 'Sun',    imageUrl: '', audioText: 'S for Sun' },
  ],
  'consonants-4': [
    { id: 'ec16', value: 'T', emoji: '🐯', label: 'Tiger',   imageUrl: '', audioText: 'T for Tiger' },
    { id: 'ec17', value: 'V', emoji: '🚐', label: 'Van',     imageUrl: '', audioText: 'V for Van' },
    { id: 'ec18', value: 'W', emoji: '⌚', label: 'Watch',   imageUrl: '', audioText: 'W for Watch' },
    { id: 'ec19', value: 'X', emoji: '🩻', label: 'X-ray',   imageUrl: '', audioText: 'X for X-ray' },
    { id: 'ec20', value: 'Y', emoji: '🪀', label: 'Yo-yo',   imageUrl: '', audioText: 'Y for Yo-yo' },
    { id: 'ec21', value: 'Z', emoji: '🦓', label: 'Zebra',   imageUrl: '', audioText: 'Z for Zebra' },
  ],
};

// ✅ HINDI - Sahi emoji mapping har akshar ke liye
export const HINDI_CONTENT: Record<string, LearningItem[]> = {
  vowels: [
    { id: 'hv1',  value: 'अ',  emoji: '🍐', label: 'अमरूद', imageUrl: '', audioText: 'अ से अमरूद' },
    { id: 'hv2',  value: 'आ',  emoji: '🥭', label: 'आम',    imageUrl: '', audioText: 'आ से आम' },
    { id: 'hv3',  value: 'इ',  emoji: '🌿', label: 'इमली',  imageUrl: '', audioText: 'इ से इमली' },
    { id: 'hv4',  value: 'ई',  emoji: '🌾', label: 'ईख',    imageUrl: '', audioText: 'ई से ईख' },
    { id: 'hv5',  value: 'उ',  emoji: '🦉', label: 'उल्लू', imageUrl: '', audioText: 'उ से उल्लू' },
    { id: 'hv6',  value: 'ऊ',  emoji: '🧶', label: 'ऊन',    imageUrl: '', audioText: 'ऊ से ऊन' },
    { id: 'hv7',  value: 'ऋ',  emoji: '🧘', label: 'ऋषि',   imageUrl: '', audioText: 'ऋ से ऋषि' },
    { id: 'hv8',  value: 'ए',  emoji: '👣', label: 'एड़ी',   imageUrl: '', audioText: 'ए से एड़ी' },
    { id: 'hv9',  value: 'ऐ',  emoji: '👓', label: 'ऐनक',   imageUrl: '', audioText: 'ऐ से ऐनक' },
    { id: 'hv10', value: 'ओ',  emoji: '🪨', label: 'ओखली',  imageUrl: '', audioText: 'ओ से ओखली' },
    { id: 'hv11', value: 'औ',  emoji: '👩', label: 'औरत',   imageUrl: '', audioText: 'औ से औरत' },
    { id: 'hv12', value: 'अं', emoji: '🍇', label: 'अंगूर',  imageUrl: '', audioText: 'अं से अंगूर' },
    { id: 'hv13', value: 'अः', emoji: '✨', label: 'अः',     imageUrl: '', audioText: 'अः' },
  ],
  'consonants-1': [
    { id: 'hc1', value: 'क', emoji: '🕊️', label: 'कबूतर',  imageUrl: '', audioText: 'क से कबूतर' },
    { id: 'hc2', value: 'ख', emoji: '🐇', label: 'खरगोश', imageUrl: '', audioText: 'ख से खरगोश' },
    { id: 'hc3', value: 'ग', emoji: '🪴', label: 'गमला',   imageUrl: '', audioText: 'ग से गमला' },
    { id: 'hc4', value: 'घ', emoji: '🏠', label: 'घर',     imageUrl: '', audioText: 'घ से घर' },
    { id: 'hc5', value: 'ङ', emoji: '❓', label: 'ङ',       imageUrl: '', audioText: 'ङ' },
  ],
  'consonants-2': [
    { id: 'hc6',  value: 'च', emoji: '🥄', label: 'चम्मच', imageUrl: '', audioText: 'च से चम्मच' },
    { id: 'hc7',  value: 'छ', emoji: '☂️', label: 'छतरी',  imageUrl: '', audioText: 'छ से छतरी' },
    { id: 'hc8',  value: 'ज', emoji: '✈️', label: 'जहाज',  imageUrl: '', audioText: 'ज से जहाज' },
    { id: 'hc9',  value: 'झ', emoji: '🚩', label: 'झंडा',  imageUrl: '', audioText: 'झ से झंडा' },
    { id: 'hc10', value: 'ञ', emoji: '❓', label: 'ञ',      imageUrl: '', audioText: 'ञ' },
  ],
  'consonants-3': [
    { id: 'hc11', value: 'ट', emoji: '🍅', label: 'टमाटर',  imageUrl: '', audioText: 'ट से टमाटर' },
    { id: 'hc12', value: 'ठ', emoji: '🏺', label: 'ठठेरा',  imageUrl: '', audioText: 'ठ से ठठेरा' },
    { id: 'hc13', value: 'ड', emoji: '🪘', label: 'डमरू',   imageUrl: '', audioText: 'ड से डमरू' },
    { id: 'hc14', value: 'ढ', emoji: '🪣', label: 'ढक्कन', imageUrl: '', audioText: 'ढ से ढक्कन' },
    { id: 'hc15', value: 'ण', emoji: '❓', label: 'ण',       imageUrl: '', audioText: 'ण' },
  ],
  'consonants-4': [
    { id: 'hc16', value: 'त', emoji: '🍉', label: 'तरबूज', imageUrl: '', audioText: 'त से तरबूज' },
    { id: 'hc17', value: 'थ', emoji: '🧴', label: 'थरमस',  imageUrl: '', audioText: 'थ से थरमस' },
    { id: 'hc18', value: 'द', emoji: '🖊️', label: 'दवात',  imageUrl: '', audioText: 'द से दवात' },
    { id: 'hc19', value: 'ध', emoji: '🏹', label: 'धनुष',  imageUrl: '', audioText: 'ध से धनुष' },
    { id: 'hc20', value: 'न', emoji: '🚿', label: 'नल',    imageUrl: '', audioText: 'न से नल' },
  ],
  'consonants-5': [
    { id: 'hc21', value: 'प', emoji: '🪁', label: 'पतंग', imageUrl: '', audioText: 'प से पतंग' },
    { id: 'hc22', value: 'फ', emoji: '🍎', label: 'फल',   imageUrl: '', audioText: 'फ से फल' },
    { id: 'hc23', value: 'ब', emoji: '🦆', label: 'बतख', imageUrl: '', audioText: 'ब से बतख' },
    { id: 'hc24', value: 'भ', emoji: '🐻', label: 'भालू', imageUrl: '', audioText: 'भ से भालू' },
    { id: 'hc25', value: 'म', emoji: '🐟', label: 'मछली', imageUrl: '', audioText: 'म से मछली' },
  ],
  'consonants-6': [
    { id: 'hc26', value: 'य', emoji: '🔥', label: 'यज्ञ',  imageUrl: '', audioText: 'य से यज्ञ' },
    { id: 'hc27', value: 'र', emoji: '🛕', label: 'रथ',    imageUrl: '', audioText: 'र से रथ' },
    { id: 'hc28', value: 'ल', emoji: '🎡', label: 'लट्टू', imageUrl: '', audioText: 'ल से लट्टू' },
    { id: 'hc29', value: 'व', emoji: '🦢', label: 'वक',    imageUrl: '', audioText: 'व से वक' },
    { id: 'hc30', value: 'श', emoji: '🌱', label: 'शलगम', imageUrl: '', audioText: 'श से शलगम' },
  ],
  'consonants-7': [
    { id: 'hc31', value: 'ष',   emoji: '🔷', label: 'षटकोण',  imageUrl: '', audioText: 'ष से षटकोण' },
    { id: 'hc32', value: 'स',   emoji: '🐍', label: 'सपेरा',   imageUrl: '', audioText: 'स से सपेरा' },
    { id: 'hc33', value: 'ह',   emoji: '🐘', label: 'हाथी',    imageUrl: '', audioText: 'ह से हाथी' },
    { id: 'hc34', value: 'क्ष', emoji: '⚔️', label: 'क्षत्रिय', imageUrl: '', audioText: 'क्ष से क्षत्रिय' },
    { id: 'hc35', value: 'त्र', emoji: '🔱', label: 'त्रिशूल',  imageUrl: '', audioText: 'त्र से त्रिशूल' },
    { id: 'hc36', value: 'ज्ञ', emoji: '📚', label: 'ज्ञानी',   imageUrl: '', audioText: 'ज्ञ से ज्ञानी' },
    { id: 'hc37', value: 'श्र', emoji: '👷', label: 'श्रमिक',   imageUrl: '', audioText: 'श्र से श्रमिक' },
  ],
};

// ✅ TAMIL - Correct emoji for each letter
export const TAMIL_CONTENT: Record<string, LearningItem[]> = {
  vowels: [
    { id: 'tv1',  value: 'அ',  emoji: '👩', label: 'அம்மா',        imageUrl: '', audioText: 'Ah for Amma' },
    { id: 'tv2',  value: 'ஆ',  emoji: '🐐', label: 'ஆடு',          imageUrl: '', audioText: 'Aah for Aadu' },
    { id: 'tv3',  value: 'இ',  emoji: '🍃', label: 'இலை',          imageUrl: '', audioText: 'Ih for Ilai' },
    { id: 'tv4',  value: 'ஈ',  emoji: '🦟', label: 'ஈ',            imageUrl: '', audioText: 'Eeh for Ee' },
    { id: 'tv5',  value: 'உ',  emoji: '🪨', label: 'உரல்',          imageUrl: '', audioText: 'Uh for Ural' },
    { id: 'tv6',  value: 'ஊ',  emoji: '🎠', label: 'ஊஞ்சல்',       imageUrl: '', audioText: 'Ooh for Oosal' },
    { id: 'tv7',  value: 'எ',  emoji: '🐭', label: 'எலி',           imageUrl: '', audioText: 'Eh for Eli' },
    { id: 'tv8',  value: 'ஏ',  emoji: '🪜', label: 'ஏணி',           imageUrl: '', audioText: 'Ehh for Eni' },
    { id: 'tv9',  value: 'ஐ',  emoji: '5️⃣', label: 'ஐந்து',         imageUrl: '', audioText: 'Ai for Aindhu' },
    { id: 'tv10', value: 'ஒ',  emoji: '🐪', label: 'ஒட்டகம்',      imageUrl: '', audioText: 'Oh for Ottaagam' },
    { id: 'tv11', value: 'ஓ',  emoji: '🚣', label: 'ஓடம்',          imageUrl: '', audioText: 'Ooh for Odam' },
    { id: 'tv12', value: 'ஔ',  emoji: '📜', label: 'ஔவையார்',      imageUrl: '', audioText: 'Auv for Auvvaiyar' },
  ],
  'consonants-1': [
    { id: 'tc1', value: 'க',  emoji: '⛵', label: 'கப்பல்',   imageUrl: '', audioText: 'Ka for Kappal' },
    { id: 'tc2', value: 'ங',  emoji: '🏠', label: 'அங்கணம்', imageUrl: '', audioText: 'Nga for Anganam' },
    { id: 'tc3', value: 'ச',  emoji: '⚙️', label: 'சக்கரம்', imageUrl: '', audioText: 'Cha for Chakkaram' },
    { id: 'tc4', value: 'ஞ',  emoji: '🍇', label: 'ஞானப்பலம்', imageUrl: '', audioText: 'Nya for Gnanapalam' },
    { id: 'tc5', value: 'ட',  emoji: '🪁', label: 'பட்டம்',  imageUrl: '', audioText: 'Ta for Pattam' },
    { id: 'tc6', value: 'ண',  emoji: '👁️', label: 'கண்',     imageUrl: '', audioText: 'Na for Kan' },
  ],
  'consonants-2': [
    { id: 'tc7',  value: 'த', emoji: '🐸', label: 'தவளை',    imageUrl: '', audioText: 'Tha for Thavalai' },
    { id: 'tc8',  value: 'ந', emoji: '🦊', label: 'நரி',     imageUrl: '', audioText: 'Na for Nari' },
    { id: 'tc9',  value: 'ப', emoji: '⚽', label: 'பந்து',    imageUrl: '', audioText: 'Pa for Panthu' },
    { id: 'tc10', value: 'ம', emoji: '🌳', label: 'மரம்',    imageUrl: '', audioText: 'Ma for Maram' },
    { id: 'tc11', value: 'ய', emoji: '🐘', label: 'யானை',    imageUrl: '', audioText: 'Ya for Yanai' },
    { id: 'tc12', value: 'ர', emoji: '🚂', label: 'ரயில்',   imageUrl: '', audioText: 'Ra for Rail' },
  ],
  'consonants-3': [
    { id: 'tc13', value: 'ல', emoji: '🍬', label: 'லட்டு',   imageUrl: '', audioText: 'La for Laddu' },
    { id: 'tc14', value: 'வ', emoji: '👄', label: 'வாய்',    imageUrl: '', audioText: 'Va for Vaai' },
    { id: 'tc15', value: 'ழ', emoji: '🍌', label: 'பழம்',    imageUrl: '', audioText: 'Zha for Pazham' },
    { id: 'tc16', value: 'ள', emoji: '🥁', label: 'மேளம்',   imageUrl: '', audioText: 'La for Melam' },
    { id: 'tc17', value: 'ற', emoji: '🐦', label: 'பறவை',    imageUrl: '', audioText: 'Ra for Paravai' },
    { id: 'tc18', value: 'ன', emoji: '🦌', label: 'மான்',    imageUrl: '', audioText: 'Na for Maan' },
  ],
  'consonants-4': [
    { id: 'tc19', value: 'ஜ',   emoji: '👴', label: 'ஜனகன்',    imageUrl: '', audioText: 'Ja for Janakan' },
    { id: 'tc20', value: 'ஷ',   emoji: '🌸', label: 'புஷ்பம்',   imageUrl: '', audioText: 'Sha for Pushpam' },
    { id: 'tc21', value: 'ஸ',   emoji: '🎵', label: 'சரஸ்வதி',   imageUrl: '', audioText: 'Sa for Saraswathi' },
    { id: 'tc22', value: 'ஹ',   emoji: '🕉️', label: 'ஹரன்',      imageUrl: '', audioText: 'Ha for Haran' },
    { id: 'tc23', value: 'க்ஷ', emoji: '🙏', label: 'லக்ஷ்மி',   imageUrl: '', audioText: 'Ksha for Lakshmi' },
  ],
};

// ✅ CHINESE - Correct emoji matching each character meaning
export const CHINESE_CONTENT: Record<string, LearningItem[]> = {
  'initials-1': [
    { id: 'zh1', value: '波', emoji: '🌊', label: 'bō (Wave)',   imageUrl: '', audioText: 'b for bo' },
    { id: 'zh2', value: '坡', emoji: '⛰️', label: 'pō (Slope)', imageUrl: '', audioText: 'p for po' },
    { id: 'zh3', value: '摸', emoji: '🤲', label: 'mó (Touch)',  imageUrl: '', audioText: 'm for mo' },
    { id: 'zh4', value: '佛', emoji: '🙏', label: 'fó (Buddha)', imageUrl: '', audioText: 'f for fo' },
  ],
  'initials-2': [
    { id: 'zh5', value: '得', emoji: '✅', label: 'dé (Get)',      imageUrl: '', audioText: 'd for de' },
    { id: 'zh6', value: '特', emoji: '⭐', label: 'tè (Special)',  imageUrl: '', audioText: 't for te' },
    { id: 'zh7', value: '呢', emoji: '💬', label: 'ne (Particle)', imageUrl: '', audioText: 'n for ne' },
    { id: 'zh8', value: '乐', emoji: '😄', label: 'lè (Joy)',      imageUrl: '', audioText: 'l for le' },
  ],
  'initials-3': [
    { id: 'zh9',  value: '哥', emoji: '👨', label: 'gē (Brother)',  imageUrl: '', audioText: 'g for ge' },
    { id: 'zh10', value: '渴', emoji: '💧', label: 'kě (Thirsty)', imageUrl: '', audioText: 'k for ke' },
    { id: 'zh11', value: '河', emoji: '🏞️', label: 'hé (River)',   imageUrl: '', audioText: 'h for he' },
    { id: 'zh12', value: '鸡', emoji: '🐔', label: 'jī (Chicken)', imageUrl: '', audioText: 'j for ji' },
  ],
  'initials-4': [
    { id: 'zh13', value: '七', emoji: '7️⃣', label: 'qī (Seven)',  imageUrl: '', audioText: 'q for qi' },
    { id: 'zh14', value: '西', emoji: '🧭', label: 'xī (West)',   imageUrl: '', audioText: 'x for xi' },
    { id: 'zh15', value: '猪', emoji: '🐷', label: 'zhū (Pig)',   imageUrl: '', audioText: 'zh for zhu' },
    { id: 'zh16', value: '吃', emoji: '🍽️', label: 'chī (Eat)',   imageUrl: '', audioText: 'ch for chi' },
  ],
  'initials-5': [
    { id: 'zh17', value: '狮', emoji: '🦁', label: 'shī (Lion)',   imageUrl: '', audioText: 'sh for shi' },
    { id: 'zh18', value: '日', emoji: '☀️', label: 'rì (Sun)',     imageUrl: '', audioText: 'r for ri' },
    { id: 'zh19', value: '紫', emoji: '🟣', label: 'zǐ (Purple)', imageUrl: '', audioText: 'z for zi' },
    { id: 'zh20', value: '四', emoji: '4️⃣', label: 'sì (Four)',   imageUrl: '', audioText: 's for si' },
  ],
  'finals': [
    { id: 'zf1', value: '啊', emoji: '😮', label: 'ā (Ah)',       imageUrl: '', audioText: 'ah' },
    { id: 'zf2', value: '喔', emoji: '😲', label: 'ō (Oh)',       imageUrl: '', audioText: 'oh' },
    { id: 'zf3', value: '鹅', emoji: '🦢', label: 'é (Goose)',    imageUrl: '', audioText: 'eh' },
    { id: 'zf4', value: '衣', emoji: '👕', label: 'ī (Clothes)',  imageUrl: '', audioText: 'ee' },
    { id: 'zf5', value: '屋', emoji: '🏠', label: 'ū (House)',    imageUrl: '', audioText: 'oo' },
    { id: 'zf6', value: '鱼', emoji: '🐟', label: 'ǘ (Fish)',     imageUrl: '', audioText: 'yu' },
  ],
};

export const LANGUAGES = [
  { id: 'numbers', name: 'Numbers',  icon: '🔢', color: 'bg-yellow-400' },
  { id: 'english', name: 'English',  icon: '🔤', color: 'bg-blue-400' },
  { id: 'hindi',   name: 'Hindi',    icon: 'ॐ',  color: 'bg-orange-400' },
  { id: 'tamil',   name: 'Tamil',    icon: 'த',  color: 'bg-red-400' },
  { id: 'chinese', name: 'Chinese',  icon: '汉', color: 'bg-green-400' },
];
