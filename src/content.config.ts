import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const httpsUrl = z.url({ protocol: /^https$/ }).refine((url) => {
  const parsed = new URL(url);
  return !parsed.username && !parsed.password;
}, 'Use a public HTTPS URL without credentials.');
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    abstract: z.string(),
    discipline: z.string(),
    order: z.number().int(),
    status: z.enum(['Documented project', 'Work in progress', 'Editable template']),
    statusDetail: z.string(),
    featured: z.boolean().default(true),
    tags: z.array(z.string()),
    year: z.string().optional(),
    visual: z.enum(['classification', 'forecast', 'tableau', 'relational', 'none']).default('none'),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    coverCaption: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: httpsUrl })).default([]),
    downloads: z.array(z.object({
      label: z.string().min(1),
      file: z.string().regex(/^\/projects\/(?:[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\/)*[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/),
    })).default([]),
    figures: z.array(z.object({ image: image(), alt: z.string().min(1), title: z.string(), caption: z.string() })).default([]),
    galleryTitle: z.string().default('Views & figures'),
    galleryNote: z.string().optional(),
    pendingLinks: z.array(z.string()).default([]),
    tableau: z.boolean().default(false),
    tableauUrl: httpsUrl.refine((url) => {
      const parsed = new URL(url);
      return parsed.hostname === 'public.tableau.com' && /^\/views\/[^/]+\/[^/]+\/?$/.test(parsed.pathname);
    }, 'Use a Tableau Public view URL: https://public.tableau.com/views/WORKBOOK/VIEW').optional(),
    tableauTitle: z.string().optional(),
  }).superRefine((entry, ctx) => {
    if (entry.cover && !entry.coverAlt?.trim()) ctx.addIssue({ code: 'custom', path: ['coverAlt'], message: 'Provide meaningful alternative text for the project cover.' });
    if (entry.tableauUrl && !entry.tableauTitle?.trim()) ctx.addIssue({ code: 'custom', path: ['tableauTitle'], message: 'Provide an accessible title for the Tableau view.' });
  }),
});

const mediaPath = (extension: string) => z.string().regex(new RegExp(`^/media/(?:[a-zA-Z0-9_-][a-zA-Z0-9_.-]*/)*[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\\.(${extension})$`), 'Use a local /media/ path with a supported file extension.');
const fieldnotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fieldnotes' }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    kind: z.enum(['image', 'video']),
    placement: z.enum(['fieldnotes', 'portrait']).default('fieldnotes'),
    draft: z.boolean().default(false),
    order: z.number().int().default(0),
    date: z.iso.date().optional(),
    image: image().optional(),
    alt: z.string().optional(),
    video: mediaPath('mp4|webm').optional(),
    poster: image().optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    silent: z.boolean().default(false),
    captions: mediaPath('vtt').optional(),
    captionsLanguage: z.string().regex(/^[a-z]{2}(?:-[A-Z]{2})?$/).default('en'),
    captionsLabel: z.string().min(1).default('English'),
  }).superRefine((entry, ctx) => {
    if (entry.draft) return;
    const issue = (path: string, message: string) => ctx.addIssue({ code: 'custom', path: [path], message });
    if (entry.placement === 'portrait' && entry.kind !== 'image') issue('kind', 'The profile portrait must be an image.');
    if (entry.kind === 'image') {
      if (!entry.image) issue('image', 'Add a local image, or keep draft: true until it is uploaded.');
      if (!entry.alt?.trim()) issue('alt', 'Describe the photograph for visitors who cannot see it.');
    } else {
      if (!entry.video) issue('video', 'Add the /media/ path of your uploaded MP4 or WebM file.');
      if (!entry.width || !entry.height) issue('width', 'Set the video’s width and height to reserve the correct space.');
      if (!entry.silent && !entry.captions) issue('captions', 'Add WebVTT captions for a video with meaningful audio, or set silent: true for a silent recording.');
      for (const key of ['video', 'captions'] as const) {
        const path = entry[key];
        if (path && !existsSync(resolve('public', path.slice(1)))) issue(key, `Upload the missing file to public${path} before publishing this entry.`);
      }
    }
  }),
});

export const collections = { projects, fieldnotes };
