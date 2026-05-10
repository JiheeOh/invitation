import React from 'react';
import type { Theme } from '@/lib/utils';

interface SectionLabelProps {
  t: Theme;
  eng: string;
  ko: string;
}

export default function SectionLabel({ t, eng, ko }: SectionLabelProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: t.sans,
          fontSize: 10,
          color: t.accent,
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontWeight: 500,
          marginBottom: 10,
        }}
      >
        {eng}
      </div>
      <div
        style={{
          fontFamily: t.serif,
          fontSize: 15,
          letterSpacing: 3,
          color: t.ink,
          fontWeight: 500,
        }}
      >
        {ko}
      </div>
    </div>
  );
}
