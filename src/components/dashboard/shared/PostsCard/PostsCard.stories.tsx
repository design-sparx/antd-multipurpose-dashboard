import type { Meta, StoryObj } from '@storybook/react';
import PostsData from '../../../../../public/mocks/ScheduledPosts.json';

import PostsCard from './PostsCard.tsx';

const meta = {
  title: 'Components/Posts list',
  component: PostsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    as: 'active',
    data: PostsData.slice(0, 10),
    style: { width: 600 },
  },
};

export const Scheduled: Story = {
  args: {
    as: 'scheduled',
    data: PostsData.slice(0, 10),
    style: { width: 600 },
  },
};
