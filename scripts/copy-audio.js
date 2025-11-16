const fs = require('fs');
const path = require('path');
const root = 'c:/Users/laara/OneDrive/Desktop/Nouveau dossier (3)';
const src = path.join(root, 'audio', 'prologue.mp3');
const dstDir = path.join(root, 'public', 'audio');
const dst = path.join(dstDir, 'prologue.mp3');

try {
  fs.mkdirSync(dstDir, { recursive: true });
  fs.copyFileSync(src, dst);
  console.log('COPY_DONE');
} catch (err) {
  console.error('COPY_ERROR', err && err.message);
  process.exit(1);
}
