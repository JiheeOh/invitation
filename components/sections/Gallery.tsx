'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import type { Theme } from '@/lib/utils';

interface GalleryProps {
  t: Theme;
}

export default function Gallery({ t }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const visiblePhotos = photos.slice(0, visibleCount);

  return (
    <section style={{ padding: '72px 32px', background: '#fff', color: t.ink }}>
      <FadeIn>
        <SectionLabel t={t} eng="gallery" ko="우리의 순간" />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: t.muted }}>
            로딩 중...
          </div>
        ) : photos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: t.muted, fontSize: 13 }}>
            public/images/gallery 폴더에 사진을 추가해주세요.
          </div>
        ) : (
          <>
            <div
              style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 4,
              }}
            >
              {visiblePhotos.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(i)}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    aspectRatio: '1/1',
                    backgroundColor: t.accentSoft,
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 200px"
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>

            {visibleCount < photos.length && (
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button
                  onClick={() => setVisibleCount((c) => c + 9)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: t.serif,
                    fontSize: 12.5,
                    color: t.muted,
                    letterSpacing: 2,
                  }}
                >
                  더보기 ⌄
                </button>
              </div>
            )}
          </>
        )}
      </FadeIn>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          <Image
            src={photos[lightbox]}
            alt={`Photo ${lightbox + 1}`}
            fill
            sizes="100vw"
            style={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: 999,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
