import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import type { Theme } from '@/lib/utils';

interface GreetingProps {
  t: Theme;
}

export default function Greeting({ t }: GreetingProps) {
  return (
    <section
      style={{
        padding: '40px 20px 32px',
        textAlign: 'center',
        background: '#fff',
        color: t.ink,
      }}
    >
      <FadeIn>
        <SectionLabel t={t} eng="Invitation" ko="초대의 말씀" />
        <div
          style={{
            fontFamily: t.serif,
            fontSize: 15,
            lineHeight: 2.1,
            color: t.ink,
            letterSpacing: 0.5,
            whiteSpace: 'pre-line',
            marginTop: 24,
          }}
        >
          {`서로 다른 길을 걷던 두 사람이
사랑이라는 이름으로 만나
하나의 길을 걸어가고자 합니다.

귀한 걸음으로 축복해 주시면
큰 기쁨이 되겠습니다.`}
        </div>
      </FadeIn>
    </section>
  );
}
