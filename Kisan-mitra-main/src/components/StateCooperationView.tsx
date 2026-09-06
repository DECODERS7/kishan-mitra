import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Share2, Database, CheckCircle2, Clock, Terminal, Copy, Check, ArrowRightLeft, ShieldCheck, Activity, Globe, X, Code2 } from 'lucide-react';
import { Language, StateNetworkRecord } from '../types';
import { translations } from '../data/translations';

interface StateCooperationViewProps {
  language: Language;
}

export const StateCooperationView: React.FC<StateCooperationViewProps> = ({ language }) => {
  const t = translations[language];
  const [states, setStates] = useState<StateNetworkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'surplus' | 'deficit'>('all');
  const [selectedInterstateDeal, setSelectedInterstateDeal] = useState<string | null>(null);
  const [inspectingState, setInspectingState] = useState<StateNetworkRecord | null>(null);

  useEffect(() => {
    fetch('/api/dpg/state-exchange')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.states) {
          setStates(data.states);
        }
      })
      .catch((err) => {
        console.error('Error fetching state exchange data:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const sampleCurl = `curl "https://krishimitra.gov.in/api/v1/dpg/state-exchange" \\
  -H "Accept: application/json" \\
  -H "X-DPG-Cooperation-Key: DPG-AGRI-IND-2026" \\
  -X GET`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredStates = states.filter((s) => {
    if (filterType === 'surplus') return s.statusType === 'surplus';
    if (filterType === 'deficit') return s.statusType === 'deficit';
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Top Banner & Overview - Glossy Dark Green */}
      <div className="gloss-card-dark text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-white/20 relative overflow-hidden">
        {/* Specular Glint Top Rim */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        <div className="flex flex-wrap items-start justify-between gap-5 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gloss-pill bg-white/10 text-emerald-200 text-xs font-black mb-3 border border-white/20 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
              <span>Digital Public Good (DPG) Cooperation Grid</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mb-2 text-white">
              {t.cooperationTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              {t.cooperationSubtitle}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-left shadow-inner">
            <span className="text-[10px] text-emerald-200 uppercase tracking-wider block font-black">Interstate Live Mesh</span>
            <div className="flex items-center gap-2 mt-1.5">
              <Activity className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span className="text-xl font-black text-white">28 States / UTs</span>
            </div>
            <span className="text-[10px] text-emerald-200/80 block mt-1 font-medium">
              149,200 Active Daily Bilateral Telemetry Exchanges
            </span>
          </div>
        </div>

        {/* Live Cross-State Balancing Ticker */}
        <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="font-black text-yellow-300">Live Surplus-to-Deficit Flow:</span>
            <span className="text-emerald-100 font-medium">Punjab (+5.1M MT Wheat) ➔ Kerala Deficit Requisition Auto-Balanced</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedInterstateDeal('Bilateral agreement confirmed between Madhya Pradesh (Soybean) and West Bengal (Cooking Oil). Scheduled dispatch via Kisan Rail.')}
            className="px-4 py-1.5 rounded-xl gloss-btn-primary text-white font-black text-xs cursor-pointer border border-emerald-300/60 shadow-xs transition-all"
          >
            Simulate Interstate Requisition
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {selectedInterstateDeal && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-emerald-500/15 border border-emerald-400/60 p-4 rounded-2xl text-emerald-950 text-xs sm:text-sm font-bold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{selectedInterstateDeal}</span>
            </div>
            <button onClick={() => setSelectedInterstateDeal(null)} className="text-emerald-800 hover:text-black font-black ml-4 cursor-pointer">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* State Data Federation Table */}
      <div className="gloss-card rounded-3xl shadow-lg border border-white/90 overflow-hidden relative">
        {/* Specular Glint Top Rim */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        <div className="p-4 sm:p-5 border-b border-white/60 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Federated State Telemetry Registry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Live multi-spectral satellite telemetry and foodgrain buffer balances</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/90 shadow-inner text-xs font-bold text-slate-600">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterType === 'all' ? 'gloss-btn-primary text-white font-black shadow-xs' : 'hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All States ({states.length})
            </button>
            <button
              onClick={() => setFilterType('surplus')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterType === 'surplus' ? 'gloss-btn-primary text-white font-black shadow-xs' : 'hover:text-[#2E7D32] hover:bg-white/60'
              }`}
            >
              Surplus Hubs
            </button>
            <button
              onClick={() => setFilterType('deficit')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterType === 'deficit' ? 'gloss-btn-primary text-white font-black shadow-xs' : 'hover:text-amber-800 hover:bg-white/60'
              }`}
            >
              Deficit Demand Hubs
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-white/40 text-[10px] uppercase tracking-wider text-slate-500 font-black border-b border-white/60">
              <tr>
                <th className="py-3.5 px-4">{t.stateCol}</th>
                <th className="py-3.5 px-4">{t.primaryCropCol}</th>
                <th className="py-3.5 px-4">{t.areaCol}</th>
                <th className="py-3.5 px-4">{t.surplusCol}</th>
                <th className="py-3.5 px-4">{t.dataStatusCol}</th>
                <th className="py-3.5 px-4">Telemetry Stream</th>
                <th className="py-3.5 px-4 text-right">Federated API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredStates.map((st) => (
                <tr key={st.stateCode} className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center border border-emerald-300 shadow-2xs">
                        {st.stateCode}
                      </span>
                      <span>{st.stateName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{st.primaryCrop}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {(st.totalCultivatedAreaHectares / 100000).toFixed(1)} Lakh Ha
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-black text-[10px] shadow-2xs ${
                        st.statusType === 'surplus'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {st.surplusStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-black text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      {st.dataSharingStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <div className="font-bold text-slate-700">{st.satelliteSensor}</div>
                    <span className="text-[10px] text-slate-400 font-medium">{st.lastTelemetrySync}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setInspectingState(st)}
                      className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-black text-[11px] border border-white/90 shadow-2xs cursor-pointer transition-colors"
                    >
                      Inspect JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect State Schema Modal */}
      <AnimatePresence>
        {inspectingState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              className="gloss-card-dark rounded-3xl max-w-lg w-full p-6 text-white border border-white/20 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-black text-white">
                    {inspectingState.stateName} Federated Telemetry Schema
                  </h4>
                </div>
                <button
                  onClick={() => setInspectingState(null)}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white border border-white/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto mb-4 space-y-1">
                <p className="text-slate-400">// DPG Standard Protocol v2.4 Endpoint</p>
                <p><span className="text-yellow-400">GET</span> {inspectingState.openDataEndpoint}</p>
                <p className="pt-2 text-slate-300">{"{"}</p>
                <p className="pl-4 text-emerald-300">"stateCode": "{inspectingState.stateCode}",</p>
                <p className="pl-4 text-emerald-300">"stateName": "{inspectingState.stateName}",</p>
                <p className="pl-4 text-emerald-300">"primaryCrop": "{inspectingState.primaryCrop}",</p>
                <p className="pl-4 text-emerald-300">"statusType": "{inspectingState.statusType}",</p>
                <p className="pl-4 text-emerald-300">"surplusMT": "{inspectingState.surplusStatus}",</p>
                <p className="pl-4 text-emerald-300">"satelliteSensor": "{inspectingState.satelliteSensor}",</p>
                <p className="pl-4 text-emerald-300">"lastTelemetrySync": "{inspectingState.lastTelemetrySync}"</p>
                <p className="text-slate-300">{"}"}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setInspectingState(null)}
                  className="px-4 py-2 rounded-xl gloss-btn-primary text-white text-xs font-black border border-emerald-300/60 shadow-sm cursor-pointer"
                >
                  Close Schema
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mock API / Open Data Exchange Endpoint Box */}
      <div className="gloss-card-dark rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-white/15 relative overflow-hidden">
        {/* Specular Glint Top Rim */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-yellow-400" />
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider font-mono">
                {t.apiBoxTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">{t.apiBoxDesc}</p>
          </div>

          <button
            onClick={handleCopyCurl}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/20 transition-all cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-black">Copied cURL</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyApi}</span>
              </>
            )}
          </button>
        </div>

        {/* cURL Code Block */}
        <pre className="bg-black/50 backdrop-blur-md p-4 rounded-2xl text-xs font-mono text-emerald-300 overflow-x-auto border border-white/10 leading-relaxed shadow-inner">
          {sampleCurl}
        </pre>

        {/* Standard JSON response payload preview */}
        <div className="mt-3.5 pt-3.5 border-t border-white/15 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 font-medium">
          <span>Schema Standard: ISO-19115 AgStack / DPG Crop Telemetry Format v2</span>
          <span className="text-yellow-400 font-mono font-bold">Response Format: application/json (HTTP 200 OK)</span>
        </div>
      </div>
    </div>
  );
};
