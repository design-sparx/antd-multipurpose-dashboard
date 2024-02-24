import type { Meta, StoryObj } from '@storybook/react';

import ProgressCard from './ProgressCard.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Progress card',
  component: ProgressCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
