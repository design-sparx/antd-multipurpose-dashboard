import type { Meta, StoryObj } from '@storybook/react';
import TransactionsData from '../../../../../public/mocks/BiddingTransactions.json';

import { TransactionsCard } from './TransactionsCard.tsx';

const meta = {
  title: 'Components/Dashboard/Bidding/Transactions table',
  component: TransactionsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: TransactionsData,
    style: { width: 800 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    style: { width: 800 },
  },
};

export const Error: Story = {
  args: {
    error: 'Error loading items',
    style: { width: 800 },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    style: { width: 800 },
  },
};
