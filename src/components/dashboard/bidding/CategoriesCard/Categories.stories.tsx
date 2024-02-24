import type { Meta, StoryObj } from '@storybook/react';

import CategoriesCard from './CategoriesCard.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Dashboard/Bidding/Categories table',
  component: CategoriesCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CategoriesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    style: {
      width: 600,
    },
  },
};
