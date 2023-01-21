import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

// TODO: set-up releases structure
// const url = `https://raw.githubusercontent.com/vheemstra/oxipng-bin/v${pkg.version}/vendor/`;
const url = `https://raw.githubusercontent.com/vheemstra/oxipng-bin/main/vendor/`;

// TODO: auto get latest oxipng from:
// https://github.com/shssoichiro/oxipng/releases/download/v${pkg.oxipng_version}/oxipng-${pkg.oxipng_version}-x86_64-apple-darwin.tar.gz
// https://github.com/shssoichiro/oxipng/releases/download/v${pkg.oxipng_version}/oxipng-${pkg.oxipng_version}-x86_64-pc-windows-msvc.zip
// https://github.com/shssoichiro/oxipng/releases/download/v${pkg.oxipng_version}/oxipng-${pkg.oxipng_version}-x86_64-unknown-linux-musl.tar.gz
// https://github.com/shssoichiro/oxipng/archive/refs/tags/v${pkg.oxipng_version}.tar.gz

const binWrapper = new BinWrapper()
	.src(`${url}macos/oxipng`, 'darwin', 'x64')
	.src(`${url}linux/oxipng`, 'linux', 'x64')
	.src(`${url}win/oxipng.exe`, 'win32', 'x64')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'oxipng.exe' : 'oxipng');

export default binWrapper;
