'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import PhotoPH from '../PhotoPH';
import { WEDDING } from '@/lib/wedding-data';
import type { Theme } from '@/lib/utils';

interface CoverProps {
  t: Theme;
  mood?: 'A' | 'B';
}

export default function Cover({ t, mood = 'A' }: CoverProps) {
  return (
    <section
      style={{
        width: '100%',
        height: 760,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        color: t.ink,
        padding: '64px 28px 44px',
        boxSizing: 'border-box',
      }}
    >
      <FadeIn>
        <div style={{ width: '86%', maxWidth: 400 }}>
          {/* Hairline frame */}
          <div
            style={{
              width: '100%',
              border: `1px solid ${t.line}`,
              padding: 10,
              marginBottom: 28,
            }}
          >
            <PhotoPH tone="lavender" ratio="4/5" label="" />
          </div>

          {/* Names */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: t.serif,
              fontSize: 28,
              letterSpacing: 2,
              color: t.ink,
              marginBottom: 12,
            }}
          >
            {WEDDING.groom.name} & {WEDDING.bride.name}
          </div>

          {/* Date & Time */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: t.sans,
              fontSize: 12,
              color: t.muted,
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            {WEDDING.dateLabel} · {WEDDING.timeLabel}
          </div>

          {/* Venue */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: t.sans,
              fontSize: 11,
              color: t.muted,
              letterSpacing: 0.5,
            }}
          >
            {WEDDING.venue} {WEDDING.hall}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
