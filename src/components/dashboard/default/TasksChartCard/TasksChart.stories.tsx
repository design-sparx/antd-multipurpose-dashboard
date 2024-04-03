import type { Meta, StoryObj } from '@storybook/react';

import { TasksChartCard } from './TasksChartCard.tsx';

const TASKS_DATA = [
  {
    day: 'Monday',
    value: 33,
    status: 'new',
  },
  {
    day: 'Tuesday',
    value: 44,
    status: 'new',
  },
  {
    day: 'Wednesday',
    value: 35,
    status: 'new',
  },
  {
    day: 'Thursday',
    value: 55,
    status: 'new',
  },
  {
    day: 'Friday',
    value: 49,
    status: 'new',
  },
  {
    day: 'Saturday',
    value: 63,
    status: 'new',
  },
  {
    day: 'Sunday',
    value: 72,
    status: 'new',
  },
  {
    day: 'Monday',
    value: 69,
    status: 'in progress',
  },
  {
    day: 'Tuesday',
    value: 81,
    status: 'in progress',
  },
  {
    day: 'Wednesday',
    value: 34,
    status: 'in progress',
  },
  {
    day: 'Thursday',
    value: 25,
    status: 'in progress',
  },
  {
    day: 'Friday',
    value: 39,
    status: 'in progress',
  },
  {
    day: 'Saturday',
    value: 45,
    status: 'in progress',
  },
  {
    day: 'Sunday',
    value: 60,
    status: 'in progress',
  },
];

const meta = {
  title: 'Components/Dashboard/Default/Tasks/Chart',
  component: TasksChartCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TasksChartCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: TASKS_DATA,
    style: { width: 600 },
  },
};
