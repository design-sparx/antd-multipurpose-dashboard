import type { Meta, StoryObj } from '@storybook/react';
import TrucksData from '../../../../../public/mocks/Trucks.json';

import TruckListCard from './TruckListCard.tsx';

const meta = {
  title: 'Components/Dashboard/Logistics/Trucks list',
  component: TruckListCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TruckListCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: TrucksData.slice(0, 10),
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
