'use client';

import React, { useState, useEffect } from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import type { Theme } from '@/lib/utils';

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface GuestbookProps {
  t: Theme;
}

export default function Guestbook({ t }: GuestbookProps) {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('guestbook_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        //
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      const newEntry: GuestEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };

      const newEntries = [newEntry, ...entries];
      setEntries(newEntries);
      localStorage.setItem('guestbook_entries', JSON.stringify(newEntries));

      setName('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        padding: '72px 32px',
        background: '#fff',
        color: t.ink,
      }}
    >
      <FadeIn>
        <SectionLabel t={t} eng="guestbook" ko="방명록" />

        <form onSubmit={handleSubmit} style={{ marginTop: 28 }}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 10,
              border: `1px solid ${t.line}`,
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 14,
              color: t.ink,
              boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="축하 메시지를 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 10,
              border: `1px solid ${t.line}`,
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 14,
              color: t.ink,
              minHeight: 80,
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: t.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? '저장 중...' : '저장'}
          </button>
        </form>

        <div style={{ marginTop: 32 }}>
          {entries.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: t.muted,
                fontSize: 12,
                padding: '20px',
              }}
            >
              아직 메시지가 없습니다.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    padding: '12px 16px',
                    background: t.accentSoft,
                    borderRadius: 4,
                    borderLeft: `3px solid ${t.accent}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: t.serif,
                      fontSize: 13,
                      fontWeight: 600,
                      color: t.ink,
                      marginBottom: 4,
                    }}
                  >
                    {entry.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: t.ink,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {entry.message}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: t.muted,
                      marginTop: 6,
                    }}
                  >
                    {new Date(entry.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
