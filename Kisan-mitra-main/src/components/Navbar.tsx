import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Languages,
  Bell,
  Home,
  Sprout,
  Stethoscope,
  Map,
  Building2,
  BookOpen,
  User,
  LogOut,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Radio,
  Sun,
  Moon,
  HelpCircle,
} from 'lucide-react';
import { Language, AppMode, PageTab, UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenChat: () => void;
  onReload: () => void;
  isReloading?: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  onOpenChat,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  const userDisplayName = user?.displayName
    ? user.displayName.split(' ')[0]
    : currentUser
    ? currentUser.name.split(' ')[0]
    : null;

  // Nav items including Problem & Solution
  const navItems: Array<{ id: PageTab; labelHindi: string; labelEng: string; icon: React.ReactNode }> = [
    { id: 'problemsolution', labelHindi: 'समस्या व समाधान', labelEng: 'Why Kisan Mitra', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'dashboard', labelHindi: 'खेत डैशबोर्ड', labelEng: 'Farm Hub', icon: <Home className="w-5 h-5" /> },
    { id: 'geospatial', labelHindi: 'नक्शा व वर्षा रडार', labelEng: 'Satellite Radar', icon: <Map className="w-5 h-5" /> },
    { id: 'diagnostics', labelHindi: 'फसल डॉक्टर', labelEng: 'Crop Doctor', icon: <Sprout className="w-5 h-5" /> },
    { id: 'crops', labelHindi: 'मृदा व खाद सलाह', labelEng: 'Soil Advisory', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'khata', labelHindi: 'किसान बहीखाता', labelEng: 'Farm Ledger', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'state', labelHindi: 'राज्य ग्रिड', labelEng: 'State Grid', icon: <Building2 className="w-5 h-5" /> },
  ];

  const handleSelectTab = (tab: PageTab) => {
    onTabChange(tab);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Precision top gradient line */}
      <div className="w-full h-[2.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 z-50 sticky top-0" />

      {/* Main Clean Sticky Header */}
      <header className="sticky top-[2.5px] z-40 bg-white/95 dark:bg-[#08190F]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-800/30 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          
          {/* Left: Hamburger & Brand "Kisan Mitra" */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              id="mobile-drawer-toggle"
              aria-label="Open navigation menu"
              className="p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 active:scale-95 transition-all cursor-pointer border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Brand Logo: "Kisan Mitra" (किसान मित्र) */}
            <button
              onClick={() => handleSelectTab('problemsolution')}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
              </div>
              <div className="flex items-center tracking-tight">
                <span className="text-xl sm:text-2xl font-black text-[#0A4D23] dark:text-emerald-300">
                  Kisan
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#10B981] dark:text-amber-400 ml-1">
                  Mitra
                </span>
              </div>
            </button>
          </div>

          {/* Desktop quick tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-emerald-950/40 p-1 rounded-2xl border border-slate-200/70 dark:border-emerald-800/30">
            {navItems.slice(0, 6).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-emerald-800 text-emerald-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-emerald-600/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {language === 'en' ? item.labelEng : item.labelHindi}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Dark Mode Toggle, AI, Lang, Notifications, Login */}
          <div className="flex items-center gap-2">
            {/* Dark Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onToggleDarkMode}
              id="theme-mode-toggle"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              className="p-2 sm:px-2.5 sm:py-2 rounded-2xl text-slate-700 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-emerald-900/60 border border-slate-200/80 dark:border-emerald-700/40 transition-all cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </motion.button>

            {/* AI Assistant Pill Button */}
            <button
              onClick={onOpenChat}
              id="ai-assistant-header-pill"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-black border border-emerald-300 dark:border-emerald-600/50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI</span>
            </button>

            {/* Language Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                id="language-selector-btn"
                className="p-2 sm:px-3 sm:py-1.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-slate-200/80 dark:border-emerald-800/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                title="Switch Language"
              >
                <Languages className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span className="hidden sm:inline uppercase text-[11px] font-black">
                  {language === 'hi' ? 'हिंदी' : language === 'pa' ? 'ਪੰਜਾਬੀ' : 'ENG'}
                </span>
              </button>

              {/* Language Dropdown Menu */}
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-emerald-700/40 p-1.5 z-50 space-y-1"
                  >
                    {[
                      { code: 'hi', label: 'हिंदी (Hindi)' },
                      { code: 'en', label: 'English' },
                      { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
                    ].map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          onLanguageChange(l.code as Language);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                          language === l.code
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{l.label}</span>
                        {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 sm:p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-slate-200/80 dark:border-emerald-800/40 transition-all cursor-pointer relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-emerald-700/40 p-3 z-50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 font-black text-slate-900 dark:text-white">
                      <span>ताज़ा कृषि सूचनाएं (Alerts)</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-bold">2 New</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800">
                      <p className="font-bold text-emerald-950 dark:text-emerald-200">🌾 गेहूं बुवाई व यूरिया सलाह</p>
                      <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">मौसम साफ है, पहली सिंचाई के बाद 45 किग्रा यूरिया/एकड़ का छिड़काव करें।</p>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800">
                      <p className="font-bold text-amber-950 dark:text-amber-200">📡 सेटेलाइट पास अपडेट</p>
                      <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">Sentinel-2 द्वारा आपके खेत का नया NDVI स्वास्थ्य इंडेक्स सिंक हो गया है।</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile / Auth Quick Button */}
            <button
              onClick={onOpenAuth}
              id="header-user-profile-btn"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black ${
                user || currentUser
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100'
              }`}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={userDisplayName || 'User'}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {userDisplayName || (language === 'hi' ? 'लॉगिन' : 'Login')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ===============================================================
          SLIDE-OVER DRAWER MENU
          Dark forest green background (#093317), squircle logo, Kisan Mitra
          =============================================================== */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            />

            {/* Drawer Container */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] bg-[#093317] text-white z-50 flex flex-col shadow-2xl overflow-y-auto border-r border-emerald-800/40"
            >
              {/* Drawer Top Header */}
              <div className="p-6 pb-5 flex items-center justify-between border-b border-emerald-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#34D399] flex items-center justify-center text-[#064E3B] shadow-md">
                    <Sprout className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div className="flex items-center tracking-tight">
                    <span className="text-2xl font-black text-white">
                      Kisan
                    </span>
                    <span className="text-2xl font-black text-[#FACC15] ml-1">
                      Mitra
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-xl text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-tag in drawer */}
              <div className="px-6 py-3 bg-emerald-950/50 border-b border-emerald-900/40 flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI इंजन ऑनलाइन</span>
                </span>
                <span className="text-[10px] bg-emerald-800/60 px-2 py-0.5 rounded-full font-mono text-emerald-200">
                  v2.6 DiCRA
                </span>
              </div>

              {/* Menu Items List */}
              <div className="p-4 space-y-1.5 flex-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#155E2E] text-white shadow-md border border-emerald-500/40'
                          : 'text-emerald-100 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={isActive ? 'text-[#FACC15]' : 'text-emerald-300'}>
                          {item.icon}
                        </span>
                        <span className="tracking-wide">
                          {language === 'en' ? item.labelEng : item.labelHindi}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#FACC15] translate-x-0.5' : 'text-emerald-600'}`} />
                    </button>
                  );
                })}

                {/* Profile / Auth Link */}
                <button
                  onClick={() => {
                    onOpenAuth();
                    setIsDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold text-emerald-100 hover:bg-white/5 transition-all cursor-pointer mt-2 pt-3 border-t border-emerald-900/60"
                >
                  <div className="flex items-center gap-3.5">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-6 h-6 rounded-full border border-emerald-400 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <User className="w-5 h-5 text-emerald-300" />
                    )}
                    <span>
                      {user?.displayName || (currentUser ? currentUser.name : (language === 'hi' ? 'किसान लॉगिन / खाता' : 'Farmer Login'))}
                    </span>
                  </div>
                  {user || currentUser ? (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      सक्रिय
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  )}
                </button>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-emerald-900/60 bg-[#062410] space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>डिजिटल पब्लिक गुड (DPG) सर्टिफाइड</span>
                </div>
                <div className="text-[11px] text-emerald-400/60">
                  ISRO Bhuvan & Sentinel-2 डेटा द्वारा संचालित
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

