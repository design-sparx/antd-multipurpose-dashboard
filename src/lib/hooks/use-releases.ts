import { useMemo } from 'react';

import changelog from '../../../CHANGELOG.md?raw';

export type ChangeKind = 'Minor' | 'Major' | 'Patch';

export type Release = { version: string; body: string; kind: ChangeKind };

export const KIND_COLOR: Record<ChangeKind, string> = {
  Major: 'red',
  Minor: 'blue',
  Patch: 'green',
};

const parseChangelog = (md: string): Release[] => {
  const releases: Release[] = [];
  const seen = new Set<string>();

  const sections = md.split(/^##\s+(.+)$/m);
  for (let i = 1; i < sections.length; i += 2) {
    const version = sections[i].trim();
    const slug = version.toLowerCase().replace(/[^a-z0-9.]/g, '');
    if (!slug || slug === 'null' || seen.has(slug)) continue;
    seen.add(slug);

    const body = sections[i + 1] ?? '';
    const kind: ChangeKind = /^###\s+Major\s+Changes/im.test(body)
      ? 'Major'
      : /^###\s+Minor\s+Changes/im.test(body)
        ? 'Minor'
        : 'Patch';

    releases.push({ version, body: `## ${version}\n${body}`, kind });
  }

  return releases;
};

export const useReleases = (limit?: number): Release[] => {
  const all = useMemo(() => parseChangelog(changelog), []);
  return typeof limit === 'number' ? all.slice(0, limit) : all;
};
