'use client';

import React, { useState } from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import PhotoPH from '../PhotoPH';
import { WEDDING } from '@/lib/wedding-data';
import { getStorageUrl } from '@/lib/supabase';
import type { Theme } from '@/lib/utils';

interface InterviewProps {
  t: Theme;
}

export default function Interview({ t }: InterviewProps) {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

  const groomData = WEDDING.interview.groom;
  const brideData = WEDDING.interview.bride;
  const activeData = activeTab === 'groom' ? groomData : brideData;

  const groomImageUrl = getStorageUrl(WEDDING.storage.bucket, WEDDING.storage.portraits.groom);
  const brideImageUrl = getStorageUrl(WEDDING.storage.bucket, WEDDING.storage.portraits.bride);
  const activeImageUrl = activeTab === 'groom' ? groomImageUrl : brideImageUrl;

  return (
    <section style={{ padding: '64px 32px', background: '#fff', color: t.ink }}>
      <FadeIn>
        <SectionLabel t={t} eng="interview" ko="신랑·신부 인터뷰" />

        {/* Tab buttons */}
        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={() => setActiveTab('groom')}
            style={{
              padding: '10px 24px',
              fontFamily: t.serif,
              fontSize: 14,
              fontWeight: activeTab === 'groom' ? 600 : 400,
              border: 'none',
              borderBottom: activeTab === 'groom' ? `2px solid ${t.accent}` : `2px solid ${t.line}`,
              background: 'transparent',
              color: activeTab === 'groom' ? t.ink : t.muted,
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
            }}
          >
            {groomData.label}
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            style={{
              padding: '10px 24px',
              fontFamily: t.serif,
              fontSize: 14,
              fontWeight: activeTab === 'bride' ? 600 : 400,
              border: 'none',
              borderBottom: activeTab === 'bride' ? `2px solid ${t.accent}` : `2px solid ${t.line}`,
              background: 'transparent',
              color: activeTab === 'bride' ? t.ink : t.muted,
              cursor: 'pointer',
              transition: 'all 200ms ease-out',
            }}
          >
            {brideData.label}
          </button>
        </div>

        {/* Photo and Q&A */}
        <div style={{ marginTop: 48 }}>
          {/* Photo */}
          <div style={{ marginBottom: 40 }}>
            {activeImageUrl ? (
              <img
                src={activeImageUrl}
                alt={activeTab === 'groom' ? '신랑' : '신부'}
                style={{
                  width: '100%',
                  maxWidth: 300,
                  height: 'auto',
                  borderRadius: 8,
                  display: 'block',
                  margin: '0 auto',
                }}
                onError={(e) => {
                  // Fallback to placeholder on image load error
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = '<div style="width: 300px; margin: 0 auto;"></div>';
                  }
                }}
              />
            ) : (
              <div style={{ width: 300, margin: '0 auto' }}>
                <PhotoPH ratio="1/1" tone="lavender" />
              </div>
            )}
          </div>

          {/* Q&A List */}
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {activeData.qa.map((item, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 32,
                  paddingBottom: 32,
                  borderBottom: idx < activeData.qa.length - 1 ? `1px solid ${t.line}` : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: t.serif,
                    fontSize: 14,
                    fontWeight: 600,
                    color: t.accent,
                    marginBottom: 12,
                    letterSpacing: 0.5,
                  }}
                >
                  Q. {item.q}
                </div>
                <div
                  style={{
                    fontFamily: t.serif,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: t.ink,
                    paddingLeft: 16,
                    borderLeft: `2px solid ${t.accentSoft}`,
                  }}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
