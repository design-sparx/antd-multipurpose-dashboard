import type { Meta, StoryObj } from '@storybook/react';

import CampaignsActivity from './CampaignsActivity.tsx';

const meta = {
  title: 'Components/Dashboard/Marketing/Campaigns/Calendar',
  component: CampaignsActivity,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CampaignsActivity>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
