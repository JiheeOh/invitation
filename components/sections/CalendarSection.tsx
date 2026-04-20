'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import { useCountdown } from '@/lib/hooks';
import { WEDDING } from '@/lib/wedding-data';
import { padStart } from '@/lib/utils';
import type { Theme } from '@/lib/utils';

interface CalendarSectionProps {
  t: Theme;
}

export default function CalendarSection({ t }: CalendarSectionProps) {
  const { days, hours, mins, secs } = useCountdown(WEDDING.dateISO);

  const rows = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  const Cell = ({ n }: { n: number | null }) => {
    if (!n) return <div />;

    const flat = rows.flat();
    const isSat = flat.indexOf(n) % 7 === 6;
    const isSun = flat.indexOf(n) % 7 === 0;
    const target = n === 29;

    return (
      <div
        style={{
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: t.serif,
          fontSize: 13,
          color: target ? '#fff' : isSun ? '#C8756E' : t.ink,
          background: target ? t.accent : 'transparent',
          borderRadius: 999,
          position: 'relative',
        }}
      >
        {n}
      </div>
    );
  };

  return (
    <section
      style={{ padding: '48px 20px', background: '#fff', color: t.ink }}
    >
      <FadeIn>
        <SectionLabel t={t} eng="the day" ko="날짜" />

        <div
          style={{
            marginTop: 28,
            textAlign: 'center',
            fontFamily: t.script,
            fontSize: 20,
            color: t.accent,
          }}
        >
          August 2026
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gap: 2,
            marginTop: 14,
            fontSize: 10,
            letterSpacing: 1,
            textAlign: 'center',
            color: t.muted,
            fontFamily: t.sans,
            paddingBottom: 6,
            borderBottom: `1px solid ${t.line}`,
          }}
        >
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
            <div
              key={d}
              style={{ color: i === 0 ? '#C8756E' : t.muted }}
            >
              {d}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gap: 4,
            marginTop: 8,
          }}
        >
          {rows.flat().map((n, i) => (
            <Cell key={i} n={n} />
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            textAlign: 'center',
            fontFamily: t.serif,
            fontSize: 14,
            color: t.ink,
            letterSpacing: 1,
          }}
        >
          2026년 8월 29일 토요일 · 오후 2시 20분
        </div>

        <div
          style={{
            marginTop: 28,
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 8,
            padding: '16px 0',
            borderTop: `1px solid ${t.line}`,
            borderBottom: `1px solid ${t.line}`,
          }}
        >
          {[
            ['DAYS', days],
            ['HOUR', hours],
            ['MIN', mins],
            ['SEC', secs],
          ].map(([l, v]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: t.serif,
                  fontSize: 24,
                  color: t.accent,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {padStart(v as number)}
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: t.muted,
                  marginTop: 2,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 14,
            textAlign: 'center',
            fontFamily: t.script,
            fontSize: 16,
            color: t.accent,
          }}
        >
          재 &amp; 지희의 결혼식이 {days}일 남았습니다
        </div>
      </FadeIn>
    </section>
  );
}
