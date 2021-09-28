import float from './transforms/float.js';

const t = float();

/**
 * Create a simple seeded random number iterator
 * - yields a number from transform()
 * @param {number} seed
 * @param {number} counter
 * @param {number} end
 * @param {function} transform
 * @returns function*
 */
export default function* generator(seed = Date.now(), counter = 0, end = Infinity, transform = t) {
  // State is object that gets mutated by provided transform
  const State = { counter };

  while (State.counter < end) {
    yield transform(seed, State);
  }
  return State;
}
