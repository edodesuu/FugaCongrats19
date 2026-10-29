import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'game';
  game?: 'mc' | 'skyrim' | 'drg';
  elevated?: boolean;
  children: React.ReactNode;
}

export const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, variant = 'default', game, elevated = false, children, ...props }, ref) => {
    const baseStyles = 'relative p-6';

    const variantStyles = {
      default: 'bg-pixel-card border-4 border-pixel-border',
      game: 'border-4',
    };

    const elevationStyles = {
      true: 'shadow-pixel-lg -translate-y-1 -translate-x-1 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-200',
      false: 'shadow-pixel hover:shadow-pixel-lg hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200',
    };

    const gameStyles = {
      mc: 'bg-vw-purple/50 border-vw-pink',
      skyrim: 'bg-vw-panel/50 border-vw-sun',
      drg: 'bg-pixel-bg/50 border-vw-blue',
    };

    const combinedStyles = clsx(
      baseStyles,
      variantStyles[variant],
      elevationStyles[elevated ? 'true' : 'false'],
      game && variant === 'game' ? gameStyles[game] : '',
      className
    );

    return (
      <div ref={ref} className={combinedStyles} {...props}>
        {children}
      </div>
    );
  }
);

PixelCard.displayName = 'PixelCard';