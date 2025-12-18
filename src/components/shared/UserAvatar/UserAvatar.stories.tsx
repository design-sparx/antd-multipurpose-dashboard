import type { Meta, StoryObj } from '@storybook/react';

import { UserAvatar } from './UserAvatar.tsx';

const meta = {
  title: 'Components/User avatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullName: 'Kelvin Kiptum',
  },
};

export const Mark: Story = {
  args: {
    fullName: 'Kelvin Kiptum',
    mark: true,
  },
};

export const Verified: Story = {
  args: {
    fullName: 'Kelvin Kiptum',
    verified: true,
    textWidth: 'auto',
  },
};

export const CustomColor: Story = {
  args: {
    fullName: 'Kelvin Kiptum',
    color: 'green',
  },
};

export const Small: Story = {
  args: {
    fullName: 'Kelvin Kiptum',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    fullName: 'Kelvin Kiptum',
    size: 'large',
  },
};
