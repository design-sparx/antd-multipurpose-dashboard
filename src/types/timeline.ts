export type ActivityTimeline = {
  user_id: string;
  activity_type: string;
  timestamp: string;
  post_id: string;
  post_content: string;
  comment_id: number;
  comment_content: string;
  like_count: number;
  location: string;
  device_type: string;
};
