'use client';

import React from 'react';
import Image from 'next/image';
import FadeIn from '../FadeIn';
import { WEDDING } from '@/lib/wedding-data';
import { getStorageUrl } from '@/lib/supabase';
import type { Theme } from '@/lib/utils';

interface FamilyProps {
    t: Theme;
    onContact: () => void;
}

export default function Family({ t, onContact }: FamilyProps) {
    const groomPortrait = getStorageUrl(WEDDING.storage.bucket, WEDDING.storage.portraits.groom);
    const bridePortrait = getStorageUrl(WEDDING.storage.bucket, WEDDING.storage.portraits.bride);

    const People = [
        {
            side: '신랑',
            sideColor: '#7AA0CC',
            person: WEDDING.groom,
            photo: groomPortrait,
        },
        {
            side: '신부',
            sideColor: '#D08A8A',
            person: WEDDING.bride,
            photo: bridePortrait,
        },
    ];

    return (
        <section
            style={{
                padding: '72px 28px 64px',
                background: '#fff',
                color: t.ink,
                textAlign: 'center',
            }}
        >
            <FadeIn>
                <div
                    style={{
                        fontFamily: t.serif,
                        fontSize: 16,
                        color: t.ink,
                        letterSpacing: 2,
                        fontWeight: 500,
                    }}
                >
                    {WEDDING.greeting.title}
                </div>
                <div
                    style={{
                        marginTop: 22,
                        fontFamily: t.serif,
                        fontSize: 12.5,
                        color: t.muted,
                        lineHeight: 2,
                        whiteSpace: 'pre-line',
                    }}
                >
                    {WEDDING.greeting.paragraph1}
                </div>
                <div
                    style={{
                        marginTop: 18,
                        fontFamily: t.serif,
                        fontSize: 12.5,
                        color: t.muted,
                        lineHeight: 2,
                        whiteSpace: 'pre-line',
                    }}
                >
                    {WEDDING.greeting.paragraph2}
                </div>
            </FadeIn>

            <div
                style={{
                    marginTop: 36,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 14,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                    {People.map((p, i) => (
                        <div key={i} data-testid="family-portrait-container" onContextMenu={(e) => e.preventDefault()} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                            {p.photo ? (
                                <Image
                                    src={p.photo}
                                    alt={p.person.name}
                                    fill
                                    sizes="50vw"
                                    style={{ objectFit: 'contain' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: t.accentSoft,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#999',
                                    }}
                                >
                                    Photo
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            <FadeIn>
                <div
                    style={{
                        marginTop: 18,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 14,
                    }}
                >
                    {People.map((p, i) => (
                        <div key={i} style={{ textAlign: 'center', fontFamily: t.serif }}>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: t.ink,
                                    letterSpacing: 1,
                                }}
                            >
                                <span style={{ color: p.sideColor, fontSize: 11, marginRight: 6 }}>{p.side}</span>
                                {p.person.name}
                            </div>
                            <div
                                style={{
                                    marginTop: 14,
                                    fontSize: 12,
                                    color: t.ink,
                                    lineHeight: 1.95,
                                }}
                            >
                                {p.person.birth}
                                {p.person.birth && <br />}
                                {p.person.city}
                                {p.person.city && <br />}
                                {p.person.job}
                            </div>
                            <div style={{ marginTop: 18, fontSize: 12, color: t.ink }}>{p.person.wish}</div>
                            <div
                                style={{
                                    marginTop: 14,
                                    fontSize: 11,
                                    color: t.muted,
                                }}
                            >
                                {p.person.fatherName} · {p.person.motherName} 의 {p.person.role}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 36 }}>
                    <button
                        onClick={onContact}
                        style={{
                            padding: '12px 28px',
                            background: 'transparent',
                            color: t.ink,
                            border: `1px solid ${t.line}`,
                            borderRadius: 4,
                            fontFamily: t.serif,
                            fontSize: 12,
                            letterSpacing: 1.5,
                            cursor: 'pointer',
                        }}
                    >
                        혼주에게 연락하기
                    </button>
                </div>
            </FadeIn>
        </section>
    );
}

export function ContactsModalContent({ t }: { t: Theme }) {
    const iconBtn = {
        width: 32,
        height: 32,
        borderRadius: 999,
        border: `1px solid ${t.line}`,
        color: t.ink,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        background: '#fff',
    } as const;

    const Side = ({ title, people }: { title: string; people: Array<{ role: string; name: string; tel: string }> }) => (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    fontFamily: t.serif,
                    fontSize: 13,
                    color: t.ink,
                    fontWeight: 500,
                    marginBottom: 18,
                }}
            >
                {title}
            </div>
            {people.map((p, i) => (
                <div key={i} style={{ marginBottom: 22 }}>
                    <div
                        style={{
                            fontFamily: t.serif,
                            fontSize: 12.5,
                            color: t.ink,
                            marginBottom: 10,
                        }}
                    >
                        {p.role} {p.name}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 18,
                            opacity: p.tel ? 1 : 0.35,
                        }}
                    >
                        <a
                            href={p.tel ? `tel:${p.tel}` : undefined}
                            aria-label="call"
                            style={iconBtn as React.CSSProperties}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </a>
                        <a
                            href={p.tel ? `sms:${p.tel}` : undefined}
                            aria-label="message"
                            style={iconBtn as React.CSSProperties}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 18,
                paddingTop: 8,
            }}
        >
            <Side
                title="신랑측"
                people={[
                    {
                        role: '아버지',
                        name: WEDDING.groom.fatherName,
                        tel: WEDDING.contacts.groomFather.tel,
                    },
                    {
                        role: '어머니',
                        name: WEDDING.groom.motherName,
                        tel: WEDDING.contacts.groomMother.tel,
                    },
                ]}
            />
            <Side
                title="신부측"
                people={[
                    {
                        role: '아버지',
                        name: WEDDING.bride.fatherName,
                        tel: WEDDING.contacts.brideFather.tel,
                    },
                    {
                        role: '어머니',
                        name: WEDDING.bride.motherName,
                        tel: WEDDING.contacts.brideMother.tel,
                    },
                ]}
            />
        </div>
    );
}
