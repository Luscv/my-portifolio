import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

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
    visual: z.enum(['classification', 'forecast', 'tableau', 'none']).default('none'),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    coverCaption: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: httpsUrl })).default([]),
    pendingLinks: z.array(z.string()).default([]),
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

export const collections = { projects };
