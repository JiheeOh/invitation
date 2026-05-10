import { describe, it, expect, vi, beforeEach } from 'vitest';
import { padStart, copyToClipboard } from './utils';

describe('padStart', () => {
  it('숫자를 0으로 패딩해야 함', () => {
    expect(padStart(5, 2)).toBe('05');
    expect(padStart(0, 2)).toBe('00');
  });

  it('이미 충분한 길이면 그대로 반환해야 함', () => {
    expect(padStart(123, 3)).toBe('123');
    expect(padStart(1234, 3)).toBe('1234');
  });

  it('문자열도 패딩할 수 있어야 함', () => {
    expect(padStart('a', 3, '*')).toBe('**a');
  });
});

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('navigator.clipboard가 있으면 writeText를 호출해야 함', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    await copyToClipboard('hello');
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('navigator.clipboard가 없으면 execCommand fallback을 사용해야 함', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: false,
      configurable: true,
    });
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn().mockReturnValue(true),
      writable: true,
      configurable: true,
    });
    const execCommand = vi.spyOn(document, 'execCommand').mockReturnValue(true);

    await copyToClipboard('hello');
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  it('execCommand가 실패하면 reject되어야 함', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: false,
      configurable: true,
    });
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn(),
      writable: true,
      configurable: true,
    });
    vi.spyOn(document, 'execCommand').mockImplementation(() => {
      throw new Error('copy failed');
    });

    await expect(copyToClipboard('hello')).rejects.toThrow('copy failed');
  });
});
