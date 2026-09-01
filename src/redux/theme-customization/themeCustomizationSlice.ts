import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * User-customizable theme overrides applied on top of the active design style's
 * antd ThemeConfig. Persisted via redux-persist to localStorage.
 *
 * `null` primary colors mean "use the active design style's own primary"
 * (see STYLE_PRIMARIES), so switching styles changes the accent tone unless the
 * user explicitly pins one.
 */
export interface ThemeCustomizationState {
  /** Primary color used in light mode. `null` = active style's default. */
  primaryLight: string | null;
  /** Primary color used in dark mode. `null` = active style's default. */
  primaryDark: string | null;
  /** Border radius in px for roundness (0 = sharp). */
  borderRadius: number;
  /** Compact density: tighter component sizes (controlHeight 28) when true. */
  compact: boolean;
}

const initialState: ThemeCustomizationState = {
  primaryLight: null,
  primaryDark: null,
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
