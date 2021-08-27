import hash1 from '../hash1.js';
import { ME } from '../constants.js';

/**
 * A simple transform that works like Math.random() but is seeded.
 * @returns {number} in the range [0.0,1.0) exclusive
 */
export default function float() {
  // State.counter should be incremented by how many hash calls are made
  return (seed, State) => hash1(seed, State.counter++) * ME;
}
