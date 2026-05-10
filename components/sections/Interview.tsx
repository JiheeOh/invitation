'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import { WEDDING } from '@/lib/wedding-data';
import type { Theme } from '@/lib/utils';

interface InterviewButtonProps {
  t: Theme;
  onOpen: () => void;
}

export function InterviewButton({ t, onOpen }: InterviewButtonProps) {
  return (
    <section
      style={{
        padding: '56px 32px 64px',
        background: '#fff',
        color: t.ink,
        textAlign: 'center',
      }}
    >
      <FadeIn>
        <SectionLabel
          t={t}
          eng="wedding interview"
          ko="웨딩 인터뷰"
        />
        <div
          style={{
            fontFamily: t.serif,
            fontSize: 13,
            color: t.muted,
            marginTop: 18,
            lineHeight: 1.9,
          }}
        >
          두 분의 인터뷰를 준비했습니다.<br />
          인터뷰를 확인해보세요.
        </div>
        <button
          onClick={onOpen}
          style={{
            marginTop: 24,
            padding: '14px 38px',
            background: t.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontFamily: t.serif,
            fontSize: 13,
            letterSpacing: 3,
            cursor: 'pointer',
          }}
        >
          인터뷰 읽어보기
        </button>
      </FadeIn>
    </section>
  );
}

export function InterviewModalContent({ t }: { t: Theme }) {
  const Q = WEDDING.interview;

  const Speaker = ({
    emoji,
    name,
    text,
    color,
  }: {
    emoji: string;
    name: string;
    text: string;
    color: string;
  }) =>
    text ? (
      <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 999,
            background: color + '33',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 14,
          }}
        >
          {emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: t.serif,
              fontSize: 12,
              color,
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: t.serif,
              fontSize: 12.5,
              color: t.ink,
              lineHeight: 1.85,
              whiteSpace: 'pre-line',
            }}
          >
            {text}
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div>
      {Q.map((it, i) => (
        <div
          key={i}
          style={{
            padding: '20px 0',
            borderBottom: i < Q.length - 1 ? `1px dashed ${t.line}` : 'none',
          }}
        >
          <div
            style={{
              fontFamily: t.serif,
              fontSize: 13.5,
              color: t.ink,
              fontWeight: 500,
            }}
          >
            {i + 1}.{it.q}
          </div>
          <Speaker
            emoji="🤵"
            name={WEDDING.groom.name}
            text={it.groom}
            color="#7AA0CC"
          />
          <Speaker
            emoji="👰"
            name={WEDDING.bride.name}
            text={it.bride}
            color="#D08A8A"
          />
        </div>
      ))}
    </div>
  );
}

export default InterviewButton;
