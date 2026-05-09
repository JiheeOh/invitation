'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeKey = 'lavender' | 'rose' | 'cream' | 'sage';
type FontKey = 'classic' | 'modern' | 'hand';

interface ThemeConfig {
  theme: ThemeKey;
  font: FontKey;
  petals: boolean;
}

interface ThemeContextType {
  config: ThemeConfig;
  setTheme: (theme: ThemeKey) => void;
  setFont: (font: FontKey) => void;
  setPetals: (enabled: boolean) => void;
  resetConfig: () => void;
}

const defaultConfig: ThemeConfig = {
  theme: 'lavender',
  font: 'modern',
  petals: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'invitation-config';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {
        setConfig(defaultConfig);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }, [config, mounted]);

  const setTheme = (theme: ThemeKey) => {
    setConfig((prev) => ({ ...prev, theme }));
  };

  const setFont = (font: FontKey) => {
    setConfig((prev) => ({ ...prev, font }));
  };

  const setPetals = (enabled: boolean) => {
    setConfig((prev) => ({ ...prev, petals: enabled }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  return (
    <ThemeContext.Provider value={{ config, setTheme, setFont, setPetals, resetConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
