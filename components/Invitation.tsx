'use client';

import React, { useState } from 'react';
import type { Theme } from '@/lib/utils';
import Cover from './sections/Cover';
import Family, { ContactsModalContent } from './sections/Family';
import CalendarSection from './sections/CalendarSection';
import Gallery from './sections/Gallery';
import { InterviewButton, InterviewModalContent } from './sections/Interview';
import Location from './sections/Location';
import Accounts from './sections/Accounts';
import Closing from './sections/Closing';
import Share from './sections/Share';
import Modal from './Modal';
import PetalShower from './PetalShower';
import MusicToggle from './MusicToggle';

interface InvitationProps {
  t: Theme;
  petals?: boolean;
  bgmUrl?: string;
}

export default function Invitation({ t, petals = true, bgmUrl }: InvitationProps) {
  const [intvOpen, setIntvOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
      {petals && <PetalShower count={20} />}
      <MusicToggle t={t} bgmUrl={bgmUrl} />

      <Cover t={t} />
      <Family t={t} onContact={() => setContactOpen(true)} />
      <Gallery t={t} />
      <InterviewButton t={t} onOpen={() => setIntvOpen(true)} />
      <CalendarSection t={t} />
      <Location t={t} />
      <Accounts t={t} />
      <Closing t={t} />
      <Share t={t} />

      <Modal
        t={t}
        open={intvOpen}
        onClose={() => setIntvOpen(false)}
        title="웨딩 인터뷰"
      >
        <InterviewModalContent t={t} />
      </Modal>

      <Modal
        t={t}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title="혼주에게 연락하기"
      >
        <ContactsModalContent t={t} />
      </Modal>
    </div>
  );
}
