import type { Meta, StoryObj } from '@storybook/react';

import RefreshBtn from './RefreshBtn.tsx';

const meta = {
  title: 'Components/Refresh button',
  component: RefreshBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RefreshBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithIcon: Story = {
  args: {
    icon: true,
  },
};
