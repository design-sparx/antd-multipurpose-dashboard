import type { Meta, StoryObj } from '@storybook/react';

import ProjectsCard from './ProjectsCard.tsx';

const DATA = {
  project_id: 'ea74b32d-6466-4ef7-87cb-a17e0c38c1a8',
  project_name:
    'aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices',
  start_date: '10/2/2022',
  end_date: '3/13/2022',
  budget: 'Peso',
  project_manager: 'Dael Bulward',
  client_name: 'Topicblab',
  status: 'in progress',
  priority: 'medium',
  team_size: 17,
  project_description:
    'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
  project_location: 'Palermo',
  project_type: 'marketing',
  project_category: 'government',
  project_duration: 6.1,
};

const meta = {
  title: 'Components/Project',
  component: ProjectsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: DATA,
    style: { width: 600 },
  },
};

export const Small: Story = {
  args: {
    project: DATA,
    size: 'small',
    style: { width: 400 },
  },
};
