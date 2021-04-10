# merge-map

> Merge [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)s, preserve order

[![Build Status](https://travis-ci.org/futpib/merge-map.svg?branch=master)](https://travis-ci.org/futpib/merge-map) [![Coverage Status](https://coveralls.io/repos/github/futpib/merge-map/badge.svg?branch=master)](https://coveralls.io/github/futpib/merge-map?branch=master)

## Example

```js
const a = new Map([
	[ 0, 'a' ],
	[ 2, 'c' ],
]);

const b = new Map([
	[ 1, 'b' ],
	[ 3, 'd' ],
]);

mergeMap(a, b);
/*
Map(4) {
	0 => 'a',
	1 => 'b',
	2 => 'c',
	3 => 'd',
}
*/
```

## Install

```
yarn add merge-map
```
