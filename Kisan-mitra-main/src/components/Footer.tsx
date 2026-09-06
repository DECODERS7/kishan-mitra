import React from 'react';
import { Sprout, ShieldCheck, Database, Globe2, ExternalLink, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { RealTimeClock } from './RealTimeClock';

interface FooterProps {
  language: Language;
  districtName?: string;
  stateName?: string;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  districtName = 'Shivpuri',
  stateName = 'Madhya Pradesh',
}) => {
  const t = translations[language];

  return (
    <footer className="gloss-card-dark text-slate-300 border-t border-white/15 pt-10 pb-10 px-4 sm:px-6 lg:px-8 space-y-8 relative overflow-hidden">
      {/* Specular Glint Top Rim */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Real-Time Live Clock at the End of the Page */}
        <div id="real-time-footer-clock">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              Live Agro-Chronometer & Satellite Synchronization
            </span>
            <span className="text-[11px] text-emerald-200/80 font-mono font-bold bg-white/10 px-3 py-0.5 rounded-full border border-white/15">
              Ground Station: Lat 25.42° N, Lon 77.66° E
            </span>
          </div>
          <RealTimeClock districtName={districtName} stateName={stateName} />
        </div>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-white/15">
          {/* Col 1: Brand & DPG Badge */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gloss-btn-primary text-white flex items-center justify-center font-black shadow-md border border-emerald-300/60">
                <Sprout className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">{t.appTitle}</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full gloss-pill bg-white/10 text-emerald-300 border border-white/20 font-black shadow-xs">
                DPG v2.4
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed font-medium">
              {t.dpgAttribution}
            </p>
            <div className="flex items-center gap-2 text-xs text-yellow-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>India Digital Ecosystem of Agriculture (IDEA) Sandbox Compliant</span>
            </div>
          </div>

          {/* Col 2: Open Ingestion Streams */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-3.5">
              Open Data Streams
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>ESA Sentinel-2 MSI (10m Resolution)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>ISRO Bhuvan Spatial Portal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>SoilGrids 250m & SHC Grid</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Open-Meteo Agromet Telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>NASA GIBS Multispectral Reflectance</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Cooperation Framework */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-3.5">
              Cooperation Framework
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>DiCRA Climate Resilient Agriculture</li>
              <li>AgStack Federated State Data Exchange</li>
              <li>National Soil Health Card Mission</li>
              <li>Pradhan Mantri Fasal Bima Yojana (PMFBY)</li>
              <li>National Food Security Buffer Coordination</li>
            </ul>
          </div>
        </div>

        {/* Data Badges Strip */}
        <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <span className="font-black text-white">Verified Data Badges:</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-200 font-bold shadow-2xs">
              Sentinel-2 MSI
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-200 font-bold shadow-2xs">
              SoilGrids
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-200 font-bold shadow-2xs">
              Open-Meteo
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-200 font-bold shadow-2xs">
              DiCRA UNDP
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-200 font-bold shadow-2xs">
              Gemini 2.5 Flash
            </span>
          </div>

          <div className="text-[11px] text-emerald-200/80 font-bold">
            {t.hackathonCredit}
          </div>
        </div>
      </div>
    </footer>
  );
};
