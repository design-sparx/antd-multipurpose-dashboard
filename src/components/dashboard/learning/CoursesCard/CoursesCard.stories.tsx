import type { Meta, StoryObj } from '@storybook/react';
import CoursesData from '../../../../../public/mocks/Courses.json';

import { CoursesCard } from './CoursesCard.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Courses/Table',
  component: CoursesCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoursesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: CoursesData.slice(0, 20),
    style: { width: 1000 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: [],
    style: { width: 1000 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error loading items',
    data: [],
    style: { width: 1000 },
  },
};
