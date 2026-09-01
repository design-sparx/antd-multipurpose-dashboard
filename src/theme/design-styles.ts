import { CSSProperties } from 'react';

export type DesignStyleName =
  | 'clean'
  | 'glassmorphic'
  | 'neumorphic'
  | 'bold'
  | 'mui'
  | 'shadcn'
  | 'serene';

export interface SurfaceTokens {
  /** CSS background value for elevated surfaces (cards, sidebar, popups) */
  surfaceBg: string;
  /** CSS background for the sidebar specifically */
  sidebarBg: string;
  /** CSS border value */
  border: string;
  /** CSS box-shadow value */
  shadow: string;
  /** CSS backdrop-filter value (e.g. blur for glass) */
  backdropFilter: string;
  /** CSS box-shadow for hover state */
  hoverShadow: string;
  /** Additional CSS properties for menu items on hover */
  menuItemHover: CSSProperties;
  /** Header background when scrolled (navFill) */
  headerFilledBg: string;
  /** Header backdrop-filter when scrolled */
  headerFilledBackdrop: string;
  /** Header shadow when scrolled */
  headerFilledShadow: string;
}

export interface DesignStyle {
  name: DesignStyleName;
  label: string;
  description: string;
  /**
   * Surfaces are rendered entirely by antd ConfigProvider tokens/components
   * (see antd-themes.ts). `null` tells consumers to skip SurfaceTokens-driven
   * inline overrides (no-op) and let the active theme handle the look.
   */
  light: SurfaceTokens | null;
  dark: SurfaceTokens | null;
}

/**
 * Styles driven by antd ConfigProvider tokens/components. Their `SurfaceTokens`
 * are `null` — the shared Card and layouts must NOT apply inline surface
 * styling so the native theme's Card/Layout/Menu component tokens win.
 */
export const NATIVE_STYLES: DesignStyleName[] = [
  'clean',
  'bold',
  'mui',
  'shadcn',
  'serene',
];

/**
 * Styles exempt from the antd-native token system. Their look relies on CSS
 * effects antd tokens cannot express (backdrop blur, soft inset shadows), so
 * they keep SurfaceTokens-driven inline styling on top of the base theme.
 */
export const SURFACE_STYLES: DesignStyleName[] = ['glassmorphic', 'neumorphic'];

export const isSurfaceStyle = (styleName: DesignStyleName): boolean =>
  SURFACE_STYLES.includes(styleName);

const cleanStyle: DesignStyle = {
  name: 'clean',
  label: 'Clean',
  description: 'Minimal and flat — solid backgrounds with subtle shadows',
  light: null,
  dark: null,
};

const boldStyle: DesignStyle = {
  name: 'bold',
  label: 'Bold',
  description: 'Strong shadows, vivid accents, and sharp defined edges',
  light: null,
  dark: null,
};

const muiStyle: DesignStyle = {
  name: 'mui',
  label: 'MUI',
  description: 'Material Design cross-platform surfaces (Roboto)',
  light: null,
  dark: null,
};

const shadcnStyle: DesignStyle = {
  name: 'shadcn',
  label: 'Shadcn',
  description: 'Neutral grayscale, minimal shadows',
  light: null,
  dark: null,
};

const sereneStyle: DesignStyle = {
  name: 'serene',
  label: 'Serene',
  description: 'Warm earth tones and calm surfaces',
  light: null,
  dark: null,
};

const glassmorphicStyle: DesignStyle = {
  name: 'glassmorphic',
  label: 'Glassmorphic',
  description: 'Frosted glass surfaces with blur and translucent layers',
  light: {
    surfaceBg: 'rgba(255, 255, 255, 0.55)',
    sidebarBg: 'rgba(255, 255, 255, 0.45)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    shadow: '0 8px 32px rgba(31, 38, 135, 0.12)',
    backdropFilter: 'blur(16px) saturate(180%)',
    hoverShadow: '0 8px 32px rgba(31, 38, 135, 0.22)',
    menuItemHover: {
      transform: 'translateX(4px)',
      transition: 'transform 0.2s ease',
    },
    headerFilledBg: 'rgba(255, 255, 255, 0.45)',
    headerFilledBackdrop: 'blur(20px) saturate(180%)',
    headerFilledShadow: '0 4px 24px rgba(31, 38, 135, 0.1)',
  },
  dark: {
    surfaceBg: 'rgba(30, 30, 60, 0.55)',
    sidebarBg: 'rgba(20, 20, 50, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(16px) saturate(180%)',
    hoverShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
    menuItemHover: {
      transform: 'translateX(4px)',
      transition: 'transform 0.2s ease',
    },
    headerFilledBg: 'rgba(20, 20, 50, 0.5)',
    headerFilledBackdrop: 'blur(20px) saturate(180%)',
    headerFilledShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  },
};

const neumorphicStyle: DesignStyle = {
  name: 'neumorphic',
  label: 'Neumorphic',
  description: 'Soft extruded surfaces with inset and outset shadows',
  light: {
    surfaceBg: '#e8ecf1',
    sidebarBg: '#e8ecf1',
    border: 'none',
    shadow:
      '6px 6px 14px rgba(163, 177, 198, 0.6), -6px -6px 14px rgba(255, 255, 255, 0.8)',
    backdropFilter: 'none',
    hoverShadow:
      '8px 8px 18px rgba(163, 177, 198, 0.7), -8px -8px 18px rgba(255, 255, 255, 0.9)',
    menuItemHover: {
      boxShadow:
        'inset 2px 2px 5px rgba(163, 177, 198, 0.4), inset -2px -2px 5px rgba(255, 255, 255, 0.7)',
      transition: 'box-shadow 0.2s ease',
    },
    headerFilledBg: '#e8ecf1',
    headerFilledBackdrop: 'none',
    headerFilledShadow:
      '4px 4px 10px rgba(163, 177, 198, 0.5), -4px -4px 10px rgba(255, 255, 255, 0.7)',
  },
  dark: {
    surfaceBg: '#2a2a3e',
    sidebarBg: '#2a2a3e',
    border: 'none',
    shadow:
      '6px 6px 14px rgba(0, 0, 0, 0.5), -6px -6px 14px rgba(60, 60, 85, 0.3)',
    backdropFilter: 'none',
    hoverShadow:
      '8px 8px 18px rgba(0, 0, 0, 0.6), -8px -8px 18px rgba(60, 60, 85, 0.35)',
    menuItemHover: {
      boxShadow:
        'inset 2px 2px 5px rgba(0, 0, 0, 0.4), inset -2px -2px 5px rgba(60, 60, 85, 0.2)',
      transition: 'box-shadow 0.2s ease',
    },
    headerFilledBg: '#2a2a3e',
    headerFilledBackdrop: 'none',
    headerFilledShadow:
      '4px 4px 10px rgba(0, 0, 0, 0.4), -4px -4px 10px rgba(60, 60, 85, 0.2)',
  },
};

export const DESIGN_STYLES: Record<DesignStyleName, DesignStyle> = {
  clean: cleanStyle,
  bold: boldStyle,
  mui: muiStyle,
  shadcn: shadcnStyle,
  serene: sereneStyle,
  glassmorphic: glassmorphicStyle,
  neumorphic: neumorphicStyle,
};

/**
 * Returns the SurfaceTokens for an exempt (CSS-driven) style, or `null` for a
 * native style — native styles are fully rendered via antd ConfigProvider and
 * callers must skip inline surface overrides.
 */
export const getDesignTokens = (
  styleName: DesignStyleName,
  themeMode: 'light' | 'dark'
): SurfaceTokens | null => {
  const style = DESIGN_STYLES[styleName];
  const tokens = themeMode === 'dark' ? style.dark : style.light;
  return tokens ?? null;
};
