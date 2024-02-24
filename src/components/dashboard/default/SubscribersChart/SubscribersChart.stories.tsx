import type { Meta, StoryObj } from '@storybook/react';

import SubscribersChart from './SubscribersChart.tsx';

const meta = {
  title: 'Components/Dashboard/Default/Subscribers card',
  component: SubscribersChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SubscribersChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
