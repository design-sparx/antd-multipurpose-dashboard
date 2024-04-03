import type { Meta, StoryObj } from '@storybook/react';

import { SocialMediaCard } from './SocialMediaCard.tsx';

const meta = {
  title: 'Components/Social media',
  component: SocialMediaCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SocialMediaCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 400 },
  },
};
