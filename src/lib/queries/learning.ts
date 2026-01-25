/**
 * Learning/Education Query Module
 * Contains all learning-related types, API functions, and React Query hooks
 * Includes: courses, exams, study statistics, and community groups
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== COURSE TYPES ====================

export interface CourseDto {
  course_id?: string;
  course_name?: string;
  instructor?: string;
  duration?: string;
  enrolled_students: number;
  rating: number;
  category?: string;
  price: number;
  thumbnail_url?: string;
}

export interface RecommendedCourseDto {
  course_id?: string;
  course_name?: string;
  instructor?: string;
  rating: number;
  students: number;
  price: number;
  category?: string;
  thumbnail_url?: string;
}

// ==================== EXAM TYPES ====================

export interface ExamDto {
  exam_id?: string;
  exam_name?: string;
  subject?: string;
  date?: string;
  duration?: string;
  total_questions: number;
  passing_score: number;
  status?: string;
}

// ==================== STUDY STATISTICS TYPES ====================

export interface StudyStatisticDto {
  stat_id?: string;
  student_name?: string;
  courses_completed: number;
  hours_studied: number;
  average_score: number;
  current_streak: number;
  total_points: number;
}

// ==================== COMMUNITY GROUPS TYPES ====================

export interface CommunityGroupDto {
  group_id?: string;
  group_name?: string;
  category?: string;
  members_count: number;
  posts_count: number;
  created_date?: string;
  description?: string;
}

// ==================== QUERY KEYS ====================

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
  recommended: () => [...courseKeys.all, 'recommended'] as const,
};

export const examKeys = {
  all: ['exams'] as const,
  lists: () => [...examKeys.all, 'list'] as const,
  details: () => [...examKeys.all, 'detail'] as const,
  detail: (id: string) => [...examKeys.details(), id] as const,
};

export const studyStatKeys = {
  all: ['study-statistics'] as const,
  lists: () => [...studyStatKeys.all, 'list'] as const,
  details: () => [...studyStatKeys.all, 'detail'] as const,
  detail: (id: string) => [...studyStatKeys.details(), id] as const,
};

export const communityGroupKeys = {
  all: ['community-groups'] as const,
  lists: () => [...communityGroupKeys.all, 'list'] as const,
  details: () => [...communityGroupKeys.all, 'detail'] as const,
  detail: (id: string) => [...communityGroupKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const learningApi = {
  courses: {
    getAll: () =>
      apiRequest.get<CourseDto[]>(API_ENDPOINTS.DASHBOARD.COURSES.LIST),
    getById: (id: string) =>
      apiRequest.get<CourseDto>(API_ENDPOINTS.DASHBOARD.COURSES.GET(id)),
  },
  recommendedCourses: {
    getAll: () =>
      apiRequest.get<RecommendedCourseDto[]>(
        API_ENDPOINTS.DASHBOARD.RECOMMENDED_COURSES.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<RecommendedCourseDto>(
        API_ENDPOINTS.DASHBOARD.RECOMMENDED_COURSES.GET(id)
      ),
  },
  exams: {
    getAll: () =>
      apiRequest.get<ExamDto[]>(API_ENDPOINTS.DASHBOARD.EXAMS.LIST),
    getById: (id: string) =>
      apiRequest.get<ExamDto>(API_ENDPOINTS.DASHBOARD.EXAMS.GET(id)),
  },
  studyStatistics: {
    getAll: () =>
      apiRequest.get<StudyStatisticDto[]>(
        API_ENDPOINTS.DASHBOARD.STUDY_STATISTICS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<StudyStatisticDto>(
        API_ENDPOINTS.DASHBOARD.STUDY_STATISTICS.GET(id)
      ),
  },
  communityGroups: {
    getAll: () =>
      apiRequest.get<CommunityGroupDto[]>(
        API_ENDPOINTS.DASHBOARD.COMMUNITY_GROUPS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<CommunityGroupDto>(
        API_ENDPOINTS.DASHBOARD.COMMUNITY_GROUPS.GET(id)
      ),
  },
};

// ==================== COURSES QUERY HOOKS ====================

export const useCourses = (options?: UseQueryOptions<CourseDto[]>) => {
  return useQuery({
    queryKey: courseKeys.all,
    queryFn: learningApi.courses.getAll,
    ...options,
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => learningApi.courses.getById(id),
    enabled: !!id,
  });
};

export const useRecommendedCourses = (
  options?: UseQueryOptions<RecommendedCourseDto[]>
) => {
  return useQuery({
    queryKey: courseKeys.recommended(),
    queryFn: learningApi.recommendedCourses.getAll,
    ...options,
  });
};

export const useRecommendedCourse = (id: string) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => learningApi.recommendedCourses.getById(id),
    enabled: !!id,
  });
};

// ==================== EXAMS QUERY HOOKS ====================

export const useExams = (options?: UseQueryOptions<ExamDto[]>) => {
  return useQuery({
    queryKey: examKeys.all,
    queryFn: learningApi.exams.getAll,
    ...options,
  });
};

export const useExam = (id: string) => {
  return useQuery({
    queryKey: examKeys.detail(id),
    queryFn: () => learningApi.exams.getById(id),
    enabled: !!id,
  });
};

// ==================== STUDY STATISTICS QUERY HOOKS ====================

export const useStudyStatistics = (
  options?: UseQueryOptions<StudyStatisticDto[]>
) => {
  return useQuery({
    queryKey: studyStatKeys.all,
    queryFn: learningApi.studyStatistics.getAll,
    ...options,
  });
};

export const useStudyStatistic = (id: string) => {
  return useQuery({
    queryKey: studyStatKeys.detail(id),
    queryFn: () => learningApi.studyStatistics.getById(id),
    enabled: !!id,
  });
};

// ==================== COMMUNITY GROUPS QUERY HOOKS ====================

export const useCommunityGroups = (
  options?: UseQueryOptions<CommunityGroupDto[]>
) => {
  return useQuery({
    queryKey: communityGroupKeys.all,
    queryFn: learningApi.communityGroups.getAll,
    ...options,
  });
};

export const useCommunityGroup = (id: string) => {
  return useQuery({
    queryKey: communityGroupKeys.detail(id),
    queryFn: () => learningApi.communityGroups.getById(id),
    enabled: !!id,
  });
};
