'use client';

import React, { useMemo } from 'react';
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

  // Auto-calculate calendar from dateISO
  const { rows, monthLabel, targetDay } = useMemo(() => {
    const d = new Date(WEDDING.dateISO);
    const year = d.getFullYear();
    const month = d.getMonth();
    const tDay = d.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const grid: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      grid.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(i);
    }

    const rows = [];
    for (let i = 0; i < grid.length; i += 7) {
      rows.push(grid.slice(i, i + 7));
    }

    return {
      rows,
      monthLabel: `${monthNames[month]} ${year}`,
      targetDay: tDay,
    };
  }, []);

  const Cell = ({ n }: { n: number | null }) => {
    if (!n) return <div />;

    const flat = rows.flat();
    const index = flat.indexOf(n);
    const isSun = index % 7 === 0;
    const target = n === targetDay;

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
      style={{ padding: '72px 32px', background: '#fff', color: t.ink }}
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
          {monthLabel}
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
          {WEDDING.dateLabel} · {WEDDING.timeLabel}
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
          {WEDDING.groom.name}재 & {WEDDING.bride.name}의 결혼식이 {days}일 남았습니다
        </div>
      </FadeIn>
    </section>
  );
}
