import type { Meta, StoryObj } from '@storybook/react';

import { MoreMenu } from './more-menu';

const meta = {
  title: 'Components/More menu',
  component: MoreMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MoreMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
