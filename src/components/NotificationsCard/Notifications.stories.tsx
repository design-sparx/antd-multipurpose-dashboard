import type { Meta, StoryObj } from '@storybook/react';
import NotificationsData from '../../../public/mocks/Notifications.json';

import { NotificationsCard } from './NotificationsCard.tsx';

const meta = {
  title: 'Components/Notifications/List',
  component: NotificationsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NotificationsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: NotificationsData.slice(0, 10),
    style: { width: 500 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    style: { width: 500 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error fetching items',
    style: { width: 500 },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    style: { width: 500 },
  },
};
