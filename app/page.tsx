'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { THEMES, FONT_SETS, WEDDING } from '@/lib/wedding-data';
import { getStorageUrl } from '@/lib/supabase';
import type { Theme } from '@/lib/utils';
import Invitation from '@/components/Invitation';

export default function Home() {
    const TWEAK_DEFAULTS = {
        theme: 'lavender' as keyof typeof THEMES,
        font: 'hand' as keyof typeof FONT_SETS,
        petals: true,
    };

    const [cfg] = useState(TWEAK_DEFAULTS);
    const baseTheme = THEMES[cfg.theme] || THEMES.lavender;
    const fontSet = FONT_SETS[cfg.font] || FONT_SETS.hand;
    const theme: Theme = useMemo(() => ({ ...baseTheme, ...fontSet }), [baseTheme, fontSet]);

    useEffect(() => {
        document.documentElement.style.setProperty('--accent', theme.accent);
        document.documentElement.style.setProperty('--accent-soft', theme.accentSoft);
        document.documentElement.style.setProperty('--ink', theme.ink);
        document.documentElement.style.setProperty('--muted', theme.muted);
    }, [theme.accent, theme.accentSoft, theme.ink, theme.muted]);

    return (
        <>
            <div className="canvas">
                <Invitation t={theme} petals={cfg.petals} bgmUrl={WEDDING.storage.bgm ? getStorageUrl(WEDDING.storage.bgmBucket, WEDDING.storage.bgm) : ''} />
            </div>
        </>
    );
}
