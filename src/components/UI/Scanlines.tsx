import { memo } from 'react';

interface ScanlinesProps {
  intensity?: number;
  speed?: number;
  className?: string;
}

export const Scanlines = memo(function Scanlines({ intensity = 0.15, speed = 8, className = '' }: ScanlinesProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        opacity: intensity,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        animation: `scanlines ${speed}s linear infinite`,
      }}
      aria-hidden="true"
    />
  );
});