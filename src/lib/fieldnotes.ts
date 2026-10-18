import { getCollection } from 'astro:content';

export async function getFieldnotes() {
  const published = (await getCollection('fieldnotes', ({ data }) => !data.draft))
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
  const portraits = published.filter(entry => entry.data.placement === 'portrait');
  if (portraits.length > 1) throw new Error('Publish only one portrait in src/content/fieldnotes; keep any alternatives as drafts.');
  return {
    portrait: portraits[0],
    entries: published.filter(entry => entry.data.placement === 'fieldnotes'),
  };
}
