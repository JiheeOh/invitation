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
      viewBox="0 0 120 30"
      width={w}
      style={{
        ...style,
      }}
    >
      <g fill="none" stroke={color} strokeWidth="0.7" strokeLinecap="round">
        <path d="M10 15 Q 30 5, 50 15 T 90 15 T 110 15" />
        <circle cx="60" cy="15" r="2.2" fill={color} stroke="none" />
        <circle cx="30" cy="10" r="1.1" fill={color} stroke="none" />
        <circle cx="90" cy="10" r="1.1" fill={color} stroke="none" />
      </g>
    </svg>
  );
}
