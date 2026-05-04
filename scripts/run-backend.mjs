/**
 * Always runs jeranapp.py with the repo-root .venv interpreter (fixes numpy/scipy skew vs PATH conda).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const isWin = process.platform === 'win32';
const py = isWin
  ? path.join(repoRoot, '.venv', 'Scripts', 'python.exe')
  : path.join(repoRoot, '.venv', 'bin', 'python3');
const cwd = path.join(repoRoot, 'backend_repo', 'SignSight-Backend');
const jeran = path.join(cwd, 'jeranapp.py');

if (!fs.existsSync(py)) {
  console.error(`[run-backend] Missing venv Python:\n  ${py}`);
  console.error(
    'Create from repo root: python -m venv .venv  then  .venv/Scripts/pip install -r backend_repo/SignSight-Backend/requirements.txt'
  );
  process.exit(1);
}
if (!fs.existsSync(jeran)) {
  console.error(`[run-backend] Missing jeranapp.py:\n  ${jeran}`);
  process.exit(1);
}

console.error(`[run-backend] ${py}`);
console.error(`[run-backend] cwd ${cwd}`);

const r = spawnSync(py, [jeran], { cwd, stdio: 'inherit', env: process.env, shell: false });
process.exit(r.status === null ? 1 : r.status);
