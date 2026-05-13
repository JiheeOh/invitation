'use client';

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Cover from './Cover';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} data-testid="cover-image" src={src} />
  ),
}));

vi.mock('@/lib/supabase', () => ({
  getStorageUrl: (bucket: string, path: string) => `https://example.com/${bucket}/${path}`,
}));

vi.mock('@/lib/wedding-data', () => ({
  WEDDING: {
    storage: {
      bucket: 'test-bucket',
      cover: 'cover.jpg',
    },
    coverDate: '2026년 8월 29일 토요일',
    coverTime: '오후 2시 20분',
    venue: '테스트 장소',
    hall: '테스트 홀',
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

describe('Cover', () => {
  it('섹션 요소가 렌더링되어야 한다', () => {
    const { container } = render(<Cover t={mockTheme} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('이미지에서 우클릭 컨텍스트 메뉴가 방지되어야 한다', () => {
    const { container } = render(<Cover t={mockTheme} />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const prevented = !section!.dispatchEvent(event);
    expect(prevented).toBe(true);
  });

  it('onContextMenu 이벤트 핸들러가 preventDefault를 호출해야 한다', () => {
    const { container } = render(<Cover t={mockTheme} />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();

    const mockEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    section!.dispatchEvent(mockEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
