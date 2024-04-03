import type { Meta, StoryObj } from '@storybook/react';
import TruckDeliveryRequest from '../../../../../public/mocks/TruckDeliveries.json';

import { DeliveryTableCard } from './DeliveryTableCard.tsx';

const meta = {
  title: 'Components/Dashboard/Logistics/Delivery/Table',
  component: DeliveryTableCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeliveryTableCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: TruckDeliveryRequest.slice(0, 10),
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
