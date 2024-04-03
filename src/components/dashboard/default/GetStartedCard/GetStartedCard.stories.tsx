import type { Meta, StoryObj } from '@storybook/react';

import { GetStartedCard } from './GetStartedCard.tsx';

const meta = {
  title: 'Components/Dashboard/Default/Get started card',
  component: GetStartedCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GetStartedCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
