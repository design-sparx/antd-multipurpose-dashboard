import type { Meta, StoryObj } from '@storybook/react';

import { EarningsCard } from './EarningsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Default/Earnings card',
  component: EarningsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EarningsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        type: 'Transport',
        value: 27,
      },
      {
        type: 'Communication',
        value: 25,
      },
      {
        type: 'Rent',
        value: 18,
      },
      {
        type: 'Entertainment',
        value: 15,
      },
      {
        type: 'Food',
        value: 10,
      },
      {
        type: 'Misc.',
        value: 5,
      },
    ],
    title: 'Earnings',
    diff: 20,
    style: { width: 360 },
  },
};
