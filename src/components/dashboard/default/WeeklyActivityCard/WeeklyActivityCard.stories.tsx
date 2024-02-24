import type { Meta, StoryObj } from '@storybook/react';

import WeeklyActivityCard from './WeeklyActivityCard.tsx';

const ACTIVITY_DATA = [
  {
    day: 'Monday',
    value: 10,
  },
  {
    day: 'Tuesday',
    value: 22,
  },
  {
    day: 'Wednesday',
    value: 25,
  },
  {
    day: 'Thursday',
    value: 26,
  },
  {
    day: 'Friday',
    value: 15,
  },
  {
    day: 'Saturday',
    value: 12,
  },
  {
    day: 'Sunday',
    value: 3,
  },
];

const meta = {
  title: 'Components/Dashboard/Default/Activity card',
  component: WeeklyActivityCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WeeklyActivityCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: ACTIVITY_DATA,
    style: { width: 600 },
  },
};
