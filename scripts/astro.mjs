import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Run Astro without CLI telemetry or writes to a cloud user's read-only home.
// A Node launcher keeps the npm scripts portable across Windows and Unix.
const cli = fileURLToPath(new URL('bin/astro.mjs', import.meta.resolve('astro/package.json')));
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
});
if (result.error) throw result.error;
if (result.signal) process.kill(process.pid, result.signal);
else process.exitCode = result.status ?? 1;
