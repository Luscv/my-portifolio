import type { CollectionEntry } from 'astro:content';

export function compareProjects(a: CollectionEntry<'projects'>, b: CollectionEntry<'projects'>) {
  // Keep the traffic dashboard last even when new projects are added.
  const traffic = 'tableau-visualization';
  return Number(a.id === traffic) - Number(b.id === traffic)
    || a.data.order - b.data.order
    || a.id.localeCompare(b.id);
}
