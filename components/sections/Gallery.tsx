'use client';

import React, { useState, useEffect } from 'react';
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
  const [imageDimensions, setImageDimensions] = useState<Record<number, { width: number; height: number }>>({});

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

  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions((prev) => ({
      ...prev,
      [index]: { width: img.naturalWidth, height: img.naturalHeight },
    }));
  };

  const getImageContainerStyle = () => {
    if (lightbox === null || !imageDimensions[lightbox]) {
      return {
        width: '90%',
        maxWidth: 1000,
        aspectRatio: '3/4',
      };
    }

    const dims = imageDimensions[lightbox];
    const aspectRatio = dims.width / dims.height;
    const maxWidth = 1000;
    const maxHeight = window.innerHeight * 0.8;

    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return {
      width: Math.min(width, maxWidth),
      height: Math.min(height, maxHeight),
    };
  };

  const navBtn = {
    width: 40,
    height: 40,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: 'none',
    fontSize: 22,
    cursor: 'pointer',
  } as React.CSSProperties;

  return (
    <section style={{ padding: '48px 20px', background: '#fff', color: t.ink }}>
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
              {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              style={{
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '100%',
                backgroundColor: t.accentSoft,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <img
                src={photo}
                alt={`Photo ${i + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
            </div>

            {photos.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button
                  onClick={() => setLightbox(0)}
                  style={{
                    fontFamily: t.script,
                    fontSize: 16,
                    color: t.accent,
                    background: 'transparent',
                    border: 'none',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    borderBottom: `1px solid ${t.accent}`,
                    borderRadius: 0,
                  }}
                >
                  view slideshow ▸
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
            background: 'rgba(40,35,55,0.95)',
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              ...getImageContainerStyle(),
              position: 'relative',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            <img
              src={photos[lightbox]}
              alt={`Photo ${lightbox + 1}`}
              onLoad={(e) => handleImageLoad(lightbox, e)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#fff',
              fontFamily: t.script,
              fontSize: 18,
            }}
          >
            {lightbox + 1} / {photos.length}
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 16px',
              transform: 'translateY(-50%)',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + photos.length) % photos.length);
              }}
              style={navBtn}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % photos.length);
              }}
              style={navBtn}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
