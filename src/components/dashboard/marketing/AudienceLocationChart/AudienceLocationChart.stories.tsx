import type { Meta, StoryObj } from '@storybook/react';

import { AudienceLocationChart } from './AudienceLocationChart.tsx';

const meta = {
  title: 'Components/Dashboard/Marketing/Audience chart',
  component: AudienceLocationChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AudienceLocationChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
