import type { Meta, StoryObj } from '@storybook/react';

import SocialStatsCard from './SocialStatsCard.tsx';

const DATA = {
  title: 'followers',
  value: 3432,
};

const meta = {
  title: 'Components/Dashboard/Social/Stats',
  component: SocialStatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SocialStatsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...DATA,
    style: { width: 300 },
  },
};

export const Loading: Story = {
  args: {
    ...DATA,
    loading: true,
    style: { width: 300 },
  },
};

export const Error: Story = {
  args: {
    ...DATA,
    error: 'Error fetching items',
    style: { width: 300 },
  },
};
