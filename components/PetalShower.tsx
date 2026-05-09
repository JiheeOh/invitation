'use client';

import React, { useState, useEffect } from 'react';

interface PetalItem {
  kind: 'flower' | 'petal';
  petalShape: 0 | 1;
  left: number;
  delay: number;
  dur: number;
  size: number;
  sway: number;
  swayDir: 1 | -1;
  rot: number;
  spin: number;
  opacity: number;
  color: string;
}

interface PetalShowerProps {
  enabled?: boolean;
  count?: number;
}

export default function PetalShower({ enabled = true, count = 26 }: PetalShowerProps) {
  const [items, setItems] = useState<PetalItem[]>([]);

  useEffect(() => {
    const newItems = enabled ? Array.from({ length: count }, () => {
      const tone = Math.random();
      const color = tone < 0.33 ? '#FDEDF2'
                   : tone < 0.66 ? '#F9D5DE'
                                 : '#F2B8C6';
      const kind = Math.random() < 0.55 ? 'flower' : 'petal';
      const isFlower = kind === 'flower';
      return {
        kind: kind as 'flower' | 'petal',
        petalShape: (Math.random() < 0.5 ? 0 : 1) as 0 | 1,
        left: Math.random() * 100,
        delay: -Math.random() * 18,
        dur: 13 + Math.random() * 14,
        size: isFlower ? 18 + Math.random() * 16 : 9 + Math.random() * 9,
        sway: 40 + Math.random() * 90,
        swayDir: (Math.random() < 0.5 ? 1 : -1) as 1 | -1,
        rot: Math.random() * 360,
        spin: (Math.random() < 0.5 ? 1 : -1) * (240 + Math.random() * 360),
        opacity: 0.6 + Math.random() * 0.35,
        color,
      };
    }) : [];
    setItems(newItems);
  }, [enabled, count]);

  return (
    <>
      <style>{`
        @keyframes blossomFall {
          0%   { transform: translate3d(0, -10%, 0) rotate(var(--r)); opacity: 0; }
          8%   { opacity: var(--o); }
          25%  { transform: translate3d(calc(var(--sway) * 1px), 28vh, 0) rotate(calc(var(--r) + var(--spin) * 0.25)); }
          50%  { transform: translate3d(calc(var(--sway) * -1px), 55vh, 0) rotate(calc(var(--r) + var(--spin) * 0.5)); }
          75%  { transform: translate3d(calc(var(--sway) * 1px), 80vh, 0) rotate(calc(var(--r) + var(--spin) * 0.75)); }
          92%  { opacity: var(--o); }
          100% { transform: translate3d(0, 112%, 0) rotate(calc(var(--r) + var(--spin))); opacity: 0; }
        }
      `}</style>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 40 }}>
        {items && items.length > 0 && items.map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width={p.size}
            height={p.size}
            style={{
              position: 'absolute',
              top: 0,
              left: `${p.left}%`,
              '--sway': `${p.sway * p.swayDir}`,
              '--r': `${p.rot}deg`,
              '--spin': `${p.spin}deg`,
              '--o': p.opacity,
              animation: `blossomFall ${p.dur}s linear ${p.delay}s infinite`,
              opacity: 0,
              filter: 'drop-shadow(0 1px 2px rgba(230,180,195,0.3))',
            } as React.CSSProperties}
          >
            {p.kind === 'flower' ? (
              <g>
                {[0, 72, 144, 216, 288].map((a, k) => (
                  <path
                    key={k}
                    d="M12 12 C 9.5 9, 9.5 5, 12 2.5 C 14.5 5, 14.5 9, 12 12 Z"
                    fill={p.color}
                    transform={`rotate(${a} 12 12)`}
                    opacity="0.92"
                  />
                ))}
                <circle cx="12" cy="12" r="1.6" fill="#FFF8FB" opacity="0.95"/>
                <circle cx="12" cy="12" r="0.8" fill="#E8A8B8" opacity="0.7"/>
              </g>
            ) : p.petalShape === 0 ? (
              <path
                d="M12 2 C 17 8, 19 16, 12 22 C 5 16, 7 8, 12 2 Z"
                fill={p.color}
                opacity="0.9"
              />
            ) : (
              <path
                d="M12 3 C 16 7, 18 14, 13 21 C 11 20, 10 18, 10 16 C 9 12, 9 7, 12 3 Z"
                fill={p.color}
                opacity="0.88"
              />
            )}
          </svg>
        ))}
      </div>
    </>
  );
}
