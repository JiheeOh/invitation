'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import Ornament from '../Ornament';
import { WEDDING } from '@/lib/wedding-data';
import { getStorageUrl } from '@/lib/supabase';
import { copyToClipboard } from '@/lib/utils';
import type { Theme } from '@/lib/utils';

interface ShareProps {
  t: Theme;
}

export default function Share({ t }: ShareProps) {

  const handleKakaoShare = () => {
    if (typeof window !== 'undefined' && window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${WEDDING.groom.name} ♡ ${WEDDING.bride.name} 결혼식`,
          description: WEDDING.dateLabel,
          imageUrl: getStorageUrl(WEDDING.storage.bucket, WEDDING.storage.cover),
          link: {
            webUrl: window.location.href,
            mobileWebUrl: window.location.href,
          },
        },
      });
    } else {
      alert('카카오톡 공유를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : '';
      await copyToClipboard(url);
      alert('링크가 복사되었습니다.');
    } catch {
      alert('링크 복사에 실패했습니다.');
    }
  };

  const handleSendSMS = () => {
    const url = 'https://invitation-rho-neon.vercel.app/';
    const message = `${WEDDING.groom.name} ♡ ${WEDDING.bride.name}\n${WEDDING.dateLabel}\n${WEDDING.timeLabel}\n${WEDDING.venue}\n${WEDDING.hall}\n${url}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  return (
    <section style={{
      padding: '56px 32px 80px',
      background: '#fff',
      color: t.ink,
      textAlign: 'center',
    }}>
      <FadeIn>
        <SectionLabel t={t} eng="share" ko="청첩장 공유" />
        <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleKakaoShare}
            style={{
              padding: '10px 14px',
              background: '#FEE500',
              color: '#3A1D1D',
              border: 'none',
              borderRadius: 999,
              fontSize: 12,
              fontFamily: t.sans,
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'opacity 200ms ease-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            카카오톡
          </button>
          <button
            onClick={handleCopyLink}
            style={{
              padding: '10px 14px',
              background: t.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              fontSize: 12,
              fontFamily: t.sans,
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'opacity 200ms ease-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            링크복사
          </button>
          <button
            onClick={handleSendSMS}
            style={{
              padding: '10px 14px',
              background: t.line,
              color: t.ink,
              border: 'none',
              borderRadius: 999,
              fontSize: 12,
              fontFamily: t.sans,
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'opacity 200ms ease-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            문자
          </button>
        </div>
        <Ornament color={t.accent} w={100} style={{ marginTop: 36, opacity: 0.6 }} />
      </FadeIn>
    </section>
  );
}
