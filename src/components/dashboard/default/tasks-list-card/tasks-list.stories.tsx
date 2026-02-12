import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore - JSON mock data uses string values for priority/status/category/color instead of numbers
import TasksListData from '../../../../../public/mocks/TasksList.json';

import { TasksListCard } from './tasks-list-card';

const meta = {
  title: 'Components/Dashboard/Default/Tasks/List',
  component: TasksListCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TasksListCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // @ts-ignore - Mock data doesn't match exact type requirements
    data: TasksListData,
    style: { width: 800 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    style: { width: 800 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error fetching items',
    style: { width: 800 },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    style: { width: 800 },
  },
};
