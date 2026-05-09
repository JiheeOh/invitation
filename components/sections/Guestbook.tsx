'use client';

import React, { useState } from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import type { Theme } from '@/lib/utils';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface GuestbookProps {
  t: Theme;
}

export default function Guestbook({ t }: GuestbookProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    const stored = localStorage.getItem('guestbook-entries');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('guestbook-entries', JSON.stringify(updated));
    setName('');
    setMessage('');
  };

  return (
    <section style={{ padding: '40px 20px', background: '#fff', color: t.ink }}>
      <FadeIn>
        <SectionLabel t={t} eng="Guestbook" ko="방명록" />

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: 12,
              border: `1px solid ${t.line}`,
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="축하 메시지"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: 12,
              border: `1px solid ${t.line}`,
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 14,
              minHeight: 80,
              boxSizing: 'border-box',
              resize: 'vertical',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: t.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              fontFamily: t.sans,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            등록
          </button>
        </form>

        <div style={{ marginTop: 32 }}>
          {entries.length === 0 ? (
            <div style={{ color: t.muted, fontSize: 13, textAlign: 'center' }}>
              아직 축하 메시지가 없습니다.
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: '16px',
                  marginBottom: 12,
                  border: `1px solid ${t.line}`,
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginBottom: 8,
                    color: t.ink,
                  }}
                >
                  {entry.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: t.muted,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {entry.message}
                </div>
              </div>
            ))
          )}
        </div>
      </FadeIn>
    </section>
  );
}
