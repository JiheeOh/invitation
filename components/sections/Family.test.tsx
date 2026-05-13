'use client';

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Family from './Family';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} data-testid={`family-portrait-${alt}`} src={src} />
  ),
}));

vi.mock('@/lib/supabase', () => ({
  getStorageUrl: (bucket: string, path: string) => `https://example.com/${bucket}/${path}`,
}));

vi.mock('@/lib/wedding-data', () => ({
  WEDDING: {
    storage: {
      bucket: 'test-bucket',
      portraits: {
        groom: 'groom.jpg',
        bride: 'bride.jpg',
      },
    },
    groom: {
      name: '신랑',
      birth: '1990년 1월 1일',
      city: '서울',
      job: '개발자',
      wish: '행복하게',
      fatherName: '아버지',
      motherName: '어머니',
      role: '아들',
    },
    bride: {
      name: '신부',
      birth: '1992년 2월 2일',
      city: '부산',
      job: '디자이너',
      wish: '즐겁게',
      fatherName: '아버지',
      motherName: '어머니',
      role: '딸',
    },
    greeting: {
      title: '초대합니다',
      paragraph1: '저희 결혼합니다.',
      paragraph2: '함께해주세요.',
    },
  },
}));

const mockTheme = {
  accent: '#CF7C90',
  accentSoft: '#F291A8',
  ink: '#3A3540',
  muted: '#8A8A8A',
  bg: '#fff',
  line: '#ddd',
  sans: 'sans-serif',
  serif: 'serif',
};

describe('Family', () => {
  it('인물 사진 컨테이너가 렌더링되어야 한다', () => {
    const { container } = render(<Family t={mockTheme} onContact={() => {}} />);
    const portraitContainers = container.querySelectorAll('[data-testid="family-portrait-container"]');
    expect(portraitContainers.length).toBe(2);
  });

  it('인물 사진 컨테이너에서 우클릭 컨텍스트 메뉴가 방지되어야 한다', () => {
    const { container } = render(<Family t={mockTheme} onContact={() => {}} />);
    const portraitContainers = container.querySelectorAll('[data-testid="family-portrait-container"]');

    portraitContainers.forEach((container) => {
      const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      const prevented = !container.dispatchEvent(event);
      expect(prevented).toBe(true);
    });
  });

  it('신랑과 신부 정보가 렌더링되어야 한다', () => {
    const { container } = render(<Family t={mockTheme} onContact={() => {}} />);
    expect(container.textContent).toContain('신랑');
    expect(container.textContent).toContain('신부');
  });

  it('혼주에게 연락하기 버튼이 렌더링되어야 한다', () => {
    const { container } = render(<Family t={mockTheme} onContact={() => {}} />);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('혼주에게 연락하기');
  });
});
