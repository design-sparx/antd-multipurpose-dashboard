export type LearningCourses = {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor_name: string;
  start_date: string;
  end_date: string;
  credit_hours: number;
  department: string;
  prerequisites: string;
  course_location: string;
  total_lessons: number;
  current_lessons: number;
  favorite_color: string;
};

export type RecommendedCourses = {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
  price: number;
  category: string;
  instructor: string;
  start_date: string;
  course_language: string;
  favorite_color: string;
  lessons: number;
};

export type Exam = {
  student_id: string;
  full_name: string;
  email: string;
  course: string;
  course_code: string;
  exam_date: string;
  exam_time: number;
  exam_duration: number;
  exam_score: number;
};

export type CommunityGroup = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  size: number;
  leader: string;
  start_date: string;
  meeting_time: string;
  member_age_range: number;
  member_interests: string;
  favorite_color: string;
};
