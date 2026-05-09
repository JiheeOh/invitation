'use client';

import React, { useEffect, useState } from 'react';
import PhotoPH from './PhotoPH';
import type { Theme } from '@/lib/utils';

interface SlideshowProps {
  t: Theme;
  onClose: () => void;
}

export default function Slideshow({ t, onClose }: SlideshowProps) {
  const [i, setI] = useState(0);
  const photos = Array.from({ length: 8 }, (_, k) => ({
    label: `SLIDE ${String(k + 1).padStart(2, '0')}`,
    tone: ['rose' as const, 'cream' as const, 'blush' as const, 'sage' as const][k % 4],
  }));

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % photos.length), 2500);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {photos.map((p, k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: k === i ? 1 : 0,
              transition: 'opacity 800ms ease',
            }}
          >
            <PhotoPH label={p.label} tone={p.tone} ratio="auto" style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: 999,
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18,
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          padding: 18,
          color: '#fff',
          textAlign: 'center',
          fontFamily: t.script,
          fontSize: 20,
          background: '#000',
        }}
      >
        {i + 1} / {photos.length}
      </div>
    </div>
  );
}
