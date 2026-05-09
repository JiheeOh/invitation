'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import { WEDDING } from '@/lib/wedding-data';
import type { Theme } from '@/lib/utils';

interface GreetingProps {
  t: Theme;
}

export default function Greeting({ t }: GreetingProps) {
  return (
    <section style={{
      padding: '64px 32px 48px',
      textAlign: 'center',
      background: '#fff',
      color: t.ink,
    }}>
      <FadeIn>
        <SectionLabel t={t} eng="Invitation" ko="초대" />
        <div style={{
          marginTop: 24,
          fontFamily: t.serif,
          fontSize: 15,
          lineHeight: 2.1,
          color: t.ink,
          letterSpacing: 0.5,
          whiteSpace: 'pre-line',
        }}>
          {WEDDING.greetingText}
        </div>
      </FadeIn>
    </section>
  );
}
