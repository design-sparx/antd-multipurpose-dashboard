import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRIMARY_COLOR, DARK_PRIMARY_COLOR } from '../../theme/colors';

/**
 * User-customizable theme overrides applied on top of the active design style's
 * antd ThemeConfig. Persisted via redux-persist to localStorage.
 */
export interface ThemeCustomizationState {
  /** Primary color used in light mode. */
  primaryLight: string;
  /** Primary color used in dark mode. */
  primaryDark: string;
  /** Border radius in px for roundness (0 = sharp). */
  borderRadius: number;
  /** Compact density: tighter component sizes (controlHeight 28) when true. */
  compact: boolean;
}

const initialState: ThemeCustomizationState = {
  primaryLight: PRIMARY_COLOR,
  primaryDark: DARK_PRIMARY_COLOR,
  borderRadius: 6,
  compact: false,
};

const themeCustomizationSlice = createSlice({
  name: 'themeCustomization',
  initialState,
  reducers: {
    setPrimaryLight: (state, action: PayloadAction<string>) => {
      state.primaryLight = action.payload;
    },
    setPrimaryDark: (state, action: PayloadAction<string>) => {
      state.primaryDark = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    },
    setCompact: (state, action: PayloadAction<boolean>) => {
      state.compact = action.payload;
    },
    resetCustomization: () => initialState,
  },
});

export const {
  setPrimaryLight,
  setPrimaryDark,
  setBorderRadius,
  setCompact,
  resetCustomization,
} = themeCustomizationSlice.actions;

export default themeCustomizationSlice.reducer;
