'use client';

import React from 'react';

interface OrnamentProps {
  color?: string;
  w?: number;
  h?: number;
  style?: React.CSSProperties;
}

export default function Ornament({
  color = '#999',
  w = 80,
  h = 40,
  style = {},
}: OrnamentProps) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{
        display: 'block',
        margin: '0 auto',
        ...style,
      }}
    >
      {/* Decorative ornament pattern */}
      <circle cx={w / 2} cy={h / 2} r={4} fill={color} />
      <circle cx={w / 2 - 16} cy={h / 2} r={3} fill={color} opacity={0.7} />
      <circle cx={w / 2 + 16} cy={h / 2} r={3} fill={color} opacity={0.7} />
      <line x1={w / 2 - 12} y1={h / 2} x2={w / 2 - 6} y2={h / 2} stroke={color} strokeWidth={1} opacity={0.5} />
      <line x1={w / 2 + 6} y1={h / 2} x2={w / 2 + 12} y2={h / 2} stroke={color} strokeWidth={1} opacity={0.5} />
    </svg>
  );
}
