import { CSSProperties } from 'react';

export type DesignStyleName = 'clean' | 'glassmorphic' | 'neumorphic' | 'bold';

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
  light: SurfaceTokens;
  dark: SurfaceTokens;
}

const cleanStyle: DesignStyle = {
  name: 'clean',
  label: 'Clean',
  description: 'Minimal and flat — solid backgrounds with subtle shadows',
  light: {
    surfaceBg: '#ffffff',
    sidebarBg: 'none',
    border: 'none',
    shadow: 'rgba(140, 152, 164, 0.075) 0 6px 12px 0',
    backdropFilter: 'none',
    hoverShadow: 'rgba(140, 152, 164, 0.15) 0 8px 16px 0',
    menuItemHover: { transform: 'none' },
    headerFilledBg: 'rgba(255, 255, 255, 0.8)',
    headerFilledBackdrop: 'blur(8px)',
    headerFilledShadow: '0 0 8px 2px rgba(0, 0, 0, 0.05)',
  },
  dark: {
    surfaceBg: '#1a1a2e',
    sidebarBg: 'none',
    border: 'none',
    shadow: 'rgba(0, 0, 0, 0.2) 0 6px 12px 0',
    backdropFilter: 'none',
    hoverShadow: 'rgba(0, 0, 0, 0.35) 0 8px 16px 0',
    menuItemHover: { transform: 'none' },
    headerFilledBg: 'rgba(26, 26, 46, 0.8)',
    headerFilledBackdrop: 'blur(8px)',
    headerFilledShadow: '0 0 8px 2px rgba(0, 0, 0, 0.2)',
  },
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

const boldStyle: DesignStyle = {
  name: 'bold',
  label: 'Bold',
  description: 'Strong shadows, vivid accents, and sharp defined edges',
  light: {
    surfaceBg: '#ffffff',
    sidebarBg: '#0a1628',
    border: '2px solid rgba(7, 110, 229, 0.15)',
    shadow: '0 4px 0 rgba(7, 110, 229, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'none',
    hoverShadow:
      '0 6px 0 rgba(7, 110, 229, 0.25), 0 12px 32px rgba(0, 0, 0, 0.12)',
    menuItemHover: {
      transform: 'scale(1.02)',
      transition: 'transform 0.15s ease',
    },
    headerFilledBg: 'rgba(255, 255, 255, 0.95)',
    headerFilledBackdrop: 'none',
    headerFilledShadow:
      '0 3px 0 rgba(7, 110, 229, 0.12), 0 6px 16px rgba(0, 0, 0, 0.06)',
  },
  dark: {
    surfaceBg: '#141428',
    sidebarBg: '#080818',
    border: '2px solid rgba(77, 139, 255, 0.2)',
    shadow: '0 4px 0 rgba(77, 139, 255, 0.15), 0 8px 24px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'none',
    hoverShadow:
      '0 6px 0 rgba(77, 139, 255, 0.25), 0 12px 32px rgba(0, 0, 0, 0.4)',
    menuItemHover: {
      transform: 'scale(1.02)',
      transition: 'transform 0.15s ease',
    },
    headerFilledBg: 'rgba(20, 20, 40, 0.95)',
    headerFilledBackdrop: 'none',
    headerFilledShadow:
      '0 3px 0 rgba(77, 139, 255, 0.12), 0 6px 16px rgba(0, 0, 0, 0.25)',
  },
};

export const DESIGN_STYLES: Record<DesignStyleName, DesignStyle> = {
  clean: cleanStyle,
  glassmorphic: glassmorphicStyle,
  neumorphic: neumorphicStyle,
  bold: boldStyle,
};

export const getDesignTokens = (
  styleName: DesignStyleName,
  themeMode: 'light' | 'dark'
): SurfaceTokens => {
  const style = DESIGN_STYLES[styleName];
  return themeMode === 'dark' ? style.dark : style.light;
};
