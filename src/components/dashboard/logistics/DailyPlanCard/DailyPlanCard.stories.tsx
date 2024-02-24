import type { Meta, StoryObj } from '@storybook/react';

import DailyPlanCard from './DailyPlanCard.tsx';

const PLAN_DATA = [
  {
    type: 'Shipment processed',
    value: 38,
  },
  {
    type: 'Orders processed',
    value: 52,
  },
  {
    type: 'Requests queue',
    value: 61,
  },
];

const meta = {
  title: 'Components/Dashboard/Logistics/Daily plan',
  component: DailyPlanCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DailyPlanCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: PLAN_DATA,
    style: { width: 600 },
  },
};
