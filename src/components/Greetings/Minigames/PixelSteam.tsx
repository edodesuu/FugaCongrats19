import { clsx } from 'clsx';

// Пиксель-арт иконка Steam: диск с «поршнем» (кружки + шток по диагонали)
// C = голубой диск Steam, D = тёмный поршень, . = пусто
const STEAM_MAP = [
  '.....CCC.....',
  '...CCCCCCC...',
  '..CCCCCCCCC..',
  '.CCCDDCCCCCC.',
  '.CCDDDDCCCCC.',
  'CCCDDDDCCCCCC',
  'CCCCCDDDDCCCC',
  '.CCCCCCDDDDC.',
  '.CCCCCDDDDDD.',
  '.CCCCCDDDDDD.',
  '.CCCCCCDDDDC.',
  '...CCCCCCC...',
  '.....CCC.....',
];

const PALETTE: Record<string, string> = {
  C: '#66c0f4',
  D: '#0f2440',
};

interface PixelSteamProps {
  size?: number; // размер одного пикселя в px
  className?: string;
}

export function PixelSteam({ size = 8, className }: PixelSteamProps) {
  return (
    <div
      className={clsx('inline-grid select-none', className)}
      style={{
        gridTemplateColumns: `repeat(${STEAM_MAP[0].length}, ${size}px)`,
        gridAutoRows: `${size}px`,
      }}
      aria-hidden="true"
    >
      {STEAM_MAP.flatMap((row, y) =>
        row.split('').map((ch, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: size,
              height: size,
              backgroundColor: PALETTE[ch] ?? 'transparent',
            }}
          />
        ))
      )}
    </div>
  );
}
