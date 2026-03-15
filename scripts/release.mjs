#!/usr/bin/env node
import { execSync } from 'node:child_process';
import process from 'node:process';

const [versionInput = 'patch', npmTag = 'latest'] = process.argv.slice(2);

const run = (command, options = {}) => {
  execSync(command, { stdio: 'inherit', ...options });
};

const read = (command) => {
  return execSync(command, { stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf-8' }).trim();
};

try {
  const status = read('git status --porcelain');
  if (status) {
    throw new Error('Working tree is not clean. Commit or stash changes before releasing.');
  }

  run('npm run lint');
  run('npm test');
  run('npm run build');

  const versionCommand = `npm version ${versionInput} -m "chore(release): %s"`;
  run(versionCommand);

  run('git push --follow-tags');
  run(`npm publish --access public --tag ${npmTag}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
