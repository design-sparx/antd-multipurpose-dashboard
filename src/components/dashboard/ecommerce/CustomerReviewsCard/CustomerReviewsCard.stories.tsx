import type { Meta, StoryObj } from '@storybook/react';

import CustomerReviewsCard from './CustomerReviewsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Ecommerce/Customer reviews card',
  component: CustomerReviewsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CustomerReviewsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 600 },
  },
};
