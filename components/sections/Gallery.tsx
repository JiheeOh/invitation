'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import type { Theme } from '@/lib/utils';

interface GalleryProps {
  t: Theme;
}

const PAGE_SIZE = 9;

export default function Gallery({ t }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const swipedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPhotos = async () => {
      try {
        const res = await fetch('/api/gallery', { signal: controller.signal });
        const data = await res.json();
        setPhotos((data.photos || []) as string[]);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error loading photos:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
    return () => controller.abort();
  }, []);

  const goPrev = () => {
    if (photos.length === 0) return;
    setLightbox((n) => (n! - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    if (photos.length === 0) return;
    setLightbox((n) => (n! + 1) % photos.length);
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, photos.length]);

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
        ) : null}
      </FadeIn>

      {photos.length > 0 && (
        <div style={{ position: 'relative', zIndex: 2 }}>
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
                key={photo}
                onClick={() => setLightbox(i)}
                onContextMenu={(e) => e.preventDefault()}
                onSelectStart={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  aspectRatio: '1/1',
                  backgroundColor: '#F5F5F5',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  fill
                  priority={i < 3}
                  quality={85}
                  sizes="33vw"
                  style={{ objectFit: 'contain' }}
                />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
              </div>
            ))}
          </div>

          {visibleCount < photos.length && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
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
        </div>
      )}

      {lightbox !== null && (
        <div
          onClick={() => {
            if (!swipedRef.current) setLightbox(null);
          }}
          onContextMenu={(e) => e.preventDefault()}
          onSelectStart={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onTouchStart={(e) => {
            setTouchStartX(e.touches[0].clientX);
            swipedRef.current = false;
          }}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(delta) > 50) {
              swipedRef.current = true;
              if (delta < 0) goNext();
              else goPrev();
            }
            setTouchStartX(null);
          }}
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
          <>
            <Image
              src={photos[lightbox]}
              alt={`Photo ${lightbox + 1}`}
              fill
              quality={90}
              sizes="100vw"
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, zIndex: 100 }} />
          </>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ›
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
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
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontFamily: 't.serif',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
