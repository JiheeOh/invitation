import '@testing-library/jest-dom';

global.IntersectionObserver = class IntersectionObserver implements globalThis.IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  disconnect(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  observe(target: Element): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unobserve(target: Element): void {}
};
