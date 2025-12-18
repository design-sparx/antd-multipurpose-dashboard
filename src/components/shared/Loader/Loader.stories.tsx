import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader.tsx';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
