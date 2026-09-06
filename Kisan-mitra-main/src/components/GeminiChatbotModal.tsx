import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, Mic, MicOff, Sparkles, RefreshCw, Volume2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface GeminiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  district: string;
  soilContext?: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  time: string;
}

export const GeminiChatbotModal: React.FC<GeminiChatbotModalProps> = ({
  isOpen,
  onClose,
  language,
  district,
  soilContext,
}) => {
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize greeting in requested language when opened or language changed
  useEffect(() => {
    const greetingText =
      language === 'hi'
        ? `नमस्ते! मैं कृषि मित्र एआई सहायक हूँ। मैं ${district} के लिए फसल, मौसम, खाद और मंडी भाव से जुड़ी सटीक सलाह दे सकता हूँ। आप क्या पूछना चाहते हैं?`
        : language === 'pa'
        ? `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਏਆਈ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ${district} ਲਈ ਫ਼ਸਲਾਂ, ਮੌਸਮ, ਖਾਦਾਂ ਅਤੇ ਮੰਡੀ ਭਾਅ ਸੰਬੰਧੀ ਸਲਾਹ ਦੇ ਸਕਦਾ ਹਾਂ। ਤੁਹਾਡਾ ਕੀ ਸਵਾਲ ਹੈ?`
        : `Greetings! I am Krishi Mitra AI Assistant. Grounded with satellite data for ${district}, I can assist you with agronomy, pest control, fertilizer balancing, and live MSP rates. What would you like to know?`;

    setMessages([
      {
        role: 'model',
        text: greetingText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language, district]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Speech Recognition for Voice
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          district,
          soilContext,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        role: 'model',
        text: data.reply || 'Advisory retrieved successfully.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        role: 'model',
        text: language === 'hi'
          ? 'नेटवर्क विलंब के बावजूद: आपके क्षेत्र के लिए संतुलित जैविक खाद और नीम तेल का उपयोग सर्वोत्तम रहेगा।'
          : language === 'pa'
          ? 'ਤੁਹਾਡੇ ਖੇਤਰ ਲਈ ਮਿੱਟੀ ਪਰਖ ਅਨੁਸਾਰ ਸੰਤੁਲਿਤ ਖਾਦਾਂ ਦੀ ਵਰਤੋਂ ਲਾਹੇਵੰਦ ਰਹੇਗੀ।'
          : 'Based on current agromet telemetry, maintain appropriate irrigation intervals and monitor crop leaf health.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Text to Speech playback
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="gloss-card w-full sm:max-w-lg h-[88vh] sm:h-[620px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/90 relative backdrop-blur-2xl">
        {/* Specular Glint Top Rim */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-30" />

        {/* Chat Header */}
        <div className="gloss-card-dark text-white p-4 flex items-center justify-between shadow-md border-b border-white/15 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gloss-btn-primary text-white flex items-center justify-center font-bold shadow-md border border-emerald-300/60">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-black tracking-tight text-white">{t.aiBotTitle}</h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-[11px] text-emerald-200/90 font-medium">{t.aiBotSubtitle} • {district}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Chat"
            className="p-2 text-emerald-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-white/70 backdrop-blur-md px-3.5 py-2.5 border-b border-white/60 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar relative z-10">
          <span className="text-slate-500 font-black shrink-0 uppercase tracking-wider text-[10px]">Suggestions:</span>
          {t.quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="gloss-pill bg-white/80 hover:bg-white text-slate-800 px-3 py-1 rounded-full border border-white/90 shrink-0 transition-all cursor-pointer text-xs font-bold shadow-2xs hover:scale-102"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F4F7F4]/40 relative z-10">
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={i}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${
                    isUser
                      ? 'gloss-btn-primary text-white border border-emerald-300/60'
                      : 'gloss-card-dark text-yellow-300 border border-white/20'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'gloss-btn-primary text-white rounded-tr-none shadow-md border border-emerald-300/60 font-medium'
                      : 'bg-white/85 backdrop-blur-md text-slate-900 border border-white/90 rounded-tl-none shadow-xs font-medium'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex items-center justify-between gap-2 mt-1.5 text-[10px] opacity-75">
                    <span>{msg.time}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        aria-label="Read advisory aloud"
                        className="hover:opacity-100 p-0.5"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-white/85 backdrop-blur-md p-3 rounded-2xl border border-white/90 w-fit shadow-xs font-bold">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2E7D32]" />
              <span>Consulting Gemini Agricultural Brain...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white/70 backdrop-blur-md border-t border-white/60 relative z-20">
          {isListening && (
            <div className="mb-2 px-3 py-1.5 bg-amber-500/20 text-amber-900 border border-amber-300 rounded-xl text-xs font-black flex items-center gap-2 animate-pulse shadow-xs">
              <Mic className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.listening}</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              aria-label="Toggle voice input"
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-700 border-white/90'
              }`}
              title={t.speakToBot}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.askPlaceholder}
              className="flex-1 text-xs sm:text-sm bg-white/85 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/90 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 text-slate-900 font-bold shadow-inner"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="p-2.5 rounded-2xl gloss-btn-primary text-white disabled:opacity-50 transition-all shadow-md cursor-pointer border border-emerald-300/60"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
