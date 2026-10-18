/** Shared by Astro and deployment checks. Never infer a base from a browser URL. */
export function deploymentSettings(environment = process.env) {
  const repository = environment.GITHUB_REPOSITORY || 'Luscv/my-portifolio';
  if (!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repository)) {
    throw new Error('GITHUB_REPOSITORY must have the form owner/repository.');
  }
  const [owner, name] = repository.split('/');
  const site = new URL(environment.SITE_URL || `https://${owner.toLowerCase()}.github.io`);
  if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash || site.username || site.password) {
    throw new Error('SITE_URL must be an HTTPS origin without a path, credentials, query, or fragment. Set BASE_PATH separately.');
  }
  const defaultBase = name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${name}/`;
  const requestedBase = environment.BASE_PATH || defaultBase;
  const base = `/${requestedBase.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');
  if (!/^\/(?:[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\/)*$/.test(base)) {
    throw new Error('BASE_PATH must be / or a URL path such as /my-portifolio/.');
  }
  return { site: site.origin, base };
}
