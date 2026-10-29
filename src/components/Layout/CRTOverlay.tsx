import { motion } from 'framer-motion';

export function CRTOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div className="scanlines" aria-hidden="true" />
      {/* CRT Noise */}
      <div className="crt-overlay" aria-hidden="true" />
      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />
      {/* Subtle screen curvature */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-20"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.15) 100%),
            linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </>
  );
}