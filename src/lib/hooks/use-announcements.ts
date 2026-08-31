import { useMemo } from 'react';
import rawData from '../../data/announcements.json';

export type AnnouncementTag =
  | 'release'
  | 'security'
  | 'breaking'
  | 'maintenance';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  tag?: AnnouncementTag;
  publishedAt: string;
  cta?: { label: string; href: string };
};

const data = rawData as Announcement[];

const sortByDateDesc = (items: Announcement[]): Announcement[] =>
  [...items].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

export const useAnnouncements = (): Announcement[] =>
  useMemo(() => sortByDateDesc(data), []);

export const formatRelativeDate = (iso: string): string => {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;
  const diffDays = Math.floor((Date.now() - then) / 86_400_000);
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};
