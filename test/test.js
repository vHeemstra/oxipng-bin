import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';
import binCheck from 'bin-check';
import compareSize from 'compare-size';
import oxipng from '../index.js';

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(oxipng, ['--version']));
});

test('minify a PNG', async t => {
	const temporary = temporaryDirectory();
	const src = fileURLToPath(new URL('fixtures/test.png', import.meta.url));
	const dest = path.join(temporary, 'test.png');
	const args = [
		'-o', 4,
		'--strip', 'safe',
		'--out', dest,
		src
	];

	await execa(oxipng, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] > 0);
	t.true(result[dest] < result[src]);
});
