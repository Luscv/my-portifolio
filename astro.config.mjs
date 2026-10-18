import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { deploymentSettings } from './config/deployment.mjs';

export default defineConfig({
  ...deploymentSettings(),
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error', trust: false }]],
    }),
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
