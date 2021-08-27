import hash1 from '../hash1.js';
/**
 * A simple transform that outputs raw 32 bit integer.
 * @returns {number} in the range [0,0xffffffff]
 */
export default function uint() {
  return (seed, State) => hash1(seed, State.counter++);
}
