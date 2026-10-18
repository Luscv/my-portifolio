import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths';
export const GET: APIRoute = async ({ site }) => {
  const projects = await getCollection('projects');
  const urls = ['', ...projects.map(project => `work/${project.id}/`)].map(path => new URL(withBase(path), site).href);
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
