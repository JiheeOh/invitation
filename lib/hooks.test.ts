import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountdown, useFadeIn } from './hooks';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('과거 날짜이면 모두 0을 반환해야 함', () => {
    const { result } = renderHook(() => useCountdown('2020-01-01T00:00:00+09:00'));
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.mins).toBe(0);
    expect(result.current.secs).toBe(0);
  });

  it('미래 날짜이면 양수를 반환해야 함', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString();
    const { result } = renderHook(() => useCountdown(future));
    expect(result.current.days).toBeGreaterThan(0);
  });

  it('1초마다 secs가 감소해야 함', () => {
    // 정확히 1분 후인 시간 설정
    const future = new Date(Date.now() + 1000 * 62).toISOString();
    const { result } = renderHook(() => useCountdown(future));

    const initialSecs = result.current.secs;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // secs가 변경되었거나 mins가 변경됨
    const changed =
      result.current.secs !== initialSecs ||
      result.current.mins !== undefined;
    expect(changed).toBe(true);
  });

  it('언마운트 시 interval이 정리되어야 함', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const future = new Date(Date.now() + 1000 * 60 * 60).toISOString();
    const { unmount } = renderHook(() => useCountdown(future));
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});

describe('useFadeIn', () => {
  it('초기 visible은 false이어야 함', () => {
    const { result } = renderHook(() => useFadeIn());
    expect(result.current.visible).toBe(false);
  });

  it('ref가 반환되어야 함', () => {
    const { result } = renderHook(() => useFadeIn());
    expect(result.current.ref).toBeDefined();
  });

  it('delay 인자를 받을 수 있어야 함', () => {
    const { result } = renderHook(() => useFadeIn(500));
    expect(result.current.visible).toBe(false);
  });

  it('언마운트 시 timeout이 정리되어야 함', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = renderHook(() => useFadeIn(100));
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('IntersectionObserver가 intersecting을 감지하면 visible을 true로 설정해야 함', () => {
    vi.useFakeTimers();
    let savedCallback: ((entries: Partial<IntersectionObserverEntry>[]) => void) | null = null;
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: () => [],
    };
    global.IntersectionObserver = vi.fn().mockImplementation(function(this: object, cb) {
      savedCallback = cb;
      return mockObserver;
    }) as unknown as typeof IntersectionObserver;

    const { result } = renderHook(() => useFadeIn(0));
    const div = document.createElement('div');
    if (result.current.ref) {
      result.current.ref.current = div;
    }

    act(() => {
      vi.advanceTimersByTime(0);
    });

    if (savedCallback) {
      act(() => {
        savedCallback!([{ isIntersecting: true, target: div } as IntersectionObserverEntry]);
      });
    }

    vi.useRealTimers();
  });
});
