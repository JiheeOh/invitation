'use client';

import React from 'react';
import { THEMES, FONT_SETS } from '@/lib/wedding-data';

interface TweaksProps {
  config: {
    theme: string;
    font: string;
    petals: boolean;
  };
  onConfigChange: (config: any) => void;
  onClose: () => void;
}

export default function Tweaks({
  config,
  onConfigChange,
  onClose,
}: TweaksProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: 300,
        height: '100vh',
        background: '#fff',
        boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        overflow: 'y-auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Tweaks</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            padding: 0,
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: '#666' }}>
          Theme
        </label>
        {Object.entries(THEMES).map(([key, value]) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <input
              type="radio"
              name="theme"
              value={key}
              checked={config.theme === key}
              onChange={(e) => onConfigChange({ ...config, theme: e.target.value })}
              style={{ marginRight: 8 }}
            />
            <span style={{ fontSize: 14 }}>{value.name}</span>
          </label>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: '#666' }}>
          Font
        </label>
        {Object.entries(FONT_SETS).map(([key, value]) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <input
              type="radio"
              name="font"
              value={key}
              checked={config.font === key}
              onChange={(e) => onConfigChange({ ...config, font: e.target.value })}
              style={{ marginRight: 8 }}
            />
            <span style={{ fontSize: 14 }}>{value.name}</span>
          </label>
        ))}
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={config.petals}
            onChange={(e) => onConfigChange({ ...config, petals: e.target.checked })}
            style={{ marginRight: 8 }}
          />
          <span style={{ fontSize: 14 }}>꽃잎 효과</span>
        </label>
      </div>
    </div>
  );
}
