import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DesignStyleName } from '../../theme/design-styles';

export interface DesignStyleState {
  activeStyle: DesignStyleName;
}

const initialState: DesignStyleState = {
  activeStyle: 'clean',
};

const designStyleSlice = createSlice({
  name: 'designStyle',
  initialState,
  reducers: {
    setDesignStyle: (state, action: PayloadAction<DesignStyleName>) => {
      state.activeStyle = action.payload;
    },
  },
});

export const { setDesignStyle } = designStyleSlice.actions;

export default designStyleSlice.reducer;
