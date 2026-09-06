import React, { useState } from 'react';
import { motion } from 'motion/react';

// =========================================================================
// 1. DASHBOARD ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedSatelliteScan: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950 flex items-center justify-center p-4 border border-emerald-500/20 shadow-sm ${className}`}>
      {/* Background Star field / telemetry grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
      
      {/* Scanning conical radar beam */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 rounded-full border border-emerald-500/20 pointer-events-none"
      >
        <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-400/20 via-transparent to-transparent origin-bottom-right" />
      </motion.div>

      {/* Earth Surface Curve */}
      <svg className="absolute -bottom-10 w-80 h-32 text-emerald-900/60" viewBox="0 0 300 100">
        <path d="M0,100 Q150,20 300,100 Z" fill="currentColor" opacity="0.6" />
        <path d="M40,100 Q150,35 260,100 Z" fill="#15803d" opacity="0.4" />
      </svg>

      {/* Orbiting Satellite */}
      <motion.div
        animate={{
          x: [-70, 70, -70],
          y: [-25, 15, -25],
          rotate: [-12, 12, -12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <svg width="72" height="52" viewBox="0 0 100 70" fill="none">
          {/* Solar panels */}
          <rect x="5" y="25" width="28" height="20" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="14" y1="25" x2="14" y2="45" stroke="#38bdf8" strokeWidth="1" />
          <line x1="23" y1="25" x2="23" y2="45" stroke="#38bdf8" strokeWidth="1" />
          
          <rect x="67" y="25" width="28" height="20" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="76" y1="25" x2="76" y2="45" stroke="#38bdf8" strokeWidth="1" />
          <line x1="85" y1="25" x2="85" y2="45" stroke="#38bdf8" strokeWidth="1" />

          {/* Central Satellite Body */}
          <rect x="36" y="20" width="28" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="50" cy="35" r="6" fill="#22c55e" />
          {/* Antenna dish */}
          <path d="M45,20 L40,10 M55,20 L60,10 M38,10 Q50,4 62,10" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Signal transmitter ping */}
          <circle cx="50" cy="7" r="2.5" fill="#facc15" />
        </svg>

        {/* Pulsing telemetry ping downward */}
        <motion.div
          animate={{ scaleY: [0.5, 1.4, 0.5], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-1.5 h-12 bg-gradient-to-b from-yellow-300 via-emerald-400 to-transparent rounded-full mt-1"
        />
      </motion.div>

      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 text-[10px] text-emerald-300 font-bold bg-black/40 px-2 py-0.5 rounded-md border border-emerald-500/30">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>ESA Sentinel-2 MSI 10m Telemetry</span>
      </div>
    </div>
  );
};

export const AnimatedGoldenWheatFarm: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 flex items-end justify-center p-3 border border-amber-200/70 shadow-sm ${className}`}>
      {/* Sun with rotating rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-3 right-6 w-12 h-12"
      >
        <div className="w-10 h-10 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1.5 h-2.5 bg-amber-300 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `rotate(${i * 45}deg) translateY(-18px)` }}
          />
        ))}
      </motion.div>

      {/* Floating clouds */}
      <motion.div
        animate={{ x: [-30, 80, -30] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 left-6 opacity-80"
      >
        <svg width="48" height="22" viewBox="0 0 48 22" fill="#ffffff">
          <path d="M10,20 Q4,20 4,14 Q4,9 10,9 Q12,2 20,4 Q26,0 32,5 Q40,4 40,12 Q44,12 44,16 Q44,20 38,20 Z" />
        </svg>
      </motion.div>

      {/* Swaying Wheat Stalks */}
      <div className="flex items-end justify-center gap-4 z-10 pb-1">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <motion.div
            key={idx}
            animate={{
              rotate: [-(idx % 2 === 0 ? 5 : 8), (idx % 2 === 0 ? 8 : 5), -(idx % 2 === 0 ? 5 : 8)],
            }}
            transition={{
              duration: 2.4 + (idx * 0.3),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: 'bottom center' }}
            className="origin-bottom"
          >
            <svg width="28" height="85" viewBox="0 0 30 90" fill="none">
              <path d="M15,90 Q15,45 15,10" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
              {/* Wheat grains */}
              {[20, 32, 44, 56, 68].map((y, gIdx) => (
                <g key={gIdx}>
                  <ellipse cx="10" cy={y} rx="5" ry="3.5" fill="#f59e0b" transform={`rotate(-25 10 ${y})`} />
                  <ellipse cx="20" cy={y - 4} rx="5" ry="3.5" fill="#fbbf24" transform={`rotate(25 20 ${y - 4})`} />
                </g>
              ))}
              <circle cx="15" cy="12" r="3.5" fill="#f59e0b" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 text-[10px] text-amber-900 font-bold bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-amber-300/80">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span>Golden Sharbati Wheat Crop Maturity: 88%</span>
      </div>
    </div>
  );
};

export const AnimatedSmartFarmer: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-[#1B5E20] to-emerald-950 flex items-center justify-between p-4 border border-emerald-400/30 text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-2 py-0.5 rounded-md border border-emerald-600/40 inline-block mb-1">
          Kisan AI Assistant
        </span>
        <h4 className="text-sm font-extrabold text-white">Smart Farm Advisory</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Real-time agro-met alerts delivered to 4.2M+ farmers in Hindi, Punjabi & English.
        </p>
      </div>

      {/* Animated Farmer Vector Avatar with Tablet */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <svg width="90" height="95" viewBox="0 0 100 110" fill="none">
            {/* Turban / Pagri */}
            <path d="M30,35 Q50,15 70,35 Q78,25 65,15 Q50,10 35,15 Q22,25 30,35 Z" fill="#f59e0b" />
            <path d="M26,38 Q50,22 74,38 Q65,30 50,28 Q35,30 26,38 Z" fill="#d97706" />
            
            {/* Face */}
            <circle cx="50" cy="46" r="15" fill="#fcd34d" />
            <circle cx="45" cy="45" r="2" fill="#451a03" />
            <circle cx="55" cy="45" r="2" fill="#451a03" />
            <path d="M46,52 Q50,56 54,52" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />

            {/* Shoulders & Kurta */}
            <path d="M25,80 Q50,65 75,80 L80,110 L20,110 Z" fill="#ffffff" />
            <path d="M42,68 L50,85 L58,68 Z" fill="#e2e8f0" />

            {/* Smart Tablet Held in Hands */}
            <rect x="35" y="78" width="30" height="22" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="50" cy="89" r="3" fill="#22c55e" />
          </svg>

          {/* Hologram beam emitting from tablet */}
          <motion.div
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-12 left-6 w-12 h-6 bg-cyan-400/30 blur-xs rounded-full pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
};

export const AnimatedSoilSensor: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-900/30 via-amber-950 to-stone-950 p-4 border border-amber-600/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      {/* Subterranean soil layers with nutrient ions */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40 inline-block mb-1">
          SoilGrids IoT Sensor
        </span>
        <h4 className="text-sm font-extrabold text-white">Subterranean Moisture</h4>
        <p className="text-[11px] text-amber-200/80 mt-1 leading-snug">
          IoT Probes sensing N-P-K ionic flux at 15cm & 30cm root depths.
        </p>
      </div>

      {/* Animated Sensor Probe Vector */}
      <div className="relative z-10 flex items-center justify-center pr-3">
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
          {/* Top Sensor Module */}
          <rect x="18" y="10" width="24" height="25" rx="4" fill="#047857" stroke="#34d399" strokeWidth="2" />
          <circle cx="30" cy="22" r="4" fill="#6ee7b7" />
          {/* Radio antenna */}
          <line x1="30" y1="10" x2="30" y2="2" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="2" r="2" fill="#facc15" />

          {/* Probe Prongs into soil */}
          <line x1="24" y1="35" x2="24" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="35" x2="36" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

          {/* Moisture detection wave lines */}
          <motion.path
            animate={{ opacity: [0.2, 0.9, 0.2], strokeDashoffset: [0, 20] }}
            transition={{ duration: 2, repeat: Infinity }}
            d="M10,65 Q30,60 50,65 M10,80 Q30,75 50,80"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Floating N P K ions */}
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-1 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-900"
        >
          N+
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-2 -left-3 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-slate-900"
        >
          K+
        </motion.div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. GEOSPATIAL & SATELLITE HUB ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedMultispectralScanner: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-950 p-4 border border-cyan-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      {/* Cadastral farm polygon grid with moving laser scan */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
          <polygon points="20,20 90,15 110,60 40,75" stroke="#22c55e" strokeWidth="1.5" fill="#22c55e" fillOpacity="0.1" />
          <polygon points="90,15 180,25 195,85 110,60" stroke="#38bdf8" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.1" />
          <polygon points="40,75 110,60 140,110 30,105" stroke="#eab308" strokeWidth="1.5" fill="#eab308" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Laser scan line moving up and down */}
      <motion.div
        animate={{ y: [-40, 50, -40] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)]"
      />

      <div className="z-10 max-w-[60%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-600/40 inline-block mb-1">
          ISRO Bhuvan Spatial Feed
        </span>
        <h4 className="text-sm font-extrabold text-white">Cadastral Boundary AI</h4>
        <p className="text-[11px] text-cyan-100/80 mt-1 leading-snug">
          Multi-spectral 10m bands computing live NDVI, EVI & crop phenology status.
        </p>
      </div>

      <div className="relative z-10 text-right space-y-1">
        <div className="text-xs font-mono font-bold text-cyan-400">NDVI: 0.76 (High)</div>
        <div className="text-[10px] font-mono text-emerald-400">LST: 29.4°C</div>
        <div className="text-[10px] font-mono text-yellow-400">Soil Moisture: 34%</div>
      </div>
    </div>
  );
};

export const AnimatedDopplerRadar: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 p-4 border border-indigo-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-600/40 inline-block mb-1">
          IMD Agromet Doppler
        </span>
        <h4 className="text-sm font-extrabold text-white">Rain Cloud Vector</h4>
        <p className="text-[11px] text-indigo-100/80 mt-1 leading-snug">
          3-Hour nowcast tracking thunderstorm squall line & precipitation bands.
        </p>
      </div>

      {/* Rotating Radar Screen */}
      <div className="relative z-10 w-24 h-24 rounded-full border-2 border-indigo-400/40 flex items-center justify-center bg-indigo-950/50">
        <div className="w-16 h-16 rounded-full border border-indigo-400/30" />
        <div className="w-8 h-8 rounded-full border border-indigo-400/20" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-indigo-400/30" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-indigo-400/30" />

        {/* Rotating sweep line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 origin-center"
        >
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-indigo-400/40 to-transparent origin-bottom-right" />
        </motion.div>

        {/* Rain blips */}
        <div className="absolute top-4 right-6 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <div className="absolute bottom-5 left-5 w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
      </div>
    </div>
  );
};

export const AnimatedAgriDrone: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-sky-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Kisan Drone Telemetry
        </span>
        <h4 className="text-sm font-extrabold text-white">Ultra-High Res Drone</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Sub-5cm precision thermal & multispectral canopy stress mapping.
        </p>
      </div>

      {/* Animated Quadcopter Drone Vector */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-3, 3, -3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <svg width="84" height="60" viewBox="0 0 100 70" fill="none">
          {/* Drone Arms */}
          <line x1="15" y1="20" x2="85" y2="50" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <line x1="15" y1="50" x2="85" y2="20" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

          {/* Central Body */}
          <ellipse cx="50" cy="35" rx="16" ry="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
          <circle cx="50" cy="35" r="4" fill="#38bdf8" />

          {/* Spinning Rotors (4x) */}
          {[
            { cx: 15, cy: 20 },
            { cx: 85, cy: 20 },
            { cx: 15, cy: 50 },
            { cx: 85, cy: 50 },
          ].map((rotor, rIdx) => (
            <g key={rIdx}>
              <circle cx={rotor.cx} cy={rotor.cy} r="4" fill="#334155" />
              <motion.ellipse
                animate={{ rx: [2, 14, 2], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 0.15, repeat: Infinity }}
                cx={rotor.cx}
                cy={rotor.cy}
                rx="12"
                ry="2.5"
                fill="#38bdf8"
              />
            </g>
          ))}
        </svg>

        {/* Downward Multispectral Sensor Beam */}
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-6 bg-gradient-to-b from-emerald-400/40 to-transparent blur-xs mx-auto -mt-1 rounded-full"
        />
      </motion.div>
    </div>
  );
};

export const AnimatedElevationHydrology: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 p-4 border border-blue-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-600/40 inline-block mb-1">
          DEM Topography Layer
        </span>
        <h4 className="text-sm font-extrabold text-white">Hydrology & Watershed</h4>
        <p className="text-[11px] text-blue-100/80 mt-1 leading-snug">
          NASA SRTM 30m Digital Elevation contouring surface drainage & canal runoff.
        </p>
      </div>

      {/* Animated Contour Waves */}
      <div className="relative z-10 w-28 h-24 flex items-center justify-center">
        <svg width="110" height="90" viewBox="0 0 120 100" fill="none">
          <motion.path
            animate={{ d: [
              "M10,80 Q35,30 65,70 T115,40",
              "M10,75 Q40,35 70,65 T115,45",
              "M10,80 Q35,30 65,70 T115,40"
            ]}}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#38bdf8"
            strokeWidth="2.5"
            fill="none"
          />
          <motion.path
            animate={{ d: [
              "M10,60 Q40,15 75,50 T115,20",
              "M10,65 Q35,20 70,45 T115,25",
              "M10,60 Q40,15 75,50 T115,20"
            ]}}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#22c55e"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="65" cy="70" r="4" fill="#38bdf8" />
          <circle cx="75" cy="50" r="3.5" fill="#22c55e" />
        </svg>
      </div>
    </div>
  );
};

// =========================================================================
// 3. CROP & SOIL ADVISORY ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedPlantGrowthCycle: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-[#1B5E20] to-teal-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Crop Phenology AI
        </span>
        <h4 className="text-sm font-extrabold text-white">Growth Cycle Simulation</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          GDD (Growing Degree Day) tracking from vegetative tillering to grain filling.
        </p>
      </div>

      {/* Animated Growing Plant Sequence */}
      <div className="relative z-10 flex items-end gap-2 pb-2">
        {/* Stage 1: Seed */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-3 bg-amber-600 rounded-full border border-amber-300"
          />
          <span className="text-[9px] text-amber-200 mt-1">Sowing</span>
        </div>

        {/* Stage 2: Sprout */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <svg width="18" height="24" viewBox="0 0 20 28" fill="none">
              <path d="M10,28 L10,12 Q10,4 16,4 M10,14 Q10,8 4,8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
          <span className="text-[9px] text-emerald-200 mt-1">Sprout</span>
        </div>

        {/* Stage 3: Vegetative Stalk */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="24" height="42" viewBox="0 0 24 45" fill="none">
              <path d="M12,45 L12,10 Q12,2 20,4 M12,24 Q6,16 2,18 M12,32 Q18,24 22,26" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>
          <span className="text-[9px] text-emerald-300 mt-1">Tillering</span>
        </div>

        {/* Stage 4: Flowering Spike */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [1, -2, 1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <svg width="26" height="58" viewBox="0 0 26 60" fill="none">
              <path d="M13,60 L13,12" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="13" cy="10" rx="6" ry="10" fill="#fbbf24" />
              <ellipse cx="8" cy="18" rx="4" ry="7" fill="#f59e0b" />
              <ellipse cx="18" cy="18" rx="4" ry="7" fill="#f59e0b" />
            </svg>
          </motion.div>
          <span className="text-[9px] text-amber-300 font-bold mt-1">Harvest</span>
        </div>
      </div>
    </div>
  );
};

export const AnimatedSoilLabFlask: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-stone-900 p-4 border border-amber-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40 inline-block mb-1">
          SHC Laboratory Grid
        </span>
        <h4 className="text-sm font-extrabold text-white">NPK Nutrient Formulation</h4>
        <p className="text-[11px] text-amber-100/80 mt-1 leading-snug">
          Calibrated fertilizer dosage with Neem Coated Urea & Phosphocompost.
        </p>
      </div>

      {/* Animated Chemistry Flask with Bubbling Liquid */}
      <div className="relative z-10 flex items-center justify-center pr-3">
        <svg width="65" height="85" viewBox="0 0 70 90" fill="none">
          {/* Flask Body */}
          <path d="M28,10 L42,10 L42,30 L62,75 Q65,82 58,85 L12,85 Q5,82 8,75 L28,30 Z" stroke="#e2e8f0" strokeWidth="2" fill="none" />
          
          {/* Bubbling green/amber solution inside */}
          <path d="M12,82 L58,82 L54,60 Q35,65 16,60 Z" fill="#22c55e" fillOpacity="0.75" />

          {/* Bubbles rising */}
          <motion.circle
            animate={{ cy: [75, 45], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            cx="30"
            r="3"
            fill="#ffffff"
          />
          <motion.circle
            animate={{ cy: [78, 50], opacity: [1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: 'easeOut' }}
            cx="40"
            r="2.5"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  );
};

export const AnimatedDripIrrigation: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 p-4 border border-teal-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-600/40 inline-block mb-1">
          Precision Fertigation
        </span>
        <h4 className="text-sm font-extrabold text-white">Smart Drip Scheduling</h4>
        <p className="text-[11px] text-teal-100/80 mt-1 leading-snug">
          42% water savings with solar-powered micro-emitters & root moisture sensing.
        </p>
      </div>

      {/* Animated Drip Pipe Vector */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Pipe */}
        <div className="w-24 h-4 bg-slate-700 rounded-full border border-slate-500 flex items-center justify-around px-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
        </div>

        {/* Falling Water Droplets */}
        <div className="flex justify-around w-24 pt-2">
          {[0, 1, 2].map((d) => (
            <motion.div
              key={d}
              animate={{
                y: [0, 24],
                opacity: [1, 0],
                scale: [0.8, 1.2],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: d * 0.35,
                ease: 'easeIn',
              }}
              className="w-2.5 h-3 bg-cyan-400 rounded-full"
              style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const AnimatedHarvesterTractor: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 via-amber-950 to-emerald-950 p-4 border border-amber-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40 inline-block mb-1">
          Mechanized Harvest
        </span>
        <h4 className="text-sm font-extrabold text-white">Custom Hiring Centers</h4>
        <p className="text-[11px] text-amber-100/80 mt-1 leading-snug">
          Combine harvester booking & zero-tillage seed drill machinery.
        </p>
      </div>

      {/* Animated Tractor Vector */}
      <motion.div
        animate={{ x: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <svg width="84" height="60" viewBox="0 0 100 70" fill="none">
          {/* Tractor Cabin */}
          <rect x="35" y="15" width="25" height="28" rx="3" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
          <rect x="38" y="18" width="18" height="14" rx="2" fill="#38bdf8" />
          {/* Engine Hood */}
          <path d="M60,26 L82,28 L82,45 L60,45 Z" fill="#b91c1c" stroke="#f87171" strokeWidth="1.5" />
          {/* Exhaust Pipe */}
          <line x1="72" y1="26" x2="72" y2="12" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big Rear Wheel */}
          <circle cx="32" cy="46" r="16" fill="#1e293b" stroke="#f1f5f9" strokeWidth="3" />
          {/* Small Front Wheel */}
          <circle cx="76" cy="50" r="11" fill="#1e293b" stroke="#f1f5f9" strokeWidth="2.5" />
        </svg>
      </motion.div>
    </div>
  );
};

// =========================================================================
// 4. MANDI & MARKETPLACE ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedMandiWeighbridge: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          e-NAM Digital Mandi
        </span>
        <h4 className="text-sm font-extrabold text-white">APMC Electronic Weighing</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Transparent tare weight certification directly linked to farmer bank accounts.
        </p>
      </div>

      {/* Animated Balance Scale */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="origin-top flex flex-col items-center"
        >
          {/* Beam */}
          <div className="w-20 h-1.5 bg-yellow-400 rounded-full" />
          <div className="flex justify-between w-20">
            {/* Left Pan */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-yellow-300" />
              <div className="w-8 h-2 bg-yellow-400 rounded-b-md" />
            </div>
            {/* Right Pan */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-yellow-300" />
              <div className="w-8 h-2 bg-yellow-400 rounded-b-md" />
            </div>
          </div>
        </motion.div>
        {/* Base Pillar */}
        <div className="w-1.5 h-7 bg-slate-500 -mt-7" />
        <div className="w-10 h-2 bg-slate-600 rounded-t-md" />
      </div>
    </div>
  );
};

export const AnimatedLogisticsTruck: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 p-4 border border-blue-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-600/40 inline-block mb-1">
          Kisan Rail & Cargo
        </span>
        <h4 className="text-sm font-extrabold text-white">Inter-State Logistics</h4>
        <p className="text-[11px] text-blue-100/80 mt-1 leading-snug">
          GPS-tracked refrigerated vans and freight corridor grain transport.
        </p>
      </div>

      {/* Moving Truck Vector */}
      <motion.div
        animate={{ x: [-12, 12, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <svg width="90" height="55" viewBox="0 0 100 60" fill="none">
          {/* Cargo Container */}
          <rect x="5" y="15" width="55" height="30" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="14" y="34" fill="#ffffff" fontSize="10" fontWeight="bold">e-NAM</text>
          {/* Driver Cabin */}
          <path d="M60,22 L75,22 L86,35 L86,45 L60,45 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="68" y="25" width="12" height="9" rx="1" fill="#bae6fd" />
          {/* Wheels with spin simulation */}
          <circle cx="22" cy="46" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="48" cy="46" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="75" cy="46" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  );
};

export const AnimatedRupeePaymentFlow: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Direct Benefit Transfer
        </span>
        <h4 className="text-sm font-extrabold text-white">Instant UPI Settlement</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Zero middleman fees; buyer escrow disbursed instantly upon digital gate pass.
        </p>
      </div>

      {/* Floating Rupee Coins */}
      <div className="relative z-10 flex items-center gap-2">
        {[0, 1, 2].map((coin) => (
          <motion.div
            key={coin}
            animate={{
              y: [-8, 8, -8],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: coin * 0.4,
              ease: 'easeInOut',
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-2 border-amber-200 flex items-center justify-center font-bold text-slate-900 shadow-md text-base"
          >
            ₹
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const AnimatedMarketPriceTicker: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Agmarknet Price Ticker
        </span>
        <h4 className="text-sm font-extrabold text-white">Live MSP Premium</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          AI forecasting harvest supply peaks across 2,400+ APMC regulated yards.
        </p>
      </div>

      {/* Pulsing Bull Trendline */}
      <div className="relative z-10">
        <svg width="100" height="55" viewBox="0 0 100 60" fill="none">
          <motion.path
            animate={{ pathLength: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            d="M5,48 L30,42 L55,25 L75,32 L95,12"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="95" cy="12" r="4" fill="#facc15" />
        </svg>
        <span className="text-xs font-mono font-bold text-emerald-400 block text-right mt-1">+14.2% Above MSP</span>
      </div>
    </div>
  );
};

// =========================================================================
// 5. CROP DOCTOR (DISEASE DIAGNOSTICS) ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedCameraScanner: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-950 p-4 border border-rose-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-600/40 inline-block mb-1">
          Gemini Vision Scanner
        </span>
        <h4 className="text-sm font-extrabold text-white">AI Leaf Inspection</h4>
        <p className="text-[11px] text-rose-100/80 mt-1 leading-snug">
          Instant cellular identification of Yellow Rust, Blast & Armyworm pustules.
        </p>
      </div>

      {/* Scanning Viewfinder with Leaf Inside */}
      <div className="relative z-10 w-24 h-24 border-2 border-dashed border-rose-400/60 rounded-xl flex items-center justify-center bg-rose-950/30">
        {/* Corner Reticles */}
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-rose-400" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-rose-400" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-rose-400" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-rose-400" />

        {/* Leaf SVG */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M8,32 Q6,12 32,8 Q30,28 8,32 Z" fill="#15803d" stroke="#4ade80" strokeWidth="1.5" />
          <line x1="8" y1="32" x2="24" y2="16" stroke="#fbbf24" strokeWidth="1.5" />
          {/* Disease spots */}
          <circle cx="20" cy="18" r="2.5" fill="#e11d48" />
          <circle cx="16" cy="24" r="2" fill="#e11d48" />
        </svg>

        {/* Laser Sweep Line */}
        <motion.div
          animate={{ y: [-35, 35, -35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-2 h-0.5 bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.9)]"
        />
      </div>
    </div>
  );
};

export const AnimatedMicroscopePathogen: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 p-4 border border-purple-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-600/40 inline-block mb-1">
          Pathogen Pathology
        </span>
        <h4 className="text-sm font-extrabold text-white">Microbial Diagnostics</h4>
        <p className="text-[11px] text-purple-100/80 mt-1 leading-snug">
          Differentiation between beneficial trichoderma fungi and pathogenic spores.
        </p>
      </div>

      {/* Animated Microscopic Circular Lens */}
      <div className="relative z-10 w-22 h-22 rounded-full border-2 border-purple-400/50 bg-purple-950/60 flex items-center justify-center overflow-hidden">
        {/* Floating Spores */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 absolute -top-1 left-7 shadow-xs" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 absolute bottom-2 right-4 shadow-xs" />
          <div className="w-3 h-3 rounded-full bg-amber-400 absolute bottom-3 left-4 shadow-xs" />
        </motion.div>
        <span className="text-[10px] font-mono font-bold text-purple-200">1000x</span>
      </div>
    </div>
  );
};

export const AnimatedOrganicShield: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Biological Defense
        </span>
        <h4 className="text-sm font-extrabold text-white">Neem Bio-Spray Shield</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          100% natural prophylactic leaf barrier preventing insect oviposition.
        </p>
      </div>

      {/* Shield with Pulsing Aura */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-emerald-500/20 absolute blur-xs"
        />
        <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
          <path d="M24,4 L44,12 C44,34 24,52 24,52 C24,52 4,34 4,12 Z" fill="#047857" stroke="#34d399" strokeWidth="2.5" />
          <path d="M16,26 L22,32 L32,20" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export const AnimatedHealthyLeafGlow: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 p-4 border border-emerald-400/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Post-Treatment Recovery
        </span>
        <h4 className="text-sm font-extrabold text-white">Plant Vitality Score: 98%</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Full chlorophyll restoration with amino-acid micronutrient drenching.
        </p>
      </div>

      {/* Sparkling Leaf with Animated Shine */}
      <div className="relative z-10">
        <motion.div
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
            <path d="M12,48 Q8,18 48,12 Q44,42 12,48 Z" fill="#16a34a" stroke="#86efac" strokeWidth="2" />
            <line x1="12" y1="48" x2="36" y2="24" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.9)]"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 6. STATE COOPERATION & POLICY PORTAL ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedStateLogisticsGrid: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          AgStack Federated Hub
        </span>
        <h4 className="text-sm font-extrabold text-white">Inter-State Trade Network</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Direct surplus routing between Madhya Pradesh, Punjab, Karnataka & Maharashtra.
        </p>
      </div>

      {/* Network Nodes with Moving Pulses */}
      <div className="relative z-10 w-28 h-24">
        <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
          <line x1="20" y1="30" x2="60" y2="20" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="60" y1="20" x2="90" y2="60" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="20" y1="30" x2="50" y2="75" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="50" y1="75" x2="90" y2="60" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />

          {/* Nodes */}
          <circle cx="20" cy="30" r="5" fill="#facc15" />
          <circle cx="60" cy="20" r="5" fill="#22c55e" />
          <circle cx="90" cy="60" r="5" fill="#38bdf8" />
          <circle cx="50" cy="75" r="5" fill="#f43f5e" />
        </svg>

        <motion.div
          animate={{ x: [0, 40, 70, 30, 0], y: [0, -10, 30, 45, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute top-7 left-5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]"
        />
      </div>
    </div>
  );
};

export const AnimatedGrainSiloStorage: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-stone-900 p-4 border border-amber-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40 inline-block mb-1">
          FCI Food Buffer
        </span>
        <h4 className="text-sm font-extrabold text-white">National Grain Reserves</h4>
        <p className="text-[11px] text-amber-100/80 mt-1 leading-snug">
          68.4M metric tonnes strategic reserve safeguarding against price spikes.
        </p>
      </div>

      {/* Animated Silos Vector */}
      <div className="relative z-10 flex items-end gap-2 pr-2">
        {[0, 1].map((silo) => (
          <div key={silo} className="flex flex-col items-center">
            {/* Silo Dome */}
            <div className="w-10 h-5 rounded-t-full bg-slate-400 border border-slate-300" />
            {/* Silo Body with Grain Fill Level */}
            <div className="w-10 h-14 bg-slate-700 border border-slate-500 relative overflow-hidden">
              <motion.div
                animate={{ height: ['60%', '85%', '60%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 inset-x-0 bg-amber-500/80"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AnimatedCropInsuranceDrone: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-4 border border-cyan-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-600/40 inline-block mb-1">
          PMFBY Satellite Audit
        </span>
        <h4 className="text-sm font-extrabold text-white">Automated Claim Payouts</h4>
        <p className="text-[11px] text-cyan-100/80 mt-1 leading-snug">
          CCE (Crop Cutting Experiment) yields validated via radar backscatter.
        </p>
      </div>

      {/* Insurance Seal with Checkmark */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-18 h-18 rounded-full border-2 border-dashed border-cyan-400/50 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-cyan-500/20" />
        </motion.div>
        <svg className="absolute w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
};

export const AnimatedAgriDataHub: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Open Telemetry Protocol
        </span>
        <h4 className="text-sm font-extrabold text-white">Federated Cloud Sync</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Real-time schema interoperability under India Digital Ecosystem of Agriculture.
        </p>
      </div>

      {/* Server Rack with Blinking LEDs */}
      <div className="relative z-10 w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 p-2 flex flex-col justify-around">
        {[0, 1, 2].map((rack) => (
          <div key={rack} className="flex items-center justify-between bg-slate-900 px-1.5 py-1 rounded">
            <div className="w-6 h-1 bg-slate-600 rounded" />
            <div className="flex gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${rack === 0 ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 7. AUTHENTICATION & LOGIN ANIMATED ILLUSTRATIONS
// =========================================================================

export const AnimatedKisanIdCard: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-[#1B5E20] to-emerald-950 p-4 border border-emerald-400/40 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Digital Kisan Credential
        </span>
        <h4 className="text-sm font-extrabold text-white">Verified Kisan ID</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Biometric-authenticated access to subsidized soil testing & direct mandi sale.
        </p>
      </div>

      {/* Animated Smart Card */}
      <motion.div
        animate={{ rotateY: [-8, 8, -8], y: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-28 h-18 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-900 p-2 shadow-lg border border-yellow-300"
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-[8px] font-black tracking-wider">KISAN CARD</span>
          <div className="w-4 h-3 bg-yellow-600/40 rounded-xs" />
        </div>
        <div className="text-[9px] font-mono font-bold">KA-88219-IN</div>
        <div className="text-[8px] opacity-80 mt-1">Ram Singh (MP)</div>
      </motion.div>
    </div>
  );
};

export const AnimatedFarmSunrise: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-200 via-orange-100 to-emerald-100 p-4 border border-amber-300 flex items-center justify-between shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-300/80 px-2 py-0.5 rounded border border-amber-500/40 inline-block mb-1">
          Dawn of Digital Agriculture
        </span>
        <h4 className="text-sm font-extrabold text-slate-900">National Farming Portal</h4>
        <p className="text-[11px] text-slate-700 mt-1 leading-snug">
          Connecting rural farmsteads with cutting-edge satellite intelligence.
        </p>
      </div>

      {/* Sun Rising & Spinning Windmill */}
      <div className="relative z-10 flex items-end gap-2">
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full bg-gradient-to-t from-orange-400 to-amber-300 shadow-md"
        />
        {/* Windmill */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 -mb-5 flex items-center justify-center"
          >
            <div className="w-1 h-10 bg-slate-600 rounded-full" />
            <div className="w-10 h-1 bg-slate-600 rounded-full absolute" />
          </motion.div>
          <div className="w-1.5 h-12 bg-slate-700" />
        </div>
      </div>
    </div>
  );
};

export const AnimatedSecurityShield: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-4 border border-emerald-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40 inline-block mb-1">
          Aadhaar & OTP Vault
        </span>
        <h4 className="text-sm font-extrabold text-white">Encrypted Privacy</h4>
        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">
          Data residency hosted exclusively in India with zero third-party commercial sale.
        </p>
      </div>

      {/* Shield with Pulsing Lock */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
            <path d="M25,5 L45,15 C45,40 25,55 25,55 C25,55 5,40 5,15 Z" fill="#065f46" stroke="#34d399" strokeWidth="2.5" />
            {/* Lock body */}
            <rect x="18" y="28" width="14" height="12" rx="2" fill="#facc15" />
            {/* Lock shackle */}
            <path d="M21,28 L21,22 Q21,17 25,17 Q29,17 29,22 L29,28" stroke="#facc15" strokeWidth="2.5" fill="none" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export const AnimatedSmsOtpDelivery: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 p-4 border border-indigo-500/30 flex items-center justify-between text-white shadow-sm ${className}`}>
      <div className="z-10 max-w-[55%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-600/40 inline-block mb-1">
          Instant OTP Dispatch
        </span>
        <h4 className="text-sm font-extrabold text-white">Multi-Lingual SMS</h4>
        <p className="text-[11px] text-indigo-100/80 mt-1 leading-snug">
          Works seamlessly on any standard mobile handset or smartphone.
        </p>
      </div>

      {/* Animated Phone with SMS Incoming Message */}
      <div className="relative z-10">
        <div className="w-18 h-26 rounded-xl bg-slate-800 border-2 border-slate-600 p-1.5 flex flex-col justify-between">
          <div className="w-6 h-1 bg-slate-600 rounded-full mx-auto" />
          <motion.div
            animate={{ scale: [0.8, 1.05, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-emerald-600 text-[8px] font-bold p-1 rounded text-white text-center"
          >
            OTP: 5829
          </motion.div>
          <div className="w-3 h-3 rounded-full bg-slate-600 mx-auto" />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 7. REAL-WORLD AGRI ANIMATIONS (RAIN, MOISTURE, PLAIN REGIONS & MAP LAYERS)
// =========================================================================

export const AnimatedRainRadarLive: React.FC<{
  className?: string;
  compact?: boolean;
  intensity?: 'light' | 'moderate' | 'heavy';
}> = ({ className = 'w-full h-48', compact = false, intensity: propIntensity }) => {
  const [activeIntensity, setActiveIntensity] = useState<'light' | 'moderate' | 'heavy'>(
    propIntensity || 'moderate'
  );

  const intensityConfig = {
    light: {
      dbz: '22 dBZ',
      rate: '1.2 mm/h',
      status: 'Light Drizzle',
      color: '#38bdf8',
      dropCount: 10,
      dropSpeed: 1.1,
      lightning: false,
    },
    moderate: {
      dbz: '38 dBZ',
      rate: '5.8 mm/h',
      status: 'Moderate Rain Squall',
      color: '#facc15',
      dropCount: 18,
      dropSpeed: 0.75,
      lightning: true,
    },
    heavy: {
      dbz: '52 dBZ',
      rate: '18.4 mm/h',
      status: 'Intense Cloudburst Alert',
      color: '#ef4444',
      dropCount: 26,
      dropSpeed: 0.5,
      lightning: true,
    },
  };

  const current = intensityConfig[activeIntensity];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 via-sky-950 to-slate-900 p-4 border border-sky-500/30 shadow-md flex flex-col justify-between ${className}`}>
      {/* Background Radar sweep circle with real Doppler azimuth angle markings */}
      <div className="absolute top-2 right-3 w-32 h-32 rounded-full border border-sky-400/25 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full origin-center"
        >
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/40 via-sky-500/15 to-transparent origin-bottom-right" />
        </motion.div>
        {/* Radar Concentric Distance Rings */}
        <div className="absolute inset-3 rounded-full border border-sky-400/20" />
        <div className="absolute inset-7 rounded-full border border-sky-400/20" />
        <div className="absolute inset-11 rounded-full border border-sky-400/20" />
        {/* Crosshair axis lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-sky-400/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-400/20" />
      </div>

      {/* Top Header with Intensity Pills */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              animate={{ y: [-2, 3, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Detailed Cloud with Rain Density Gradients */}
              <svg width="64" height="40" viewBox="0 0 68 42" fill="none">
                <path
                  d="M14,35 Q6,35 6,27 Q6,20 13,19 Q16,10 26,12 Q33,5 42,10 Q52,8 54,18 Q62,19 62,26 Q62,35 52,35 Z"
                  fill="url(#cloudGradRain)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="cloudGradRain" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="60%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Lightning Flash Pulse */}
            {current.lightning && (
              <motion.div
                animate={{ opacity: [0, 0, 1, 0, 0.9, 0, 0] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.42, 0.45, 0.48, 0.52, 1] }}
                className="absolute top-5 left-6"
              >
                <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
                  <polygon points="10,0 2,12 8,12 5,24 16,10 10,10" fill="#facc15" stroke="#fef08a" strokeWidth="1" />
                </svg>
              </motion.div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/40 inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                IMD & INSAT-3DR Doppler Radar
              </span>
            </div>
            <h4 className="text-sm font-black text-white mt-0.5">Precipitation Nowcast</h4>
            <span className="text-[11px] text-cyan-200/90 font-medium">
              {current.status} &bull; {current.rate}
            </span>
          </div>
        </div>

        {/* Intensity Selector Tabs */}
        {!compact && (
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-sky-400/30 text-[10px] font-bold">
            {(['light', 'moderate', 'heavy'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveIntensity(mode)}
                className={`px-2 py-0.5 rounded-lg transition-all capitalize cursor-pointer ${
                  activeIntensity === mode
                    ? 'bg-sky-500 text-white font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Falling Raindrops Particles */}
      <div className="relative z-10 w-full h-14 overflow-hidden flex justify-around px-2 my-1">
        {[...Array(current.dropCount)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-16, 60],
              opacity: [0, 1, 0.4, 0],
            }}
            transition={{
              duration: current.dropSpeed + (i % 4) * 0.12,
              repeat: Infinity,
              delay: (i * 0.08) % 0.8,
              ease: 'linear',
            }}
            className="w-0.5 h-4 bg-gradient-to-b from-sky-200 via-cyan-300 to-transparent rounded-full transform -rotate-12"
          />
        ))}
      </div>

      {/* Radar Reflectivity Scale Legend */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-sky-500/20 text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-bold">Reflectivity:</span>
          <span className="font-mono text-cyan-300 font-black">{current.dbz}</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[9px]">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/80 text-white font-bold">&lt;25 dBZ</span>
          <span className="px-1.5 py-0.5 rounded bg-yellow-500/80 text-slate-900 font-bold">35 dBZ</span>
          <span className="px-1.5 py-0.5 rounded bg-orange-500/80 text-white font-bold">45 dBZ</span>
          <span className="px-1.5 py-0.5 rounded bg-red-600/90 text-white font-bold">&gt;50 dBZ</span>
        </div>
      </div>
    </div>
  );
};

export const AnimatedMoistureLayer: React.FC<{
  className?: string;
  depth?: 'surface' | 'rootZone' | 'deepBed';
}> = ({ className = 'w-full h-48', depth: propDepth }) => {
  const [selectedDepth, setSelectedDepth] = useState<'surface' | 'rootZone' | 'deepBed'>(
    propDepth || 'rootZone'
  );

  const depthData = {
    surface: {
      depthLabel: '0-10 cm (Topsoil)',
      saturation: 62,
      status: 'Adequate Moisture',
      absorptionRate: 'High Evaporation',
      color: '#38bdf8',
      desc: 'Seedling germination & organic humus tier',
    },
    rootZone: {
      depthLabel: '10-40 cm (Root Zone)',
      saturation: 78,
      status: 'Optimal Hydration',
      absorptionRate: 'Active Rhizosphere Uptake',
      color: '#06b6d4',
      desc: 'Active secondary root feeding for Wheat/Cotton',
    },
    deepBed: {
      depthLabel: '40-100 cm (Subsoil)',
      saturation: 84,
      status: 'Subterranean Reservoir',
      absorptionRate: 'Capillary Rise Active',
      color: '#0284c7',
      desc: 'Deep groundwater aquifer percolation tier',
    },
  };

  const current = depthData[selectedDepth];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 via-emerald-950 to-amber-950 p-4 border border-emerald-500/30 shadow-md flex flex-col justify-between ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40 inline-block">
            NASA SMAP & ISRO RISAT-1A Microwave
          </span>
          <h4 className="text-sm font-black text-white mt-1">Subterranean Soil Moisture Flux</h4>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-cyan-300 font-mono">{current.saturation}%</span>
          <span className="text-[10px] text-emerald-200 block font-medium">{current.status}</span>
        </div>
      </div>

      {/* Interactive Soil Strata Simulation */}
      <div className="relative z-10 my-2 h-20 rounded-xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-amber-900/70 via-amber-950 to-slate-950 p-2 flex flex-col justify-between">
        {/* Animated Water Droplet Percolation Flow Particles */}
        <motion.div
          animate={{ y: [-10, 50] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-35"
        />

        {/* Plant Root Architecture with Animated Hydration Intake */}
        <svg className="w-full h-16" viewBox="0 0 300 64" fill="none">
          {/* Surface Grass and Crop Shoot Base */}
          <path d="M0,8 Q35,2 70,8 T140,8 T210,8 T280,8 L300,8" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          
          {/* Left Crop Taproot System */}
          <path d="M70,8 Q75,32 90,56 M70,22 Q58,35 46,50 M70,30 Q86,40 98,46" stroke="#fde68a" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Center Crop Fibrous Roots */}
          <path d="M150,8 Q148,34 140,58 M150,20 Q162,34 172,48 M150,30 Q138,42 128,52" stroke="#fde68a" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Right Crop Root Network */}
          <path d="M230,8 Q226,34 210,58 M230,22 Q245,36 258,48 M230,32 Q218,44 205,50" stroke="#fde68a" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Pulsing Moisture Droplets Entering Root Pores */}
          <circle cx="70" cy="22" r="3" fill="#38bdf8" className="animate-ping" />
          <circle cx="90" cy="48" r="2.5" fill="#38bdf8" />
          <circle cx="150" cy="28" r="3" fill="#38bdf8" className="animate-ping" />
          <circle cx="210" cy="42" r="3" fill="#38bdf8" className="animate-ping" />
          <circle cx="240" cy="36" r="2.5" fill="#38bdf8" />
        </svg>

        {/* Interactive Depth Indicator Tag */}
        <div className="absolute top-2 right-3 flex items-center gap-1.5 bg-slate-950/90 px-2 py-0.5 rounded-md border border-cyan-400/40 text-[9px] text-cyan-300 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {current.depthLabel}
        </div>
      </div>

      {/* Depth Tier Buttons */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-emerald-500/20 text-[10px]">
        {(['surface', 'rootZone', 'deepBed'] as const).map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedDepth(tier)}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              selectedDepth === tier
                ? 'bg-cyan-500/30 text-cyan-200 font-black border border-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tier === 'surface' ? '0-10cm (सतह)' : tier === 'rootZone' ? '10-40cm (जड़ क्षेत्र)' : '40-100cm (गहराई)'}
          </button>
        ))}
      </div>
    </div>
  );
};

export const AnimatedPlainRegionType: React.FC<{
  className?: string;
  region?: 'alluvial' | 'blackSoil' | 'coastal' | 'redLoam';
}> = ({ className = 'w-full h-48', region: propRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState<'alluvial' | 'blackSoil' | 'coastal' | 'redLoam'>(
    propRegion || 'alluvial'
  );

  const regionConfigs = {
    alluvial: {
      title: 'Indo-Gangetic Alluvial Plain',
      subTitle: 'गंगा-सिंधु का उपजाऊ जलोढ़ मैदान',
      soilType: 'Deep Alluvium (Khadar & Bangar)',
      slope: 'Slope < 0.5% (High Drainage)',
      elevation: '210m - 340m ASL',
      waterTable: '8-12m (Canal Fed)',
      cropSuitability: 'Wheat, Mustard, Paddy, Sugarcane',
      skyGradient: 'from-sky-300 via-amber-100 to-emerald-700',
      waterPath: '#38bdf8',
      fieldColor: '#15803d',
    },
    blackSoil: {
      title: 'Deccan & Malwa Black Cotton Plateau',
      subTitle: 'दक्कन व मालवा की काली कपासी मिट्टी',
      soilType: 'Regur Clay (Basaltic Weathering)',
      slope: 'Slope 1-3% (Moderate Runoff)',
      elevation: '450m - 620m ASL',
      waterTable: '15-22m (Hard Rock Aquifer)',
      cropSuitability: 'Soybean, Cotton, Gram, Pigeon Pea',
      skyGradient: 'from-amber-200 via-stone-300 to-stone-800',
      waterPath: '#0284c7',
      fieldColor: '#292524',
    },
    coastal: {
      title: 'Coastal Deltaic & Estuary Plain',
      subTitle: 'तटीय डेल्टा व आर्द्र मैदानी क्षेत्र',
      soilType: 'Saline-Alluvial Coastal Silt',
      slope: 'Slope < 0.2% (Tidal Estuary)',
      elevation: '5m - 40m ASL',
      waterTable: '2-5m (High Humidity)',
      cropSuitability: 'Paddy, Coconut, Jute, Pulses',
      skyGradient: 'from-cyan-300 via-teal-100 to-emerald-800',
      waterPath: '#06b6d4',
      fieldColor: '#047857',
    },
    redLoam: {
      title: 'Semi-Arid Red & Lateritic Plain',
      subTitle: 'लाल व लेटराइट अर्ध-शुष्क मैदानी क्षेत्र',
      soilType: 'Red Ferruginous Loam (Iron Rich)',
      slope: 'Slope 2-5% (Fast Draining)',
      elevation: '380m - 510m ASL',
      waterTable: '18-28m (Deep Tube-well)',
      cropSuitability: 'Millets (Bajra/Jowar), Groundnut, Maize',
      skyGradient: 'from-orange-200 via-amber-100 to-rose-900',
      waterPath: '#38bdf8',
      fieldColor: '#991b1b',
    },
  };

  const current = regionConfigs[selectedRegion];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 p-4 border border-amber-500/30 shadow-md flex flex-col justify-between ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-500/40 inline-block">
            ICAR Agro-Climatic Plains Classification
          </span>
          <h4 className="text-sm font-black text-white mt-0.5">{current.title}</h4>
          <span className="text-[11px] text-amber-200/90 font-medium">{current.subTitle}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          {current.soilType.split(' ')[0]}
        </span>
      </div>

      {/* Scenic Plain Landform with Animated Tractor & Flowing River Stream */}
      <div className={`relative z-10 h-20 w-full overflow-hidden rounded-xl bg-gradient-to-b ${current.skyGradient} my-1.5`}>
        {/* Distant Contours & Winding Water Channel */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          {/* River Stream */}
          <path d="M0,58 Q70,42 140,54 T280,44 L300,48 L300,80 L0,80 Z" fill={current.fieldColor} />
          <path d="M100,48 Q150,58 190,50 Q230,44 300,52 L300,58 Q220,50 180,58 Q140,64 90,54 Z" fill={current.waterPath} />
          
          {/* Crop Furrow Lines */}
          <line x1="10" y1="64" x2="90" y2="74" stroke="#fef08a" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="15" y1="70" x2="100" y2="80" stroke="#86efac" strokeWidth="2" strokeDasharray="8 4" />
          <line x1="200" y1="62" x2="290" y2="72" stroke="#fde047" strokeWidth="2" strokeDasharray="5 3" />
        </svg>

        {/* Moving Tractor in Field */}
        <motion.div
          animate={{ x: [-40, 320] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1 left-0 z-20"
        >
          <svg width="34" height="22" viewBox="0 0 36 24" fill="none">
            <rect x="8" y="8" width="18" height="9" rx="2" fill="#dc2626" />
            <rect x="18" y="2" width="8" height="8" rx="1.5" fill="#f87171" />
            <rect x="20" y="4" width="5" height="4" fill="#93c5fd" />
            <line x1="12" y1="3" x2="12" y2="8" stroke="#1f2937" strokeWidth="2" />
            <circle cx="12" cy="18" r="5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="28" cy="18" r="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      {/* Region Switcher Tabs */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-amber-500/20 text-[10px]">
        {(['alluvial', 'blackSoil', 'coastal', 'redLoam'] as const).map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
              selectedRegion === reg
                ? 'bg-amber-500/30 text-amber-200 font-black border border-amber-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {reg === 'alluvial' ? 'जलोढ़ मैदान' : reg === 'blackSoil' ? 'काली मिट्टी' : reg === 'coastal' ? 'तटीय डेल्टा' : 'लाल मैदान'}
          </button>
        ))}
      </div>
    </div>
  );
};

export const AnimatedGoogleMapLayersInteractive: React.FC<{ className?: string }> = ({
  className = 'w-full h-48',
}) => {
  const [activeTier, setActiveTier] = useState<'satellite' | 'radar' | 'moisture'>('satellite');

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 border border-emerald-500/30 shadow-md flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between z-10">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40 inline-block">
            Google Maps Style Layer Stack
          </span>
          <h4 className="text-sm font-black text-white mt-0.5">Multi-Spectral Remote Sensing</h4>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
      </div>

      {/* 3D Stack of Simulated Map Layers */}
      <div className="relative z-10 h-22 flex items-center justify-center my-1">
        {/* Layer 1: Soil Moisture */}
        <motion.div
          animate={{
            y: activeTier === 'moisture' ? -2 : 12,
            scale: activeTier === 'moisture' ? 1.05 : 0.95,
          }}
          onClick={() => setActiveTier('moisture')}
          className="absolute w-60 h-10 rounded-xl bg-gradient-to-r from-cyan-600/70 via-sky-500/80 to-blue-600/70 border border-cyan-400/60 transform -rotate-4 translate-y-6 shadow-md flex items-center justify-between px-3 text-[10px] font-black text-white cursor-pointer"
        >
          <span>💧 Subterranean Moisture</span>
          <span className="bg-cyan-950/90 px-1.5 py-0.5 rounded font-mono">SMAP 78%</span>
        </motion.div>

        {/* Layer 2: Live Rain Radar */}
        <motion.div
          animate={{
            y: activeTier === 'radar' ? -4 : 2,
            scale: activeTier === 'radar' ? 1.05 : 0.96,
          }}
          onClick={() => setActiveTier('radar')}
          className="absolute w-60 h-10 rounded-xl bg-gradient-to-r from-blue-700/80 via-indigo-600/80 to-cyan-700/80 border border-blue-400/60 transform -rotate-2 translate-y-1 shadow-md flex items-center justify-between px-3 text-[10px] font-black text-white cursor-pointer"
        >
          <span>🌧️ Doppler Precipitation Radar</span>
          <span className="bg-blue-950/90 px-1.5 py-0.5 rounded font-mono">38 dBZ</span>
        </motion.div>

        {/* Layer 3: True Satellite & Cadastre */}
        <motion.div
          animate={{
            y: activeTier === 'satellite' ? -8 : -3,
            scale: activeTier === 'satellite' ? 1.05 : 0.98,
          }}
          onClick={() => setActiveTier('satellite')}
          className="absolute w-60 h-10 rounded-xl bg-gradient-to-r from-emerald-600/90 via-green-600/90 to-teal-700/90 border border-emerald-300 transform -rotate-0 -translate-y-4 shadow-lg flex items-center justify-between px-3 text-[10px] font-black text-white cursor-pointer"
        >
          <span>🛰️ Sentinel-2 10m Optical Cadastre</span>
          <span className="bg-emerald-950/90 px-1.5 py-0.5 rounded font-mono">NDVI 0.84</span>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-300 font-semibold pt-1 border-t border-slate-800">
        <span>Click layer to inspect telemetry</span>
        <span className="text-emerald-300 font-mono">Zero Latency Overlays</span>
      </div>
    </div>
  );
};
