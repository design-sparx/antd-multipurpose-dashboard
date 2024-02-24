import type { Meta, StoryObj } from '@storybook/react';
import { BlockOutlined } from '@ant-design/icons';

import StatsCard from './StatsCard.tsx';

const STATS = {
  icon: BlockOutlined,
  value: 1245,
  title: 'new packages',
  diff: 16,
};

const meta = {
  title: 'Components/Dashboard/Logistics/Stats',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...STATS,
    style: { width: 240 },
  },
};
