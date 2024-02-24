import type { Meta, StoryObj } from '@storybook/react';

import NotificationsItem from './NotificationsItem.tsx';

const DATA = {
  notification_id: 'dcffd2c4-63d7-4b70-88c2-e079fc7cde6f',
  user_id: '8956a7fd-070b-4dea-85fe-e0af167f2200',
  user: 'Cheston Crich',
  notification_type: 'text',
  notification_date: '5/15/2022',
  notification_message:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  is_read: false,
  is_deleted: true,
  notification_category: 'Announcements',
  notification_image:
    'https://robohash.org/essevelvoluptas.png?size=50x50&set=set1',
  color: 'pink',
};

const meta = {
  title: 'Components/Notifications/Item',
  component: NotificationsItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationsItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: DATA,
    style: { width: 500 },
  },
};
