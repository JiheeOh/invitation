'use client';

import React, { useState } from 'react';
import type { Theme } from '@/lib/utils';
import Cover from './sections/Cover';
import Greeting from './sections/Greeting';
import Family from './sections/Family';
import CalendarSection from './sections/CalendarSection';
import Gallery from './sections/Gallery';
import Interview from './sections/Interview';
import Location from './sections/Location';
import Accounts from './sections/Accounts';
import Share from './sections/Share';
import Slideshow from './Slideshow';
import PetalShower from './PetalShower';
import MusicToggle from './MusicToggle';

interface InvitationProps {
  t: Theme;
  petals?: boolean;
}

export default function Invitation({ t, petals = true }: InvitationProps) {
  const [slideshow, setSlideshow] = useState(false);

  return (
    <div
      data-scroll-root
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: t.bg,
        color: t.ink,
        fontFamily: t.sans,
        position: 'relative',
        scrollbarWidth: 'thin',
      }}
    >
      {petals && <PetalShower count={16} />}
      <MusicToggle t={t} />

      <Cover t={t} />
      <Greeting t={t} />
      <Family t={t} />
      <CalendarSection t={t} />
      <Gallery t={t} onOpenSlideshow={() => setSlideshow(true)} />
      <Interview t={t} />
      <Location t={t} />
      <Accounts t={t} />
      <Share t={t} />

      {slideshow && <Slideshow t={t} onClose={() => setSlideshow(false)} />}
    </div>
  );
}
