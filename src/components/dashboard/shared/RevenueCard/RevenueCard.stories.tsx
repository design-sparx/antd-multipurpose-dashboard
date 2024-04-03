import type { Meta, StoryObj } from '@storybook/react';

import { RevenueCard } from './RevenueCard.tsx';

const meta = {
  title: 'Components/Revenue',
  component: RevenueCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RevenueCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Visitors',
    value: 20149,
    diff: 5.54,
    style: { width: 320 },
  },
};
