import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { clsx } from 'clsx';
import type { Track } from '../../data/playlist';

interface TrackListProps {
  playlist: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
}

export function TrackList({ playlist, currentTrack, isPlaying, onPlay }: TrackListProps) {
  return (
    <div className="bg-pixel-card/50 border-2 border-pixel-border overflow-hidden">
      <div className="px-4 py-3 border-b border-pixel-border/50 flex items-center justify-between">
        <div className="font-pixel text-sm text-pixel-text">ВСЯ МУЗЫКА</div>
        <div className="font-mono text-[10px] text-pixel-text-dim">
          {playlist.length} треков
        </div>
      </div>

      <div className="p-4 space-y-2">
        {playlist.map((track, index) => {
          const isCurrent = currentTrack?.id === track.id;
          return (
            <motion.button
              key={track.id}
              className={clsx(
                'w-full px-3 py-3 flex items-center gap-3 text-left',
                'rounded-[4px] transition-all duration-150',
                'hover:bg-pixel-border',
                isCurrent ? 'bg-vw-blue/10 border-2 border-vw-blue' : 'bg-pixel-bg border border-pixel-border/50'
              )}
              onClick={() => onPlay(track)}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              {/* Play/Pause indicator */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pixel-bg border border-pixel-border/50 rounded-[4px]">
                {isCurrent && isPlaying ? (
                  <motion.div
                    className="flex items-center gap-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <span className="font-pixel text-[8px] text-vw-blue">▶</span>
                    <span className="font-pixel text-[8px] text-vw-blue">▶</span>
                  </motion.div>
                ) : isCurrent ? (
                  <Pause className="w-5 h-5 text-pixel-text-dim" />
                ) : (
                  <Play className="w-5 h-5 text-pixel-text-dim/50" />
                )}
              </div>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <div className={clsx(
                  'font-mono text-sm truncate',
                  isCurrent ? 'text-vw-blue' : 'text-pixel-text'
                )}>
                  {track.title}
                </div>
                <div className="font-mono text-[10px] text-pixel-text-dim truncate">
                  {track.artist}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
