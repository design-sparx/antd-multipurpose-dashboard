import type { Meta, StoryObj } from '@storybook/react';
import CommunityGroupsData from '../../../../../public/mocks/CommunityGroups.json';

import { CommunityGroupCard } from './CommunityGroupCard.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Communities card',
  component: CommunityGroupCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommunityGroupCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: CommunityGroupsData.slice(0, 10),
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
