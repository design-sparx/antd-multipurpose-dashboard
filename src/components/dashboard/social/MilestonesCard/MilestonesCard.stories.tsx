import type { Meta, StoryObj } from '@storybook/react';

import { MilestonesCard } from './MilestonesCard.tsx';

const meta = {
  title: 'Components/Dashboard/Social/Milestones',
  component: MilestonesCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MilestonesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
