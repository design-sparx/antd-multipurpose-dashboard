export type PostPlatform =
  | 'Facebook'
  | 'Twitter'
  | 'Instagram'
  | 'LinkedIn'
  | 'YouTube'
  | string;

export type PostCategory = 'News' | 'Events' | 'Promotions' | string;

export type Posts = {
  id: string;
  title: string;
  content: string;
  date: string;
  time: number;
  author: string;
  category: PostCategory;
  tags: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  image_url: string;
  link: string;
  location: string;
  hashtags: string;
  platform: PostPlatform;
};
