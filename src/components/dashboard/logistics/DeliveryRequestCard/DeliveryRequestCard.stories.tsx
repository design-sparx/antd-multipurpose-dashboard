import type { Meta, StoryObj } from '@storybook/react';
import TruckDeliveryRequest from '../../../../../public/mocks/TruckDeliveryRequest.json';

import DeliveryRequestCard from './DeliveryRequestCard.tsx';

const meta = {
  title: 'Components/Dashboard/Logistics/Delivery/Requests',
  component: DeliveryRequestCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeliveryRequestCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: TruckDeliveryRequest.slice(0, 10),
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
