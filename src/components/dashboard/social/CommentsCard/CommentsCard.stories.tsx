import type { Meta, StoryObj } from '@storybook/react';
import SocialsCommentsData from '../../../../../public/mocks/SocialComments.json';

import CommentsCard from './CommentsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Social/Comments',
  component: CommentsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: SocialsCommentsData.slice(0, 5),
    style: { width: 600 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    style: { width: 600 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error fetching items',
    style: { width: 600 },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    style: { width: 600 },
  },
};
