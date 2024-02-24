export type CommentsType = 'post' | 'like' | 'comment' | string;

export type CommentsPlatform =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | string;

export type CommentGender = 'Female' | 'Male' | 'Non-binary' | string;

export type Comments = {
  id: string;
  author: string;
  user_id: string;
  activity_type: CommentsType;
  timestamp: string;
  post_content: string;
  platform: CommentsPlatform;
  user_location: string;
  user_age: number;
  user_gender: CommentGender;
  user_interests: string;
  user_friends_count: number;
};
