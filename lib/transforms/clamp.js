import hash1 from '../hash1.js';
import { MI } from '../constants.js';
export default (a = 1, b = 0) =>
  (seed, State) => {
    a = a >>> 0;
    b = b >>> 0;
    const min = Math.min(a, b);
    const max = Math.max(a, b);

    // The integer range may be bigger than 32 bit so convert to float and scale
    const r = hash1(seed, State.counter++) * MI; // [0-1]

    return Math.round(min + r * (max - min)); // [min,max]
  };
