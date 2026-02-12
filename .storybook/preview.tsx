import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { StylesContext } from '../src/context';
import '../src/App.css';

export const withStylesProvider = (Story: any) => {
  return (
    <Provider store={store}>
      <StylesContext.Provider value={null}>
        <Story />
      </StylesContext.Provider>
    </Provider>
  );
};

const preview: Preview = {
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
    decorators: [withStylesProvider],
  },
};

export default preview;
