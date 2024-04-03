import type { Meta, StoryObj } from '@storybook/react';
import PricingData from '../../../public/mocks/Pricing.json';

import { PricingTable } from './PricingTable.tsx';

const meta = {
  title: 'Components/Pricing table',
  component: PricingTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PricingTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: PricingData,
    style: { width: 1000 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    style: { width: 1000 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error fetching items',
    style: { width: 1000 },
  },
};
