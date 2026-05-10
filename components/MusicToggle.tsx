'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Theme } from '@/lib/utils';

interface MusicToggleProps {
  t: Theme;
  bgmUrl?: string;
}

export default function MusicToggle({ t, bgmUrl }: MusicToggleProps) {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasSetupRef = useRef(false);

  useEffect(() => {
    if (!bgmUrl) return;

    // Audio 객체 생성
    const audio = new Audio(bgmUrl);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    hasSetupRef.current = true;

    // 페이지 로드 시 자동재생 시도
    const autoPlayPromise = audio.play().catch(() => {
      // 브라우저가 차단했을 가능성 높음, 첫 사용자 인터랙션 대기
    });

    // 첫 사용자 인터랙션 시 음악 재생
    const handleUserInteraction = () => {
      if (audioRef.current && !on) {
        setOn(true);
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [bgmUrl]);

  // on/off 토글 시 play/pause
  useEffect(() => {
    if (!audioRef.current || !bgmUrl) return;
    if (on) {
      audioRef.current.play().catch(() => {
        // 자동재생 차단, 무시
      });
    } else {
      audioRef.current.pause();
    }
  }, [on, bgmUrl]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      style={{
        position: 'absolute',
        top: 18,
        right: 18,
        zIndex: 80,
        width: 36,
        height: 36,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${t.line}`,
        color: t.accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {on ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 17V5l10-2v12m0 0a3 3 0 11-6 0 3 3 0 016 0zm-10 3a3 3 0 11-6 0 3 3 0 016 0z" />
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M20 4 Q 23 8 20 12" />
            <path d="M22 2 Q 26 8 22 14" />
          </g>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 17V5l10-2v12a3 3 0 11-3-3V5.5L11 7v10a3 3 0 11-2-2.8" />
          <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
    </button>
  );
}
