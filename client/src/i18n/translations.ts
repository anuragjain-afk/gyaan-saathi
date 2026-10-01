export type SupportedLanguage =
  | 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta'
  | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as'
  | 'ur' | 'mai' | 'sa';

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; nativeLabel: string; flag: string }[] = [
  { code: 'en',  label: 'English',    nativeLabel: 'English',      flag: '🇬🇧' },
  { code: 'hi',  label: 'Hindi',      nativeLabel: 'हिन्दी',         flag: '🇮🇳' },
  { code: 'bn',  label: 'Bengali',    nativeLabel: 'বাংলা',          flag: '🇮🇳' },
  { code: 'te',  label: 'Telugu',     nativeLabel: 'తెలుగు',          flag: '🇮🇳' },
  { code: 'mr',  label: 'Marathi',    nativeLabel: 'मराठी',           flag: '🇮🇳' },
  { code: 'ta',  label: 'Tamil',      nativeLabel: 'தமிழ்',           flag: '🇮🇳' },
  { code: 'gu',  label: 'Gujarati',   nativeLabel: 'ગુજરાતી',         flag: '🇮🇳' },
  { code: 'kn',  label: 'Kannada',    nativeLabel: 'ಕನ್ನಡ',           flag: '🇮🇳' },
  { code: 'ml',  label: 'Malayalam',  nativeLabel: 'മലയാളം',          flag: '🇮🇳' },
  { code: 'pa',  label: 'Punjabi',    nativeLabel: 'ਪੰਜਾਬੀ',          flag: '🇮🇳' },
  { code: 'or',  label: 'Odia',       nativeLabel: 'ଓଡ଼ିଆ',           flag: '🇮🇳' },
  { code: 'as',  label: 'Assamese',   nativeLabel: 'অসমীয়া',          flag: '🇮🇳' },
  { code: 'ur',  label: 'Urdu',       nativeLabel: 'اردو',             flag: '🇮🇳' },
  { code: 'mai', label: 'Maithili',   nativeLabel: 'मैथिली',           flag: '🇮🇳' },
  { code: 'sa',  label: 'Sanskrit',   nativeLabel: 'संस्कृतम्',         flag: '🇮🇳' },
];

type TranslationShape = {
  appTitle: string; tagline: string; navHome: string; navLearn: string;
  navAISaathi: string; navPractice: string; navCareer: string;
  navScholarships: string; navProfile: string; online: string;
  offlineMode: string; syncing: string; synced: string;
  learningContinues: string; pendingSyncText: string; continueLearning: string;
  progress: string; streak: string; days: string; quizScore: string;
  weakTopic: string; practiceNow: string; downloadOffline: string;
  availableOffline: string; downloading: string; askAI: string;
  askDoubt: string; typeQuestion: string; suggestedQuestions: string;
  explainSimpler: string; hindiToggle: string; listen: string;
  stopListening: string; voiceInput: string; voiceNotSupported: string;
  doubtSavedLocally: string; doubtWillProcess: string; syncNow: string;
  lastSynced: string; pendingActions: string; careerPathway: string;
  scholarshipDiscovery: string; verifyOfficial: string; demoMode: string;
  toggleNetwork: string;
};

const en: TranslationShape = {
  appTitle: 'Gyaan Saathi', tagline: 'Your AI Companion for Learning & Growth',
  navHome: 'Home', navLearn: 'Learn', navAISaathi: 'AI Saathi',
  navPractice: 'Practice', navCareer: 'Career', navScholarships: 'Scholarships',
  navProfile: 'Profile', online: 'Online', offlineMode: 'Offline Mode',
  syncing: 'Syncing...', synced: 'Synced',
  learningContinues: 'Learning continues even when internet does not.',
  pendingSyncText: 'Your progress & doubts will auto-sync when online.',
  continueLearning: 'Continue Learning', progress: 'Your Progress',
  streak: 'Learning Streak', days: 'days', quizScore: 'Quiz Avg Score',
  weakTopic: 'Needs Revision', practiceNow: 'Practice Now',
  downloadOffline: 'Download for Offline', availableOffline: 'Available Offline',
  downloading: 'Downloading...', askAI: 'Ask AI Saathi', askDoubt: 'Have a doubt?',
  typeQuestion: 'Type your academic question here...',
  suggestedQuestions: 'Suggested Doubts', explainSimpler: 'Explain Simpler',
  hindiToggle: 'हिंदी', listen: 'Listen', stopListening: 'Stop',
  voiceInput: 'Ask by Voice',
  voiceNotSupported: 'Voice input is not supported in this browser. Please type your question.',
  doubtSavedLocally: 'Doubt saved locally in IndexedDB.',
  doubtWillProcess: 'Your question will be processed automatically when you reconnect.',
  syncNow: 'Sync Now', lastSynced: 'Last synchronized', pendingActions: 'Pending Actions',
  careerPathway: 'Possible Career Pathways', scholarshipDiscovery: 'Scholarship Discovery',
  verifyOfficial: 'Potential match — verify eligibility on official portal.',
  demoMode: 'Hackathon Demo Mode', toggleNetwork: 'Simulate Offline Mode'
};

const hi: TranslationShape = {
  appTitle: 'ज्ञान साथी', tagline: 'शिक्षा और विकास के लिए आपका एआई साथी',
  navHome: 'होम', navLearn: 'सीखें', navAISaathi: 'एआई साथी',
  navPractice: 'अभ्यास', navCareer: 'करियर', navScholarships: 'छात्रवृत्ति',
  navProfile: 'प्रोफ़ाइल', online: 'ऑनलाइन', offlineMode: 'ऑफ़लाइन मोड',
  syncing: 'सिंक हो रहा है...', synced: 'सिंक्ड',
  learningContinues: 'इंटरनेट न होने पर भी पढ़ाई जारी रहती है।',
  pendingSyncText: 'ऑनलाइन आने पर आपकी प्रगति अपने आप सिंक हो जाएगी।',
  continueLearning: 'पढ़ाई जारी रखें', progress: 'आपकी प्रगति',
  streak: 'लर्निंग स्ट्रिक', days: 'दिन', quizScore: 'क्विज औसत अंक',
  weakTopic: 'रिवीजन की जरूरत', practiceNow: 'अभी अभ्यास करें',
  downloadOffline: 'ऑफ़लाइन डाउनलोड करें', availableOffline: 'ऑफ़लाइन उपलब्ध',
  downloading: 'डाउनलोड हो रहा है...', askAI: 'एआई साथी से पूछें',
  askDoubt: 'कोई सवाल है?', typeQuestion: 'अपना सवाल यहाँ लिखें...',
  suggestedQuestions: 'सुझाए गए प्रश्न', explainSimpler: 'आसान भाषा में समझें',
  hindiToggle: 'English', listen: 'सुनें', stopListening: 'रोकें',
  voiceInput: 'बोलकर पूछें',
  voiceNotSupported: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया टाइप करें।',
  doubtSavedLocally: 'सवाल स्थानीय रूप से सुरक्षित हो गया है।',
  doubtWillProcess: 'इंटरनेट कनेक्ट होते ही जवाब स्वचालित रूप से संसाधित होगा।',
  syncNow: 'अभी सिंक करें', lastSynced: 'अंतिम सिंक समय', pendingActions: 'लंबित कार्य',
  careerPathway: 'संभावित करियर मार्ग', scholarshipDiscovery: 'छात्रवृत्ति खोज',
  verifyOfficial: 'संभावित मैच — आधिकारिक पोर्टल पर पात्रता की जांच करें।',
  demoMode: 'हैकाथॉन डेमो मोड', toggleNetwork: 'ऑफ़लाइन मोड सिमुलेट करें'
};

const bn: TranslationShape = {
  appTitle: 'জ্ঞান সাথী', tagline: 'শিক্ষা ও বৃদ্ধির জন্য আপনার AI সঙ্গী',
  navHome: 'হোম', navLearn: 'শিখুন', navAISaathi: 'AI সাথী',
  navPractice: 'অনুশীলন', navCareer: 'ক্যারিয়ার', navScholarships: 'বৃত্তি',
  navProfile: 'প্রোফাইল', online: 'অনলাইন', offlineMode: 'অফলাইন মোড',
  syncing: 'সিঙ্ক হচ্ছে...', synced: 'সিঙ্ক হয়েছে',
  learningContinues: 'ইন্টারনেট না থাকলেও শেখা চলতে থাকে।',
  pendingSyncText: 'অনলাইন হলে আপনার অগ্রগতি স্বয়ংক্রিয়ভাবে সিঙ্ক হবে।',
  continueLearning: 'শেখা চালিয়ে যান', progress: 'আপনার অগ্রগতি',
  streak: 'শেখার ধারা', days: 'দিন', quizScore: 'কুইজ গড় স্কোর',
  weakTopic: 'পুনরায় দেখুন', practiceNow: 'এখন অনুশীলন করুন',
  downloadOffline: 'অফলাইনে ডাউনলোড করুন', availableOffline: 'অফলাইনে উপলব্ধ',
  downloading: 'ডাউনলোড হচ্ছে...', askAI: 'AI সাথীকে জিজ্ঞেস করুন',
  askDoubt: 'কোনো সন্দেহ আছে?', typeQuestion: 'আপনার প্রশ্ন এখানে লিখুন...',
  suggestedQuestions: 'পরামর্শকৃত প্রশ্ন', explainSimpler: 'সহজে বুঝুন',
  hindiToggle: 'English', listen: 'শুনুন', stopListening: 'বন্ধ করুন',
  voiceInput: 'কণ্ঠে জিজ্ঞেস করুন',
  voiceNotSupported: 'এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়।',
  doubtSavedLocally: 'প্রশ্ন স্থানীয়ভাবে সংরক্ষিত হয়েছে।',
  doubtWillProcess: 'ইন্টারনেট সংযুক্ত হলে উত্তর প্রক্রিয়া হবে।',
  syncNow: 'এখন সিঙ্ক করুন', lastSynced: 'শেষ সিঙ্ক', pendingActions: 'মুলতুবি কাজ',
  careerPathway: 'সম্ভাব্য ক্যারিয়ার পথ', scholarshipDiscovery: 'বৃত্তি আবিষ্কার',
  verifyOfficial: 'সম্ভাব্য মিল — অফিসিয়াল পোর্টালে যোগ্যতা যাচাই করুন।',
  demoMode: 'হ্যাকাথন ডেমো মোড', toggleNetwork: 'অফলাইন মোড অনুকরণ'
};

const te: TranslationShape = {
  appTitle: 'జ్ఞాన్ సాథి', tagline: 'నేర్చుకోవడం మరియు వృద్ధికి మీ AI సహాయకుడు',
  navHome: 'హోమ్', navLearn: 'నేర్చుకో', navAISaathi: 'AI సాథి',
  navPractice: 'అభ్యాసం', navCareer: 'కెరీర్', navScholarships: 'స్కాలర్‌షిప్‌లు',
  navProfile: 'ప్రొఫైల్', online: 'ఆన్‌లైన్', offlineMode: 'ఆఫ్‌లైన్ మోడ్',
  syncing: 'సమకాలీకరిస్తోంది...', synced: 'సమకాలీకరించబడింది',
  learningContinues: 'ఇంటర్నెట్ లేకపోయినా నేర్చుకోవడం కొనసాగుతుంది.',
  pendingSyncText: 'ఆన్‌లైన్ అయినప్పుడు మీ పురోగతి స్వయంచాలకంగా సమకాలీకరించబడుతుంది.',
  continueLearning: 'నేర్చుకోవడం కొనసాగించు', progress: 'మీ పురోగతి',
  streak: 'నేర్చుకోవడం స్ట్రీక్', days: 'రోజులు', quizScore: 'క్విజ్ సగటు స్కోర్',
  weakTopic: 'పునర్విమర్శ అవసరం', practiceNow: 'ఇప్పుడు అభ్యసించు',
  downloadOffline: 'ఆఫ్‌లైన్‌లో డౌన్‌లోడ్ చేయండి', availableOffline: 'ఆఫ్‌లైన్‌లో అందుబాటులో ఉంది',
  downloading: 'డౌన్‌లోడ్ అవుతోంది...', askAI: 'AI సాథిని అడగండి',
  askDoubt: 'సందేహం ఉందా?', typeQuestion: 'మీ ప్రశ్న ఇక్కడ టైప్ చేయండి...',
  suggestedQuestions: 'సూచించిన సందేహాలు', explainSimpler: 'సులభంగా వివరించు',
  hindiToggle: 'English', listen: 'వినండి', stopListening: 'ఆపు',
  voiceInput: 'వాయిస్‌తో అడగండి',
  voiceNotSupported: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు.',
  doubtSavedLocally: 'సందేహం స్థానికంగా సేవ్ చేయబడింది.',
  doubtWillProcess: 'ఇంటర్నెట్ కనెక్ట్ అయినప్పుడు సమాధానం ప్రాసెస్ చేయబడుతుంది.',
  syncNow: 'ఇప్పుడు సమకాలీకరించు', lastSynced: 'చివరి సమకాలీకరణ', pendingActions: 'పెండింగ్ చర్యలు',
  careerPathway: 'సాధ్యమైన కెరీర్ మార్గాలు', scholarshipDiscovery: 'స్కాలర్‌షిప్ ఆవిష్కరణ',
  verifyOfficial: 'సాధ్యమైన మ్యాచ్ — అధికారిక పోర్టల్‌లో అర్హతను ధృవీకరించండి.',
  demoMode: 'హ్యాకాథాన్ డెమో మోడ్', toggleNetwork: 'ఆఫ్‌లైన్ మోడ్ అనుకరించు'
};

const mr: TranslationShape = {
  appTitle: 'ज्ञान साथी', tagline: 'शिक्षण आणि विकासासाठी तुमचा AI साथी',
  navHome: 'मुख्यपृष्ठ', navLearn: 'शिका', navAISaathi: 'AI साथी',
  navPractice: 'सराव', navCareer: 'करिअर', navScholarships: 'शिष्यवृत्ती',
  navProfile: 'प्रोफाइल', online: 'ऑनलाइन', offlineMode: 'ऑफलाइन मोड',
  syncing: 'सिंक होत आहे...', synced: 'सिंक झाले',
  learningContinues: 'इंटरनेट नसतानाही शिक्षण सुरू राहते.',
  pendingSyncText: 'ऑनलाइन झाल्यावर तुमची प्रगती आपोआप सिंक होईल.',
  continueLearning: 'शिकणे सुरू ठेवा', progress: 'तुमची प्रगती',
  streak: 'शिक्षण स्ट्रीक', days: 'दिवस', quizScore: 'क्विझ सरासरी गुण',
  weakTopic: 'पुनरावृत्ती आवश्यक', practiceNow: 'आता सराव करा',
  downloadOffline: 'ऑफलाइनसाठी डाउनलोड करा', availableOffline: 'ऑफलाइन उपलब्ध',
  downloading: 'डाउनलोड होत आहे...', askAI: 'AI साथीला विचारा',
  askDoubt: 'शंका आहे का?', typeQuestion: 'तुमचा प्रश्न येथे टाइप करा...',
  suggestedQuestions: 'सुचवलेले प्रश्न', explainSimpler: 'सोप्या भाषेत समजावा',
  hindiToggle: 'English', listen: 'ऐका', stopListening: 'थांबा',
  voiceInput: 'आवाजाने विचारा',
  voiceNotSupported: 'या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही.',
  doubtSavedLocally: 'शंका स्थानिक पातळीवर सेव्ह केली.',
  doubtWillProcess: 'इंटरनेट जोडल्यावर उत्तर प्रक्रिया होईल.',
  syncNow: 'आता सिंक करा', lastSynced: 'शेवटचा सिंक', pendingActions: 'प्रलंबित कार्ये',
  careerPathway: 'संभाव्य करिअर मार्ग', scholarshipDiscovery: 'शिष्यवृत्ती शोध',
  verifyOfficial: 'संभाव्य जुळणी — अधिकृत पोर्टलवर पात्रता तपासा.',
  demoMode: 'हॅकाथॉन डेमो मोड', toggleNetwork: 'ऑफलाइन मोड सिम्युलेट करा'
};

const ta: TranslationShape = {
  appTitle: 'ஞான சாதி', tagline: 'கற்றல் மற்றும் வளர்ச்சிக்கான உங்கள் AI துணை',
  navHome: 'முகப்பு', navLearn: 'கற்றல்', navAISaathi: 'AI சாதி',
  navPractice: 'பயிற்சி', navCareer: 'தொழில்', navScholarships: 'உதவித்தொகை',
  navProfile: 'சுயவிவரம்', online: 'ஆன்லைன்', offlineMode: 'ஆஃப்லைன் முறை',
  syncing: 'ஒத்திசைக்கிறது...', synced: 'ஒத்திசைந்தது',
  learningContinues: 'இணையம் இல்லாவிட்டாலும் கற்றல் தொடர்கிறது.',
  pendingSyncText: 'ஆன்லைனில் இருக்கும்போது உங்கள் முன்னேற்றம் தானாக ஒத்திசைக்கப்படும்.',
  continueLearning: 'கற்றலை தொடரவும்', progress: 'உங்கள் முன்னேற்றம்',
  streak: 'கற்றல் தொடர்', days: 'நாட்கள்', quizScore: 'வினாடி வினா சராசரி மதிப்பெண்',
  weakTopic: 'மதிப்பாய்வு தேவை', practiceNow: 'இப்போது பயிற்சி செய்யுங்கள்',
  downloadOffline: 'ஆஃப்லைனுக்கு பதிவிறக்கவும்', availableOffline: 'ஆஃப்லைனில் கிடைக்கிறது',
  downloading: 'பதிவிறக்குகிறது...', askAI: 'AI சாதியிடம் கேளுங்கள்',
  askDoubt: 'சந்தேகம் உள்ளதா?', typeQuestion: 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யுங்கள்...',
  suggestedQuestions: 'பரிந்துரைக்கப்பட்ட சந்தேகங்கள்', explainSimpler: 'எளிதாக விளக்கவும்',
  hindiToggle: 'English', listen: 'கேளுங்கள்', stopListening: 'நிறுத்து',
  voiceInput: 'குரலில் கேளுங்கள்',
  voiceNotSupported: 'இந்த உலாவியில் குரல் உள்ளீடு ஆதரவு இல்லை.',
  doubtSavedLocally: 'சந்தேகம் உள்ளூரில் சேமிக்கப்பட்டது.',
  doubtWillProcess: 'இணையம் இணைந்தால் பதில் செயலாக்கப்படும்.',
  syncNow: 'இப்போது ஒத்திசை', lastSynced: 'கடைசி ஒத்திசைவு', pendingActions: 'நிலுவையில் உள்ள செயல்கள்',
  careerPathway: 'சாத்தியமான தொழில் பாதைகள்', scholarshipDiscovery: 'உதவித்தொகை கண்டுபிடிப்பு',
  verifyOfficial: 'சாத்தியமான பொருத்தம் — அதிகாரப்பூர்வ போர்ட்டலில் தகுதியை சரிபார்க்கவும்.',
  demoMode: 'ஹேக்கத்தான் டெமோ முறை', toggleNetwork: 'ஆஃப்லைன் முறையை உருவகப்படுத்து'
};

const gu: TranslationShape = {
  appTitle: 'જ્ઞાન સાથી', tagline: 'શિક્ષણ અને વૃદ્ધિ માટે તમારો AI સાથી',
  navHome: 'હોમ', navLearn: 'શીખો', navAISaathi: 'AI સાથી',
  navPractice: 'પ્રેક્ટિસ', navCareer: 'કારકિર્દી', navScholarships: 'શિષ્યવૃત્તિ',
  navProfile: 'પ્રોફાઇલ', online: 'ઓનલાઇન', offlineMode: 'ઓફલાઇન મોડ',
  syncing: 'સિંક થઈ રહ્યું છે...', synced: 'સિંક થઈ ગયું',
  learningContinues: 'ઇન્ટરનેટ ન હોય તો પણ શિક્ષણ ચાલુ રહે છે.',
  pendingSyncText: 'ઓનલાઇન આવ્યા બાદ તમારી પ્રગતિ આપમેળે સિંક થઈ જશે.',
  continueLearning: 'શીખવાનું ચાલુ રાખો', progress: 'તમારી પ્રગતિ',
  streak: 'શીખવાની સ્ટ્રીક', days: 'દિવસ', quizScore: 'ક્વિઝ સરેરાશ સ્કોર',
  weakTopic: 'પુનરાવર્તન જરૂરી', practiceNow: 'હવે પ્રેક્ટિસ કરો',
  downloadOffline: 'ઓફલાઇન ડાઉનલોડ કરો', availableOffline: 'ઓફલાઇન ઉપલબ્ધ',
  downloading: 'ડાઉનલોડ થઈ રહ્યું છે...', askAI: 'AI સાથીને પૂછો',
  askDoubt: 'કોઈ સવાલ છે?', typeQuestion: 'તમારો સવાલ અહીં ટાઇપ કરો...',
  suggestedQuestions: 'સૂચવેલ સવાલો', explainSimpler: 'સરળ ભાષામાં સમજાવો',
  hindiToggle: 'English', listen: 'સાંભળો', stopListening: 'રોકો',
  voiceInput: 'અવાજ દ્વારા પૂછો',
  voiceNotSupported: 'આ બ્રાઉઝરમાં વૉઇસ ઇનપુટ સપોર્ટ નથી.',
  doubtSavedLocally: 'સવાલ સ્થાનિક સ્તરે સેવ થઈ ગયો.',
  doubtWillProcess: 'ઇન્ટરનેટ સાથે જોડાયા બાદ જવાબ પ્રક્રિયા થશે.',
  syncNow: 'હવે સિંક કરો', lastSynced: 'છેલ્લો સિંક', pendingActions: 'બાકી કાર્ય',
  careerPathway: 'સંભવિત કારકિર્દી માર્ગ', scholarshipDiscovery: 'શિષ્યવૃત્તિ શોધ',
  verifyOfficial: 'સંભવિત મેળ — સત્તાવાર પોર્ટલ પર પાત્રતા ચકાસો.',
  demoMode: 'હેકાથોન ડેમો મોડ', toggleNetwork: 'ઓફલાઇન મોડ સિમ્યુલેટ કરો'
};

const kn: TranslationShape = {
  appTitle: 'ಜ್ಞಾನ ಸಾಥಿ', tagline: 'ಕಲಿಕೆ ಮತ್ತು ಬೆಳವಣಿಗೆಗೆ ನಿಮ್ಮ AI ಸಂಗಾತಿ',
  navHome: 'ಮುಖಪುಟ', navLearn: 'ಕಲಿಯಿರಿ', navAISaathi: 'AI ಸಾಥಿ',
  navPractice: 'ಅಭ್ಯಾಸ', navCareer: 'ವೃತ್ತಿ', navScholarships: 'ವಿದ್ಯಾರ್ಥಿವೇತನ',
  navProfile: 'ಪ್ರೊಫೈಲ್', online: 'ಆನ್‌ಲೈನ್', offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
  syncing: 'ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...', synced: 'ಸಿಂಕ್ ಆಗಿದೆ',
  learningContinues: 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ಕಲಿಕೆ ಮುಂದುವರಿಯುತ್ತದೆ.',
  pendingSyncText: 'ಆನ್‌ಲೈನ್ ಆದಾಗ ನಿಮ್ಮ ಪ್ರಗತಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿಂಕ್ ಆಗುತ್ತದೆ.',
  continueLearning: 'ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ', progress: 'ನಿಮ್ಮ ಪ್ರಗತಿ',
  streak: 'ಕಲಿಕಾ ಸ್ಟ್ರೀಕ್', days: 'ದಿನಗಳು', quizScore: 'ರಸಪ್ರಶ್ನೆ ಸರಾಸರಿ ಅಂಕ',
  weakTopic: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯ', practiceNow: 'ಈಗ ಅಭ್ಯಾಸ ಮಾಡಿ',
  downloadOffline: 'ಆಫ್‌ಲೈನ್‌ಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', availableOffline: 'ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಲಭ್ಯ',
  downloading: 'ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...', askAI: 'AI ಸಾಥಿಯನ್ನು ಕೇಳಿ',
  askDoubt: 'ಸಂಶಯ ಇದೆಯೇ?', typeQuestion: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
  suggestedQuestions: 'ಸೂಚಿಸಿದ ಸಂಶಯಗಳು', explainSimpler: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ',
  hindiToggle: 'English', listen: 'ಕೇಳಿ', stopListening: 'ನಿಲ್ಲಿಸಿ',
  voiceInput: 'ಧ್ವನಿಯಿಂದ ಕೇಳಿ',
  voiceNotSupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.',
  doubtSavedLocally: 'ಸಂಶಯ ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾಗಿದೆ.',
  doubtWillProcess: 'ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕಿಸಿದ ನಂತರ ಉತ್ತರ ಪ್ರಕ್ರಿಯೆ ಆಗುತ್ತದೆ.',
  syncNow: 'ಈಗ ಸಿಂಕ್ ಮಾಡಿ', lastSynced: 'ಕೊನೆಯ ಸಿಂಕ್', pendingActions: 'ಬಾಕಿ ಕ್ರಿಯೆಗಳು',
  careerPathway: 'ಸಂಭಾವ್ಯ ವೃತ್ತಿ ಮಾರ್ಗಗಳು', scholarshipDiscovery: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಅನ್ವೇಷಣೆ',
  verifyOfficial: 'ಸಂಭಾವ್ಯ ಹೊಂದಾಣಿಕೆ — ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ.',
  demoMode: 'ಹ್ಯಾಕಥಾನ್ ಡೆಮೋ ಮೋಡ್', toggleNetwork: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಅನುಕರಿಸಿ'
};

const ml: TranslationShape = {
  appTitle: 'ജ്ഞാന സാഥി', tagline: 'പഠനത്തിനും വളർച്ചക്കുമുള്ള നിങ്ങളുടെ AI കൂട്ടാളി',
  navHome: 'ഹോം', navLearn: 'പഠിക്കുക', navAISaathi: 'AI സാഥി',
  navPractice: 'പരിശീലനം', navCareer: 'കരിയർ', navScholarships: 'സ്കോളർഷിപ്പ്',
  navProfile: 'പ്രൊഫൈൽ', online: 'ഓൺലൈൻ', offlineMode: 'ഓഫ്‌ലൈൻ മോഡ്',
  syncing: 'സമന്വയിക്കുന്നു...', synced: 'സമന്വയിച്ചു',
  learningContinues: 'ഇന്റർനെറ്റ് ഇല്ലാതെ പോലും പഠനം തുടരുന്നു.',
  pendingSyncText: 'ഓൺലൈൻ ആകുമ്പോൾ നിങ്ങളുടെ പുരോഗതി സ്വയം സമന്വയിക്കും.',
  continueLearning: 'പഠനം തുടരുക', progress: 'നിങ്ങളുടെ പുരോഗതി',
  streak: 'പഠന സ്ട്രീക്', days: 'ദിവസങ്ങൾ', quizScore: 'ക്വിസ് ശരാശരി സ്കോർ',
  weakTopic: 'പുനരവലോകനം ആവശ്യം', practiceNow: 'ഇപ്പോൾ പരിശീലിക്കൂ',
  downloadOffline: 'ഓഫ്‌ലൈൻ ഡൗൺലോഡ്', availableOffline: 'ഓഫ്‌ലൈൻ ലഭ്യം',
  downloading: 'ഡൗൺലോഡ് ചെയ്യുന്നു...', askAI: 'AI സാഥിയോട് ചോദിക്കൂ',
  askDoubt: 'സംശയം ഉണ്ടോ?', typeQuestion: 'നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യൂ...',
  suggestedQuestions: 'നിർദ്ദേശിക്കപ്പെട്ട സംശയങ്ങൾ', explainSimpler: 'ലളിതമായി വിശദീകരിക്കൂ',
  hindiToggle: 'English', listen: 'കേൾക്കൂ', stopListening: 'നിർത്തൂ',
  voiceInput: 'ശബ്ദം ഉപയോഗിച്ച് ചോദിക്കൂ',
  voiceNotSupported: 'ഈ ബ്രൗസറിൽ വോയ്‌സ് ഇൻപുട്ട് പിന്തുണ ഇല്ല.',
  doubtSavedLocally: 'സംശയം ലോക്കൽ ആയി സേവ് ചെയ്തു.',
  doubtWillProcess: 'ഇന്റർനെറ്റ് ബന്ധിപ്പിക്കുമ്പോൾ ഉത്തരം പ്രോസസ്സ് ചെയ്യും.',
  syncNow: 'ഇപ്പോൾ സമന്വയിക്കൂ', lastSynced: 'അവസാന സമന്വയം', pendingActions: 'ബാക്കി ക്രിയകൾ',
  careerPathway: 'സാദ്ധ്യമായ കരിയർ പാതകൾ', scholarshipDiscovery: 'സ്കോളർഷിപ്പ് കണ്ടെത്തൽ',
  verifyOfficial: 'സാദ്ധ്യമായ പൊരുത്തം — ഔദ്യോഗിക പോർട്ടലിൽ യോഗ്യത പരിശോധിക്കൂ.',
  demoMode: 'ഹാക്കത്തോൺ ഡെമോ മോഡ്', toggleNetwork: 'ഓഫ്‌ലൈൻ മോഡ് സിമുലേറ്റ് ചെയ്യൂ'
};

const pa: TranslationShape = {
  appTitle: 'ਗਿਆਨ ਸਾਥੀ', tagline: 'ਸਿੱਖਣ ਅਤੇ ਵਿਕਾਸ ਲਈ ਤੁਹਾਡਾ AI ਸਾਥੀ',
  navHome: 'ਹੋਮ', navLearn: 'ਸਿੱਖੋ', navAISaathi: 'AI ਸਾਥੀ',
  navPractice: 'ਅਭਿਆਸ', navCareer: 'ਕਰੀਅਰ', navScholarships: 'ਵਜ਼ੀਫ਼ਾ',
  navProfile: 'ਪ੍ਰੋਫਾਈਲ', online: 'ਔਨਲਾਈਨ', offlineMode: 'ਔਫਲਾਈਨ ਮੋਡ',
  syncing: 'ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ...', synced: 'ਸਿੰਕ ਹੋ ਗਿਆ',
  learningContinues: 'ਇੰਟਰਨੈੱਟ ਨਾ ਹੋਣ ਤੇ ਵੀ ਸਿੱਖਣਾ ਜਾਰੀ ਰਹਿੰਦਾ ਹੈ।',
  pendingSyncText: 'ਔਨਲਾਈਨ ਹੋਣ ਤੇ ਤੁਹਾਡੀ ਤਰੱਕੀ ਆਪਣੇ ਆਪ ਸਿੰਕ ਹੋ ਜਾਵੇਗੀ।',
  continueLearning: 'ਸਿੱਖਣਾ ਜਾਰੀ ਰੱਖੋ', progress: 'ਤੁਹਾਡੀ ਤਰੱਕੀ',
  streak: 'ਸਿੱਖਣ ਦੀ ਲੜੀ', days: 'ਦਿਨ', quizScore: 'ਕੁਇਜ਼ ਔਸਤ ਸਕੋਰ',
  weakTopic: 'ਦੁਹਰਾਉਣ ਦੀ ਲੋੜ', practiceNow: 'ਹੁਣੇ ਅਭਿਆਸ ਕਰੋ',
  downloadOffline: 'ਔਫਲਾਈਨ ਡਾਊਨਲੋਡ ਕਰੋ', availableOffline: 'ਔਫਲਾਈਨ ਉਪਲਬਧ',
  downloading: 'ਡਾਊਨਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...', askAI: 'AI ਸਾਥੀ ਨੂੰ ਪੁੱਛੋ',
  askDoubt: 'ਕੋਈ ਸ਼ੱਕ ਹੈ?', typeQuestion: 'ਆਪਣਾ ਸਵਾਲ ਇੱਥੇ ਲਿਖੋ...',
  suggestedQuestions: 'ਸੁਝਾਏ ਗਏ ਸਵਾਲ', explainSimpler: 'ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਓ',
  hindiToggle: 'English', listen: 'ਸੁਣੋ', stopListening: 'ਰੋਕੋ',
  voiceInput: 'ਆਵਾਜ਼ ਨਾਲ ਪੁੱਛੋ',
  voiceNotSupported: 'ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਇਨਪੁੱਟ ਸਹਾਇਤਾ ਨਹੀਂ ਹੈ।',
  doubtSavedLocally: 'ਸ਼ੱਕ ਸਥਾਨਕ ਤੌਰ ਤੇ ਸੇਵ ਕੀਤਾ ਗਿਆ।',
  doubtWillProcess: 'ਇੰਟਰਨੈੱਟ ਨਾਲ ਜੁੜਨ ਤੇ ਜਵਾਬ ਪ੍ਰੋਸੈਸ ਹੋਵੇਗਾ।',
  syncNow: 'ਹੁਣ ਸਿੰਕ ਕਰੋ', lastSynced: 'ਆਖਰੀ ਸਿੰਕ', pendingActions: 'ਬਕਾਇਆ ਕੰਮ',
  careerPathway: 'ਸੰਭਾਵਿਤ ਕਰੀਅਰ ਮਾਰਗ', scholarshipDiscovery: 'ਵਜ਼ੀਫ਼ਾ ਖੋਜ',
  verifyOfficial: 'ਸੰਭਾਵਿਤ ਮੇਲ — ਅਧਿਕਾਰਿਤ ਪੋਰਟਲ ਤੇ ਯੋਗਤਾ ਜਾਂਚੋ।',
  demoMode: 'ਹੈਕਾਥਾਨ ਡੈਮੋ ਮੋਡ', toggleNetwork: 'ਔਫਲਾਈਨ ਮੋਡ ਸਿਮੂਲੇਟ ਕਰੋ'
};

const or: TranslationShape = {
  appTitle: 'ଜ୍ଞାନ ସାଥୀ', tagline: 'ଶିକ୍ଷା ଏବଂ ବୃଦ୍ଧି ପାଇଁ ଆପଣଙ୍କ AI ସଙ୍ଗୀ',
  navHome: 'ହୋମ', navLearn: 'ଶିଖନ୍ତୁ', navAISaathi: 'AI ସାଥୀ',
  navPractice: 'ଅଭ୍ୟାସ', navCareer: 'କ୍ୟାରିୟର', navScholarships: 'ଛାତ୍ରବୃତ୍ତି',
  navProfile: 'ପ୍ରୋଫାଇଲ', online: 'ଅନ୍‌ଲାଇନ', offlineMode: 'ଅଫ୍‌ଲାଇନ ମୋଡ',
  syncing: 'ସିଙ୍କ ହେଉଛି...', synced: 'ସିଙ୍କ ହୋଇଗଲା',
  learningContinues: 'ଇଣ୍ଟର୍ନେଟ ନ ଥିଲେ ମଧ୍ୟ ଶିକ୍ଷା ଜାରି ରହେ।',
  pendingSyncText: 'ଅନ୍‌ଲାଇନ ହେଲେ ଆପଣଙ୍କ ଅଗ୍ରଗତି ସ୍ୱଚ୍ଛ ଭାବରେ ସିଙ୍କ ହେବ।',
  continueLearning: 'ଶିଖିବା ଜାରି ରଖନ୍ତୁ', progress: 'ଆପଣଙ୍କ ଅଗ୍ରଗତି',
  streak: 'ଶିକ୍ଷା ଧାରା', days: 'ଦିନ', quizScore: 'କ୍ୱିଜ ହାରାହାରି ସ୍କୋର',
  weakTopic: 'ପୁନଃ ଅଧ୍ୟୟନ ଆବଶ୍ୟକ', practiceNow: 'ଏବେ ଅଭ୍ୟାସ କରନ୍ତୁ',
  downloadOffline: 'ଅଫ୍‌ଲାଇନ ଡାଉନଲୋଡ', availableOffline: 'ଅଫ୍‌ଲାଇନ ଉପଲବ୍ଧ',
  downloading: 'ଡାଉନଲୋଡ ହେଉଛି...', askAI: 'AI ସାଥୀଙ୍କୁ ପଚାରନ୍ତୁ',
  askDoubt: 'ସନ୍ଦେହ ଅଛି?', typeQuestion: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଏଠାରେ ଟାଇପ କରନ୍ତୁ...',
  suggestedQuestions: 'ପ୍ରସ୍ତାବିତ ସନ୍ଦେହ', explainSimpler: 'ସରଳ ଭାଷାରେ ବୁଝାନ୍ତୁ',
  hindiToggle: 'English', listen: 'ଶୁଣନ୍ତୁ', stopListening: 'ବନ୍ଦ',
  voiceInput: 'ଆବାଜ ଦ୍ୱାରା ପଚାରନ୍ତୁ',
  voiceNotSupported: 'ଏହି ବ୍ରାଉଜରରେ ଭଏସ ଇନପୁଟ ସମର୍ଥିତ ନୁହେଁ।',
  doubtSavedLocally: 'ସନ୍ଦେହ ସ୍ଥାନୀୟ ଭାବରେ ସଞ୍ଚୟ ହୋଇଛି।',
  doubtWillProcess: 'ଇଣ୍ଟର୍ନେଟ ସଂଯୁକ୍ତ ହେଲେ ଉତ୍ତର ପ୍ରକ୍ରିୟା ହେବ।',
  syncNow: 'ଏବେ ସିଙ୍କ କରନ୍ତୁ', lastSynced: 'ଶେଷ ସିଙ୍କ', pendingActions: 'ବାକି କାର୍ଯ୍ୟ',
  careerPathway: 'ସମ୍ଭାବ୍ୟ କ୍ୟାରିୟର ପଥ', scholarshipDiscovery: 'ଛାତ୍ରବୃତ୍ତି ଅନ୍ୱେଷଣ',
  verifyOfficial: 'ସମ୍ଭାବ୍ୟ ମିଳ — ସରକାରୀ ପୋର୍ଟାଲରେ ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ।',
  demoMode: 'ହ୍ୟାକଥନ ଡେମୋ ମୋଡ', toggleNetwork: 'ଅଫ୍‌ଲାଇନ ମୋଡ ଅନୁକରଣ'
};

const as: TranslationShape = {
  appTitle: 'জ্ঞান সাথী', tagline: 'শিক্ষণ আৰু বিকাশৰ বাবে আপোনাৰ AI সঙ্গী',
  navHome: 'হোম', navLearn: 'শিকক', navAISaathi: 'AI সাথী',
  navPractice: 'অভ্যাস', navCareer: 'কেৰিয়াৰ', navScholarships: 'বৃত্তি',
  navProfile: 'প্ৰফাইল', online: 'অনলাইন', offlineMode: 'অফলাইন মোড',
  syncing: 'চিংক হৈ আছে...', synced: 'চিংক হ\'ল',
  learningContinues: 'ইন্টাৰনেট নাথাকিলেও শিক্ষণ অব্যাহত থাকে।',
  pendingSyncText: 'অনলাইন হ\'লে আপোনাৰ অগ্ৰগতি নিজেই চিংক হ\'ব।',
  continueLearning: 'শিক্ষণ অব্যাহত ৰাখক', progress: 'আপোনাৰ অগ্ৰগতি',
  streak: 'শিক্ষণ ধাৰা', days: 'দিন', quizScore: 'কুইজ গড় স্কোৰ',
  weakTopic: 'পুনৰীক্ষণ প্ৰয়োজন', practiceNow: 'এতিয়া অভ্যাস কৰক',
  downloadOffline: 'অফলাইনৰ বাবে ডাউনলোড কৰক', availableOffline: 'অফলাইনত উপলব্ধ',
  downloading: 'ডাউনলোড হৈ আছে...', askAI: 'AI সাথীক সোধক',
  askDoubt: 'সন্দেহ আছে নেকি?', typeQuestion: 'আপোনাৰ প্ৰশ্ন ইয়াত লিখক...',
  suggestedQuestions: 'পৰামৰ্শ দিয়া প্ৰশ্নসমূহ', explainSimpler: 'সহজ ভাষাত বুজাওক',
  hindiToggle: 'English', listen: 'শুনক', stopListening: 'বন্ধ কৰক',
  voiceInput: 'কণ্ঠেৰে সোধক',
  voiceNotSupported: 'এই ব্ৰাউজাৰত ভইচ ইনপুট সমৰ্থিত নহয়।',
  doubtSavedLocally: 'সন্দেহ স্থানীয়ভাবে সংৰক্ষিত হৈছে।',
  doubtWillProcess: 'ইন্টাৰনেট সংযুক্ত হ\'লে উত্তৰ প্ৰক্ৰিয়া হ\'ব।',
  syncNow: 'এতিয়া চিংক কৰক', lastSynced: 'শেষ চিংক', pendingActions: 'বাকী কাৰ্য',
  careerPathway: 'সম্ভাব্য কেৰিয়াৰ পথ', scholarshipDiscovery: 'বৃত্তি অনুসন্ধান',
  verifyOfficial: 'সম্ভাব্য মিল — চৰকাৰী পোৰ্টেলত যোগ্যতা পৰীক্ষা কৰক।',
  demoMode: 'হেকাথন ডেমো মোড', toggleNetwork: 'অফলাইন মোড অনুকৰণ'
};

const ur: TranslationShape = {
  appTitle: 'گیان ساتھی', tagline: 'سیکھنے اور ترقی کے لیے آپ کا AI ساتھی',
  navHome: 'ہوم', navLearn: 'سیکھیں', navAISaathi: 'AI ساتھی',
  navPractice: 'مشق', navCareer: 'کیریئر', navScholarships: 'وظائف',
  navProfile: 'پروفائل', online: 'آن لائن', offlineMode: 'آف لائن موڈ',
  syncing: 'سنک ہو رہا ہے...', synced: 'سنک ہو گیا',
  learningContinues: 'انٹرنیٹ نہ ہو تو بھی سیکھنا جاری رہتا ہے۔',
  pendingSyncText: 'آن لائن ہونے پر آپ کی ترقی خود بخود سنک ہو جائے گی۔',
  continueLearning: 'سیکھنا جاری رکھیں', progress: 'آپ کی ترقی',
  streak: 'سیکھنے کا سلسلہ', days: 'دن', quizScore: 'کوئز اوسط اسکور',
  weakTopic: 'نظرثانی ضروری', practiceNow: 'ابھی مشق کریں',
  downloadOffline: 'آف لائن ڈاؤن لوڈ', availableOffline: 'آف لائن دستیاب',
  downloading: 'ڈاؤن لوڈ ہو رہا ہے...', askAI: 'AI ساتھی سے پوچھیں',
  askDoubt: 'کوئی شک ہے؟', typeQuestion: 'اپنا سوال یہاں لکھیں...',
  suggestedQuestions: 'تجویز کردہ سوالات', explainSimpler: 'آسان زبان میں سمجھائیں',
  hindiToggle: 'English', listen: 'سنیں', stopListening: 'روکیں',
  voiceInput: 'آواز سے پوچھیں',
  voiceNotSupported: 'اس براؤزر میں وائس ان پٹ سپورٹ نہیں ہے۔',
  doubtSavedLocally: 'شک مقامی طور پر محفوظ ہو گیا۔',
  doubtWillProcess: 'انٹرنیٹ سے جڑنے پر جواب پروسیس ہوگا۔',
  syncNow: 'ابھی سنک کریں', lastSynced: 'آخری سنک', pendingActions: 'زیر التوا کام',
  careerPathway: 'ممکنہ کیریئر راستے', scholarshipDiscovery: 'وظیفہ دریافت',
  verifyOfficial: 'ممکنہ میچ — سرکاری پورٹل پر اہلیت جانچیں۔',
  demoMode: 'ہیکاتھون ڈیمو موڈ', toggleNetwork: 'آف لائن موڈ سمولیٹ کریں'
};

const mai: TranslationShape = {
  appTitle: 'ज्ञान साथी', tagline: 'सीखबाक आ विकासक लेल अहाँक AI साथी',
  navHome: 'होम', navLearn: 'सीखू', navAISaathi: 'AI साथी',
  navPractice: 'अभ्यास', navCareer: 'करियर', navScholarships: 'छात्रवृत्ति',
  navProfile: 'प्रोफाइल', online: 'ऑनलाइन', offlineMode: 'ऑफलाइन मोड',
  syncing: 'सिंक भऽ रहल अछि...', synced: 'सिंक भेल',
  learningContinues: 'इंटरनेट नहि रहला पर सेहो सिखनाइ जारी रहैत अछि।',
  pendingSyncText: 'ऑनलाइन भेलापर अहाँक प्रगति अपने सिंक भऽ जाएत।',
  continueLearning: 'सीखनाइ जारी राखू', progress: 'अहाँक प्रगति',
  streak: 'सीखबाक धारा', days: 'दिन', quizScore: 'क्विज औसत अंक',
  weakTopic: 'पुनरावलोकन आवश्यक', practiceNow: 'एखन अभ्यास करू',
  downloadOffline: 'ऑफलाइन डाउनलोड', availableOffline: 'ऑफलाइन उपलब्ध',
  downloading: 'डाउनलोड भऽ रहल अछि...', askAI: 'AI साथी सँ पूछू',
  askDoubt: 'किछु संशय अछि?', typeQuestion: 'अहाँक प्रश्न एतऽ लिखू...',
  suggestedQuestions: 'सुझाएल प्रश्न', explainSimpler: 'सरल भाषाँ मे बुझाऊ',
  hindiToggle: 'English', listen: 'सुनू', stopListening: 'रोकू',
  voiceInput: 'आवाज सँ पूछू',
  voiceNotSupported: 'एहि ब्राउजर मे वॉइस इनपुट समर्थित नहि अछि।',
  doubtSavedLocally: 'संशय स्थानीय रूप सँ सेव भेल।',
  doubtWillProcess: 'इंटरनेट जुड़लापर उत्तर प्रोसेस हेतैक।',
  syncNow: 'एखन सिंक करू', lastSynced: 'अंतिम सिंक', pendingActions: 'बाकी कार्य',
  careerPathway: 'संभाव्य करियर मार्ग', scholarshipDiscovery: 'छात्रवृत्ति खोज',
  verifyOfficial: 'संभाव्य मेल — सरकारी पोर्टल पर पात्रता जाँचू।',
  demoMode: 'हैकाथॉन डेमो मोड', toggleNetwork: 'ऑफलाइन मोड सिमुलेट करू'
};

const sa: TranslationShape = {
  appTitle: 'ज्ञान साथी', tagline: 'अध्ययनाय विकासाय च भवतः AI साथी',
  navHome: 'गृहम्', navLearn: 'शिक्षणम्', navAISaathi: 'AI साथी',
  navPractice: 'अभ्यासः', navCareer: 'व्यवसायः', navScholarships: 'छात्रवृत्तिः',
  navProfile: 'परिचयः', online: 'सक्रियः', offlineMode: 'असक्रिय-रीतिः',
  syncing: 'समन्वयः चलति...', synced: 'समन्वितम्',
  learningContinues: 'जालम् विना अपि अध्ययनं प्रवर्तते।',
  pendingSyncText: 'सक्रियतायां प्रगतिः स्वयं समन्वयिष्यति।',
  continueLearning: 'अध्ययनं जारयतु', progress: 'भवतः प्रगतिः',
  streak: 'अध्ययन-श्रृंखला', days: 'दिनानि', quizScore: 'प्रश्नोत्तर सरासरी',
  weakTopic: 'पुनरावलोकनम् आवश्यकम्', practiceNow: 'इदानीम् अभ्यासतु',
  downloadOffline: 'असक्रियतायाम् अवतारणम्', availableOffline: 'असक्रियतायाम् उपलब्धम्',
  downloading: 'अवतरति...', askAI: 'AI साथिम् पृच्छतु',
  askDoubt: 'सन्देहः अस्ति?', typeQuestion: 'प्रश्नम् अत्र लिखतु...',
  suggestedQuestions: 'सुझावित-प्रश्नाः', explainSimpler: 'सरलतया विवृणोतु',
  hindiToggle: 'English', listen: 'शृणोतु', stopListening: 'विरमतु',
  voiceInput: 'स्वरेण पृच्छतु',
  voiceNotSupported: 'अस्मिन् ब्राउजरे स्वर-प्रविष्टिः न समर्थ्यते।',
  doubtSavedLocally: 'सन्देहः स्थानिकरूपेण संरक्षितः।',
  doubtWillProcess: 'जाल-संयोगे उत्तरं प्रक्रियते।',
  syncNow: 'इदानीम् समन्वयतु', lastSynced: 'अन्तिम-समन्वयः', pendingActions: 'शेष-कार्याणि',
  careerPathway: 'सम्भाव्य-व्यवसाय-मार्गाः', scholarshipDiscovery: 'छात्रवृत्ति-अन्वेषणम्',
  verifyOfficial: 'सम्भाव्य-मेलनम् — सरकारीय-द्वारे पात्रतां परीक्षतु।',
  demoMode: 'हैकाथॉन डेमो रीतिः', toggleNetwork: 'असक्रिय-रीतिम् अनुकरोतु'
};

export const TRANSLATIONS: Record<SupportedLanguage, TranslationShape> = {
  en, hi, bn, te, mr, ta, gu, kn, ml, pa, or, as, ur, mai, sa
};
