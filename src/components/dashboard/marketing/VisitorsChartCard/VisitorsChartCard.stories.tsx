import type { Meta, StoryObj } from '@storybook/react';

import { VisitorsChartCard } from './VisitorsChartCard.tsx';

const meta = {
  title: 'Components/Dashboard/Marketing/Visitors',
  component: VisitorsChartCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VisitorsChartCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
