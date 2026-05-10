import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      include: [
        'lib/utils.ts',
        'lib/hooks.ts',
        'lib/wedding-data.ts',
        'lib/config/themes.ts',
        'lib/config/fonts.ts',
        'components/FadeIn.tsx',
        'components/MapView.tsx',
        'components/sections/Location.tsx',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, '.') },
  },
});
