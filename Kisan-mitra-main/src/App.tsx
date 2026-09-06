import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveWeatherCard } from './components/LiveWeatherCard';
import { SoilHealthCard } from './components/SoilHealthCard';
import { AICropEngine } from './components/AICropEngine';
import { YieldForecastingAnalytics } from './components/YieldForecastingAnalytics';
import { GeospatialMap } from './components/GeospatialMap';
import { AIDiseaseDiagnostic } from './components/AIDiseaseDiagnostic';
import { StateCooperationView } from './components/StateCooperationView';
import { GeminiChatbotModal } from './components/GeminiChatbotModal';
import { VoiceAssistantButton } from './components/VoiceAssistantButton';
import { Footer } from './components/Footer';
import { PageLoader } from './components/PageLoader';
import { AuthView } from './components/AuthView';
import { FarmKhataView } from './components/FarmKhataView';
import { ProblemSolutionView } from './components/ProblemSolutionView';
import { Language, AppMode, PageTab, UserProfile } from './types';
import { DISTRICT_PRESETS, DistrictPreset } from './data/mockData';
import { translations } from './data/translations';
import {
  AnimatedSatelliteScan,
  AnimatedGoldenWheatFarm,
  AnimatedSmartFarmer,
  AnimatedSoilSensor,
  AnimatedMultispectralScanner,
  AnimatedDopplerRadar,
  AnimatedAgriDrone,
  AnimatedElevationHydrology,
  AnimatedPlantGrowthCycle,
  AnimatedSoilLabFlask,
  AnimatedDripIrrigation,
  AnimatedHarvesterTractor,
  AnimatedCameraScanner,
  AnimatedMicroscopePathogen,
  AnimatedOrganicShield,
  AnimatedHealthyLeafGlow,
  AnimatedStateLogisticsGrid,
  AnimatedGrainSiloStorage,
  AnimatedCropInsuranceDrone,
  AnimatedAgriDataHub,
  AnimatedKisanIdCard,
  AnimatedFarmSunrise,
  AnimatedSecurityShield,
  AnimatedSmsOtpDelivery,
} from './components/AnimatedIllustrations';
import {
  MapPin,
  Satellite,
  Sprout,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Layers,
  Stethoscope,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<AppMode>('farmer');
  const [activeTab, setActiveTab] = useState<PageTab>('problemsolution');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('shivpuri');
  const [customDistrictName, setCustomDistrictName] = useState<string>('Shivpuri');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  // Dark Mode State with LocalStorage Persistence & System Preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('kisan_mitra_dark_mode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('kisan_mitra_dark_mode', String(isDarkMode));
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Authenticated User State with LocalStorage Persistence
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('kisan_mitra_user') || localStorage.getItem('krishi_mitra_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Support direct /login and #login navigation
  useEffect(() => {
    const handleUrlRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#login' || hash === '#auth' || path.endsWith('/login')) {
        setActiveTab('auth');
      }
    };
    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    return () => window.removeEventListener('hashchange', handleUrlRoute);
  }, []);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('kisan_mitra_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    // Switch to appropriate view based on role
    if (user.role === 'officer') {
      setMode('state');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('kisan_mitra_user');
      localStorage.removeItem('krishi_mitra_user');
    } catch (e) {
      console.error(e);
    }
  };

  const handleReloadTelemetry = () => {
    setIsReloading(true);
    setIsLoading(true);
  };

  const t = translations[language];

  // Framer motion variants for staggered entry and organic hover interactions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardHoverProps = {
    whileHover: {
      y: -3,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  // Resolve current active district profile
  const getActiveProfile = (): DistrictPreset => {
    const key = selectedDistrictId.toLowerCase();
    if (DISTRICT_PRESETS[key]) {
      return DISTRICT_PRESETS[key];
    }
    // Partial matches
    if (key.includes('indore') || key.includes('malwa') || key.includes('mp') || key.includes('bhopal')) {
      return { ...DISTRICT_PRESETS.indore, name: customDistrictName };
    }
    if (key.includes('ludhiana') || key.includes('punjab') || key.includes('bhatinda') || key.includes('amritsar')) {
      return { ...DISTRICT_PRESETS.ludhiana, name: customDistrictName };
    }
    // Default fallback to Shivpuri with custom title
    return {
      ...DISTRICT_PRESETS.shivpuri,
      name: customDistrictName || 'Shivpuri',
    };
  };

  const currentProfile = getActiveProfile();

  const handleDistrictSelect = (districtInput: string) => {
    setCustomDistrictName(districtInput);
    const normalized = districtInput.toLowerCase().trim();
    if (normalized.includes('indore')) {
      setSelectedDistrictId('indore');
    } else if (normalized.includes('ludhiana') || normalized.includes('punjab')) {
      setSelectedDistrictId('ludhiana');
    } else if (normalized.includes('shivpuri')) {
      setSelectedDistrictId('shivpuri');
    } else {
      setSelectedDistrictId(normalized);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F4] dark:bg-[#06140B] text-slate-800 dark:text-slate-100 selection:bg-[#C8E6C9] dark:selection:bg-emerald-800 transition-colors duration-200">
      {/* Animated Page Boot Loader */}
      <PageLoader
        isLoading={isLoading}
        onComplete={() => {
          setIsLoading(false);
          setIsReloading(false);
        }}
        customMessage={isReloading ? 'Refreshing Real-Time ISRO Bhuvan & Sentinel Telemetry...' : undefined}
      />

      {/* Top Navigation with Animated Logo, Page Tabs, and Auth trigger */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        mode={mode}
        onModeChange={setMode}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setActiveTab('auth')}
        onOpenChat={() => setIsChatOpen(true)}
        onReload={handleReloadTelemetry}
        isReloading={isReloading}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Hero Section (Search & Agro-Zone Selector) - shown on dashboard or when changing zones */}
      {activeTab === 'dashboard' && (
        <HeroSection
          language={language}
          selectedDistrict={selectedDistrictId}
          onDistrictSelect={handleDistrictSelect}
          onOpenVoice={() => setIsChatOpen(true)}
          currentUser={currentUser}
          onNavigateTab={setActiveTab}
        />
      )}

      {/* Main Content Area with Animated Page Transition Switch */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {/* ===============================================================
              PAGE 0: PROBLEM & SOLUTION VIEW (DIRECT DEFAULT LANDING PAGE)
              =============================================================== */}
          {activeTab === 'problemsolution' && (
            <motion.div
              key="page-problemsolution"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              <ProblemSolutionView
                language={language}
                districtName={currentProfile.name}
                stateName={currentProfile.state}
                onNavigateTab={setActiveTab}
              />
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 1: DASHBOARD
              =============================================================== */}
          {activeTab === 'dashboard' && (
            <motion.div
              key={`page-dashboard-${selectedDistrictId}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {/* Active Telemetry Banner */}
              <motion.div
                variants={cardItemVariants}
                {...cardHoverProps}
                className="gloss-card border border-white/90 rounded-2xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-2 shadow-sm cursor-default relative overflow-hidden"
              >
                {/* Specular Glint Top Rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl gloss-btn-primary text-white flex items-center justify-center font-bold text-xs shadow-xs border border-emerald-300/60">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-black text-slate-900">
                      Active Advisory Zone: <span className="text-[#2E7D32]">{currentProfile.name} ({currentProfile.state})</span>
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Grounded with Sentinel-2 MSI 10m & Agromet Station Lat: {currentProfile.lat}°N, Lon: {currentProfile.lon}°E
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full gloss-pill bg-emerald-500/15 text-emerald-800 border border-emerald-300 shadow-2xs">
                    <Satellite className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                    Satellite Sync: 100%
                  </span>
                </div>
              </motion.div>

              {/* Animated Illustrations Strip for Dashboard (>3 Animated Images) */}
              <motion.div variants={cardItemVariants} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Live Telemetry Visualizations (4 Active Animated Channels)
                  </h3>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
                    ISRO Bhuvan & Sentinel Feed
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AnimatedSatelliteScan />
                  <AnimatedGoldenWheatFarm />
                  <AnimatedSmartFarmer />
                  <AnimatedSoilSensor />
                </div>
              </motion.div>

              {/* Row 1: Weather & Soil Health */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <motion.div
                  variants={cardItemVariants}
                  {...cardHoverProps}
                  className="lg:col-span-5 flex flex-col"
                >
                  <LiveWeatherCard
                    language={language}
                    weather={currentProfile.weather}
                    lat={currentProfile.lat}
                    lon={currentProfile.lon}
                    districtName={currentProfile.name}
                  />
                </motion.div>

                <motion.div
                  variants={cardItemVariants}
                  {...cardHoverProps}
                  className="lg:col-span-7 flex flex-col"
                >
                  <SoilHealthCard
                    language={language}
                    soil={currentProfile.soil}
                  />
                </motion.div>
              </div>

              {/* Row 2: AI Crop Recommendation Engine */}
              <motion.div
                variants={cardItemVariants}
                {...cardHoverProps}
              >
                <AICropEngine
                  language={language}
                  recommendations={currentProfile.recommendations}
                />
              </motion.div>

              {/* Row 3: Yield Analytics & Quick Map Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <motion.div
                  variants={cardItemVariants}
                  {...cardHoverProps}
                  className="lg:col-span-6 flex flex-col"
                >
                  <YieldForecastingAnalytics
                    language={language}
                    yieldData={currentProfile.yieldData}
                  />
                </motion.div>

                <motion.div
                  variants={cardItemVariants}
                  {...cardHoverProps}
                  className="lg:col-span-6 flex flex-col"
                >
                  <GeospatialMap
                    language={language}
                    districtName={currentProfile.name}
                    lat={currentProfile.lat}
                    lon={currentProfile.lon}
                    stateName={currentProfile.state}
                  />
                </motion.div>
              </div>

              {/* Row 4: AI Disease Diagnostic (Plant Pathology Lab) */}
              <motion.div variants={cardItemVariants} {...cardHoverProps}>
                <AIDiseaseDiagnostic language={language} />
              </motion.div>
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 2: GEOSPATIAL & SATELLITE HUB
              =============================================================== */}
          {activeTab === 'geospatial' && (
            <motion.div
              key="page-geospatial"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {/* Page Banner */}
              <div className="gloss-card-dark rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-xl relative overflow-hidden">
                {/* Specular Glint Top Rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 gloss-pill bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-2 shadow-xs">
                      Geospatial & Satellite Intelligence Hub
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      Multispectral Land Cadastre & Weather Radar
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 max-w-2xl leading-relaxed font-medium">
                      Integrating real-time European Space Agency (ESA) Sentinel-2 MSI 10m bands, NASA GIBS daily MODIS reflectance, and ISRO Bhuvan agricultural land-use layers.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReloadTelemetry}
                      className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black gloss-btn-primary text-white shadow-md border border-emerald-300/60 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh Map Tiles</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Animated Illustrations for Geospatial Page (> 3 Animated Images) */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Satellite & Remote Sensing Telemetry (4 Animated Streams)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AnimatedMultispectralScanner />
                  <AnimatedDopplerRadar />
                  <AnimatedAgriDrone />
                  <AnimatedElevationHydrology />
                </div>
              </div>

              {/* Full Interactive Geospatial Map */}
              <GeospatialMap
                language={language}
                districtName={currentProfile.name}
                lat={currentProfile.lat}
                lon={currentProfile.lon}
                stateName={currentProfile.state}
              />
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 3: CROP & SOIL ADVISORY HUB
              =============================================================== */}
          {activeTab === 'crops' && (
            <motion.div
              key="page-crops"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {/* Header Banner */}
              <div className="gloss-card-dark rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-xl relative overflow-hidden">
                {/* Specular Glint Top Rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 gloss-pill bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-2.5 shadow-xs">
                    Agronomic Advisory & Soil Intelligence
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Precision Crop Suitability & NPK Soil Health
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 max-w-2xl leading-relaxed font-medium">
                    Harmonizing regional SoilGrids 250m datasets with Indian Soil Health Card standards to compute optimal split fertilizer doses and crop rotations.
                  </p>
                </div>
              </div>

              {/* 4 Animated Illustrations for Crops Page (> 3 Animated Images) */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Biological & Soil Dynamic Cycles (4 Animated Models)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AnimatedPlantGrowthCycle />
                  <AnimatedSoilLabFlask />
                  <AnimatedDripIrrigation />
                  <AnimatedHarvesterTractor />
                </div>
              </div>

              {/* Core Components */}
              <SoilHealthCard language={language} soil={currentProfile.soil} />
              <AICropEngine language={language} recommendations={currentProfile.recommendations} />
              <YieldForecastingAnalytics language={language} yieldData={currentProfile.yieldData} />
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 4: CROP DOCTOR (AI VISION DIAGNOSTICS)
              =============================================================== */}
          {activeTab === 'diagnostics' && (
            <motion.div
              key="page-diagnostics"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {/* Header Banner */}
              <div className="gloss-card-dark rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-xl relative overflow-hidden">
                {/* Specular Glint Top Rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 gloss-pill bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-2.5 shadow-xs">
                    Gemini Vision Pathology Lab
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    AI Plant Pathology & Disease Diagnostic Clinic
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 max-w-2xl leading-relaxed font-medium">
                    Instant visual inspection of crop leaves detecting rusts, blights, stem borers, and mineral deficiencies with organic and chemical cure protocols.
                  </p>
                </div>
              </div>

              {/* 4 Animated Illustrations for Disease Diagnostic Page (> 3 Animated Images) */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  AI Diagnostic & Plant Pathology Streams (4 Animated Modules)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AnimatedCameraScanner />
                  <AnimatedMicroscopePathogen />
                  <AnimatedOrganicShield />
                  <AnimatedHealthyLeafGlow />
                </div>
              </div>

              {/* Core Disease Diagnostic Component */}
              <AIDiseaseDiagnostic language={language} />
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 6: STATE COOPERATION & POLICY GRID
              =============================================================== */}
          {activeTab === 'state' && (
            <motion.div
              key="page-state"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              {/* Header Banner */}
              <div className="gloss-card-dark rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-xl relative overflow-hidden">
                {/* Specular Glint Top Rim */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 gloss-pill bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-2.5 shadow-xs">
                    AgStack & Inter-State Data Exchange
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    National Agricultural Federation & Food Buffer
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100/90 mt-1.5 max-w-2xl leading-relaxed font-medium">
                    Decentralized state data mesh coordinating surplus food grain distribution, PMFBY crop insurance claims, and emergency climatic buffer reserves.
                  </p>
                </div>
              </div>

              {/* 4 Animated Illustrations for State Cooperation Page (> 3 Animated Images) */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Federated State Infrastructure (4 Animated Systems)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AnimatedStateLogisticsGrid />
                  <AnimatedGrainSiloStorage />
                  <AnimatedCropInsuranceDrone />
                  <AnimatedAgriDataHub />
                </div>
              </div>

              {/* Core State Cooperation Component */}
              <StateCooperationView language={language} />
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 5: FARM LEDGER (BAHIKHATA)
              =============================================================== */}
          {activeTab === 'khata' && (
            <motion.div
              key="page-khata"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              <FarmKhataView language={language} />
            </motion.div>
          )}

          {/* ===============================================================
              PAGE 6: AUTHENTICATION & KISAN ID PORTAL
              =============================================================== */}
          {activeTab === 'auth' && (
            <motion.div
              key="page-auth"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            >
              <AuthView
                language={language}
                currentUser={currentUser}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onClose={() => setActiveTab('dashboard')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Gemini AI Voice Assistant Trigger */}
      <VoiceAssistantButton
        language={language}
        onClick={() => setIsChatOpen(true)}
      />

      {/* Conversational Gemini Chatbot Drawer */}
      <GeminiChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        language={language}
        district={currentProfile.name}
        soilContext={`${currentProfile.soil.soilType}, pH ${currentProfile.soil.ph}, Organic Carbon ${currentProfile.soil.organicCarbonPercent}%`}
      />

      {/* Footer with Real-Time Clock, DPG certification & data attribution */}
      <Footer
        language={language}
        districtName={currentProfile.name}
        stateName={currentProfile.state}
      />
    </div>
  );
}
