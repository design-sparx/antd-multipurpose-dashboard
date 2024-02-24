import type { Meta, StoryObj } from '@storybook/react';
import ExamsData from '../../../../../public/mocks/Exams.json';

import ExamsCard from './ExamsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Exams card',
  component: ExamsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExamsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: ExamsData.slice(0, 10),
    style: { width: 600 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: [],
    style: { width: 600 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error loading items',
    data: [],
    style: { width: 600 },
  },
};
