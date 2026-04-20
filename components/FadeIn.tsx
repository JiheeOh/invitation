'use client';

import React from 'react';
import { useFadeIn } from '@/lib/hooks';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}

export default function FadeIn({
  children,
  delay = 0,
  style = {},
}: FadeInProps) {
  const { ref, visible } = useFadeIn(delay);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition:
          'opacity 900ms cubic-bezier(.2,.7,.2,1), transform 900ms cubic-bezier(.2,.7,.2,1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
