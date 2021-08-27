import hash1 from '../hash1.js';
import float from './float.js';

const t = float();
/**
 * Output a list of random numbers transformed by suppied transform function.
 * @param {number} length - Length of the list.
 * @param {function} transform - Transform function.
 * @returns {[number]} List of random numbers transformed by transform
 */
export default function list(length = 0, transform = t) {
  return (seed, State) => {
    return [...Array(length)].map(() => transform(seed, State));
  };
}
