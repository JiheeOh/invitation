import React from 'react';

const tones: Record<string, { bg: string; fg: string }> = {
  rose: { bg: '#F3E4DF', fg: '#B8857A' },
  cream: { bg: '#EFE5D5', fg: '#B09D7C' },
  sage: { bg: '#DCE2D4', fg: '#7F9478' },
  blush: { bg: '#F4E0DD', fg: '#C4928A' },
  lavender: { bg: '#EDE6F3', fg: '#8E7AB8' },
  cool: { bg: '#E8E4F0', fg: '#7B6F9C' },
};

interface PhotoPHProps {
  label?: string;
  ratio?: string;
  tone?: string;
  style?: React.CSSProperties;
}

export default function PhotoPH({
  label = 'PHOTO',
  ratio = '3/4',
  tone = 'lavender',
  style = {},
}: PhotoPHProps) {
  const { bg, fg } = tones[tone] || tones.lavender;

  return (
    <div
      style={{
        aspectRatio: ratio,
        background: bg,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <pattern
            id={`stripe-${tone}`}
            x="0"
            y="0"
            width="4"
            height="100%"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="2" height="100%" fill={bg} />
            <rect x="2" y="0" width="2" height="100%" fill={fg} opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#stripe-${tone})`} />
      </svg>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 10,
          fontFamily: 'ui-monospace, monospace',
          color: fg,
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}
