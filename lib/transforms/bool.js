import hash1 from '../hash1.js';
/**
 * A simple transform that outputs true or false
 * @returns {boolean}
 */
export default () => (seed, State) => (hash1(seed, State.counter++) & 1) === 1;
