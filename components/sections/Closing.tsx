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
    <section style={{ padding: '40px 0 0', background: '#fff', color: t.ink }}>
      <FadeIn>
        <div style={{ position: 'relative', height: 'min(720px, calc(100dvh - 80px))' }}>
          {closingUrl && (
            <Image
              src={closingUrl}
              alt="closing"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: t.serif,
              fontSize: 14,
              color: '#1A1A1A',
              letterSpacing: 1,
              textShadow: '0 1px 6px rgba(255,255,255,0.5)',
            }}
          >
            {WEDDING.closingMessage}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
