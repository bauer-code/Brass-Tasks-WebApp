const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
function copy(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for(const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name), to = path.join(destination, entry.name);
    if(entry.isDirectory()) copy(from, to);
    else fs.writeFileSync(to, fs.readFileSync(from));
  }
}
copy(path.join(root, 'public'), dist);
console.log('Built static app in dist/. Upload its contents to your domain document root.');
