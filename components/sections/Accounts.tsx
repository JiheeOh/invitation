'use client';

import React, { useState } from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import CopyBtn from '../CopyBtn';
import { WEDDING } from '@/lib/wedding-data';
import type { Theme } from '@/lib/utils';

interface AccountsProps {
  t: Theme;
}

export default function Accounts({ t }: AccountsProps) {
  const [open, setOpen] = useState<string | null>(null);

  const Group = ({
    id,
    title,
    items,
  }: {
    id: string;
    title: string;
    items: Array<{ who: string; bank: string; num: string }>;
  }) => {
    const isOpen = open === id;

    return (
      <div
        style={{
          border: `1px solid ${t.line}`,
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 10,
          background: t.paper,
        }}
      >
        <button
          onClick={() => setOpen(isOpen ? null : id)}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: isOpen ? t.accentSoft : 'transparent',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: t.serif,
            fontSize: 14,
            color: t.ink,
            fontWeight: 500,
          }}
        >
          {title}
          <span
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .2s',
              display: 'inline-block',
            }}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${t.line}` }}>
            {items.map((item, i) => (
              <div key={i} style={{ marginBottom: i < items.length - 1 ? 12 : 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: t.muted,
                    marginBottom: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {item.who}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: 13, color: t.ink, fontFamily: t.sans }}>
                    {item.bank} {item.num}
                  </div>
                  <CopyBtn text={item.num} label="복사" theme={t} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      style={{
        padding: '48px 20px',
        background: '#fff',
        color: t.ink,
      }}
    >
      <FadeIn>
        <SectionLabel t={t} eng="accounts" ko="마음 전하실 곳" />

        <div style={{ marginTop: 28 }}>
          <Group
            id="groom"
            title={`신랑 ${WEDDING.groom.name}`}
            items={WEDDING.accounts.groom}
          />
          <Group
            id="bride"
            title={`신부 ${WEDDING.bride.name}`}
            items={WEDDING.accounts.bride}
          />
        </div>

        <div
          style={{
            marginTop: 24,
            padding: '12px 16px',
            background: t.accentSoft,
            borderRadius: 4,
            fontSize: 12,
            color: t.ink,
            lineHeight: 1.6,
            fontFamily: t.sans,
          }}
        >
          마음의 전하고 싶으신 분들을 위해 계좌 정보를 올렸습니다.
          <br />
          선물은 정중한 마음으로 받겠습니다.
        </div>
      </FadeIn>
    </section>
  );
}
