/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vaporwave / Simpson Wave palette (вайб context/design/1.jpg)
        vw: {
          pink: '#ff71ce',
          blue: '#05d9e8',
          purple: '#b16eff',
          bg: '#1c0f33',
          panel: '#24143a',
          grid: '#3a1f5e',
          sun: '#ff3860',
          sun2: '#ffb35c',
          horizon: '#7a2c8e',
        },
        // Game palettes remapped to vaporwave neon
        mc: {
          grass: "#ff71ce",
          "grass-dark": "#d95fb0",
          dirt: "#b16eff",
          "dirt-dark": "#8a3fd0",
          stone: "#3a2a5e",
          "stone-dark": "#2a1f44",
          diamond: "#05d9e8",
          gold: "#ff9a3c",
          redstone: "#ff3860",
          obsidian: "#1a1028",
        },
        skyrim: {
          gold: "#ff9a3c",
          "gold-dark": "#ff3860",
          red: "#ff71ce",
          "red-dark": "#d95fb0",
          night: "#24143a",
          "night-light": "#3a1f5e",
          nord: "#ffd6ec",
        },
        drg: {
          cyan: "#05d9e8",
          "cyan-dim": "#049fb0",
          rock: "#7a2c8e",
          "rock-dark": "#5a1f6b",
          yellow: "#ff9a3c",
          "yellow-dim": "#ff3860",
          dark: "#150a26",
          "dark-light": "#201536",
          danger: "#ff3860",
        },
        // Pixel / Webcore palette
        pixel: {
          bg: '#150a26',
          card: '#201536',
          border: '#3a2a5e',
          text: '#e8d6ff',
          'text-dim': '#a888c8',
          accent: '#05d9e8',
          pink: '#ff71ce',
          purple: '#b16eff',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"VT323"', 'monospace'],
        body: ['"Pixelify Sans"', 'sans-serif'],
      },
      backgroundImage: {
        // Сетка как на постере: розовые горизонтали + фиолетовые вертикали
        'vw-grid': 'linear-gradient(rgba(255,113,206,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(177,110,255,0.08) 1px, transparent 1px)',
        'vw-sun': 'radial-gradient(circle at 50% 50%, #ffb35c 0%, #ff4f7e 40%, #ff2e88 58%, #b1166e 72%, transparent 78%)',
        'vw-horizon': 'linear-gradient(180deg, #7a2c8e 0%, #3a1f5e 40%, #150a26 100%)',
        'vw-checker': 'repeating-conic-gradient(#1c0f33 0% 25%, #24143a 0% 50%)',
        'pixel-gradient': 'linear-gradient(135deg, #150a26 0%, #201536 50%, #24143a 100%)',
        'scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        'crt-noise': 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.02) 3px)',
      },
      backgroundSize: {
        'vw-grid': '40px 40px',
        'vw-checker': '24px 24px',
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0,0,0,0.5)',
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,0.4)',
        'pixel-lg': '8px 8px 0 0 rgba(0,0,0,0.5)',
        'glow-pink': '0 0 20px rgba(255,113,206,0.5), 0 0 40px rgba(255,113,206,0.25)',
        'glow-cyan': '0 0 20px rgba(5,217,232,0.5), 0 0 40px rgba(5,217,232,0.25)',
        'glow-purple': '0 0 20px rgba(177,110,255,0.5), 0 0 40px rgba(177,110,255,0.25)',
        'vw-inset': 'inset 0 0 0 3px rgba(255,113,206,0.5), inset 0 0 0 5px rgba(5,217,232,0.3)',
      },
      keyframes: {
        // transform вместо background-position: анимация идёт на GPU,
        // а не перерисовывает весь экран каждый кадр
        scanlines: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bouncePixel: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-5deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sunPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        scanlines: 'scanlines 8s linear infinite',
        flicker: 'flicker 5s infinite',
        float: 'float 4s ease-in-out infinite',
        'bounce-pixel': 'bouncePixel 1.2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'rotate-in': 'rotateIn 0.6s ease-out',
        shimmer: 'shimmer 3s linear infinite',
        'sun-pulse': 'sunPulse 4s ease-in-out infinite',
        'grid-pulse': 'gridPulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}