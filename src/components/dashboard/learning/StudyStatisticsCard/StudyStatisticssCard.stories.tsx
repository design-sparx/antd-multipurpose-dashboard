import type { Meta, StoryObj } from '@storybook/react';
import StudyData from '../../../../../public/mocks/StudyStatistics.json';

import StudyStatisticsCard from './StudyStatisticsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Study stats card',
  component: StudyStatisticsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StudyStatisticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: StudyData,
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
