import type { Meta, StoryObj } from '@storybook/react';
import TimelineData from '../../../public/mocks/TimelineActivity.json';

import { TimelineCard } from './TimelineCard.tsx';

const meta = {
  title: 'Components/Timeline',
  component: TimelineCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimelineCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: TimelineData.slice(0, 5),
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
