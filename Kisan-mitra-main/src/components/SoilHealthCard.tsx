import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, CheckCircle2, AlertTriangle, AlertCircle, Info, Sparkles } from 'lucide-react';
import { Language, SoilHealthProfile } from '../types';
import { translations } from '../data/translations';

interface SoilHealthCardProps {
  language: Language;
  soil: SoilHealthProfile;
}

export const SoilHealthCard: React.FC<SoilHealthCardProps> = ({ language, soil }) => {
  const t = translations[language];
  const [selectedNutrient, setSelectedNutrient] = useState<number>(0);

  // Helper to calculate percentage of meter filled
  const getMeterPercent = (val: number, max: number) => {
    return Math.min(100, Math.max(12, Math.round((val / (max * 1.3)) * 100)));
  };

  const getStatusBadge = (status: 'Optimal' | 'Deficient' | 'Excess') => {
    if (status === 'Optimal') {
      return (
        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t.optimal}
        </span>
      );
    }
    if (status === 'Deficient') {
      return (
        <span className="text-xs font-bold text-red-500 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          {t.deficient}
        </span>
      );
    }
    return (
      <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
        <AlertCircle className="w-3.5 h-3.5" />
        {t.excess}
      </span>
    );
  };

  const currentNutrient = soil.nutrients[selectedNutrient] || soil.nutrients[0];

  return (
    <div className="gloss-card rounded-3xl p-5 sm:p-6 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Specular Glint Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.soilCardTitle}: <span className="text-slate-800">{soil.district}</span> ({soil.soilType})
            </h3>
          </div>

          {/* Quick Soil Properties in Glossy Acrylic Pills */}
          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1 bg-white/70 backdrop-blur-md rounded-full border border-white/90 shadow-2xs">
              <span className="text-slate-400 font-semibold">{t.phLevel}: </span>
              <span className="font-black text-slate-800">{soil.ph}</span>
            </div>
            <div className="px-3 py-1 bg-white/70 backdrop-blur-md rounded-full border border-white/90 shadow-2xs">
              <span className="text-slate-400 font-semibold">{t.organicCarbon}: </span>
              <span className="font-black text-slate-800">{soil.organicCarbonPercent}%</span>
            </div>
          </div>
        </div>

        {/* Interactive NPK Gauges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {soil.nutrients.map((n, idx) => {
            const isSelected = selectedNutrient === idx;
            const pct = getMeterPercent(n.value, n.optimalMax);

            return (
              <motion.button
                key={n.symbol}
                onClick={() => setSelectedNutrient(idx)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                  isSelected
                    ? 'bg-gradient-to-b from-white via-[#F1F8E9] to-[#E8F5E9] border-[#2E7D32] shadow-[0_6px_20px_rgba(46,125,50,0.15),inset_0_1px_0_#fff]'
                    : 'bg-white/60 border-white/80 hover:bg-white/90 hover:border-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-800">{n.name} ({n.symbol})</span>
                  {getStatusBadge(n.status)}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl font-black text-slate-900 drop-shadow-xs">{n.value}</span>
                  <span className="text-[11px] text-slate-400 font-bold">{n.unit}</span>
                </div>

                {/* Geometric Progress Track */}
                <div className="w-full h-2.5 bg-slate-100/80 rounded-full overflow-hidden mb-1.5 p-0.5 border border-slate-200/50">
                  <motion.div
                    className={`h-full rounded-full shadow-xs ${
                      n.status === 'Optimal'
                        ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                        : n.status === 'Deficient'
                        ? 'bg-gradient-to-r from-red-400 to-rose-500'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Target: {n.optimalMin}-{n.optimalMax}</span>
                  <span className="text-slate-600">{pct}%</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Corrective Agronomic Advisory Box in Glossy Acrylic */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNutrient.symbol}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/90 shadow-2xs flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-xl gloss-btn-primary text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 border border-emerald-300">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide block mb-0.5">
                {t.recommendationLabel} ({currentNutrient.name})
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {currentNutrient.recommendation[language] || currentNutrient.recommendation.en}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Button with Gloss Finish */}
      <button
        onClick={() => setSelectedNutrient((prev) => (prev + 1) % soil.nutrients.length)}
        className="w-full mt-4 py-2.5 bg-gradient-to-b from-[#F1F8E9] to-[#DCEDC8] text-[#1B5E20] text-xs font-black rounded-2xl border border-emerald-300 hover:brightness-105 transition-all cursor-pointer shadow-xs"
      >
        Full Analysis Report • Cycle Nutrients (N-P-K)
      </button>
    </div>
  );
};
