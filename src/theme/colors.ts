// Theme-aware color palettes
// Generated from primary color #076ee5 (#2378c3 adjusted)

export const LIGHT_COLORS = {
  50: '#e0f1ff',
  100: '#b0d2ff',
  200: '#7fb0ff',
  300: '#4d8bff',
  400: '#1e79fe',
  500: '#076ee5',
  600: '#0062b3',
  700: '#004f81',
  800: '#003650',
  900: '#001620',
} as const;

export const DARK_COLORS = {
  50: '#001620',
  100: '#003650',
  200: '#004f81',
  300: '#0062b3',
  400: '#076ee5',
  500: '#1e79fe',
  600: '#4d8bff',
  700: '#7fb0ff',
  800: '#b0d2ff',
  900: '#e0f1ff',
} as const;

export type ColorPalette = typeof LIGHT_COLORS;

export const getThemeColors = (theme: 'light' | 'dark'): ColorPalette => {
  return theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
};

// Primary color (same for both themes as the algorithm adjusts it)
export const PRIMARY_COLOR = '#076ee5';
