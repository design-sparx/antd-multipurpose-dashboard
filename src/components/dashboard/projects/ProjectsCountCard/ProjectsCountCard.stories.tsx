import type { Meta, StoryObj } from '@storybook/react';

import ProjectsCountCard from './ProjectsCountCard.tsx';

const meta = {
  title: 'Components/Dashboard/Projects/Project count',
  component: ProjectsCountCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProjectsCountCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
