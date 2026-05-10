import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import FadeIn from './FadeIn';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

function makeMockObserver(triggerImmediately = false) {
  let savedCallback: ObserverCallback;

  const mockObserver = {
    observe: vi.fn((el: Element) => {
      if (triggerImmediately) {
        savedCallback([{ isIntersecting: true, target: el } as IntersectionObserverEntry]);
      }
    }),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
    takeRecords: () => [] as IntersectionObserverEntry[],
  };

  const MockClass = vi.fn().mockImplementation(function(this: any, cb: ObserverCallback) {
    savedCallback = cb;
    return mockObserver;
  });

  return { MockClass, mockObserver, trigger: () => savedCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]) };
}

describe('FadeIn', () => {
  it('children이 렌더링되어야 함', () => {
    render(<FadeIn>테스트 콘텐츠</FadeIn>);
    expect(screen.getByText('테스트 콘텐츠')).toBeInTheDocument();
  });

  it('초기 상태에서 opacity가 0이어야 함', () => {
    const { container } = render(<FadeIn>내용</FadeIn>);
    const div = container.firstChild as HTMLElement;
    expect(div.style.opacity).toBe('0');
  });

  it('isIntersecting true 시 opacity가 1이 되어야 함', async () => {
    const { MockClass, trigger } = makeMockObserver();
    global.IntersectionObserver = MockClass as any;

    const { container } = render(<FadeIn>내용</FadeIn>);
    const div = container.firstChild as HTMLElement;

    act(() => { trigger(); });

    await waitFor(() => {
      expect(div.style.opacity).toBe('1');
    });
  });

  it('isIntersecting false 이면 visible이 변경되지 않아야 함', () => {
    let savedCallback: ObserverCallback;
    global.IntersectionObserver = vi.fn().mockImplementation(function(this: any, cb: ObserverCallback) {
      savedCallback = cb;
      return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn(), takeRecords: () => [] };
    }) as any;

    const { container } = render(<FadeIn>내용</FadeIn>);
    const div = container.firstChild as HTMLElement;

    act(() => {
      savedCallback!([{ isIntersecting: false } as IntersectionObserverEntry]);
    });

    expect(div.style.opacity).toBe('0');
  });

  it('delay prop이 있으면 타이머 후 visible이 되어야 함', () => {
    vi.useFakeTimers();
    const { MockClass, trigger } = makeMockObserver();
    global.IntersectionObserver = MockClass as any;

    const { container, rerender } = render(<FadeIn delay={300}>내용</FadeIn>);
    const div = container.firstChild as HTMLElement;

    act(() => { trigger(); });

    expect(div.style.opacity).toBe('0');

    act(() => { vi.advanceTimersByTime(300); });

    rerender(<FadeIn delay={300}>내용</FadeIn>);
    expect(div.style.opacity).toBe('1');

    vi.useRealTimers();
  });
});
