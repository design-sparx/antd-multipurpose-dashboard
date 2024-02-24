import type { Meta, StoryObj } from '@storybook/react';

import DevicesCardChart from './DevicesCardChart.tsx';

const meta = {
  title: 'Components/Dashboard/Social/Devices chart',
  component: DevicesCardChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DevicesCardChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
