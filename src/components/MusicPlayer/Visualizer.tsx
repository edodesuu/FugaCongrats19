import { useEffect, useRef } from 'react';

interface VisualizerProps {
  barCount?: number;
  isPlaying?: boolean;
  className?: string;
}

export function Visualizer({ barCount = 32, isPlaying = false, className = '' }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const barsRef = useRef<number[]>(Array(barCount).fill(0));
  const targetHeightsRef = useRef<number[]>(Array(barCount).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const barWidth = width / barCount;
      const gap = 2;

      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        // Плавные волновые высоты на основе времени (без Math.random —
        // случайный шум каждый кадр заставлял бары дёргаться и нагружал отрисовку)
        const time = Date.now() * 0.003;
        for (let i = 0; i < barCount; i++) {
          const wave = Math.sin(time + i * 0.3) * 0.5 + 0.5;
          const wave2 = Math.sin(time * 0.7 + i * 0.15) * 0.5 + 0.5;
          const targetHeight = (wave * 0.6 + wave2 * 0.4) * height * 0.85;
          targetHeightsRef.current[i] = targetHeight;
        }
      } else {
        // Decay to zero when paused
        for (let i = 0; i < barCount; i++) {
          targetHeightsRef.current[i] = 0;
        }
      }

      // Smooth interpolation
      for (let i = 0; i < barCount; i++) {
        barsRef.current[i] += (targetHeightsRef.current[i] - barsRef.current[i]) * 0.15;
      }

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.max(2, barsRef.current[i]);
        const x = i * (barWidth + gap) + gap / 2;
        const y = height - barHeight;

        // Vaporwave gradient: pink base → cyan top
        const gradient = ctx.createLinearGradient(0, height, 0, y);
        gradient.addColorStop(0, 'rgba(255, 113, 206, 0.85)');
        gradient.addColorStop(1, 'rgba(5, 217, 232, 0.95)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Glow effect for tall bars
        if (barHeight > height * 0.7) {
          ctx.shadowColor = '#ff71ce';
          ctx.shadowBlur = 8;
          ctx.fillRect(x, y, barWidth, barHeight);
          ctx.shadowBlur = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying, barCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="img"
      aria-label="Аудио визуализатор"
    />
  );
}