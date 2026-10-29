import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'red' | 'ghost' | 'game';
  size?: 'sm' | 'md' | 'lg';
  game?: 'mc' | 'skyrim' | 'drg';
  children: React.ReactNode;
  loading?: boolean;
}

export function PixelButton({ className, variant = 'primary', size = 'md', game, children, loading, disabled, ...props }: PixelButtonProps) {
    const baseStyles = 'relative font-pixel uppercase tracking-wider select-none';

    const variantStyles = {
      primary: 'bg-vw-blue text-pixel-bg hover:bg-cyan-300 shadow-glow-cyan hover:shadow-glow-cyan border-2 border-vw-blue',
      gold: 'bg-vw-sun text-pixel-text hover:bg-vw-sun2 shadow-glow-pink hover:shadow-glow-pink border-2 border-vw-sun',
      red: 'bg-vw-pink text-pixel-text hover:bg-pink-500 shadow-glow-pink hover:shadow-glow-pink border-2 border-vw-pink',
      ghost: 'bg-transparent text-pixel-text hover:bg-pixel-border border-2 border-pixel-border',
      game: 'border-2',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-[8px]',
      md: 'px-5 py-2.5 text-[10px]',
      lg: 'px-8 py-4 text-[11px]',
    };

    const gameStyles = {
      mc: 'bg-vw-purple text-vw-pink hover:bg-vw-horizon border-vw-pink',
      skyrim: 'bg-vw-panel text-vw-sun hover:bg-pixel-card border-vw-sun',
      drg: 'bg-pixel-bg text-vw-blue hover:bg-pixel-card border-vw-blue',
    };

    const combinedStyles = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      game && variant === 'game' ? gameStyles[game] : '',
      'border-[4px] border-b-[6px] border-r-[6px]',
      'shadow-[4px_4px_0_0_rgba(0,0,0,0.4)]',
      'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.4)]',
      'active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
      'transition-all duration-75 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pixel-accent focus-visible:ring-offset-pixel-bg',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0_0_rgba(0,0,0,0.4)]',
      className
    );

  return (
    <button
      className={combinedStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-[2px]">
          <span className="font-pixel text-[8px] animate-pulse">LOADING...</span>
        </span>
      )}
      <span className={clsx('relative z-10', loading ? 'invisible' : '')}>
        {children}
      </span>
    </button>
  );
}