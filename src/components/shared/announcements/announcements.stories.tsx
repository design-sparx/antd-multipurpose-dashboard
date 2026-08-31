import type { Meta, StoryObj } from '@storybook/react';

import { Announcements } from './announcements';

const meta = {
  title: 'Components/Announcements',
  component: Announcements,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Announcements>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Empty: Story = {
  args: { data: [] },
};
