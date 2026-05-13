'use client';

import React from 'react';
import Image from 'next/image';
import { WEDDING } from '@/lib/wedding-data';
import { getStorageUrl } from '@/lib/supabase';
import type { Theme } from '@/lib/utils';

interface CoverProps {
  t: Theme;
}

export default function Cover({ t }: CoverProps) {
  const coverUrl = getStorageUrl(WEDDING.storage.bucket, WEDDING.storage.cover);

  return (
    <>
      <section
        onContextMenu={(e) => e.preventDefault()}
        onSelectStart={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        style={{
          position: 'relative',
          height: 'min(720px, calc(100svh - 80px))',
          overflow: 'hidden',
          background: '#F5F5F5',
          zIndex: 2,
        }}
      >
        {coverUrl && (
          <>
            <Image
              src={coverUrl}
              alt="cover"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
          </>
        )}
      </section>
      <div
        style={{
          background: '#fff',
          color: '#1A1A1A',
          textAlign: 'center',
          padding: '28px 20px 24px',
        }}
      >
        <div
          style={{
            fontFamily: t.sans,
            fontSize: 14,
            letterSpacing: 4,
            fontWeight: 400,
          }}
        >
          {WEDDING.coverDate} &nbsp; {WEDDING.coverTime}
        </div>
        <div
          style={{
            fontFamily: t.sans,
            fontSize: 12,
            marginTop: 8,
            letterSpacing: 2,
          }}
        >
          {WEDDING.venue}<br />{WEDDING.hall}
        </div>
      </div>
    </>
  );
}
