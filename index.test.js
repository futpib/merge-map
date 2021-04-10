
const test = require('ava');

const mergeMap = require('.');

test('mergeMap, number keys, left ends first', t => {
	t.deepEqual(mergeMap(
		new Map([
			[ 0, 'a' ],
			[ 2, 'c' ],
		]),
		new Map([
			[ 1, 'b' ],
			[ 3, 'd' ],
		]),
	), new Map([
		[ 0, 'a' ],
		[ 1, 'b' ],
		[ 2, 'c' ],
		[ 3, 'd' ],
	]));
});

test('mergeMap, string keys, right ends first', t => {
	t.deepEqual(mergeMap(
		new Map([
			[ 'a', 0 ],
			[ 'c', 2 ],
		]),
		new Map([
			[ 'b', 1 ],
		]),
	), new Map([
		[ 'a', 0 ],
		[ 'b', 1 ],
		[ 'c', 2 ],
	]));
});

test('mergeMap, number keys, right wins conflicts', t => {
	t.deepEqual(mergeMap(
		new Map([
			[ 0, 'a' ],
			[ 100, 'x' ],
		]),
		new Map([
			[ 1, 'b' ],
			[ 100, 'y' ],
		]),
	), new Map([
		[ 0, 'a' ],
		[ 1, 'b' ],
		[ 100, 'y' ],
	]));
});

test('mergeMap, string keys, left wins conflicts', t => {
	t.deepEqual(mergeMap(
		new Map([
			[ 'a', 0 ],
			[ 'z', 100 ],
		]),
		new Map([
			[ 'b', 1 ],
			[ 'z', 200 ],
		]),
		(k, l, r) => {
			t.is(k, 'z');
			t.is(l, 100);
			t.is(r, 200);
			return l;
		},
	), new Map([
		[ 'a', 0 ],
		[ 'b', 1 ],
		[ 'z', 100 ],
	]));
});
