import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG } from '../../config/api.config';

export interface DataModeState {
  useMockData: boolean;
}

const initialState: DataModeState = {
  // Check environment variable first, fallback to true (mock data)
  useMockData: API_CONFIG.USE_MOCK_DATA,
};

const dataModeSlice = createSlice({
  name: 'dataMode',
  initialState,
  reducers: {
    toggleDataMode: (state: DataModeState) => {
      console.log('[DataModeSlice] toggleDataMode called - BEFORE:', state.useMockData);
      state.useMockData = !state.useMockData;
      console.log('[DataModeSlice] toggleDataMode called - AFTER:', state.useMockData);
    },
    setDataMode: (state: DataModeState, action: PayloadAction<boolean>) => {
      console.log('[DataModeSlice] setDataMode called:', action.payload);
      state.useMockData = action.payload;
    },
    enableMockData: (state: DataModeState) => {
      console.log('[DataModeSlice] enableMockData called');
      state.useMockData = true;
    },
    enableRealData: (state: DataModeState) => {
      console.log('[DataModeSlice] enableRealData called');
      state.useMockData = false;
    },
  },
});

export const { toggleDataMode, setDataMode, enableMockData, enableRealData } =
  dataModeSlice.actions;

export default dataModeSlice.reducer;
