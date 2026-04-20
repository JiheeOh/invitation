import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import { WEDDING } from '@/lib/wedding-data';
import type { Theme } from '@/lib/utils';

interface FamilyProps {
  t: Theme;
}

export default function Family({ t }: FamilyProps) {
  const FamilyRow = ({
    parents,
    role,
    name,
    phone,
  }: {
    parents: string;
    role: string;
    name: string;
    phone: string;
  }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      <div style={{ fontSize: 13, color: t.muted, letterSpacing: 0.5 }}>
        {parents}의 <span style={{ color: t.accent }}>{role}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: t.serif, fontSize: 16, color: t.ink }}>
          {name}
        </div>
        <a
          href={`tel:${phone}`}
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            border: `1px solid ${t.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: t.accent,
            textDecoration: 'none',
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.7.6 2.5a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0122 16.9z" />
          </svg>
        </a>
      </div>
    </div>
  );

  return (
    <section style={{ padding: '40px 20px', background: '#fff', color: t.ink }}>
      <FadeIn>
        <SectionLabel t={t} eng="people" ko="신랑 · 신부" />
        <div style={{ marginTop: 24 }}>
          <FamilyRow
            parents={WEDDING.groom.parents}
            role={WEDDING.groom.role}
            name={WEDDING.groom.name}
            phone="010-0000-0000"
          />
          <FamilyRow
            parents={WEDDING.bride.parents}
            role={WEDDING.bride.role}
            name={WEDDING.bride.name}
            phone="010-0000-0000"
          />
        </div>
      </FadeIn>
    </section>
  );
}
