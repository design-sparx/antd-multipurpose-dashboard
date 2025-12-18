import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Logo } from './Logo.tsx';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Black: Story = {
  args: {
    color: 'black',
  },
};

export const White: Story = {
  args: {
    color: 'white',
    bgColor: 'black',
  },
};

export const AsLink: Story = {
  args: {
    color: 'black',
    asLink: true,
  },
};

export const CustomImageHeight: Story = {
  args: {
    color: 'black',
    imgSize: {
      h: 36,
    },
  },
};
