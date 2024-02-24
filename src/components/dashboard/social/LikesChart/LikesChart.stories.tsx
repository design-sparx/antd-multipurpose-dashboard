import type { Meta, StoryObj } from '@storybook/react';

import LikesChart from './LikesChart.tsx';

const meta = {
  title: 'Components/Dashboard/Social/Likes',
  component: LikesChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikesChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
