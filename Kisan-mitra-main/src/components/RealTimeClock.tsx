import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Globe2, Sun, Moon, Sunrise, Sunset, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatedSwitch } from './AnimatedControls';

interface RealTimeClockProps {
  districtName?: string;
  stateName?: string;
}

export const RealTimeClock: React.FC<RealTimeClockProps> = ({
  districtName = 'Shivpuri',
  stateName = 'Madhya Pradesh',
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [useIst, setUseIst] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time for either IST or local
  const formatTimeParts = () => {
    const timeZone = useIst ? 'Asia/Kolkata' : undefined;

    const timeString = currentTime.toLocaleTimeString('en-US', {
      timeZone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const dateString = currentTime.toLocaleDateString('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Extract hours in 24h format for agricultural phase calculation
    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      hour12: false,
    });
    const hour24 = parseInt(hourFormatter.format(currentTime), 10);

    return { timeString, dateString, hour24 };
  };

  const { timeString, dateString, hour24 } = formatTimeParts();

  // Agricultural solar phase determination based on current hour
  const getAgroSolarPhase = (hour: number) => {
    if (hour >= 5 && hour < 7) {
      return {
        label: 'Dawn Dewfall & Morning Spray Window',
        desc: 'Optimal for foliar nutrient sprays; zero thermal drift',
        icon: <Sunrise className="w-4 h-4 text-amber-400" />,
        badge: 'Ideal Spraying Window',
        color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      };
    } else if (hour >= 7 && hour < 11) {
      return {
        label: 'Active Photosynthesis & Stomatal Transpiration',
        desc: 'Peak biomass absorption; high vegetative energy conversion',
        icon: <Sun className="w-4 h-4 text-yellow-400" />,
        badge: 'High Sunlight Absorption',
        color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
      };
    } else if (hour >= 11 && hour < 15) {
      return {
        label: 'Midday Solar Zenith (Peak Evapotranspiration)',
        desc: 'Avoid chemical spray to prevent scorching; verify drip soil moisture',
        icon: <Sun className="w-4 h-4 text-orange-400" />,
        badge: 'High Thermal Index',
        color: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
      };
    } else if (hour >= 15 && hour < 18) {
      return {
        label: 'Golden Hour (Evening Irrigation & Pollination)',
        desc: 'Gentle wind currents; prime period for drip line scheduling',
        icon: <Sunset className="w-4 h-4 text-amber-400" />,
        badge: 'Irrigation Phase',
        color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      };
    } else {
      return {
        label: 'Nocturnal Root Respiration & Moisture Rebalancing',
        desc: 'Subterranean osmotic nutrient uptake; zero ultraviolet degradation',
        icon: <Moon className="w-4 h-4 text-indigo-400" />,
        badge: 'Nocturnal Assimilation',
        color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
      };
    }
  };

  const currentPhase = getAgroSolarPhase(hour24);

  return (
    <div className="gloss-card-dark border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Specular Glint Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Clock Display with Live Pulsing Seconds */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="w-13 h-13 rounded-2xl gloss-btn-primary border border-emerald-300/60 flex items-center justify-center shadow-lg text-white"
            >
              <Clock className="w-6 h-6 text-yellow-300" />
            </motion.div>
            {/* Live blinking satellite pulse */}
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 pointer-events-none shadow-[0_0_10px_#34d399]"
            />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-sm">
                {timeString}
              </span>
              <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full gloss-pill bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-2xs">
                {useIst ? 'IST (UTC+5:30)' : 'LOCAL TIME'}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              {dateString} • <span className="text-yellow-300 font-bold">{districtName}, {stateName}</span>
            </p>
          </div>
        </div>

        {/* Center: Agro-Meteorological Solar Phase */}
        <div className="flex-1 max-w-xl bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 shrink-0 shadow-2xs">
            {currentPhase.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white truncate">
                {currentPhase.label}
              </span>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${currentPhase.color} shrink-0 shadow-xs`}>
                {currentPhase.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">
              {currentPhase.desc}
            </p>
          </div>
        </div>

        {/* Right: Switch between IST & Local Time + Telemetry Status */}
        <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-2xl text-xs shadow-2xs">
            <Globe2 className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[11px] text-slate-200 font-bold">Use IST</span>
            <AnimatedSwitch
              id="ist-toggle-switch"
              size="sm"
              checked={useIst}
              onChange={setUseIst}
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-3.5 py-2 rounded-2xl font-black shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Telemetry: Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};
