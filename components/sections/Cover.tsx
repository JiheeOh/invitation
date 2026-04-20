'use client';

import React from 'react';
import { useCountdown } from '@/lib/hooks';
import { WEDDING } from '@/lib/wedding-data';
import PhotoPH from '../PhotoPH';
import type { Theme } from '@/lib/utils';

interface CoverProps {
  t: Theme;
  mood?: 'A' | 'B';
}

export default function Cover({ t, mood = 'A' }: CoverProps) {
  const { days } = useCountdown(WEDDING.dateISO);

  return (
    <section
      style={{
        position: 'relative',
        background: '#fff',
        color: t.ink,
        padding: '32px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          fontFamily: t.sans,
          fontSize: 10,
          color: t.muted,
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        We're getting married
      </div>

      <div
        style={{
          width: 24,
          height: 1,
          background: t.ink,
          margin: '16px 0 24px',
          opacity: 0.3,
        }}
      />

      <div style={{ width: '100%', maxWidth: '85%', position: 'relative', padding: '8px' }}>
        <div
          style={{
            position: 'relative',
            background: '#f0f0f0',
            paddingBottom: '125%',
          }}
        >
          <img
            src="/images/gallery/01.jpg"
            alt="Cover Photo"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: 2,
              border: `1px solid ${t.line}`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          textAlign: 'center',
          fontFamily: t.script,
          fontSize: 30,
          fontWeight: 400,
          color: t.ink,
          lineHeight: 1.2,
          letterSpacing: 0,
        }}
      >
        Heo Jae{' '}
        <span
          style={{
            color: t.accent,
            margin: '0 10px',
            fontSize: 22,
            fontFamily: '"Parisienne", cursive',
          }}
        >
          &
        </span>{' '}
        Oh Ji Hee
      </div>

      <div
        style={{
          marginTop: 22,
          fontFamily: t.serif,
          fontSize: 13,
          color: t.ink,
          letterSpacing: 2,
          fontWeight: 300,
        }}
      >
        2026. 08. 29. SAT PM 2:20
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 11,
          letterSpacing: 1,
          color: t.muted,
          fontFamily: t.sans,
        }}
      >
        {WEDDING.venue} {WEDDING.hall}
      </div>

      <div
        style={{
          marginTop: 28,
          padding: '4px 0',
          fontFamily: t.sans,
          fontSize: 10,
          letterSpacing: 4,
          color: t.accent,
          fontWeight: 500,
        }}
      >
        D − {days}
      </div>
    </section>
  );
}
