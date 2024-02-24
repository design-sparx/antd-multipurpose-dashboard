import type { Meta, StoryObj } from '@storybook/react';
import CampaignsData from '../../../../../public/mocks/CampaignAds.json';

import CampaignsAdsCard from './CampaignsAdsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Marketing/Campaigns/Ads stats',
  component: CampaignsAdsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CampaignsAdsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: CampaignsData.slice(0, 10),
    style: { width: 1000 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: [],
    style: { width: 1000 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error loading items',
    data: [],
    style: { width: 1000 },
  },
};
