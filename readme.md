# oxipng-bin

> This is a bin wrapper for [OxiPNG](https://github.com/shssoichiro/oxipng) for use with [`imagemin`](https://github.com/imagemin/imagemin) and the [`imagemin-oxipng`](https://github.com/vheemstra/imagemin-oxipng) plugin.

You probably want the [`@vheemstra/imagemin-oxipng`](https://github.com/vheemstra/imagemin-oxipng) plugin instead.

## Install

```sh
npm install --save oxipng-bin
```


## Usage

```js
import {execFile} from 'node:child_process';
import oxipng from 'oxipng-bin';

execFile(oxipng, [
	'--opt', '4',
	'--strip', 'safe',
	'--out', 'output.png',
	'input.png'
], err => {
	if (err) {
		throw err;
	}

	console.log('Image optimized!');
});
```


## CLI

```sh
npm install --global oxipng-bin
```

```sh
oxipng --help
```


## License & Info

MIT © [Imagemin](https://github.com/imagemin)<br>
[OxiPNG](https://github.com/shssoichiro/oxipng) by [Josh Holmer](https://github.com/shssoichiro) (Open-source software, distributed under the MIT license.)<br>
This package is made by [Philip van Heemstra](https://github.com/vHeemstra)<br>
Based on [jpegtran-bin](https://github.com/imagemin/jpegtran-bin) by [Sindre Sorhus](https://github.com/sindresorhus)<br>
[Info on building **oxipng** binaries](https://github.com/vHeemstra/oxipng-bin/blob/main/vendor/build-oxipng.md)
