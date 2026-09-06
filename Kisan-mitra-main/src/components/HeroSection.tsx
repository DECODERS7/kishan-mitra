import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Satellite,
  Sparkles,
  Sprout,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Mic,
  ArrowUpRight,
  Activity,
  CloudSun,
} from 'lucide-react';
import { Language, UserProfile, PageTab } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  language: Language;
  selectedDistrict: string;
  onDistrictSelect: (district: string) => void;
  onOpenVoice: () => void;
  currentUser?: UserProfile | null;
  onNavigateTab?: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  selectedDistrict,
  onDistrictSelect,
  onOpenVoice,
  currentUser,
  onNavigateTab,
}) => {
  const t = translations[language];
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSyncingTelemetry, setIsSyncingTelemetry] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      onDistrictSelect(query.trim());
      setIsSearching(false);
    }, 350);
  };

  const handleTelemetrySync = () => {
    setIsSyncingTelemetry(true);
    setTimeout(() => {
      setIsSyncingTelemetry(false);
      setSyncMessage('✓ सेटेलाइट व कृषि मौसम डेटा सिंक हो गया है');
      setTimeout(() => setSyncMessage(null), 3000);
    }, 700);
  };

  const quickPicks = [
    { id: 'shivpuri', label: 'Shivpuri (MP)', badge: 'Mustard & Wheat' },
    { id: 'indore', label: 'Indore (MP)', badge: 'Soybean & Garlic' },
    { id: 'ludhiana', label: 'Ludhiana (PB)', badge: 'Wheat & Paddy' },
  ];

  const displayName = currentUser?.name || (language === 'hi' ? 'किसान मित्र' : 'Farmer Friend');
  const displayDistrict = selectedDistrict ? selectedDistrict.charAt(0).toUpperCase() + selectedDistrict.slice(1) : 'Shivpuri';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-2 space-y-6">
      
      {/* ===============================================================
          TOP GREETING SECTION (Matching Screenshot 2 exactly)
          =============================================================== */}
      <div className="space-y-2">
        {/* Line 1: नमस्कार, Name 🌾 */}
        <p className="text-base sm:text-lg font-bold text-[#16A34A] flex items-center gap-1.5">
          <span>{language === 'hi' ? `नमस्कार, ${displayName}` : `Hello, ${displayName}`}</span>
          <span className="text-xl">🌾</span>
        </p>

        {/* Line 2: Big Bold Heading: आज का काम कैसा चल रहा है? */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#093317] leading-tight">
          {language === 'hi' ? 'आज का काम कैसा चल रहा है?' : 'How is today’s farm work going?'}
        </h1>

        {/* Line 3: Location & AI Engine Active Tag */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-[#15803D] font-bold">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>{displayDistrict} (कृषि क्षेत्र)</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>AI इंजन सक्रिय</span>
          </div>
        </div>

        {/* Line 4: Data Sync Pill Chip matching Screenshot 2 */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#15803D] text-xs font-bold border border-[#BDE8C6]">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span>कृषि व सेटेलाइट डेटा सिंक</span>
          </span>
        </div>
      </div>

      {/* ===============================================================
          FEATURED HERO GREEN CARD (Matching Screenshot 2 exactly)
          Emerald gradient, watermark leaf, white text, CTA, voice button
          =============================================================== */}
      <div className="rounded-3xl bg-gradient-to-br from-[#166534] via-[#15803D] to-[#14532D] p-6 sm:p-9 text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
        
        {/* Subtle Watermark Sprout Silhouette in Background */}
        <div className="absolute right-3 -bottom-8 opacity-15 pointer-events-none transform rotate-12 scale-150">
          <Sprout className="w-64 h-64 text-emerald-200" />
        </div>
        
        {/* Specular Glint Top Rim */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-xl space-y-4">
          {/* Green AI Pill Tag matching Screenshot 2 */}
          <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>AI ASSISTANT READY</span>
          </div>

          {/* Heading matching Screenshot 2 */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {language === 'hi' ? 'अपनी फसल का बेहतर दाम और उपज पाएं' : 'Maximize your crop yield and profits'}
          </h2>

          {/* Subtitle matching Screenshot 2 */}
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            {language === 'hi'
              ? 'आज की सटीक मौसम दरें देखें, रोग लक्षण जांचें और अपने कृषि मुनाफे की सही गणना करें।'
              : 'Check real-time agromet forecasts, scan plant pathology with AI vision, and calculate your net harvest profit.'}
          </p>

          {/* Action Button matching Screenshot 2 */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab ? onNavigateTab('diagnostics') : null}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/30 transition-all cursor-pointer active:scale-95"
            >
              <span>{language === 'hi' ? 'फसल डॉक्टर व सलाह देखें' : 'Consult Crop Doctor & Advisory'}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigateTab ? onNavigateTab('khata') : null}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <Sprout className="w-4 h-4" />
              <span>{language === 'hi' ? 'बहीखाता खोलें' : 'Farm Ledger'}</span>
            </button>
          </div>
        </div>

        {/* Floating Voice Microphone Button matching Screenshot 2 bottom right */}
        <button
          onClick={onOpenVoice}
          id="hero-voice-assistant-trigger"
          aria-label="Speak with Kisan AI"
          className="absolute right-5 bottom-5 sm:right-7 sm:bottom-7 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 ring-4 ring-emerald-400/30 cursor-pointer active:scale-90 transition-all z-20 group"
          title="Voice Assistant (आवाज से पूछें)"
        >
          <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-bounce" />
        </button>
      </div>

      {/* ===============================================================
          SEARCH & QUICK AGRO-ZONE SELECTION
          =============================================================== */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="district-pincode-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="पिनकोड या जिला दर्ज करें (e.g. Shivpuri, Indore, Bhopal, Ludhiana)..."
              className="w-full pl-10 pr-24 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-1.5 top-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs disabled:opacity-60"
            >
              {isSearching ? 'खोज रहे हैं...' : 'खोजें'}
            </button>
          </form>

          {/* Quick zone pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden md:inline">
              त्वरित क्षेत्र:
            </span>
            {quickPicks.map((pick) => {
              const isActive = selectedDistrict.toLowerCase() === pick.id;
              return (
                <button
                  key={pick.id}
                  onClick={() => onDistrictSelect(pick.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {pick.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Telemetry Sync notification */}
        <AnimatePresence>
          {syncMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{syncMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};
