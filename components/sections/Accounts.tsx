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

interface GroupProps {
  id: string;
  title: string;
  color: string;
  items: readonly { who: string; bank: string; num: string }[];
  open: string | null;
  setOpen: (id: string | null) => void;
  t: Theme;
}

const Group = ({ id, title, color, items, open, setOpen, t }: GroupProps) => {
  const isOpen = open === id;

  return (
    <div
      style={{
        border: `1px solid ${t.line}`,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
        background: '#fff',
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
          color: color,
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
                <div style={{ fontSize: 13, fontFamily: t.serif, color: t.ink }}>
                  {item.bank} {item.num}
                </div>
                <CopyBtn text={`${item.bank} ${item.num}`} label="복사" theme={t} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Accounts({ t }: AccountsProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      style={{
        padding: '72px 32px',
        background: '#fff',
        color: t.ink,
      }}
    >
      <FadeIn>
        <SectionLabel t={t} eng="accounts" ko="마음 전하실 곳" />

        <div
          style={{
            marginTop: 28,
            textAlign: 'center',
            fontSize: 12,
            color: t.muted,
            lineHeight: 1.95,
            whiteSpace: 'pre-line',
          }}
        >
          {WEDDING.thanksMessage}
        </div>

        <div style={{ marginTop: 28 }}>
          <Group
            id="groom"
            title="신랑측"
            color="#5C7AA8"
            items={WEDDING.accounts.groom}
            open={open}
            setOpen={setOpen}
            t={t}
          />
          <Group
            id="bride"
            title="신부측"
            color="#C8756E"
            items={WEDDING.accounts.bride}
            open={open}
            setOpen={setOpen}
            t={t}
          />
        </div>
      </FadeIn>
    </section>
  );
}
