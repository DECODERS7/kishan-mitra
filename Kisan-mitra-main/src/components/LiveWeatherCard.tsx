import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CloudRain, Droplets, Wind, Thermometer, Sun, Cloud, RefreshCw, Satellite, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Language, WeatherData } from '../types';
import { translations } from '../data/translations';

interface LiveWeatherCardProps {
  language: Language;
  weather: WeatherData;
  lat: number;
  lon: number;
  districtName: string;
  onViewFullWeather?: () => void;
}

export const LiveWeatherCard: React.FC<LiveWeatherCardProps> = ({
  language,
  weather: initialWeather,
  lat,
  lon,
  districtName,
  onViewFullWeather,
}) => {
  const t = translations[language];
  const [weather, setWeather] = useState<WeatherData>(initialWeather);
  const [isLoading, setIsLoading] = useState(false);
  const [liveFetched, setLiveFetched] = useState(false);
  const [providerName, setProviderName] = useState<string>('Live Agromet');
  const [agriAdvisory, setAgriAdvisory] = useState<any>(null);

  // Fetch real-time weather from /api/weather (powered by user OpenWeather key & satellite agromet fallback)
  useEffect(() => {
    let isMounted = true;
    async function fetchWeatherTelemetry() {
      setIsLoading(true);
      try {
        const url = `/api/weather?lat=${lat}&lon=${lon}&q=${encodeURIComponent(districtName)}&lang=${language}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather API error');
        const json = await res.json();

        if (isMounted && json.success && json.data) {
          const d = json.data;
          setWeather({
            temperature: d.temperature,
            humidity: d.humidity,
            rainfallProbability: d.rainfallProbability,
            windSpeed: d.windSpeed,
            condition: language === 'hi' && d.conditionHi ? d.conditionHi : d.condition,
            locationName: d.locationName || `${districtName} Agro-Zone`,
            source: d.source || 'OpenWeather / Agromet Station',
            forecast: (d.daily || []).slice(0, 3).map((item: any) => ({
              day: item.day,
              temp: item.tempMax,
              rainProb: item.rainProb,
              icon: item.rainProb > 30 ? 'cloud-rain' : item.rainProb > 15 ? 'cloud-sun' : 'sun',
            })),
          });
          setProviderName(d.provider?.includes('OpenWeather') ? 'OpenWeatherMap' : 'Agromet Satellite');
          setAgriAdvisory(d.agriAdvisory);
          setLiveFetched(true);
        }
      } catch (err) {
        console.warn('Weather fetch fallback notice:', err);
        if (isMounted) {
          setWeather(initialWeather);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchWeatherTelemetry();
    return () => {
      isMounted = false;
    };
  }, [lat, lon, districtName, language, initialWeather]);

  return (
    <div className="gloss-card rounded-3xl p-5 sm:p-6 transition-all hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between h-full relative overflow-hidden bg-white/90 dark:bg-[#07190F]/90 dark:border-emerald-800/40">
      {/* Specular Glint Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 dark:via-emerald-400/40 to-transparent pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-xs font-black text-slate-500 dark:text-emerald-400/90 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {t.liveWeather}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] gloss-pill bg-blue-500/10 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-black border border-blue-200 dark:border-blue-800/60">
              {liveFetched ? providerName : 'Syncing Live...'}
            </span>
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
              aria-label="Refresh telemetry"
              className="p-1.5 rounded-xl bg-white/60 dark:bg-emerald-950/60 hover:bg-white dark:hover:bg-emerald-900 text-slate-500 dark:text-emerald-300 hover:text-[#1B5E20] transition-all cursor-pointer border border-white/80 dark:border-emerald-800 shadow-2xs"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1B5E20]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Primary Hero Weather Display */}
        <div className="flex items-center gap-4 mb-4 bg-gradient-to-r from-white/70 to-white/40 dark:from-emerald-950/40 dark:to-emerald-950/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 dark:border-emerald-800/30 shadow-2xs">
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-xs">
            {weather.temperature}°C
          </div>
          <div className="text-xs leading-tight">
            <div className="font-black text-slate-900 dark:text-slate-100 text-sm tracking-tight">{weather.condition}</div>
            <div className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Rain: <span className="font-bold text-blue-600 dark:text-blue-400">{weather.rainfallProbability}%</span> | Hum: <span className="font-bold text-slate-800 dark:text-slate-200">{weather.humidity}%</span> | Wind: <span className="font-bold text-slate-800 dark:text-slate-200">{weather.windSpeed} km/h</span>
            </div>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <span>📍 {weather.locationName}</span>
              <span className="text-slate-400">• Real-time API</span>
            </div>
          </div>
        </div>

        {/* Secondary Metrics in Balanced Geometric Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-3.5">
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.18 }}
            className="bg-white/80 dark:bg-emerald-950/50 backdrop-blur-md border border-white dark:border-emerald-800/30 rounded-2xl p-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.03)]"
          >
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold block uppercase tracking-wider">Humidity</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">{weather.humidity}%</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.18 }}
            className="bg-white/80 dark:bg-emerald-950/50 backdrop-blur-md border border-white dark:border-emerald-800/30 rounded-2xl p-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.03)]"
          >
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold block uppercase tracking-wider">Rain Chance</span>
            <span className="text-sm font-black text-blue-600 dark:text-blue-400">{weather.rainfallProbability}%</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.18 }}
            className="bg-white/80 dark:bg-emerald-950/50 backdrop-blur-md border border-white dark:border-emerald-800/30 rounded-2xl p-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.03)]"
          >
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold block uppercase tracking-wider">Wind</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">{weather.windSpeed} km/h</span>
          </motion.div>
        </div>

        {/* Agricultural Spray Advisory Banner */}
        {agriAdvisory && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">
                {language === 'hi' ? 'छिड़काव व सिंचाई स्थिति: ' : 'Spray & Irrigation Advisory: '}
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                {language === 'hi' ? agriAdvisory.sprayWindow?.textHi : agriAdvisory.sprayWindow?.text}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3-Day Forecast Strip + Direct Action Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/40">
        <div className="flex justify-between items-center text-center mb-3">
          {weather.forecast.map((fc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.18 }}
              className="flex-1 px-1 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase">{fc.day}</div>
              <div className="my-1 flex justify-center text-slate-600 dark:text-slate-300">
                {fc.rainProb > 30 ? (
                  <CloudRain className="w-4 h-4 text-blue-500" />
                ) : fc.rainProb > 15 ? (
                  <Cloud className="w-4 h-4 text-slate-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div className={`text-xs font-bold ${i === 1 ? 'text-[#2E7D32] dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                {fc.temp}°
              </div>
              <div className="text-[9px] text-slate-400">{fc.rainProb}% rain</div>
            </motion.div>
          ))}
        </div>

        {/* Action Button: View Full Weather Page */}
        {onViewFullWeather && (
          <button
            onClick={onViewFullWeather}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <span>{language === 'hi' ? 'विस्तृत 7-दिवसीय मौसम व वर्षा रडार' : 'View Full 7-Day Weather & Radar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

