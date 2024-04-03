import type { Meta, StoryObj } from '@storybook/react';
import DeliveryAnalytics from '../../../../../public/mocks/DeliveryAnalytics.json';

import { DeliveryAnalyticsCard } from './DeliveryAnalyticsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Logistics/Delivery/Analytics',
  component: DeliveryAnalyticsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeliveryAnalyticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: DeliveryAnalytics.slice(0, 10),
    style: { width: 600 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: [],
    style: { width: 600 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error loading items',
    data: [],
    style: { width: 600 },
  },
};
