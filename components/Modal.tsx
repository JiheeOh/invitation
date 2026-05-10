'use client';

import React, { ReactNode } from 'react';
import type { Theme } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  t: Theme;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, t, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(35,30,45,0.55)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: '90%',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: 6,
          padding: '28px 22px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="close"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 30,
            height: 30,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: t.muted,
            fontSize: 20,
          }}
        >
          ✕
        </button>
        <div
          style={{
            fontFamily: t.serif,
            fontSize: 15,
            letterSpacing: 4,
            color: t.ink,
            textAlign: 'center',
            marginBottom: 22,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
