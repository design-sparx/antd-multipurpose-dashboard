import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  mytheme: string;
}

const initialState: ThemeState = {
  mytheme: 'light',
};

const themeSlice = createSlice({
  name: 'mytheme',
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      state.mytheme = state.mytheme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
