import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { GuestFooter } from './guest-footer';

const meta = {
  title: 'Components/GuestFooter',
  component: GuestFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof GuestFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
