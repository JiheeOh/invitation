'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import type { Theme } from '@/lib/utils';

interface CopyBtnProps {
  text: string;
  label?: string;
  style?: React.CSSProperties;
  theme: Theme;
}

export default function CopyBtn({
  text,
  label = '복사',
  style = {},
  theme,
}: CopyBtnProps) {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    try {
      await copyToClipboard(text);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <button
      onClick={onCopy}
      style={{
        border: `1px solid ${theme.line}`,
        background: done ? theme.accent : 'transparent',
        color: done ? '#fff' : theme.ink,
        fontSize: 11,
        letterSpacing: 1,
        padding: '5px 10px',
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all .25s',
        ...style,
      }}
    >
      {done ? '복사됨' : label}
    </button>
  );
}
