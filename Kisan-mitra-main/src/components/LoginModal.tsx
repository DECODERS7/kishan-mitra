import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  Sprout,
  ArrowRight,
  RefreshCw,
  Mail,
  Eye,
  EyeOff,
  Phone,
  KeyRound,
  Flame,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ConfirmationResult } from '../firebase';
import { Language } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    sendPhoneOtp,
    verifyPhoneOtp,
    signOutUser,
  } = useAuth();

  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [loginMethod, setLoginMethod] = useState<'google' | 'email' | 'phone'>('google');

  // Email form state
  const [emailInput, setEmailInput] = useState('farmer.ramesh@kisanmitra.gov.in');
  const [passwordInput, setPasswordInput] = useState('Kisan@2026');
  const [showPassword, setShowPassword] = useState(false);

  // Phone OTP form state
  const [phoneInput, setPhoneInput] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [demoOtp, setDemoOtp] = useState<string>('5829');

  const isHindi = language === 'hi';
  const isPunjabi = language === 'pa';

  // 1. Firebase Google Sign-In
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google sign-in failure:', err);
      setAuthError(err.message || 'Google प्रमाणीकरण में समस्या आई। पुनः प्रयास करें।');
    } finally {
      setIsSigningIn(false);
    }
  };

  // 2. Firebase Email Sign-In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    if (!emailInput || !emailInput.includes('@')) {
      setAuthError(isHindi ? 'कृपया एक मान्य ईमेल दर्ज करें।' : 'Please enter a valid email.');
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithEmail(emailInput, passwordInput);
      onClose();
    } catch (err: any) {
      console.error('Email sign-in failure:', err);
      setAuthError(err.message || 'ईमेल लॉगिन में त्रुटि हुई।');
    } finally {
      setIsSigningIn(false);
    }
  };

  // 3. Firebase Phone OTP Send
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    if (!phoneInput || phoneInput.replace(/\D/g, '').length < 10) {
      setAuthError(isHindi ? 'कृपया 10 अंकों का फोन नंबर दर्ज करें।' : 'Enter a 10-digit mobile number.');
      return;
    }
    setIsSigningIn(true);
    try {
      const res = await sendPhoneOtp(phoneInput, 'modal-recaptcha-container');
      if (res.success) {
        setOtpSent(true);
        if (res.confirmationResult) {
          setConfirmationResult(res.confirmationResult);
        }
        if (res.demoOtp) {
          setDemoOtp(res.demoOtp);
          setOtpCode(res.demoOtp);
        }
        setAuthSuccess(res.message || (isHindi ? 'ओटीपी भेजा गया!' : 'OTP Sent!'));
      }
    } catch (err: any) {
      setAuthError(err.message || 'ओटीपी भेजने में त्रुटि हुई।');
    } finally {
      setIsSigningIn(false);
    }
  };

  // 4. Firebase Phone OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    if (!otpCode || otpCode.length < 4) {
      setAuthError(isHindi ? 'कृपया ओटीपी कोड दर्ज करें।' : 'Please enter OTP.');
      return;
    }
    setIsSigningIn(true);
    try {
      await verifyPhoneOtp(otpCode, confirmationResult, phoneInput, 'रमेश पटेल');
      onClose();
    } catch (err: any) {
      setAuthError(err.message || 'ओटीपी सत्यापन में त्रुटि हुई।');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setOtpSent(false);
      setOtpCode('');
    } catch (err: any) {
      console.error('Sign out failure:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Invisible Recaptcha container for Phone Auth */}
        <div id="modal-recaptcha-container" className="hidden" />

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md bg-white dark:bg-[#07190F] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-emerald-800/60 overflow-hidden"
        >
          {/* Top Decorative Border Accent */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-xs">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {user
                    ? (isHindi ? 'किसान प्रोफ़ाइल व खाता' : isPunjabi ? 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ' : 'Farmer Account')
                    : (isHindi ? 'किसान मित्र लॉगिन' : isPunjabi ? 'ਕਿਸਾਨ ਮਿੱਤਰ ਲੌਗਇਨ' : 'Kisan Mitra Login')}
                </h2>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>Firebase</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-emerald-300/80 font-medium">
                {isHindi
                  ? 'सुरक्षित किसान पहचान व डिजिटल बहीखाता'
                  : 'Secure Farmer Identification & Farm Hub'}
              </p>
            </div>
          </div>

          {/* Alerts */}
          {authError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{authError}</span>
            </div>
          )}
          {authSuccess && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* User Logged In State */}
          {user ? (
            <div className="space-y-5">
              {/* Profile Badge */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-800/40 flex items-center gap-3.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Farmer'}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full border-2 border-emerald-500 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                    {(user.displayName || user.name || user.email || 'F')[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {user.displayName || user.name || 'Kisan User'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate font-mono">
                    {user.email || user.phone}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>
                      {user.authProvider === 'google'
                        ? '🔥 Firebase Google प्रमाणीकृत'
                        : user.authProvider === 'phone'
                        ? '🔥 Firebase Phone OTP सत्यापित'
                        : '🔥 Firebase Email सत्यापित'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-200 dark:border-emerald-900/40">
                  <span className="text-[10px] text-slate-400 dark:text-emerald-400 font-bold uppercase mb-1 block">
                    {isHindi ? 'किसान पहचान पत्र' : 'Kisan ID'}
                  </span>
                  <div className="font-black text-slate-800 dark:text-white font-mono">
                    {user.kisanId || 'KA-88219-IN'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-200 dark:border-emerald-900/40">
                  <span className="text-[10px] text-slate-400 dark:text-emerald-400 font-bold uppercase mb-1 block">
                    {isHindi ? 'भूमिका व जिला' : 'Role & District'}
                  </span>
                  <div className="font-black text-emerald-700 dark:text-emerald-300 truncate">
                    {user.role === 'farmer' ? 'किसान' : 'अधिकारी'} • {user.district || 'शिवपुरी'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-emerald-950/50 hover:bg-slate-200 dark:hover:bg-emerald-900 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-emerald-800/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isHindi ? 'लॉगआउट करें' : 'Sign Out'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{isHindi ? 'जारी रखें' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Logged Out / Sign-in Options: Google + Email + Phone OTP */
            <div className="space-y-4">
              {/* Method Switcher */}
              <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/60">
                <button
                  type="button"
                  onClick={() => setLoginMethod('google')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    loginMethod === 'google'
                      ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-emerald-200'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    loginMethod === 'email'
                      ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-emerald-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'ईमेल' : 'Email'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    loginMethod === 'phone'
                      ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-emerald-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'ओटीपी' : 'OTP'}</span>
                </button>
              </div>

              {/* METHOD 1: GOOGLE */}
              {loginMethod === 'google' && (
                <div className="space-y-4 pt-1">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-slate-700 dark:text-emerald-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-300">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{isHindi ? 'Firebase Google 1-क्लिक लॉगिन' : 'Instant Firebase Google Sign-In'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-emerald-200/80">
                      {isHindi
                        ? 'अपने Google खाते से सीधे जुड़ें। किसान बहीखाता व फसल इतिहास सुरक्षित रहेगा।'
                        : 'Connect with your Google account seamlessly. Keep farm ledger records synced.'}
                    </p>
                  </div>

                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn || loading}
                    id="modal-google-signin-btn"
                    className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-black text-sm border border-slate-300 dark:border-emerald-700/60 shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
                  >
                    {isSigningIn ? (
                      <RefreshCw className="w-5 h-5 text-emerald-600 animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    )}
                    <span>
                      {isSigningIn
                        ? (isHindi ? 'Firebase से जुड़ रहा है...' : 'Connecting to Firebase...')
                        : (isHindi ? 'Google से लॉगिन करें' : 'Sign in with Google')}
                    </span>
                  </button>
                </div>
              )}

              {/* METHOD 2: EMAIL */}
              {loginMethod === 'email' && (
                <form onSubmit={handleEmailSignIn} className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-emerald-200 block mb-1">
                      {isHindi ? 'ईमेल पता:' : 'Email Address:'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 dark:text-emerald-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="farmer@kisanmitra.gov.in"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-emerald-200">
                        {isHindi ? 'पासवर्ड:' : 'Password:'}
                      </label>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                        Kisan@2026
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 dark:text-emerald-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSigningIn}
                    className="w-full py-3 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                  >
                    {isSigningIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4 text-amber-300" />}
                    <span>{isHindi ? 'Firebase ईमेल से लॉगिन करें' : 'Sign in with Firebase Email'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* METHOD 3: PHONE OTP */}
              {loginMethod === 'phone' && (
                <div className="space-y-3 pt-1">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-emerald-200 block mb-1">
                          {isHindi ? 'मोबाइल नंबर:' : 'Mobile Number:'}
                        </label>
                        <div className="flex gap-2">
                          <span className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800 text-xs font-mono font-bold flex items-center text-slate-700 dark:text-white">
                            +91
                          </span>
                          <div className="relative flex-1">
                            <Phone className="w-4 h-4 text-slate-400 dark:text-emerald-400 absolute left-3 top-3" />
                            <input
                              type="tel"
                              maxLength={10}
                              value={phoneInput}
                              onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                              placeholder="9876543210"
                              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSigningIn}
                        className="w-full py-3 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSigningIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                        <span>{isHindi ? 'Firebase से OTP प्राप्त करें' : 'Send OTP via Firebase'}</span>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-emerald-200">
                            {isHindi ? 'सत्यापन ओटीपी दर्ज करें:' : 'Enter Verification OTP:'}
                          </label>
                          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                            कोड: {demoOtp}
                          </span>
                        </div>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 text-slate-400 dark:text-emerald-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="5829"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white text-base font-mono tracking-widest text-center focus:outline-hidden focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSigningIn}
                        className="w-full py-3 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSigningIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        <span>{isHindi ? 'सत्यापित करें व लॉगिन करें' : 'Verify & Sign In'}</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-emerald-900/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isHindi
                    ? '100% सुरक्षित • Firebase प्रमाणीकरण v12'
                    : '100% Secure • Firebase Auth v12'}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
