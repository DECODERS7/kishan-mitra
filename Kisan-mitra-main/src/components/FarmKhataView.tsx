import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Wallet,
  IndianRupee,
  Calendar,
  Tag,
  Trash2,
  CheckCircle2,
  Filter,
  Download,
  Sprout,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
} from 'lucide-react';
import { Language } from '../types';
import { useAuth } from '../context/AuthContext';

interface KhataEntry {
  id: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  date: string;
  note: string;
  crop: string;
}

export const FarmKhataView: React.FC<{ language: Language }> = ({ language }) => {
  const DEFAULT_ENTRIES: KhataEntry[] = [
    {
      id: 'k1',
      type: 'income',
      category: 'फसल बिक्री (Crop Sales)',
      amount: 48500,
      date: '28 Aug 2026',
      note: 'शरबती गेहूं (22 क्विंटल @ ₹2,205/क्विंटल)',
      crop: 'Wheat',
    },
    {
      id: 'k2',
      type: 'expense',
      category: 'खाद व उर्वरक (Fertilizer)',
      amount: 4200,
      date: '15 Aug 2026',
      note: 'DAP (2 बैग) व यूरिया (3 बैग)',
      crop: 'Wheat',
    },
    {
      id: 'k3',
      type: 'expense',
      category: 'ट्रैक्टर व जुताई (Tractor & Fuel)',
      amount: 3500,
      date: '10 Aug 2026',
      note: 'खेत जुताई व रोटावेटर 4 घंटे',
      crop: 'General',
    },
    {
      id: 'k4',
      type: 'expense',
      category: 'प्रमाणित बीज (Certified Seeds)',
      amount: 5600,
      date: '02 Aug 2026',
      note: 'HI-1544 गेहूं बीज 120 किग्रा',
      crop: 'Wheat',
    },
    {
      id: 'k5',
      type: 'income',
      category: 'फसल बिक्री (Crop Sales)',
      amount: 32000,
      date: '18 Jul 2026',
      note: 'सरसों उपज 6 क्विंटल बिक्री',
      crop: 'Mustard',
    },
  ];

  const [entries, setEntries] = useState<KhataEntry[]>(() => {
    try {
      const stored = localStorage.getItem('kisan_khata_entries');
      return stored ? JSON.parse(stored) : DEFAULT_ENTRIES;
    } catch {
      return DEFAULT_ENTRIES;
    }
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'expense' | 'income'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, signInWithGoogle } = useAuth();

  // Save entries to localStorage on changes
  const saveEntries = (updated: KhataEntry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem('kisan_khata_entries', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  // Form states
  const [formType, setFormType] = useState<'expense' | 'income'>('expense');
  const [formCategory, setFormCategory] = useState('खाद व उर्वरक (Fertilizer)');
  const [formAmount, setFormAmount] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formCrop, setFormCrop] = useState('गेहूं (Wheat)');

  const totalIncome = entries
    .filter((e) => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(formAmount);
    if (isNaN(amt) || amt <= 0) return;

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newEntry: KhataEntry = {
      id: `k-${Date.now()}`,
      type: formType,
      category: formCategory,
      amount: amt,
      date: dateStr,
      note: formNote || (formType === 'income' ? 'फसल बिक्री' : 'कृषि लागत'),
      crop: formCrop,
    };

    saveEntries([newEntry, ...entries]);
    setShowAddModal(false);
    setFormAmount('');
    setFormNote('');
  };

  const handleDelete = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id));
  };

  const filteredEntries = entries.filter((e) => {
    if (activeFilter === 'expense') return e.type === 'expense';
    if (activeFilter === 'income') return e.type === 'income';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0E4220] via-[#155E2E] to-[#0A3317] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-600/30">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-white/20">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>डिजिटल किसान बहीखाता (Digital Farm Ledger)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              खेती-किसानी का हिसाब-किताब
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl font-medium">
              अपनी फसल की लागत (बीज, खाद, जुताई, मजदूरी) और कुल उपज बिक्री का हिसाब रखें तथा सही शुद्ध मुनाफा देखें।
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-lg shadow-emerald-950/30 transition-all cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>नया हिसाब जोड़ें (+ Add Entry)</span>
          </button>
        </div>

        {/* Ledger Status Strip */}
        <div className="mt-4 pt-3 border-t border-emerald-700/40 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {user ? (
              <span className="text-emerald-200 font-semibold flex items-center gap-1.5">
                <span>सक्रिय किसान खाता: </span>
                <span className="font-mono text-white font-bold">{user.displayName || user.name || user.email}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {user.authProvider === 'google' ? 'Google Authenticated' : 'Email Verified'}
                </span>
              </span>
            ) : (
              <span className="text-emerald-200/90 font-medium">
                स्थानीय खाता सक्रिय (Offline Safe) • सभी प्रविष्टियाँ सुरक्षित रूप से सहेजी जा रही हैं
              </span>
            )}
          </div>

          {!user && (
            <button
              onClick={() => signInWithGoogle()}
              className="px-3 py-1 rounded-xl bg-white text-emerald-950 hover:bg-emerald-100 font-black text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>Google से त्वरित लॉगिन</span>
              <Lock className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Income */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">कुल आय (Total Sales)</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            फसल बिक्री और सरकारी एमएसपी से प्राप्त
          </p>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">कुल लागत (Total Expense)</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2 font-mono">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">
            बीज, खाद, जुताई, स्प्रे व मजदूरी खर्च
          </p>
        </div>

        {/* Net Profit */}
        <div className={`rounded-3xl p-5 border shadow-xs relative overflow-hidden ${
          netProfit >= 0 ? 'bg-emerald-50/80 border-emerald-300' : 'bg-rose-50/80 border-rose-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">शुद्ध मुनाफा (Net Profit)</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              netProfit >= 0 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-2xl font-black mt-2 font-mono ${
            netProfit >= 0 ? 'text-emerald-800' : 'text-rose-800'
          }`}>
            {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString('en-IN')}
          </div>
          <p className={`text-[11px] font-bold mt-1 ${
            netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            {netProfit >= 0 ? 'लाभप्रद सीजन (Profitable Season)' : 'लागत से कम आमदनी'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            सभी लेन-देन ({entries.length})
          </button>
          <button
            onClick={() => setActiveFilter('income')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeFilter === 'income'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            आय / बिक्री
          </button>
          <button
            onClick={() => setActiveFilter('expense')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeFilter === 'expense'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            लागत / खर्च
          </button>
        </div>

        <span className="text-xs text-slate-500 font-bold hidden sm:inline-block">
          कुल {filteredEntries.length} प्रविष्टियां
        </span>
      </div>

      {/* Entries List */}
      <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  entry.type === 'income'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-600'
                }`}
              >
                {entry.type === 'income' ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-900">{entry.category}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                    {entry.crop}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{entry.note}</p>
                <span className="text-[11px] text-slate-400 font-semibold">{entry.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <div
                  className={`text-base sm:text-lg font-black font-mono ${
                    entry.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {entry.type === 'income' ? 'जमा (Credit)' : 'खर्च (Debit)'}
                </span>
              </div>

              <button
                onClick={() => handleDelete(entry.id)}
                className="p-2 text-slate-300 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                title="हटाएं"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to add new entry */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900">नया खर्च या आय जोड़ें</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddEntry} className="space-y-4">
                {/* Type toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('expense');
                      setFormCategory('खाद व उर्वरक (Fertilizer)');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                      formType === 'expense'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    खर्च / लागत (Expense)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('income');
                      setFormCategory('फसल बिक्री (Crop Sales)');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                      formType === 'income'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    आय / बिक्री (Income)
                  </button>
                </div>

                {/* Amount */}
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">रकम (Amount in ₹)</label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="₹ 5000"
                    required
                    className="w-full px-3.5 py-2.5 text-base font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {formType === 'expense' ? (
                      <>
                        <option value="खाद व उर्वरक (Fertilizer)">खाद व उर्वरक (Fertilizer)</option>
                        <option value="प्रमाणित बीज (Certified Seeds)">प्रमाणित बीज (Seeds)</option>
                        <option value="कीटनाशक व स्प्रे (Pesticides)">कीटनाशक व स्प्रे (Pesticides)</option>
                        <option value="ट्रैक्टर व जुताई (Tractor / Fuel)">ट्रैक्टर व जुताई (Tractor / Fuel)</option>
                        <option value="मजदूरी व कटाई (Labor / Harvesting)">मजदूरी व कटाई (Labor / Harvesting)</option>
                        <option value="सिंचाई (Irrigation / Water)">सिंचाई (Irrigation / Water)</option>
                        <option value="अन्य खर्च (Other)">अन्य खर्च (Other)</option>
                      </>
                    ) : (
                      <>
                        <option value="फसल बिक्री (Crop Sales)">फसल बिक्री (Crop Sales)</option>
                        <option value="सरकारी सब्सिडी / सहायता (Subsidy)">सरकारी सब्सिडी / सहायता (Subsidy)</option>
                        <option value="अन्य आय (Other Income)">अन्य आय (Other Income)</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Crop & Note */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">फसल (Crop)</label>
                    <input
                      type="text"
                      value={formCrop}
                      onChange={(e) => setFormCrop(e.target.value)}
                      placeholder="गेहूं / सरसों"
                      className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">विवरण (Note)</label>
                    <input
                      type="text"
                      value={formNote}
                      onChange={(e) => setFormNote(e.target.value)}
                      placeholder="e.g. 2 कट्टे डीएपी"
                      className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer mt-2"
                >
                  बहीखाते में दर्ज करें (Save Entry)
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
