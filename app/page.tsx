'use client';

import React, { useState, useMemo } from 'react';
import { THEMES, FONT_SETS } from '@/lib/wedding-data';
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

    return (
        <>
            <div className="canvas">
                <Invitation t={theme} petals={cfg.petals} />
            </div>
        </>
    );
}
