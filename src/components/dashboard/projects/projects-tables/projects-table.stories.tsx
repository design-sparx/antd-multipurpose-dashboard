import type { Meta, StoryObj } from '@storybook/react';
import ProjectsData from '@mocks/Projects.json';

import { ProjectsTable } from './projects-table';

const meta = {
  title: 'Components/Dashboard/Projects/Projects table',
  component: ProjectsTable,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProjectsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: ProjectsData.slice(0, 10),
    style: { width: 1000 },
  },
};
