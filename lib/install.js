import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import osFilterObj from 'os-filter-obj';
import bin from './index.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

const vendorDir = fileURLToPath(new URL('../vendor', import.meta.url));
const files = osFilterObj([{
    os: 'linux',
    arch: 'x64',
    src: 'linux/oxipng',
}, {
    os: 'darwin',
    arch: 'x64',
    src: 'macos/oxipng',
}, {
    os: 'win32',
    arch: 'x64',
    src: 'win/oxipng.exe',
}]);

if (files.length) {
	const src = `${vendorDir}/${files[0].src}`;
	const dest = `${vendorDir}/${path.basename(src)}`;

	if (!fs.existsSync(dest)) {
		fs.mkdirSync(path.dirname(dest), {
			recursive: true,
			mode: 0o755,
		});

		fs.copyFileSync(src, dest);
	}
}

bin.run(['--version']).then(() => {
	console.log(`  \u001b[32m✔\u001b[0m \u001b[36moxipng\u001b[0m \u001b[35mv${pkg.oxipng_version}\u001b[0m pre-build test passed`);
}).catch(error => {
	console.warn(error.message);
	console.log('');
	console.warn(`  \u001b[31m✘\u001b[0m \u001b[36moxipng\u001b[0m \u001b[35mv${pkg.oxipng_version}\u001b[0m pre-build test failed`);

	// TODO: make binary building
});
