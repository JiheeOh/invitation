export const FONT_SETS = {
  classic: {
    name: '명조 + 캘리',
    serif: 'var(--font-cormorant), var(--font-noto-serif-kr), var(--font-nanum-myeongjo), serif',
    sans: '"Pretendard", -apple-system, var(--font-noto-sans-kr), sans-serif',
    script: 'var(--font-cormorant), var(--font-noto-serif-kr), serif',
  },
  modern: {
    name: '모던 고딕',
    serif: 'var(--font-cormorant), var(--font-noto-serif-kr), var(--font-nanum-myeongjo), serif',
    sans: '"Pretendard", -apple-system, var(--font-noto-sans-kr), sans-serif',
    script: 'var(--font-cormorant), var(--font-noto-serif-kr), serif',
  },
  hand: {
    name: '손글씨 무드',
    serif: 'var(--font-cormorant), var(--font-noto-serif-kr), var(--font-nanum-myeongjo), serif',
    sans: '"Pretendard", -apple-system, var(--font-noto-sans-kr), sans-serif',
    script: 'var(--font-cormorant), var(--font-noto-serif-kr), serif',
  },
} as const;
