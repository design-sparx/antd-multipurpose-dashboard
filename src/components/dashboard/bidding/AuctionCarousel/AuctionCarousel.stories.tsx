import type { Meta, StoryObj } from '@storybook/react';

import { CardItem } from './AuctionCarousel.tsx';

const MOCK_DATA = {
  auction_id: 'a9e1b790-35f6-4549-b452-aff1eee3ef87',
  nft_name: 'non pretium quis lectus suspendisse potenti in eleifend quam a',
  nft_image:
    'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmZ0fGVufDB8fDB8fHwy&auto=format&fit=crop&w=500&q=60',
  seller_username: 'rsingleton0',
  buyer_username: 'fandretti0',
  start_price: 33611.73,
  end_price: 95441.53,
  start_date: '5/11/2022',
  end_date: '10/30/2022',
  status: 'active',
  is_highest_bid_mine: false,
  winning_bid: 140.94,
  time_left: '8:20 PM',
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Dashboard/Bidding/Auction card',
  component: CardItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    item: MOCK_DATA,
    style: { width: 300 },
  },
};
