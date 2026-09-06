import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Satellite, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface PageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  customMessage?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  onComplete,
  customMessage,
}) => {
  const [progress, setProgress] = useState(15);
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    'Initializing Krishi Mitra Core & DiCRA Sandbox...',
    'Connecting ESA Sentinel-2 MSI (10m Resolution) Feed...',
    'Harmonizing SoilGrids 250m & Soil Health Card Mission...',
    'Synchronizing Open-Meteo & IMD Agromet Stations...',
    'Ready: Digital Public Good Agricultural Intelligence Online',
  ];

  useEffect(() => {
    if (!isLoading) return;

    setProgress(20);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 22) + 10;
        return next > 98 ? 98 : next;
      });
    }, 280);

    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => {
      clearInterval(interval);
      clearInterval(stageInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (progress >= 98 && isLoading) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1B5E20] via-[#2E7D32] to-[#124116] text-white p-6 selection:bg-yellow-400"
        >
          {/* Subtle background satellite grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#86efac_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

          {/* Central Animated Loader Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-md border border-white/25 rounded-3xl p-7 shadow-2xl flex flex-col items-center text-center"
          >
            {/* Spinning Satellite Halo with Sprout Badge */}
            <div className="relative mb-5">
              {/* Outer rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-yellow-300/60 flex items-center justify-center"
              />

              {/* Counter-rotating satellite dot */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_12px_#fde047] -top-1.5 absolute" />
              </motion.div>

              {/* Center Logo Icon with Breathing Scale */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-2 bg-gradient-to-br from-white to-[#E8F5E9] rounded-full shadow-lg flex items-center justify-center"
              >
                <Sprout className="w-9 h-9 text-[#2E7D32]" />
              </motion.div>
            </div>

            {/* Title & DPG Tag */}
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black tracking-tight text-white">Krishi Mitra</h2>
              <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                DPG v2.4
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 mb-6 font-medium">
              National Agricultural Intelligence Network
            </p>

            {/* Progress Bar with Liquid Glow */}
            <div className="w-full bg-black/30 rounded-full h-3 p-0.5 border border-white/20 mb-3 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-emerald-300 to-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.7)]"
                initial={{ width: '10%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
              />
            </div>

            {/* Stage Progress Feedback */}
            <div className="flex items-center justify-between w-full text-[11px] text-emerald-200/90 font-mono mb-2">
              <span className="truncate pr-2">{customMessage || stages[stageIndex]}</span>
              <span className="font-bold text-yellow-300 shrink-0">{progress}%</span>
            </div>

            {/* Verification Checklist Indicator */}
            <div className="flex items-center gap-1 text-[11px] text-emerald-100 font-semibold mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
              <span>Grounded with Real-Time Satellite & Agromet Models</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
