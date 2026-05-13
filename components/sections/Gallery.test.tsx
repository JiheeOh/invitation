'use client';

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from './Gallery';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} data-testid={`gallery-image-${alt}`} src={src} />
  ),
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

const mockPhotos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];

describe('Gallery', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: mockPhotos }),
      } as Response),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('갤러리가 렌더링되어야 한다', async () => {
    render(<Gallery t={mockTheme} />);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('썸네일 컨테이너에서 우클릭 컨텍스트 메뉴가 방지되어야 한다', async () => {
    const { container } = render(<Gallery t={mockTheme} />);

    await waitFor(() => {
      const thumbnailContainers = Array.from(container.querySelectorAll('div')).filter(
        (el) => el.getAttribute('style')?.includes('cursor: pointer'),
      );
      expect(thumbnailContainers.length).toBeGreaterThan(0);

      thumbnailContainers.forEach((el) => {
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
        const prevented = !el.dispatchEvent(event);
        expect(prevented).toBe(true);
      });
    });
  });

  it('라이트박스에서 우클릭 컨텍스트 메뉴가 방지되어야 한다', async () => {
    const { container } = render(<Gallery t={mockTheme} />);

    await waitFor(() => {
      const thumbnails = Array.from(container.querySelectorAll('div')).filter(
        (el) => el.getAttribute('style')?.includes('cursor: pointer'),
      );
      expect(thumbnails.length).toBeGreaterThan(0);
    });

    const firstThumbnail = Array.from(container.querySelectorAll('div')).find(
      (el) => el.getAttribute('style')?.includes('cursor: pointer'),
    );

    if (firstThumbnail) {
      await userEvent.click(firstThumbnail);
    }

    await waitFor(() => {
      const lightboxOverlay = container.querySelector('div[style*="position: fixed"]');
      expect(lightboxOverlay).toBeTruthy();

      const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      const prevented = !lightboxOverlay!.dispatchEvent(event);
      expect(prevented).toBe(true);
    });
  });

  it('썸네일 클릭 시 라이트박스가 열려야 한다', async () => {
    const { container } = render(<Gallery t={mockTheme} />);

    await waitFor(() => {
      const thumbnails = Array.from(container.querySelectorAll('div')).filter(
        (el) => el.getAttribute('style')?.includes('cursor: pointer'),
      );
      expect(thumbnails.length).toBeGreaterThan(0);
    });

    const firstThumbnail = Array.from(container.querySelectorAll('div')).find(
      (el) => el.getAttribute('style')?.includes('cursor: pointer'),
    );

    if (firstThumbnail) {
      await userEvent.click(firstThumbnail);
    }

    await waitFor(() => {
      const lightboxOverlay = container.querySelector('div[style*="position: fixed"]');
      expect(lightboxOverlay).toBeTruthy();
    });
  });
});
