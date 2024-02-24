import type { Meta, StoryObj } from '@storybook/react';
import { FileSyncOutlined } from '@ant-design/icons';

import StatsCard from './StatsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Learning/Stats card',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Courses in Progress',
    value: 18,
    icon: FileSyncOutlined,
    color: 'teal',
    progress: 30,
    style: { width: 600 },
  },
};
