import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, ShieldAlert, Cpu, Leaf, Droplet, ArrowUpRight } from 'lucide-react';
import { Language, YieldForecastData } from '../types';
import { translations } from '../data/translations';

interface YieldForecastingAnalyticsProps {
  language: Language;
  yieldData: YieldForecastData;
}

export const YieldForecastingAnalytics: React.FC<YieldForecastingAnalyticsProps> = ({
  language,
  yieldData,
}) => {
  const t = translations[language];

  const percentAboveHistorical = Math.round(
    ((yieldData.forecastQuintalsPerAcre - yieldData.historicalAverage) / yieldData.historicalAverage) * 100
  );

  return (
    <div className="gloss-card rounded-3xl p-5 sm:p-6 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
      {/* Specular Glint Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.yieldTitle}
            </h3>
            <span className="text-[10px] text-emerald-800 gloss-pill bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-black border border-emerald-300 shadow-2xs">
              DiCRA AI Model v3.2
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">{t.yieldSubtitle}</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 gloss-btn-primary rounded-full text-xs font-black text-white shadow-sm border border-emerald-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-yellow-300" />
          <span>+{percentAboveHistorical}% Above Regional Avg</span>
        </div>
      </div>

      {/* 4 Core Forecasting Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ duration: 0.18 }}
          className="bg-gradient-to-b from-white/90 via-[#F1F8E9]/80 to-[#E8F5E9]/90 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-200/80 shadow-[inset_0_1px_0_#fff,0_4px_12px_rgba(46,125,50,0.08)]"
        >
          <span className="text-[10px] font-black text-[#1B5E20] uppercase tracking-wider block mb-0.5">
            {t.forecastYield}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#1B5E20] drop-shadow-xs">
              {yieldData.forecastQuintalsPerAcre}
            </span>
            <span className="text-xs font-bold text-emerald-800">Qtl / Acre</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Predicted via Sentinel-2</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ duration: 0.18 }}
          className="bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/90 shadow-[inset_0_1px_0_#fff,0_4px_12px_rgba(0,0,0,0.03)]"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            {t.histYield}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 drop-shadow-xs">
              {yieldData.historicalAverage}
            </span>
            <span className="text-xs font-bold text-slate-400">Qtl / Acre</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">State Ag Statistical Board</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ duration: 0.18 }}
          className="bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/90 shadow-[inset_0_1px_0_#fff,0_4px_12px_rgba(0,0,0,0.03)]"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
            <Leaf className="w-3 h-3 text-[#2E7D32]" />
            {t.ndviScore}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 drop-shadow-xs">
              {yieldData.satelliteNdviIndex}
            </span>
            <span className="text-xs font-bold text-slate-400">/ 1.0</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">High Chlorophyll Density</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ duration: 0.18 }}
          className="bg-gradient-to-b from-white/90 via-amber-50/70 to-yellow-50/80 backdrop-blur-md p-3.5 rounded-2xl border border-yellow-200 shadow-[inset_0_1px_0_#fff,0_4px_12px_rgba(234,179,8,0.08)]"
        >
          <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-600" />
            {t.climateRisk}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-900 drop-shadow-xs">
              {yieldData.climaticRisk}
            </span>
            <span className="text-xs font-bold text-amber-700">Stress</span>
          </div>
          <span className="text-[10px] text-amber-800 font-semibold">Stable Trajectory</span>
        </motion.div>
      </div>

      {/* Interactive Growth Trajectory Graph in Frosted Acrylic Well */}
      <div className="bg-white/65 backdrop-blur-md rounded-2xl p-4 border border-white/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#1B5E20]" />
            {t.yieldTrend}
          </span>
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 inline-block shadow-2xs"></span>
              Predicted Yield (Qtl/Acre)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-2xs"></span>
              Rainfall (mm)
            </span>
          </div>
        </div>

        {/* Growth Bars */}
        <div className="grid grid-cols-4 gap-2 text-center pt-1">
          {yieldData.monthlyTrend.map((m, idx) => {
            const heightYield = Math.round((m.projectedYield / 25) * 80);
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col items-center p-2 rounded-xl hover:bg-white/80 transition-all cursor-pointer"
              >
                <div className="h-28 w-full flex items-end justify-center gap-2 pb-1 border-b border-slate-200/80">
                  {/* Yield bar with glossy gradient */}
                  <motion.div
                    className="w-6 gloss-btn-primary rounded-t-lg flex items-start justify-center pt-1 shadow-sm border-t border-x border-emerald-300"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightYield}%` }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                    title={`Yield: ${m.projectedYield} Qtl`}
                  >
                    <span className="text-[10px] font-black text-white leading-none">
                      {m.projectedYield}
                    </span>
                  </motion.div>

                  {/* Rain bar */}
                  <motion.div
                    className="w-3 bg-gradient-to-t from-blue-500 to-sky-400 rounded-t-md shadow-2xs"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(75, Math.max(8, m.rainfallMm))}%` }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 + idx * 0.08 }}
                    title={`Rain: ${m.rainfallMm}mm`}
                  />
                </div>
                <span className="text-xs font-black text-slate-800 mt-2 block">
                  {m.month}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {m.rainfallMm}mm
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
