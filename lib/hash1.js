import { P2, P3, P4, P5 } from './constants.js';

/**
 * Create a hash from a seed and 1 input equivelent to hash(seed,[a]) but much faster.
 * @param {number} s - 32 bit integer seed clamped to [0,0xffffffff]
 * @param {number} a - 32 bit integer clamped to [0,0xffffffff]
 * @return {number} 32 bit integer hash
 * @example
 * let h1 = hash1(123,100);
 * h1 === hash(123,[100]);
 */
export default function hash1(s, a) {
  s = s >>> 0;
  a = a >>> 0;

  let h = s + P5 + 4; // a is 32bit 4 bytes

  h += Math.imul(P3, a);
  h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17

  h = Math.imul(P2, h ^ (h >>> 15));
  h = Math.imul(P3, h ^ (h >>> 13));

  h ^= h >>> 16;
  return h >>> 0;
}
