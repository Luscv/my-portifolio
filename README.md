# Lucas Barros — Data Science Portfolio

A static, editorial portfolio built with Astro, Markdown, and vanilla CSS. Newsreader, Inter, and IBM Plex Mono are self-hosted. There is no React, backend, database, CMS, analytics, or external font service. The only application JavaScript is the optional, click-to-load Tableau embed.

## Develop locally

Use Node.js **24** (see `.nvmrc`; minimum 22.22.0) and npm.

```sh
npm ci
npm run dev
```

The default development path is `/my-portifolio/`, matching the selected repository’s GitHub Pages path. Open the address printed by Astro and append that path if needed. The cloud onboarding interface does not offer a browser preview; an agent can still validate the server with local HTTP requests.

```sh
npm run check     # Astro and TypeScript diagnostics
npm run test      # GitHub Pages configuration contracts
npm run build     # Type-check, then generate dist/
npm run validate  # Tests, build, local routes, fragments, metadata, and assets
npm run preview   # Serve the production build locally
```

For a cloud workspace whose home directory is read-only, set `npm_config_cache=/workspace/.cache/npm` when installing dependencies. The small Node launcher in `scripts/astro.mjs` disables Astro CLI telemetry and avoids its writes to the home directory; it works on Windows and Unix. Neither setting is a website runtime requirement.

## Project structure

```text
config/deployment.mjs           GitHub Pages site/base resolution
src/content/projects/*.md      Project content and metadata
src/content.config.ts          Content validation schema
src/data/site.ts               Name, GitHub, LinkedIn, contact email
src/components/                Header, footer, visual studies, embed, work listing
src/layouts/BaseLayout.astro   Shared HTML shell and SEO
src/pages/index.astro          Homepage
src/pages/work/[...id].astro   Reusable case-study page
src/pages/404.astro            Accessible not-found page
src/pages/sitemap.xml.ts       Automatic sitemap
src/styles/                   Design tokens, layout, typography, local fonts
public/                       Favicon, Open Graph image, .nojekyll
docs/project-template.md       Copyable project entry
scripts/check-build.mjs        Generated-site validation
.github/workflows/deploy.yml   Official Astro / GitHub Pages deployment
```

## Edit personal details

Edit `src/data/site.ts`. GitHub points to the verified `Luscv` profile. **LinkedIn and email are intentionally `null`** because no values were supplied. Provide real values to activate their links. The header labels the unavailable LinkedIn destination, and the footer labels the missing contact email. No fake `#` social links are used.

Professional biography text is in `src/pages/index.astro`. Only the supplied background and current postgraduate studies at PUC Minas are represented. There are no invented employers, dates, qualifications, model scores, or impact claims.

## Add or edit a project

1. Copy `docs/project-template.md` to `src/content/projects/your-project.md`.
2. Edit the frontmatter and Markdown body.
3. Run `npm run validate`.

That single content file creates `/work/your-project/`, adds the project to the ordered homepage listing, includes it in the sitemap, and updates the next-project navigation. The filename is the URL identifier; use lowercase kebab-case and avoid renaming published files without a redirect plan.

Required frontmatter:

```yaml
title: A verified project title
abstract: A concise, factual overview.
discipline: Statistical modeling
order: 4
status: Work in progress
statusDetail: Clearly state what is complete and what remains under development.
tags: [Python, Forecasting]
```

Optional fields:

| Field | Purpose |
| --- | --- |
| `shortTitle` | Shorter title in the homepage listing |
| `featured` | Defaults to `true`; `false` excludes only the homepage listing |
| `year` | A verified year or period, as a quoted string |
| `visual` | `classification`, `forecast`, `tableau`, or `none` (default) |
| `cover`, `coverAlt`, `coverCaption` | Local cover image, meaningful alt text, and optional caption |
| `links` | List of `{ label, url }` objects using verified HTTPS URLs |
| `pendingLinks` | Names of resources not yet provided; rendered as text, never broken links |
| `tableauUrl`, `tableauTitle` | Real Tableau Public view URL and accessible title |

Allowed statuses are `Documented project`, `Work in progress`, and `Editable template`. Markdown `##` headings automatically generate the case-study table of contents. They should cover context, data, methods, validation, results, and limitations.

### Images and plots

Store figures in `src/assets/`, then reference them relatively from the project file:

```yaml
cover: ../../assets/my-project/overview.png
coverAlt: Describe the information shown in the real figure.
coverCaption: State the source and whether this is an actual result or an illustration.
```

The cover is validated by Astro, requires nonempty alt text, receives intrinsic dimensions and responsive sources, and loads lazily in the homepage listing. The case-study cover loads eagerly. Without a cover, a labeled method illustration or placeholder is rendered.

Use standard Markdown for inline figures:

```md
![Meaningful description of the actual plot](../../assets/my-project/plot.png)

*Figure 1. Explain the plot and its data source.*
```

Astro processes local Markdown images and infers dimensions. The build checker catches emitted images without dimensions or alt attributes. Avoid remote image dependencies. Export charts as SVG, PNG, or WebP with readable labels. Include a text explanation of their findings; images alone are not accessible evidence.

### Code and mathematics

Fenced code blocks support syntax highlighting via Astro/Shiki:

````md
```python
# Illustrative syntax only; replace with a verified project excerpt.
forecast = model.predict(horizon)
```
````

Use `$...$` for inline mathematics and `$$...$$` on separate lines for display equations. `remark-math` and `rehype-katex` render accessible HTML and MathML at build time; KaTeX JavaScript is not sent to the browser. Untrusted HTML commands in mathematics are disabled. Wide equations and code blocks scroll inside their own containers.

The npm override keeps the math plugins on the same patched KaTeX version as the stylesheet dependency. Retest mathematical output when updating it.

### Tableau Public

Add a real view URL, without a user profile or a share redirect:

```yaml
tableauUrl: https://public.tableau.com/views/WORKBOOK/VIEW
tableauTitle: Replace with the actual dashboard title
links:
  - label: View on Tableau Public
    url: https://public.tableau.com/views/WORKBOOK/VIEW
```

The schema requires the `public.tableau.com` host and a `/views/workbook/view` path. The values above are **placeholders**, not an existing dashboard. Do not publish them. The embed adapts to the page width and is loaded only after the visitor chooses **Load interactive view**. A direct link remains available if JavaScript is disabled or Tableau cannot load. Cross-origin restrictions prevent the site from determining whether a dashboard actually rendered successfully.

Dashboard layout responsiveness is controlled in Tableau too: publish device layouts, provide a static fallback image through `cover`, and include a written interpretation in the Markdown. Without an embed URL, an explicit placeholder appears. No external Tableau requests are made on the initial portfolio page load.

## GitHub Pages

The workflow checks Pages availability with `actions/configure-pages@v6`, then uses the official `withastro/action@v6` to install, validate, build, and upload, followed by `actions/deploy-pages@v5`. It runs on pushes to **main** and through **Run workflow**. The included lockfile supports repeatable npm installs; commit it along with the code. The build job can read Pages settings; deployment write permissions are scoped to the deploy job.

1. Commit and push the project to `main` in your GitHub repository.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. In **Actions**, inspect **Deploy portfolio to GitHub Pages** and its deployment result.

### Publication troubleshooting

- **Deployment returns 404 / “Ensure GitHub Pages has been enabled”:** open **Settings → Pages** and select **GitHub Actions** under **Build and deployment → Source**. Pages must be enabled before the workflow can publish its artifact.
- **A workflow named “pages build and deployment” runs Jekyll:** Pages is using **Deploy from a branch**. Change the source to **GitHub Actions**. This repository contains Astro source; the website to publish is the `dist/` artifact produced by the Astro workflow.
- After changing the source, open **Actions → Deploy portfolio to GitHub Pages**, select the latest run, and choose **Re-run all jobs**, or use **Run workflow** on `main`. Do not rerun the Jekyll workflow.

The Pages configuration check fails early if the site has not been enabled. It reads the repository settings without requiring a personal access token or changing administrator settings.

The build reads `GITHUB_REPOSITORY` automatically on GitHub Actions:

| Repository | `site` | `base` |
| --- | --- | --- |
| `Luscv/my-portifolio` (default) | `https://luscv.github.io` | `/my-portifolio/` |
| `USERNAME/USERNAME.github.io` | `https://username.github.io` | `/` |
| `USERNAME/another-repository` | `https://username.github.io` | `/another-repository/` |

All navigation, static assets, canonical URLs, Open Graph URLs, and sitemap URLs respect this base. Internal project URLs use trailing slashes to match GitHub Pages directory routing. The custom `404.html` keeps its navigation within the configured base. GitHub Pages does not need a client-side routing fallback.

You can test the root-site configuration locally:

```sh
GITHUB_REPOSITORY=Luscv/Luscv.github.io npm run validate
npm run validate  # Restore the normal project-site output afterward.
```

### Custom domain or explicit override

Optional repository variables under **Settings → Secrets and variables → Actions → Variables**:

- `SITE_URL`: HTTPS origin only, such as `https://portfolio.example.org`.
- `BASE_PATH`: `/` for a custom root domain, or a path such as `/portfolio/`.

Empty variables preserve defaults. Set both values when using a custom root domain; changing the origin alone does not remove the repository base. Configure the custom domain and DNS in GitHub Pages separately. These settings are public configuration, not secrets. The website requires no API keys or runtime environment variables.

## Design and accessibility

The design tokens are at the top of `src/styles/global.css`. The raw palette is Ink `#141414`, Paper `#F3F0E8`, Copper `#A75F45`, and Stone `#858781`. Accessible semantic text shades use muted `#65665F` and accent `#99523B`; Stone is reserved for nonessential visual details. All small text uses the darker shades.

Desktop uses a 12-column grid at a maximum width of 1120px. Mobile reflows into readable stacked content. The site includes a skip link, semantic navigation and landmarks, visible keyboard focus, labeled missing content, reduced-motion support, responsive figures, accessible math, and a direct fallback for external embeds. There are no scroll listeners, animation libraries, or UI frameworks.

The diagrams are original SVG method illustrations, explicitly labeled as illustrative. They are not analysis results. No assets or layouts from the visual reference were copied. The Open Graph image is a local 1200 × 630 PNG; its editable HTML source is `docs/social-card.html` (serve the repository locally and capture it at 1200 × 630 after the fonts load). Font licenses are included in their Fontsource packages (SIL Open Font License).

## Checks and remaining editorial work

`npm run validate` checks deployment settings, builds every page, checks local links and fragments, verifies generated assets and image dimensions, and checks metadata and the sitemap. Before publishing changes, also inspect mobile/desktop rendering and keyboard navigation in a browser. External sites and Tableau availability require their own checks; the static build cannot establish their uptime.

Still to supply: a LinkedIn URL, contact email, actual project repositories/reports, documented experiment details and results, and a real Tableau Public dashboard. The portfolio is intentionally publishable with clearly labeled placeholders; no missing information is silently invented.
