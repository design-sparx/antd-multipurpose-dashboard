import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataModeState {
  useMockData: boolean;
}

const initialState: DataModeState = {
  // Always use mock data (locked to true)
  useMockData: true,
};

const dataModeSlice = createSlice({
  name: 'dataMode',
  initialState,
  reducers: {
    // These actions are kept for backward compatibility but don't change state
    toggleDataMode: (state: DataModeState) => {
      console.log(
        '[DataModeSlice] toggleDataMode called - mock mode is locked, no action taken'
      );
      // Keep useMockData locked to true
      state.useMockData = true;
    },
    setDataMode: (state: DataModeState, _action: PayloadAction<boolean>) => {
      console.log(
        '[DataModeSlice] setDataMode called - mock mode is locked, no action taken'
      );
      // Keep useMockData locked to true
      state.useMockData = true;
    },
    enableMockData: (state: DataModeState) => {
      console.log('[DataModeSlice] enableMockData called');
      state.useMockData = true;
    },
    enableRealData: (state: DataModeState) => {
      console.log(
        '[DataModeSlice] enableRealData called - mock mode is locked, no action taken'
      );
      // Keep useMockData locked to true
      state.useMockData = true;
    },
  },
});

export const { toggleDataMode, setDataMode, enableMockData, enableRealData } =
  dataModeSlice.actions;

export default dataModeSlice.reducer;
