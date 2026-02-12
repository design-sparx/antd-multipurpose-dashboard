import type { Meta, StoryObj } from '@storybook/react';

import { FollowersChart } from './followers-chart';

const meta = {
  title: 'Components/Dashboard/Social/Followers chart',
  component: FollowersChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FollowersChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
