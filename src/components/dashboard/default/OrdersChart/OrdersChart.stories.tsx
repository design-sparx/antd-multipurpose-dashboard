import type { Meta, StoryObj } from '@storybook/react';

import { OrdersChart } from './OrdersChart.tsx';

const meta = {
  title: 'Components/Dashboard/Default/Orders/Chart',
  component: OrdersChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OrdersChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 500 },
  },
};
