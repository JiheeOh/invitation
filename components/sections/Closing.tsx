'use client';

import React from 'react';
import Image from 'next/image';
import FadeIn from '../FadeIn';
import { WEDDING } from '@/lib/wedding-data';
import { getStorageUrl } from '@/lib/supabase';
import type { Theme } from '@/lib/utils';

interface ClosingProps {
  t: Theme;
}

export default function Closing({ t }: ClosingProps) {
  const closingUrl = getStorageUrl(
    WEDDING.storage.bucket,
    WEDDING.storage.closing
  );

  return (
    <section style={{ padding: '40px 0 0', background: '#fff', color: t.ink, position: 'relative', zIndex: 2 }}>
      <FadeIn>
        <div onContextMenu={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} {...({onSelectStart: (e: any) => e.preventDefault()} as any)} style={{ position: 'relative', height: 'min(720px, calc(var(--stable-svh-100, 100svh) - 80px))', background: '#F5F5F5', userSelect: 'none' }}>
          {closingUrl && (
            <>
              <Image
                src={closingUrl}
                alt="closing"
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
            </>
          )}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontFamily: t.serif,
            fontSize: 14,
            color: '#1A1A1A',
            letterSpacing: 1,
            padding: '24px 20px',
          }}
        >
          {WEDDING.closingMessage}
        </div>
      </FadeIn>
    </section>
  );
}
