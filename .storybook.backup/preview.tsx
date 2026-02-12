import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { StylesContext } from '../src/context';
import '../src/App.css';

export const withStylesProvider = (Story: any) => {
  return (
    <StylesContext.Provider value={null}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <Story />
    </StylesContext.Provider>
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
    decorators: [],
  },
};

export default preview;
