import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CloudRain,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Droplets,
  Sprout,
  ScanLine,
  Landmark,
  Layers,
  CheckCircle2,
  Check,
  TrendingUp,
  Wind,
  Sun,
  Thermometer,
  RefreshCw,
  Radio,
} from 'lucide-react';
import { Language, PageTab } from '../types';
import {
  AnimatedRainRadarLive,
  AnimatedMoistureLayer,
  AnimatedPlainRegionType,
  AnimatedGoogleMapLayersInteractive,
  AnimatedCameraScanner,
  AnimatedMicroscopePathogen,
  AnimatedSmartFarmer,
  AnimatedHarvesterTractor,
} from './AnimatedIllustrations';

interface ProblemSolutionViewProps {
  language: Language;
  districtName: string;
  stateName: string;
  onNavigateTab: (tab: PageTab) => void;
}

export const ProblemSolutionView: React.FC<ProblemSolutionViewProps> = ({
  language,
  districtName,
  stateName,
  onNavigateTab,
}) => {
  const isHindi = language === 'hi';
  const isPunjabi = language === 'pa';

  const painPoints = [
    {
      id: 'weather',
      problemTitle: isHindi ? '1. अनिश्चित मौसम व बेमौसम बारिश' : isPunjabi ? '1. ਅਨਿਸ਼ਚਿਤ ਮੌਸਮ ਅਤੇ ਬੇਮੌਸਮੀ ਮੀਂਹ' : '1. Unpredictable Rain & Sudden Storms',
      problemDesc: isHindi
        ? 'अचानक मूसलाधार बारिश, ओलावृष्टि या तेज हवाओं से फसल कटाई से ठीक पहले 25% से 35% तक का नुकसान हो जाता है।'
        : isPunjabi
        ? 'ਅਚਾਨਕ ਤੇਜ਼ ਮੀਂਹ, ਗੜੇਮਾਰੀ ਜਾਂ ਹਵਾਵਾਂ ਨਾਲ ਵਾਢੀ ਤੋਂ ਠੀਕ ਪਹਿਲਾਂ 25% ਤੋਂ 35% ਫਸਲ ਤਬਾਹ ਹੋ ਜਾਂਦੀ ਹੈ।'
        : 'Flash rains, hailstorms, and dry spells strike without warning, destroying 25-35% of standing crops before harvest.',
      solutionTitle: isHindi ? 'समाधान: ISRO व डॉपलर लाइव वर्षा रडार' : isPunjabi ? 'ਹੱਲ: ISRO ਤੇ ਲਾਈਵ ਮੀਂਹ ਰਾਡਾਰ' : 'Solution: ISRO & Doppler Precipitation Radar',
      solutionDesc: isHindi
        ? 'खेत स्तर पर 3 घंटे पहले बारिश, मेघ गर्जन और हवा की गति का लाइव नाउकास्ट। सिंचाई व दवा छिड़काव का सही समय।'
        : isPunjabi
        ? 'ਖੇਤ ਪੱਧਰ ਤੇ 3 ਘੰਟੇ ਪਹਿਲਾਂ ਮੀਂਹ ਅਤੇ ਹਵਾ ਦਾ ਲਾਈਵ ਅਲਰਟ। ਸਪਰੇਅ ਅਤੇ ਸਿੰਚਾਈ ਦਾ ਸਹੀ ਸਮਾਂ।'
        : 'Sub-district nowcasting 3 hours before cloudbursts. Plan irrigation and pesticide spraying with satellite precision.',
      badgeText: isHindi ? 'लाइव डॉपलर रडार' : 'Live Doppler Radar',
      illustration: <AnimatedRainRadarLive className="w-full h-44" />,
      actionTab: 'weather' as PageTab,
      actionLabel: isHindi ? 'लाइव मौसम व 7-दिवसीय पूर्वानुमान खोलें' : isPunjabi ? 'ਲਾਈਵ ਮੌਸਮ ਤੇ ਮੀਂਹ ਪੂਰਵ-ਅਨੁਮਾਨ ਖੋਲ੍ਹੋ' : 'Open Live Weather & Forecast',
      accentColor: 'sky',
    },
    {
      id: 'soil',
      problemTitle: isHindi ? '2. मिट्टी की कमजोरी व खाद का अत्यधिक खर्च' : isPunjabi ? '2. ਮਿੱਟੀ ਦੀ ਕਮਜ਼ੋਰੀ ਤੇ ਖਾਦ ਦਾ ਵਾਧੂ ਖਰਚ' : '2. Soil Degradation & High Fertilizer Bills',
      problemDesc: isHindi
        ? 'मिट्टी की जांच के अभाव में जरूरत से ज्यादा यूरिया और डीएपी डालने से जमीन सख्त होती है और फसल लागत लगातार बढ़ती है।'
        : isPunjabi
        ? 'ਮਿੱਟੀ ਟੈਸਟ ਨਾ ਹੋਣ ਕਰਕੇ ਜ਼ਿਆਦਾ ਯੂਰੀਆ ਤੇ ਡੀਏਪੀ ਪਾਉਣ ਨਾਲ ਜ਼ਮੀਨ ਖਰਾਬ ਹੁੰਦੀ ਹੈ ਅਤੇ ਲਾਗਤ ਵਧਦੀ ਹੈ।'
        : 'Blind application of excess Urea & DAP degrades soil organic carbon and balloons cultivation costs per acre.',
      solutionTitle: isHindi ? 'समाधान: डिजिटल मृदा जांच व संतुलित NPK डोज' : isPunjabi ? 'ਹੱਲ: ਡਿਜੀਟਲ ਮਿੱਟੀ ਜਾਂਚ ਤੇ NPK ਡੋਜ਼' : 'Solution: AI Soil Profile & Precision N-P-K Dosing',
      solutionDesc: isHindi
        ? 'मिट्टी के प्रकार और फसल के अनुसार यूरिया, डीएपी, जिंक व पोटाश की सही मात्रा। 20-30% खाद की बचत और भरपूर उपज।'
        : isPunjabi
        ? 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਨੁਸਾਰ ਖਾਦ ਦੀ ਸਹੀ ਮਾਤਰਾ। 20-30% ਖਾਦ ਦੀ ਬੱਚਤ ਅਤੇ ਵਧੇਰੇ ਝਾੜ।'
        : 'Exact split fertilizer dosage calculated per bigha/acre based on Soil Health Card benchmarks and root-zone moisture.',
      badgeText: isHindi ? '78% नमी ट्रैकिंग' : '78% Moisture Tracking',
      illustration: <AnimatedMoistureLayer className="w-full h-44" />,
      actionTab: 'crops' as PageTab,
      actionLabel: isHindi ? 'मृदा रिपोर्ट व खाद सलाह' : isPunjabi ? 'ਮਿੱਟੀ ਰਿਪੋਰਟ ਤੇ ਖਾਦ ਸਲਾਹ' : 'Check Soil & Crop Advisory',
      accentColor: 'emerald',
    },
    {
      id: 'disease',
      problemTitle: isHindi ? '3. फसल रोग व कीटों की देर से पहचान' : isPunjabi ? '3. ਫਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਦੇਰੀ ਨਾਲ ਪਛਾਣ' : '3. Delayed Crop Disease Identification',
      problemDesc: isHindi
        ? 'पत्ते पीले पड़ने, फफूंद या सुंडी का पता देर से चलता है। दुकानदार गलत कीटनाशक देकर हजारों रुपये बर्बाद करा देते हैं।'
        : isPunjabi
        ? 'ਪੱਤਿਆਂ ਤੇ ਉੱਲੀ ਜਾਂ ਸੁੰਡੀ ਦਾ ਦੇਰ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ। ਗਲਤ ਸਪਰੇਅ ਨਾਲ ਹਜ਼ਾਰਾਂ ਰੁਪਏ ਬਰਬਾਦ ਹੁੰਦੇ ਹਨ।'
        : 'Pest outbreaks and fungal blights go undetected until it is too late, leading to panic spraying of wrong chemicals.',
      solutionTitle: isHindi ? 'समाधान: AI कैमरा से 5 सेकंड में फसल डॉक्टर' : isPunjabi ? 'ਹੱਲ: AI ਕੈਮਰੇ ਨਾਲ 5 ਸੈਕਿੰਡ ਚ ਫਸਲ ਡਾਕਟਰ' : 'Solution: 5-Second Mobile Camera Crop Doctor',
      solutionDesc: isHindi
        ? 'खराब पत्ते की फोटो खींचें — AI तुरंत बीमारी का नाम, लक्षण और सस्ते घरेलू जैविक व वैज्ञानिक कीटनाशक बताता है।'
        : isPunjabi
        ? 'ਖਰਾਬ ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚੋ — AI ਤੁਰੰਤ ਬਿਮਾਰੀ ਅਤੇ ਸਸਤੇ ਜੈਵਿਕ ਤੇ ਰਸਾਇਣਕ ਇਲਾਜ ਦੱਸਦਾ ਹੈ।'
        : 'Snap a leaf photo with your mobile camera. Instant diagnosis with chemical and zero-budget organic remedies.',
      badgeText: isHindi ? 'Gemini AI विजन' : 'Gemini AI Vision',
      illustration: <AnimatedCameraScanner className="w-full h-44" />,
      actionTab: 'diagnostics' as PageTab,
      actionLabel: isHindi ? 'फसल डॉक्टर जांचें' : isPunjabi ? 'ਫਸਲ ਡਾਕਟਰ ਜਾਂਚੋ' : 'Launch Crop Doctor Scanner',
      accentColor: 'rose',
    },
    {
      id: 'market',
      problemTitle: isHindi ? '4. मंडी भाव में धोखा व खेती का हिसाब न होना' : isPunjabi ? '4. ਮੰਡੀ ਭਾਵ ਵਿੱਚ ਧੋਖਾ ਤੇ ਖਰਚੇ ਦਾ ਹਿਸਾਬ ਨਾ ਹੋਣਾ' : '4. Mandi Price Exploitation & No Farm Ledger',
      problemDesc: isHindi
        ? 'निकटतम मंडियों में सही भाव की जानकारी न होने से बिचौलिये कम दाम पर माल खरीदते हैं। खेती के खर्च का लिखित हिसाब नहीं रहता।'
        : isPunjabi
        ? 'ਮੰਡੀਆਂ ਦੇ ਸਹੀ ਰੇਟ ਨਾ ਪਤਾ ਹੋਣ ਕਰਕੇ ਵਿਚੋਲੇ ਘੱਟ ਭਾਅ ਦਿੰਦੇ ਹਨ। ਖੇਤੀ ਖਰਚਿਆਂ ਦਾ ਪੱਕਾ ਰਿਕਾਰਡ ਨਹੀਂ ਰਹਿੰਦਾ।'
        : 'Middlemen exploit information gaps to buy crops below MSP. Farmers lack a systematic record of input expenses and profits.',
      solutionTitle: isHindi ? 'समाधान: डिजिटल बहीखाता व लाइव मंडी भाव' : isPunjabi ? 'ਹੱਲ: ਡਿਜੀਟਲ ਬਹੀ-ਖਾਤਾ ਤੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ' : 'Solution: Digital Farm Khata & Real-Time Mandi Rates',
      solutionDesc: isHindi
        ? 'खाद, बीज, जुताई और मजदूरी का आसान डिजिटल खाता। लाइव न्यूनतम समर्थन मूल्य (MSP) और शुद्ध मुनाफे का सटीक हिसाब।'
        : isPunjabi
        ? 'ਖਾਦ, ਬੀਜ ਅਤੇ ਡੀਜ਼ਲ ਦਾ ਸੌਖਾ ਡਿਜੀਟਲ ਹਿਸਾਬ। ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਅਤੇ ਅਸਲ ਮੁਨਾਫੇ ਦੀ ਗਣਨਾ।'
        : 'Track every rupee spent on diesel, seeds, and labor. Monitor MSP premiums and harvest profit margins securely.',
      badgeText: isHindi ? 'डिजिटल बहीखाता' : 'Digital Khata',
      illustration: <AnimatedHarvesterTractor className="w-full h-44" />,
      actionTab: 'khata' as PageTab,
      actionLabel: isHindi ? 'किसान बहीखाता खोलें' : isPunjabi ? 'ਕਿਸਾਨ ਬਹੀ-ਖਾਤਾ ਖੋਲ੍ਹੋ' : 'Open Farm Ledger (Khata)',
      accentColor: 'amber',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero Showcase Card */}
      <div className="gloss-card-emerald rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-emerald-200 text-xs font-black mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>
              {isHindi ? 'समस्या और समाधान' : isPunjabi ? 'ਸਮੱਸਿਆ ਅਤੇ ਹੱਲ' : 'Problem & Solution Blueprint'}
            </span>
            <span className="text-white/60">•</span>
            <span className="text-white">
              {districtName}, {stateName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {isHindi
              ? 'भारतीय खेती की 4 वास्तविक समस्याएँ और "किसान मित्र" का डिजिटल समाधान'
              : isPunjabi
              ? 'ਭਾਰਤੀ ਖੇਤੀ ਦੀਆਂ 4 ਅਸਲ ਮੁਸ਼ਕਲਾਂ ਅਤੇ "ਕਿਸਾਨ ਮਿੱਤਰ" ਦਾ ਡਿਜੀਟਲ ਹੱਲ'
              : '4 Core Agricultural Challenges & Kisan Mitra\'s Real-Time AI Solutions'}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            {isHindi
              ? 'मौसम की अनिश्चितता, मिट्टी की कमजोरी, फसल रोग और मंडी घाटे को समाप्त करने के लिए इसरो सेटेलाइट, एआई फसल डॉक्टर और डिजिटल बहीखाता एक ही मंच पर।'
              : isPunjabi
              ? 'ਮੌਸਮ ਦੇ ਨੁਕਸਾਨ, ਖਾਦਾਂ ਦੀ ਬੇਲੋੜੀ ਵਰਤੋਂ ਅਤੇ ਫਸਲ ਰੋਗਾਂ ਨੂੰ ਦੂਰ ਕਰਨ ਲਈ ਇਕੋ ਥਾਂ ਸਾਰੀਆਂ ਆਧੁਨਿਕ ਸਹੂਲਤਾਂ।'
              : 'Empowering smallholder farmers with ESA Sentinel-2 multispectral scans, instant camera diagnostics, and transparent accounting.'}
          </p>

          {/* Quick CTA to Jump to Live Farm Dashboard */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <motion.button
              id="cta-enter-dashboard"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigateTab('dashboard')}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer border border-amber-300 transition-all"
            >
              <span>
                {isHindi ? 'सीधे खेत डैशबोर्ड खोलें' : isPunjabi ? 'ਸਿੱਧਾ ਖੇਤ ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ' : 'Enter Live Farm Dashboard'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigateTab('diagnostics')}
              className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer backdrop-blur-md"
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>
                {isHindi ? 'फसल डॉक्टर (कैमरा जांच)' : isPunjabi ? 'ਫਸਲ ਡਾਕਟਰ (ਕੈਮਰਾ)' : 'AI Crop Doctor'}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigateTab('geospatial')}
              className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer backdrop-blur-md"
            >
              <CloudRain className="w-4 h-4 text-sky-300" />
              <span>
                {isHindi ? 'बारिश रडार व नक्शा' : isPunjabi ? 'ਮੀਂਹ ਰਾਡਾਰ ਤੇ ਨਕਸ਼ਾ' : 'Doppler Rain Radar'}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 4 Problem vs Solution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {painPoints.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="gloss-card rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            {/* Specular Glint */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 dark:via-emerald-400/30 to-transparent pointer-events-none" />

            <div>
              {/* Embedded Real Animated Visual */}
              <div className="mb-4">{item.illustration}</div>

              {/* Problem Section (Red/Amber tone) */}
              <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-500/30 rounded-2xl p-3.5 mb-3.5">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-black mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.problemTitle}</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {item.problemDesc}
                </p>
              </div>

              {/* Solution Section (Emerald tone) */}
              <div className="bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-500/30 rounded-2xl p-3.5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 text-xs font-black">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.solutionTitle}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    {item.badgeText}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {item.solutionDesc}
                </p>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                {isHindi ? 'तुरंत इस्तेमाल करें:' : 'Ready to use:'}
              </span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigateTab(item.actionTab)}
                className="px-3.5 py-1.5 rounded-xl gloss-btn-primary text-white text-xs font-black flex items-center gap-1.5 shadow-sm border border-emerald-300/50 cursor-pointer"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Geospatial & Plain Region Overview Banner with Animation */}
      <div className="gloss-card rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-emerald-500/20 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 inline-block">
              {isHindi ? 'भौगोलिक व क्षेत्रीय स्तर का नक्शा' : 'Google Maps Style Agro-Layers'}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHindi
                ? 'मैदानी क्षेत्र, मिट्टी की नमी और बारिश का लाइव मल्टी-लेयर नक्शा'
                : 'Alluvial Plain Regions, Soil Moisture & Doppler Rain Animated Layers'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {isHindi
                ? 'गूगल मैप्स की तरह सीधे सेटेलाइट, मैदानी क्षेत्र (Plain Region), वर्षा रडार और जमीन की गहराई में 0-100% नमी के स्तर को लाइव देखें और अपने खेत की सेहत परखें।'
                : 'Switch between photorealistic satellite, alluvial terrain plains, live rain Doppler radar, and subterranean root moisture heatmaps with zero latency.'}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onNavigateTab('geospatial')}
                className="px-4 py-2 rounded-xl gloss-btn-primary text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {isHindi ? 'लाइव नक्शा लेयर खोलें' : 'Open Interactive Map Layers'}
                </span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <AnimatedPlainRegionType className="w-full h-44" />
          </div>
        </div>
      </div>
    </div>
  );
};
