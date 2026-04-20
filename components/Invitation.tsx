'use client';

import React, { useState, useEffect } from 'react';
import { THEMES, FONT_SETS } from '@/lib/wedding-data';
import type { Theme, FontSet } from '@/lib/utils';
import Cover from './sections/Cover';
import Greeting from './sections/Greeting';
import Family from './sections/Family';
import CalendarSection from './sections/CalendarSection';
import Gallery from './sections/Gallery';
import Location from './sections/Location';
import Accounts from './sections/Accounts';
import PetalShower from './PetalShower';

interface InvitationProps {
  mood?: 'A' | 'B';
}

export default function Invitation({ mood = 'A' }: InvitationProps) {
  const config = {
    theme: 'lavender',
    font: 'modern',
    petals: true,
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const baseTheme = THEMES[config.theme as keyof typeof THEMES] || THEMES.lavender;
  const fontSet = FONT_SETS[config.font as keyof typeof FONT_SETS] || FONT_SETS.classic;
  const theme: Theme = { ...baseTheme, ...fontSet };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#fff',
        maxWidth: '100%',
      }}
    >
      <PetalShower enabled={config.petals} />

      <Cover t={theme} mood={mood} />
      <Greeting t={theme} />
      <Family t={theme} />
      <CalendarSection t={theme} />
      <Gallery t={theme} />
      <Location t={theme} />
      <Accounts t={theme} />
    </div>
  );
}
