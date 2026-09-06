import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  MapPin,
  LogOut,
  Sparkles,
  Phone,
  KeyRound,
  Check,
  Flame,
  RefreshCw,
} from 'lucide-react';
import { UserProfile, UserRole, Language } from '../types';
import { useAuth } from '../context/AuthContext';
import { ConfirmationResult } from '../firebase';

interface AuthViewProps {
  language: Language;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onClose?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  language,
  currentUser,
  onLogin,
  onLogout,
  onClose,
}) => {
  const {
    user: authUser,
    firebaseUser,
    signInWithGoogle,
    signInWithEmail,
    sendPhoneOtp,
    verifyPhoneOtp,
    signOutUser,
  } = useAuth();

  // Active Login Mode: 'google' | 'email' | 'phone'
  const [authMode, setAuthMode] = useState<'google' | 'email' | 'phone'>('google');
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  // Email form state
  const [email, setEmail] = useState('farmer.ramesh@kisanmitra.gov.in');
  const [password, setPassword] = useState('Kisan@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('रमेश पटेल');
  const [role, setRole] = useState<UserRole>('farmer');
  const [district, setDistrict] = useState('शिवपुरी (Shivpuri), MP');
  const [farmSize, setFarmSize] = useState('4.5');

  // Phone OTP form state
  const [phone, setPhone] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [activeDemoOtp, setActiveDemoOtp] = useState<string>('5829');

  // UI feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isHindi = language === 'hi';
  const effectiveUser = currentUser || (authUser ? {
    id: authUser.id,
    name: authUser.displayName || authUser.name,
    role: authUser.role,
    phone: authUser.phone,
    email: authUser.email || undefined,
    state: authUser.state,
    district: authUser.district,
    farmSizeAcres: authUser.farmSizeAcres,
    primaryCrops: authUser.primaryCrops,
    kisanId: authUser.kisanId,
    officerDesignation: authUser.officerDesignation,
    isVerified: authUser.isVerified,
    joinedDate: authUser.joinedDate,
  } : null);

  // 1. Handle Login with Google via Firebase
  const handleGoogleLogin = async (customEmail?: string) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      const signedInUser = await signInWithGoogle(customEmail);
      
      const userProfile: UserProfile = {
        id: signedInUser.id,
        name: signedInUser.displayName || signedInUser.name,
        role: signedInUser.role,
        phone: signedInUser.phone,
        email: signedInUser.email || undefined,
        state: signedInUser.state,
        district: signedInUser.district,
        farmSizeAcres: signedInUser.farmSizeAcres,
        primaryCrops: signedInUser.primaryCrops,
        kisanId: signedInUser.kisanId,
        isVerified: true,
        joinedDate: signedInUser.joinedDate,
      };
      
      onLogin(userProfile);
      setSuccessMessage(isHindi ? 'Google से लॉगिन सफल!' : 'Google Login Successful!');
    } catch (err: any) {
      console.error('Google login error:', err);
      setErrorMessage(err.message || 'Google लॉगिन में त्रुटि हुई।');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Login with Email & Password via Firebase
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage(isHindi ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage(isHindi ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।' : 'Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const signedInUser = await signInWithEmail(
        email,
        password,
        isRegisterMode,
        displayName,
        role,
        district
      );

      const userProfile: UserProfile = {
        id: signedInUser.id,
        name: signedInUser.displayName || signedInUser.name,
        role: signedInUser.role,
        phone: signedInUser.phone,
        email: signedInUser.email || undefined,
        state: signedInUser.state,
        district: signedInUser.district,
        farmSizeAcres: role === 'farmer' ? (parseFloat(farmSize) || 4.5) : undefined,
        primaryCrops: role === 'farmer' ? ['शरबती गेहूं (Wheat)', 'पीली सरसों (Mustard)', 'चना (Gram)'] : undefined,
        officerDesignation: role === 'officer' ? 'वरिष्ठ कृषि वैज्ञानिक (KVK)' : undefined,
        kisanId: signedInUser.kisanId,
        isVerified: true,
        joinedDate: signedInUser.joinedDate,
      };

      onLogin(userProfile);
      setSuccessMessage(isHindi ? 'ईमेल प्रमाणीकरण सफल!' : 'Email Authentication Successful!');
    } catch (err: any) {
      setErrorMessage(err.message || 'ईमेल लॉगिन में त्रुटि हुई।');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Handle Phone OTP Send via Firebase
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const clean = phone.replace(/\D/g, '');
    if (!clean || clean.length < 10) {
      setErrorMessage(isHindi ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Enter a 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendPhoneOtp(clean, 'authview-recaptcha-container');
      if (res.success) {
        setOtpSent(true);
        if (res.confirmationResult) {
          setConfirmationResult(res.confirmationResult);
        }
        if (res.demoOtp) {
          setActiveDemoOtp(res.demoOtp);
          setOtpCode(res.demoOtp);
        }
        setSuccessMessage(res.message || (isHindi ? 'ओटीपी सफलतापूर्वक भेजा गया!' : 'OTP sent successfully!'));
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'ओटीपी भेजने में त्रुटि हुई।');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Handle Phone OTP Verify
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!otpCode || otpCode.length < 4) {
      setErrorMessage(isHindi ? 'कृपया 4 से 6 अंकों का ओटीपी दर्ज करें।' : 'Please enter the OTP code.');
      return;
    }

    setIsLoading(true);
    try {
      const signedInUser = await verifyPhoneOtp(
        otpCode,
        confirmationResult,
        phone,
        displayName,
        role,
        district
      );

      const userProfile: UserProfile = {
        id: signedInUser.id,
        name: signedInUser.name,
        role: signedInUser.role,
        phone: signedInUser.phone,
        email: signedInUser.email || undefined,
        state: signedInUser.state,
        district: signedInUser.district,
        farmSizeAcres: parseFloat(farmSize) || 4.5,
        primaryCrops: ['शरबती गेहूं (Wheat)', 'पीली सरसों (Mustard)', 'चना (Gram)'],
        kisanId: signedInUser.kisanId,
        isVerified: true,
        joinedDate: signedInUser.joinedDate,
      };

      onLogin(userProfile);
      setSuccessMessage(isHindi ? 'फोन ओटीपी सत्यापन सफल!' : 'Phone OTP Verified Successfully!');
    } catch (err: any) {
      setErrorMessage(err.message || 'ओटीपी सत्यापन में त्रुटि हुई।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    await signOutUser();
    onLogout();
    setSuccessMessage('');
    setErrorMessage('');
    setOtpSent(false);
    setOtpCode('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#082E16] via-[#0C411F] to-[#06200F] text-white p-6 sm:p-9 shadow-2xl border border-emerald-500/30 relative overflow-hidden">
        {/* Invisible Recaptcha target element */}
        <div id="authview-recaptcha-container" className="hidden" />

        {/* Ambient Top Glow */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ALREADY LOGGED IN: Profile View */}
        {effectiveUser ? (
          <div className="space-y-6 relative z-10">
            {/* Profile Header */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
              <div className="flex items-center gap-3.5">
                {authUser?.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={effectiveUser.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-[#34D399] text-[#064E3B] flex items-center justify-center font-black text-2xl shadow-md">
                    {effectiveUser.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white">{effectiveUser.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/40">
                      सत्यापित
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-300 mt-0.5">
                    <span className="font-mono text-emerald-200 font-bold">
                      {effectiveUser.phone || '9876543210'}
                    </span>
                    {effectiveUser.email && (
                      <>
                        <span className="text-emerald-400 font-bold">•</span>
                        <span className="font-mono text-emerald-300 text-[11px]">
                          {effectiveUser.email}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogoutClick}
                className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 transition-colors cursor-pointer text-xs font-black flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>लॉग आउट</span>
              </button>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-emerald-400/80 font-bold block text-[10px] uppercase">
                  {isHindi ? 'खाता स्थिति' : 'Account Status'}
                </span>
                <span className="text-white font-bold text-sm mt-0.5 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Firebase प्रमाणीकृत</span>
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-emerald-400/80 font-bold block text-[10px] uppercase">
                  {isHindi ? 'किसान पहचान पत्र' : 'Kisan ID'}
                </span>
                <span className="text-white font-bold text-sm mt-0.5 block font-mono">
                  {effectiveUser.kisanId || 'KA-88219-IN'}
                </span>
              </div>
            </div>

            {/* Farm Profile */}
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 space-y-2 text-xs">
              <span className="text-emerald-300 font-bold uppercase text-[10px] tracking-wider block">
                {isHindi ? 'सक्रिय फसलें व खेत क्षेत्रफल:' : 'Current Farm Profile:'}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {(effectiveUser.primaryCrops || ['गेहूं', 'सरसों', 'चना']).map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-800/80 text-emerald-100 font-bold text-xs border border-emerald-600/40">
                      🌾 {c}
                    </span>
                  ))}
                </div>
                <span className="text-emerald-200 font-bold font-mono">
                  {effectiveUser.farmSizeAcres || 4.5} एकड़ जोत • {effectiveUser.district || 'शिवपुरी, MP'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isHindi ? 'खेत डैशबोर्ड पर जाएं (Go to Farm Hub)' : 'Continue to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* LOGIN / REGISTRATION OPTIONS */
          <div className="space-y-5 relative z-10">
            {/* Header / Brand */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#34D399] flex items-center justify-center text-[#064E3B] shadow-lg shadow-emerald-950/50">
                  <Sprout className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center tracking-tight">
                    <span className="text-2xl font-black text-white">Kisan</span>
                    <span className="text-2xl font-black text-[#FACC15] ml-1">Mitra</span>
                  </div>
                  <p className="text-[11px] text-emerald-300/90 font-semibold">
                    {isHindi ? 'राष्ट्रीय डिजिटल कृषि पोर्टल' : 'National Digital Agri Portal'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-200 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Firebase Auth</span>
              </div>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* 3 LOGIN OPTIONS TABS: Google | Email | Phone */}
            <div className="flex p-1 rounded-2xl bg-white/10 border border-white/10">
              <button
                type="button"
                onClick={() => setAuthMode('google')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'google'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('email')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'email'
                    ? 'bg-[#22C55E] text-slate-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>ईमेल (Email)</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('phone')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'phone'
                    ? 'bg-[#22C55E] text-slate-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>फोन (OTP)</span>
              </button>
            </div>

            {/* TAB 1: GOOGLE SIGN-IN */}
            {authMode === 'google' && (
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Firebase 1-क्लिक Google साइन-इन</span>
                  </div>
                  <p className="text-emerald-100/80 leading-relaxed text-[11px]">
                    {isHindi
                      ? 'अपने Google खाते से सीधे जुड़ें। किसान बहीखाता, फसल इतिहास व मृदा रिपोर्ट सुरक्षित रूप से लिंक हो जाएंगे।'
                      : 'Sign in directly with your Google account. Your farm records and data will be safely synced.'}
                  </p>
                </div>

                <button
                  type="button"
                  id="firebase-google-login-button"
                  onClick={() => handleGoogleLogin()}
                  disabled={isLoading}
                  className="w-full py-4 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-sm shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-70"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 text-emerald-700 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span className="text-sm tracking-wide">
                    {isLoading
                      ? (isHindi ? 'Firebase से कनेक्ट हो रहा है...' : 'Connecting to Firebase...')
                      : (isHindi ? 'Google के साथ लॉगिन करें' : 'Sign in with Google')}
                  </span>
                </button>
              </div>
            )}

            {/* TAB 2: EMAIL & PASSWORD */}
            {authMode === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="text-emerald-300 font-bold">
                    {isRegisterMode
                      ? (isHindi ? 'नया किसान पंजीकरण' : 'New Registration')
                      : (isHindi ? 'ईमेल व पासवर्ड लॉगिन' : 'Email Sign-In')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(!isRegisterMode)}
                    className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer text-xs"
                  >
                    {isRegisterMode ? 'लॉगिन करें' : 'नया खाता बनाएं'}
                  </button>
                </div>

                <div>
                  <label className="text-xs text-emerald-200 font-bold block mb-1">
                    {isHindi ? 'ईमेल पता:' : 'Email Address:'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="farmer.ramesh@kisanmitra.gov.in"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono focus:outline-hidden focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-emerald-200 font-bold">
                      {isHindi ? 'पासवर्ड:' : 'Password:'}
                    </label>
                    <span className="text-[11px] text-emerald-400/70 font-mono">Kisan@2026</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono focus:outline-hidden focus:border-emerald-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-emerald-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4 text-amber-300" />}
                  <span>{isHindi ? 'ईमेल से लॉगिन करें' : 'Sign In with Email'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB 3: PHONE OTP */}
            {authMode === 'phone' && (
              <div className="space-y-4 pt-1">
                {!otpSent ? (
                  <form onSubmit={handleSendPhoneOtp} className="space-y-3.5">
                    <div>
                      <label className="text-xs text-emerald-200 font-bold block mb-1">
                        {isHindi ? '10-अंकीय मोबाइल नंबर:' : 'Mobile Number (+91):'}
                      </label>
                      <div className="flex gap-2">
                        <span className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs flex items-center font-bold">
                          +91
                        </span>
                        <div className="relative flex-1">
                          <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="9876543210"
                            required
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono font-bold tracking-wider focus:outline-hidden focus:border-emerald-400 placeholder:text-emerald-400/40"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Phone className="w-4 h-4 text-white" />
                      )}
                      <span>
                        {isLoading
                          ? (isHindi ? 'ओटीपी भेजा जा रहा है...' : 'Sending OTP...')
                          : (isHindi ? 'ओटीपी प्राप्त करें (Get OTP)' : 'Send OTP')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyPhoneOtp} className="space-y-3.5">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs">
                      <div>
                        <span className="text-emerald-300/80 block text-[10px]">
                          {isHindi ? 'सत्यापन नंबर:' : 'Mobile Number:'}
                        </span>
                        <span className="font-mono font-bold text-white text-sm">+91 {phone}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpCode('');
                        }}
                        className="text-amber-300 hover:text-amber-200 underline font-bold text-xs cursor-pointer"
                      >
                        नंबर बदलें
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-emerald-200 font-bold">
                          {isHindi ? 'ओटीपी कोड दर्ज करें:' : 'Enter OTP Code:'}
                        </label>
                        {activeDemoOtp && (
                          <span className="text-[11px] text-amber-300 font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded-md">
                            सत्यापन कोड: {activeDemoOtp}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="5829"
                          autoFocus
                          required
                          className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-lg font-mono tracking-widest text-center focus:outline-hidden focus:border-emerald-400 placeholder:text-white/30 font-bold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      )}
                      <span>
                        {isLoading
                          ? (isHindi ? 'सत्यापित किया जा रहा है...' : 'Verifying...')
                          : (isHindi ? 'सत्यापित करें व लॉगिन करें' : 'Verify OTP & Sign In')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Bottom Certification */}
            <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>डिजिटल पब्लिक गुड (DPG) सर्टिफाइड</span>
              </div>
              <span className="font-mono text-emerald-300/80">Firebase Auth v12</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
