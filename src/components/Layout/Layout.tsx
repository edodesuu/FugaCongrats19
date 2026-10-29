import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { CRTOverlay } from './CRTOverlay';

interface LayoutProps {
  children: React.ReactNode;
  currentSection?: string;
  onNavigate?: (section: string) => void;
}

export function Layout({ children, onNavigate }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* CRT Overlay - always on top */}
      <CRTOverlay />

      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Main content */}
      <main
        id="main-content"
        className="relative pt-20 pb-20 md:pt-24"
        role="main"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}