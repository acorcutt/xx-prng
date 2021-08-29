import hash1 from '../hash1.js';
import { MI } from '../constants.js';
export default (a = 1, b = 0) =>
  (seed, State) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const r = hash1(seed, State.counter++) * MI; // [0-1]
    return min + r * (max - min);
  };
