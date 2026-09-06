import React from 'react';
import { Mic, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface VoiceAssistantButtonProps {
  language: Language;
  onClick: () => void;
}

export const VoiceAssistantButton: React.FC<VoiceAssistantButtonProps> = ({ language, onClick }) => {
  const t = translations[language];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
      {/* Tooltip Label */}
      <span className="hidden md:inline-block gloss-card-dark text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg border border-white/20 pointer-events-none">
        {t.voiceAssistant} • Gemini AI
      </span>

      {/* Floating Animated Mic Button */}
      <button
        id="floating-voice-assistant-btn"
        onClick={onClick}
        aria-label="Activate Voice Assistant"
        className="relative group w-14 h-14 rounded-full gloss-btn-primary text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/70"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none"></span>

        <Mic className="w-5 h-5 text-white drop-shadow group-hover:scale-110 transition-transform" />

        {/* Small AI Sparkle Badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center shadow-xs border-2 border-white font-black">
          <Sparkles className="w-3 h-3 text-slate-950" />
        </span>
      </button>
    </div>
  );
};
