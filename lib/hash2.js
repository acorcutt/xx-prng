import { P2, P3, P4, P5 } from './constants.js';

/**
 * Create a hash from a seed and 2 inputs equivelent to hash(seed,[a,b]) but much faster.
 * @param {number} s - 32 bit integer seed clamped to [0,0xffffffff]
 * @param {number} a - 32 bit integer clamped to [0,0xffffffff]
 * @param {number} b - 32 bit integer clamped to [0,0xffffffff]
 * @return {number} 32 bit integer hash
 * @example
 * let h2 = hash2(123,100,200);
 * h2 === hash(123,[100,200]);
 */
export default function hash2(s, a, b) {
  s = s >>> 0;
  a = a >>> 0;
  b = b >>> 0;

  let h = s + P5 + 8; // a + b is 8 bytes

  h += Math.imul(P3, a);
  h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17

  h += Math.imul(P3, b);
  h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17

  h = Math.imul(P2, h ^ (h >>> 15));
  h = Math.imul(P3, h ^ (h >>> 13));

  h ^= h >>> 16;
  return h >>> 0;
}
