#!/usr/bin/env node

let cp = require('child_process');
let path = require('path');

let commandSync = cmd => cp.execSync(cmd, {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
});

let denoZip = './deno.zip';
let deno = './deno';
let url = `https://github.com/denoland/deno/releases/download/v1.3.3/deno-x86_64-unknown-linux-gnu.zip`;
console.log(`downloading ${url}`);
commandSync(`curl -SL ${url} > ${denoZip}`);
commandSync(`unzip -p ${denoZip} > ${deno}`);
commandSync(`chmod +x ${deno}`);

console.log(`packing to .gz.b64 ...`);
commandSync(`rm -rf dist && mkdir dist`);
commandSync(`gzip -c ${deno} | base64 > dist/deno.gz.b64`);

console.log(`cleanup...`);
commandSync(`rm ${denoZip} ${deno}`);
