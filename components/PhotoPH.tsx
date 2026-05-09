import React from 'react';

interface PhotoPHProps {
  label?: string;
  tone?: 'lavender' | 'rose' | 'cream' | 'sage' | 'blush' | 'cool';
  ratio?: string;
  style?: React.CSSProperties;
}

const tones = {
  rose: { bg: '#F3E4DF', fg: '#B8857A' },
  cream: { bg: '#EFE5D5', fg: '#B09D7C' },
  sage: { bg: '#DCE2D4', fg: '#7F9478' },
  blush: { bg: '#F4E0DD', fg: '#C4928A' },
  lavender: { bg: '#EDE6F3', fg: '#8E7AB8' },
  cool: { bg: '#E8E4F0', fg: '#7B6F9C' },
};

export default function PhotoPH({
  label = 'PHOTO',
  tone = 'lavender',
  ratio,
  style,
}: PhotoPHProps) {
  const color = tones[tone] || tones.lavender;

  return (
    <div
      style={{
        width: '100%',
        ...(ratio && { aspectRatio: ratio }),
        background: color.bg,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        borderRadius: 2,
        padding: 10,
        boxSizing: 'border-box',
        fontSize: 9,
        color: color.fg,
        letterSpacing: 1,
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontWeight: 500,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {label}
    </div>
  );
}
