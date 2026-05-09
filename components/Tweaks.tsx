'use client';

import React from 'react';
import { THEMES, FONT_SETS } from '@/lib/wedding-data';

interface TweaksConfig {
  theme: keyof typeof THEMES;
  font: keyof typeof FONT_SETS;
  petals: boolean;
}

interface TweaksProps {
  cfg: TweaksConfig;
  setCfg: (fn: (cfg: TweaksConfig) => TweaksConfig) => void;
  onClose: () => void;
}

export default function Tweaks({ cfg, setCfg, onClose }: TweaksProps) {

  const swatches = Object.entries(THEMES).map(([k, v]) => ({ key: k as keyof typeof THEMES, ...v }));
  const fontSets = Object.entries(FONT_SETS).map(([k, v]) => ({ key: k as keyof typeof FONT_SETS, ...v }));

  return (
    <div
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        width: 280,
        background: '#FBF6EE',
        border: '1px solid #D9C9BD',
        borderRadius: 10,
        boxShadow: '0 20px 40px rgba(80,50,45,0.2)',
        padding: 16,
        zIndex: 1000,
        fontFamily: '"Pretendard", sans-serif',
        fontSize: 12,
        color: '#4A3530',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: '"Pretendard", sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: '#4A4A4A',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Tweaks
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9A9A9A',
            fontSize: 16,
            padding: 0,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ fontSize: 10, letterSpacing: 2, color: '#9C857B', marginBottom: 8 }}>
        컬러 테마
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {swatches.map((s) => (
          <button
            key={s.key}
            onClick={() => setCfg((c) => ({ ...c, theme: s.key }))}
            style={{
              flex: 1,
              padding: 8,
              border: `2px solid ${cfg.theme === s.key ? s.accent : 'transparent'}`,
              background: s.paper,
              borderRadius: 6,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', gap: 2 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: s.accent,
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: s.coverBg,
                }}
              />
            </div>
            <div style={{ fontSize: 10, color: '#4A3530' }}>{s.name}</div>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, letterSpacing: 2, color: '#9C857B', marginBottom: 8 }}>
        폰트
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {fontSets.map((f) => (
          <button
            key={f.key}
            onClick={() => setCfg((c) => ({ ...c, font: f.key }))}
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              border: `1px solid ${cfg.font === f.key ? '#B8756B' : '#E0CDC2'}`,
              background: cfg.font === f.key ? '#F6EAE2' : 'transparent',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'inherit',
            }}
          >
            <span>{f.name}</span>
            <span
              style={{
                fontFamily: f.script,
                fontSize: 16,
                color: '#B8756B',
              }}
            >
              Aa
            </span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, letterSpacing: 2, color: '#9C857B', marginBottom: 8 }}>
        꽃잎 효과
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[
          [true, 'on'],
          [false, 'off'],
        ].map(([k, l]) => (
          <button
            key={String(k)}
            onClick={() => setCfg((c) => ({ ...c, petals: k as boolean }))}
            style={{
              flex: 1,
              padding: 8,
              border: `1px solid ${cfg.petals === k ? '#B8756B' : '#E0CDC2'}`,
              background: cfg.petals === k ? '#B8756B' : 'transparent',
              color: cfg.petals === k ? '#fff' : '#4A3530',
              borderRadius: 4,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
