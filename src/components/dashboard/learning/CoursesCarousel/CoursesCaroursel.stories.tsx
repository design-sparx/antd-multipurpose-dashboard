import type { Meta, StoryObj } from '@storybook/react';
import CoursesData from '../../../../../public/mocks/RecommendedCourses.json';

import { CoursesCarousel } from './CoursesCarousel.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Courses/Carousel',
  component: CoursesCarousel,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CoursesCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: CoursesData.slice(0, 5),
    style: { width: 600 },
  },
};
