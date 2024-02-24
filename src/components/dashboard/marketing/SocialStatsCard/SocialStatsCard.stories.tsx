import type { Meta, StoryObj } from '@storybook/react';

import SocialStatsCard from './SocialStatsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Marketing/Social stats',
  component: SocialStatsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SocialStatsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
