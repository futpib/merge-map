const invariant = require('invariant');

const returnRight = (k, l, r) => r;
const defaultCompare = (a, b) => a < b ? -1 : (b < a ? 1 : 0);

const mergeMap = (
	left,
	right,
	resolveConflict = returnRight,
	compareKeys = defaultCompare,
) => new left.constructor((function * () {
	const leftIterator = left[Symbol.iterator]();
	const rightIterator = right[Symbol.iterator]();

	let leftIteratorResult = leftIterator.next();
	let rightIteratorResult = rightIterator.next();

	while (true) {
		if (leftIteratorResult.done && rightIteratorResult.done) {
			break;
		}

		if (leftIteratorResult.done) {
			yield rightIteratorResult.value;
			rightIteratorResult = rightIterator.next();
			continue;
		}

		if (rightIteratorResult.done) {
			yield leftIteratorResult.value;
			leftIteratorResult = leftIterator.next();
			continue;
		}

		const { value: leftEntry } = leftIteratorResult;
		const { value: rightEntry } = rightIteratorResult;

		const [ leftKey, leftValue ] = leftEntry;
		const [ rightKey, rightValue ] = rightEntry;

		const keyComparison = compareKeys(leftKey, rightKey);

		if (keyComparison < 0) {
			yield leftEntry;
			leftIteratorResult = leftIterator.next();
			continue;
		}

		if (keyComparison > 0) {
			yield rightEntry;
			rightIteratorResult = rightIterator.next();
			continue;
		}

		if (keyComparison === 0) {
			yield [ leftKey, resolveConflict(leftKey, leftValue, rightValue) ];
			leftIteratorResult = leftIterator.next();
			rightIteratorResult = rightIterator.next();
			continue;
		}

		invariant(
			false,
			'mergeMap: `compareKeys` returned `%s` which is neither `> 0` nor `< 0` nor `=== 0`',
			keyComparison,
		);
	}
})());

module.exports = mergeMap;
