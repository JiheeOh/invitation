export const FONT_SETS = {
  classic: {
    name: '명조 + 캘리',
    serif: 'var(--font-noto-serif-kr), var(--font-cormorant), var(--font-nanum-myeongjo), serif',
    sans: 'var(--font-noto-serif-kr), var(--font-nanum-myeongjo), serif',
    script: 'var(--font-cormorant), var(--font-noto-serif-kr), serif',
  },
  modern: {
    name: '모던 고딕',
    serif: 'var(--font-noto-serif-kr), var(--font-cormorant), var(--font-nanum-myeongjo), serif',
    sans: 'var(--font-noto-serif-kr), var(--font-nanum-myeongjo), serif',
    script: 'var(--font-cormorant), var(--font-noto-serif-kr), serif',
  },
  hand: {
    name: '손글씨 무드',
    serif: 'var(--font-noto-serif-kr), var(--font-cormorant), var(--font-nanum-myeongjo), serif',
    sans: 'var(--font-noto-serif-kr), var(--font-nanum-myeongjo), serif',
    script: 'var(--font-cormorant), var(--font-noto-serif-kr), serif',
  },
} as const;
