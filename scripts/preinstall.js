let cp = require('child_process');
let path = require('path');

let commandSync = cmd => cp.execSync(cmd, {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
});

let deno = './dist/deno';
commandSync(`base64 -d dist/deno.gz.b64 | gzip -cd > ${deno}`);
commandSync(`chmod +x ${deno}`);
