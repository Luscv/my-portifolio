import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deploymentSettings } from '../config/deployment.mjs';

test('the selected project uses its repository subpath', () => {
  assert.deepEqual(deploymentSettings({}), { site: 'https://luscv.github.io', base: '/my-portifolio/' });
});
test('user and organization sites work at the domain root, regardless of case', () => {
  assert.deepEqual(deploymentSettings({ GITHUB_REPOSITORY: 'Example/EXAMPLE.github.io' }), { site: 'https://example.github.io', base: '/' });
});
test('a fork automatically adopts its owner and repository', () => {
  assert.deepEqual(deploymentSettings({ GITHUB_REPOSITORY: 'Someone/portfolio' }), { site: 'https://someone.github.io', base: '/portfolio/' });
});
test('empty GitHub Actions variables preserve repository defaults', () => {
  assert.deepEqual(deploymentSettings({ SITE_URL: '', BASE_PATH: '' }), { site: 'https://luscv.github.io', base: '/my-portifolio/' });
});
test('custom domains can explicitly choose the root or a subpath', () => {
  assert.deepEqual(deploymentSettings({ SITE_URL: 'https://example.org', BASE_PATH: '/' }), { site: 'https://example.org', base: '/' });
  assert.equal(deploymentSettings({ BASE_PATH: 'portfolio' }).base, '/portfolio/');
});
test('invalid origins and traversal paths fail before producing broken links', () => {
  for (const site of ['http://example.org', 'https://example.org/path', 'https://example.org/?x=1', 'https://user:pass@example.org']) {
    assert.throws(() => deploymentSettings({ SITE_URL: site }), /SITE_URL/);
  }
  for (const base of ['/../', '/work?x=1/', '/a/../../', '/a b/']) {
    assert.throws(() => deploymentSettings({ BASE_PATH: base }), /BASE_PATH/);
  }
  assert.throws(() => deploymentSettings({ GITHUB_REPOSITORY: 'missing-owner' }), /GITHUB_REPOSITORY/);
});
