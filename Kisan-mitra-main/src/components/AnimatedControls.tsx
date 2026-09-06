import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Sun, Sparkles, Check, X, ShieldCheck } from 'lucide-react';

/* =========================================================================
   ANIMATED LOGO COMPONENT
   - Pulsing golden/emerald halo
   - Swaying sprout with spring elasticity
   - Orbiting satellite spark
   - Interactive click burst and scale
   ========================================================================= */
interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showText?: boolean;
  subtext?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  onClick,
  showText = true,
  subtext,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const sizeClasses = {
    sm: { box: 'w-8 h-8', icon: 'w-4 h-4', title: 'text-base', text: 'text-[10px]' },
    md: { box: 'w-10 h-10', icon: 'w-5 h-5', title: 'text-lg', text: 'text-[11px]' },
    lg: { box: 'w-14 h-14', icon: 'w-7 h-7', title: 'text-2xl', text: 'text-xs' },
  }[size];

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    if (onClick) onClick();
  };

  return (
    <div
      className="inline-flex items-center gap-3 select-none cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Pulsing orbital aura */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.25, 1.1] : [1, 1.12, 1],
            opacity: isHovered ? [0.4, 0.8, 0.5] : [0.2, 0.45, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: isHovered ? 4 : 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-emerald-400 via-yellow-400 to-green-500 blur-xs -z-10"
        />

        {/* Satellite orbit dot */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 -m-2 pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.9)] absolute -top-1 left-1/2 -translate-x-1/2" />
        </motion.div>

        {/* Main logo badge icon */}
        <motion.div
          animate={{
            scale: isClicked ? 0.88 : isHovered ? 1.08 : 1,
            rotate: isClicked ? [0, -12, 12, 0] : isHovered ? [0, -4, 4, 0] : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 18,
          }}
          className={`${sizeClasses.box} rounded-2xl bg-gradient-to-br from-white via-[#F1F8E9] to-[#E8F5E9] shadow-md border border-white/60 flex items-center justify-center relative overflow-hidden`}
        >
          {/* Internal light sheen animation */}
          <motion.div
            animate={{
              x: isHovered ? ['-100%', '200%'] : ['-100%', '200%'],
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 1.8 : 3.5,
              ease: 'easeInOut',
              repeatDelay: 1,
            }}
            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Plant Sprout with animated breathing sway */}
          <motion.div
            animate={{
              rotate: [0, 3, -3, 0],
              y: [0, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sprout className={`${sizeClasses.icon} text-[#2E7D32] stroke-[2.4]`} />
          </motion.div>

          {/* Micro sparkle burst on click */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 bg-yellow-300/40 rounded-2xl pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`${sizeClasses.title} font-extrabold tracking-tight text-white group-hover:text-yellow-300 transition-colors`}>
              KisanAI
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              Krishi Mitra
            </span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300/40" />
            </motion.span>
          </div>
          <span className={`${sizeClasses.text} text-emerald-100/85 font-medium tracking-wide`}>
            {subtext || 'Agricultural AI Network & DPG'}
          </span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   ANIMATED SWITCH COMPONENT
   - Spring-driven switch handle
   - Tactile press bounce & scale
   - Glow ring indicator
   - Optional sound-like visual feedback ripple
   ========================================================================= */
interface AnimatedSwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  disabled?: boolean;
}

export const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  sublabel,
  size = 'md',
  activeColor = 'bg-[#2E7D32]',
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const dimensions = {
    sm: { track: 'w-9 h-5', thumb: 'w-3.5 h-3.5', offset: 16, icon: 'w-2 h-2' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', offset: 24, icon: 'w-2.5 h-2.5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', offset: 28, icon: 'w-3 h-3' },
  }[size];

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleToggle}
    >
      <div className="relative inline-flex items-center">
        {/* Track */}
        <motion.div
          animate={{
            backgroundColor: checked ? '#2E7D32' : '#cbd5e1',
          }}
          transition={{ duration: 0.25 }}
          className={`${dimensions.track} rounded-full p-0.5 relative transition-colors shadow-inner flex items-center`}
        >
          {/* Thumb */}
          <motion.div
            layout
            animate={{
              x: checked ? dimensions.offset : 0,
              scale: isPressed ? 0.85 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 650,
              damping: 32,
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            className={`${dimensions.thumb} rounded-full bg-white shadow-md flex items-center justify-center`}
          >
            {checked ? (
              <Check className={`${dimensions.icon} text-[#2E7D32] stroke-[3]`} />
            ) : (
              <X className={`${dimensions.icon} text-slate-400 stroke-[2.5]`} />
            )}
          </motion.div>
        </motion.div>

        {/* Glow halo when turned on */}
        {checked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-full bg-green-400/40 pointer-events-none"
          />
        )}
      </div>

      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && <span className="text-xs sm:text-sm font-semibold text-slate-800">{label}</span>}
          {sublabel && <span className="text-[11px] text-slate-500">{sublabel}</span>}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   ANIMATED PILL TOGGLE GROUP
   - Fluid spring indicator sliding across options
   - Bounce on tap
   ========================================================================= */
interface AnimatedPillOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface AnimatedPillToggleProps<T extends string> {
  options: AnimatedPillOption<T>[];
  value: T;
  onChange: (val: T) => void;
  layoutIdPrefix?: string;
  size?: 'sm' | 'md';
}

export function AnimatedPillToggle<T extends string>({
  options,
  value,
  onChange,
  layoutIdPrefix = 'pill-toggle',
  size = 'md',
}: AnimatedPillToggleProps<T>) {
  const padClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm font-semibold';

  return (
    <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            id={`toggle-${layoutIdPrefix}-${opt.value}`}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onChange(opt.value)}
            className={`relative ${padClass} rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer z-10 ${
              isActive ? 'text-[#2E7D32] font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={`pill-active-${layoutIdPrefix}`}
                className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200/50 -z-10"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              />
            )}
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.badge && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-slate-200 text-slate-600'
              }`}>
                {opt.badge}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
