import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  TrendingUp,
  Droplets,
  Calendar,
  Award,
  DollarSign,
  Check,
  Eye,
  X,
  Search,
  RefreshCw,
  Sparkles,
  Filter,
} from 'lucide-react';
import { Language, CropRecommendation } from '../types';
import { translations } from '../data/translations';

interface AICropEngineProps {
  language: Language;
  recommendations: CropRecommendation[];
}

export const AICropEngine: React.FC<AICropEngineProps> = ({ language, recommendations }) => {
  const t = translations[language];
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(recommendations[0] || null);
  const [filterType, setFilterType] = useState<'all' | 'high_margin' | 'low_water' | 'fast_cycle'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const getCropDisplayName = (c: CropRecommendation) => {
    if (language === 'hi') return c.hindiName;
    if (language === 'pa') return c.punjabiName;
    return c.name;
  };

  // Filter recommendations based on active toggle pill and search
  const filteredCrops = recommendations.filter((crop) => {
    const name = getCropDisplayName(crop).toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'high_margin') return crop.confidence >= 92 || crop.suitabilityTag.toLowerCase().includes('margin') || crop.suitabilityTag.toLowerCase().includes('premium');
    if (filterType === 'low_water') return crop.waterNeed === 'Low';
    if (filterType === 'fast_cycle') return crop.growingPeriodDays <= 115;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const filterTabs = [
    { id: 'all' as const, label: 'All Crops' },
    { id: 'high_margin' as const, label: 'High Profit / Premium' },
    { id: 'low_water' as const, label: 'Low Water (Drought Safe)' },
    { id: 'fast_cycle' as const, label: 'Short Duration (<115d)' },
  ];

  return (
    <div className="gloss-card-gold rounded-3xl p-5 sm:p-6 transition-all shadow-lg relative overflow-hidden">
      {/* Specular Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider">
              {t.aiCropTitle}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-0.5 rounded-full gloss-btn-gold text-slate-950 border border-yellow-300 uppercase tracking-wider shadow-2xs">
              <Award className="w-3 h-3 text-slate-950" />
              DiCRA AI Model v2.4
            </span>
          </div>
          <p className="text-xs text-amber-950/80 font-medium mt-0.5">{t.aiCropSubtitle}</p>
        </div>

        {/* Reload / Re-score Button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl gloss-btn-gold text-slate-950 border border-yellow-300 text-xs font-black transition-all cursor-pointer shadow-sm"
            title="Recalculate AI suitability scores"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Calculating...' : 'Recalculate AI'}</span>
          </motion.button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 relative z-10">
        {/* Toggle Pills with Animated Spring Layout */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-yellow-300/60 shadow-inner">
          {filterTabs.map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilterType(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'text-slate-950 font-black'
                    : 'text-amber-900/70 hover:text-amber-950 hover:bg-yellow-200/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-crop-filter"
                    className="absolute inset-0 gloss-btn-gold rounded-xl -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Real-time Crop Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop or variety..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl text-xs bg-white/95 backdrop-blur-md border border-yellow-300/80 focus:outline-none focus:ring-3 focus:ring-yellow-400 text-slate-950 placeholder:text-slate-400 font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
          />
          <Search className="w-3.5 h-3.5 text-amber-700 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
        {filteredCrops.map((crop, idx) => {
          const isSelected = selectedCrop?.id === crop.id;
          const name = getCropDisplayName(crop);
          const defaultImage =
            crop.imageUrl ||
            'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80';

          return (
            <motion.div
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`rounded-3xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative group backdrop-blur-xl ${
                isSelected
                  ? 'bg-white border-amber-400 shadow-[0_12px_32px_rgba(234,179,8,0.25),inset_0_1.5px_0_#fff] ring-2 ring-yellow-400'
                  : 'bg-white/85 border-white hover:bg-white hover:border-amber-300 hover:shadow-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div>
                {/* Real Crop Photographic Preview */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 group/img bg-slate-100">
                  <img
                    src={defaultImage}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-extrabold text-[11px] shadow-sm border border-white/20">
                      #{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-slate-900 font-bold text-[10px] shadow-sm">
                      {crop.suitabilityTag.split('/')[0].trim()}
                    </span>
                  </div>

                  {/* Confidence Score Pill */}
                  <div className="absolute top-2 right-2 bg-emerald-600/90 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-sm border border-emerald-400/40">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>{crop.confidence}%</span>
                  </div>

                  {/* High-Res View Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage({ url: defaultImage, title: name });
                    }}
                    title="View high-resolution crop photo"
                    className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {/* Crop Name Overlay over image bottom */}
                  <div className="absolute bottom-2 left-2 right-10">
                    <h4 className="text-white font-extrabold text-sm drop-shadow-md truncate">
                      {name}
                    </h4>
                  </div>
                </div>

                {/* Crop Key Indicators */}
                <div className="space-y-1.5 text-xs pt-1 mb-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <TrendingUp className="w-3 h-3 text-[#2E7D32]" />
                      {t.expectedYield}:
                    </span>
                    <span className="font-bold text-slate-800 text-[11px]">{crop.projectedYield}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      {t.waterRequirement}:
                    </span>
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        crop.waterNeed === 'Low'
                          ? 'text-green-700 bg-green-50 border border-green-200'
                          : 'text-blue-700 bg-blue-50 border border-blue-200'
                      }`}
                    >
                      {crop.waterNeed} Need
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      {t.sowingWindow}:
                    </span>
                    <span className="font-semibold text-slate-700 text-[10px]">{crop.sowingWindow}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-700 pt-1.5 border-t border-dashed border-slate-200">
                    <span className="text-[11px] font-semibold text-[#2E7D32]">
                      {t.estRevenue}:
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs">
                      {crop.expectedProfitPerAcre}
                    </span>
                  </div>
                </div>
              </div>

              {/* Select Indicator */}
              <div className="pt-2 text-center border-t border-yellow-100">
                <span
                  className={`text-[11px] font-bold flex items-center justify-center gap-1 transition-colors ${
                    isSelected ? 'text-[#2E7D32]' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>Active Advisory Selected</span>
                    </>
                  ) : (
                    <span>Click for field agronomy prescription</span>
                  )}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Crop Agronomic Detailed Guide in Geometric Dark Card */}
      <AnimatePresence mode="wait">
        {selectedCrop && (
          <motion.div
            key={selectedCrop.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="gloss-card-dark text-white rounded-3xl p-5 sm:p-6 border border-white/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden"
          >
            {/* Specular hairline */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <div className="flex items-start gap-4 max-w-2xl relative z-10">
              {selectedCrop.imageUrl && (
                <img
                  src={selectedCrop.imageUrl}
                  alt={selectedCrop.name}
                  className="w-18 h-18 rounded-2xl object-cover shrink-0 border border-white/30 shadow-md hidden sm:block"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-300">
                    Agronomic Field Prescription &bull; {selectedCrop.name}
                  </span>
                  <span className="text-xs text-slate-500">&bull;</span>
                  <span className="text-xs text-emerald-200/80 font-bold">
                    Life Cycle: {selectedCrop.growingPeriodDays} Days
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedCrop.description[language] || selectedCrop.description.en}
                </p>
              </div>
            </div>

            <div className="shrink-0 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-right w-full sm:w-auto relative z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
              <span className="text-[10px] text-slate-300 block uppercase tracking-wider font-bold">
                Mandi Procurement Base
              </span>
              <span className="text-2xl font-black text-yellow-300 drop-shadow-xs">
                ₹{selectedCrop.marketPricePerQuintal}{' '}
                <span className="text-xs text-slate-300 font-normal">/ Qtl</span>
              </span>
              <span className="block text-[10px] text-emerald-300 font-bold mt-0.5">
                ✓ MSP Assured Contract
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-Resolution Modal Preview */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-bold text-sm">{previewImage.title}</h4>
                  <p className="text-xs text-slate-400">High-Resolution True Crop Field Reference</p>
                </div>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
