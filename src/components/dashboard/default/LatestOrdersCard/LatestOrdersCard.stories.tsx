import type { Meta, StoryObj } from '@storybook/react';
import CampaignsData from '../../../../../public/mocks/Campaigns.json';

import LatestOrdersCard from './LatestOrdersCard.tsx';

const meta = {
  title: 'Components/Dashboard/Default/Orders/Table',
  component: LatestOrdersCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LatestOrdersCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: CampaignsData,
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
