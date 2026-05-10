'use client';

import React from 'react';
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
        style={{
          position: 'relative',
          height: 720,
          overflow: 'hidden',
          background: '#EDE6F3',
        }}
      >
        {coverUrl && (
          <img
            src={coverUrl}
            alt="cover"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
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
            fontFamily: t.serif,
            fontSize: 14,
            letterSpacing: 4,
            fontWeight: 400,
            fontVariantNumeric: 'lining-nums',
          }}
        >
          {WEDDING.coverDate} &nbsp; {WEDDING.coverTime}
        </div>
        <div
          style={{
            fontFamily: t.serif,
            fontSize: 12,
            marginTop: 8,
            letterSpacing: 2,
          }}
        >
          {WEDDING.venue} {WEDDING.hall}
        </div>
      </div>
    </>
  );
}
