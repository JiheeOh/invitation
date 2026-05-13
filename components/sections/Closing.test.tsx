'use client';

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Closing from './Closing';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} data-testid="closing-image" src={src} />
  ),
}));

vi.mock('@/lib/supabase', () => ({
  getStorageUrl: (bucket: string, path: string) => `https://example.com/${bucket}/${path}`,
}));

vi.mock('@/lib/wedding-data', () => ({
  WEDDING: {
    storage: {
      bucket: 'test-bucket',
      closing: 'closing.jpg',
    },
    closingMessage: '감사합니다.',
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

describe('Closing', () => {
  it('이미지 래퍼 div가 렌더링되어야 한다', () => {
    const { container } = render(<Closing t={mockTheme} />);
    const imageWrapper = container.querySelector('div[style*="position: relative"]');
    expect(imageWrapper).toBeInTheDocument();
  });

  it('이미지 래퍼에서 우클릭 컨텍스트 메뉴가 방지되어야 한다', () => {
    const { container } = render(<Closing t={mockTheme} />);
    const imageWrapper = Array.from(container.querySelectorAll('div')).find(
      (el) => el.style.background === 'rgb(245, 245, 245)',
    );
    expect(imageWrapper).toBeTruthy();

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const prevented = !imageWrapper!.dispatchEvent(event);
    expect(prevented).toBe(true);
  });

  it('클로징 메시지가 렌더링되어야 한다', () => {
    const { container } = render(<Closing t={mockTheme} />);
    expect(container.textContent).toContain('감사합니다.');
  });
});
