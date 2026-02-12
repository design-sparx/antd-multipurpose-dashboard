import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import themeReducer from '../src/redux/theme/themeSlice';
import dataModeReducer from '../src/redux/data-mode/dataModeSlice';
import authReducer from '../src/redux/auth/authSlice';
import { StylesContext } from '../src/context';
import '../src/App.css';

const storybookStore = configureStore({
  reducer: {
    theme: themeReducer,
    dataMode: dataModeReducer,
    auth: authReducer,
  },
});

export const withStylesProvider = (Story: any) => {
  return (
    <Provider store={storybookStore}>
      <StylesContext.Provider value={null}>
        <Story />
      </StylesContext.Provider>
    </Provider>
  );
};

const preview: Preview = {
  decorators: [withStylesProvider],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.normal,
    },
  },
};

export default preview;
