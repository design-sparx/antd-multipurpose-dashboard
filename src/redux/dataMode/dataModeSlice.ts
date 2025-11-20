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
      state.useMockData = !state.useMockData;
    },
    setDataMode: (state: DataModeState, action: PayloadAction<boolean>) => {
      state.useMockData = action.payload;
    },
    enableMockData: (state: DataModeState) => {
      state.useMockData = true;
    },
    enableRealData: (state: DataModeState) => {
      state.useMockData = false;
    },
  },
});

export const { toggleDataMode, setDataMode, enableMockData, enableRealData } =
  dataModeSlice.actions;

export default dataModeSlice.reducer;
