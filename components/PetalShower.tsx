'use client';

import React from 'react';

interface PetalShowerProps {
  enabled?: boolean;
}

export default function PetalShower({ enabled = true }: PetalShowerProps) {
  if (!enabled) return null;

  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 4,
    left: Math.random() * 100,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--petal-opacity);
          }
          90% {
            opacity: var(--petal-opacity);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .petal {
          position: fixed;
          top: -10vh;
          width: 20px;
          height: 20px;
          background: radial-gradient(ellipse at 30% 30%, rgba(220, 200, 230, 0.8), rgba(142, 122, 184, 0.3));
          border-radius: 50% 0;
          pointer-events: none;
          z-index: 1;
          animation: fall linear infinite;
        }
      `}</style>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={
            {
              '--petal-opacity': petal.opacity,
              left: `${petal.left}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}
