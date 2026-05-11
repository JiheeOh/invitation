'use client';

import { useState } from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import { WEDDING } from '@/lib/wedding-data';
import { copyToClipboard } from '@/lib/utils';
import type { Theme } from '@/lib/utils';

interface LocationProps {
  t: Theme;
}

interface TransportRowProps {
  t: Theme;
  kind: 'subway' | 'bus' | 'car';
  title: string;
  lines: readonly string[];
}

const TransportRow = ({
  t,
  kind,
  title,
  lines,
}: TransportRowProps) => {
  const icons: Record<string, string> = {
    subway: '<path d="M5 3h14a2 2 0 012 2v10a2 2 0 01-2 2h-3l2 3h-2l-2-3H8l-2 3H4l2-3H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 3v6h10V6H7z"/>',
    bus: '<path d="M6 2h12a2 2 0 012 2v13a2 2 0 01-1 1.7V21h-2v-2H7v2H5v-2.3A2 2 0 014 17V4a2 2 0 012-2zm1 4v7h10V6H7zm1 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm8 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>',
    car: '<path d="M4 11l2-5a2 2 0 012-1h8a2 2 0 012 1l2 5v7a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-7zm2.5 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6.5 11h11l-1.3-3.5a.5.5 0 00-.5-.5H8.3a.5.5 0 00-.5.5L6.5 11z"/>',
  };

  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 999,
          flexShrink: 0,
          background: t.accent + '22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: t.accent,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          dangerouslySetInnerHTML={{ __html: icons[kind] }}
        />
      </div>
      <div>
        <div
          style={{
            fontFamily: t.serif,
            fontSize: 13,
            color: t.ink,
            marginBottom: 2,
          }}
        >
          {title}
        </div>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontSize: 12,
              color: t.muted,
              lineHeight: 1.6,
              marginTop:
                (kind === 'subway' && i > 0 && i % 2 === 0) ? 8 :
                (kind === 'bus' && l.startsWith('[') && i > 0) ? 12 :
                0,
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

interface AddressCopyBtnProps {
  t: Theme;
  address: string;
}

const AddressCopyBtn = ({ t, address }: AddressCopyBtnProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await copyToClipboard(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <button
      onClick={onCopy}
      style={{
        marginTop: 8,
        width: '100%',
        padding: '10px 6px',
        border: `1px solid ${copied ? t.accent : t.line}`,
        background: copied ? t.accent + '11' : 'transparent',
        borderRadius: 4,
        fontFamily: t.sans,
        fontSize: 12,
        color: copied ? t.accent : t.ink,
        cursor: 'pointer',
        transition: 'all .25s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {copied ? '복사되었습니다' : '주소 복사하기'}
    </button>
  );
};

function handleTmapClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const { lat, lng } = WEDDING.location;
  const goalname = encodeURIComponent(WEDDING.location.mapLabel);
  const isAndroid = /android/i.test(navigator.userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  if (isAndroid) {
    window.location.href = `intent://route?goalname=${goalname}&goalx=${lng}&goaly=${lat}#Intent;scheme=tmap;package=com.skt.tmap.ku;end`;
  } else if (isIOS) {
    window.location.href = `tmap://route?goalname=${goalname}&goalx=${lng}&goaly=${lat}`;
    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = 'https://apps.apple.com/kr/app/id431589174';
      }
    }, 1500);
  } else {
    window.location.href = `tmap://route?goalname=${goalname}&goalx=${lng}&goaly=${lat}`;
  }
}

export default function Location({ t }: LocationProps) {
  const { lat, lng } = WEDDING.location;
  const address = encodeURIComponent(WEDDING.address);

  return (
    <section
      style={{
        padding: '72px 32px',
        background: '#fff',
        color: t.ink,
      }}
    >
      <FadeIn>
        <SectionLabel t={t} eng="location" ko="오시는 길" />

        <div
          style={{
            marginTop: 28,
            fontFamily: t.serif,
            fontSize: 15,
            textAlign: 'center',
            color: t.ink,
          }}
        >
          {WEDDING.venue}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 13,
            color: t.muted,
            marginTop: 6,
          }}
        >
          {WEDDING.hall}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: t.muted,
            marginTop: 4,
          }}
        >
          {WEDDING.address}
        </div>

        <div
          style={{
            marginTop: 20,
            height: 220,
            borderRadius: 6,
            overflow: 'hidden',
            border: `1px solid ${t.line}`,
          }}
        >
          <iframe
            src={`https://maps.google.com/maps?q=${lat},${lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            allowFullScreen
            title="웨딩홀 위치"
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 8,
            marginTop: 14,
          }}
        >
          <a
            href={`https://map.naver.com/v5/search/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 6px',
              border: `1px solid ${t.line}`,
              background: 'transparent',
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 12,
              color: t.ink,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
            }}
          >
            네이버지도
          </a>
          <a
            href={`https://map.kakao.com/link/search/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 6px',
              border: `1px solid ${t.line}`,
              background: 'transparent',
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 12,
              color: t.ink,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
            }}
          >
            카카오맵
          </a>
          <a
            href="#"
            onClick={handleTmapClick}
            style={{
              padding: '10px 6px',
              border: `1px solid ${t.line}`,
              background: 'transparent',
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 12,
              color: t.ink,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
            }}
          >
            T map
          </a>
        </div>

        <AddressCopyBtn t={t} address={WEDDING.address} />

        <div
          style={{
            marginTop: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {WEDDING.location.transport.map((transport, i) => (
            <TransportRow key={i} t={t} kind={transport.kind} title={transport.title} lines={transport.lines} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
