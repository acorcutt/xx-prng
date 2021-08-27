import { P2, P3, P4, P5 } from './constants.js';

/**
 * Create a hash from a seed and 3 inputs equivelent to hash(seed,[a,b,c]) but much faster.
 * @param {number} s - 32 bit integer seed clamped to [0,0xffffffff]
 * @param {number} a - 32 bit integer clamped to [0,0xffffffff]
 * @param {number} b - 32 bit integer clamped to [0,0xffffffff]
 * @param {number} c - 32 bit integer clamped to [0,0xffffffff]
 * @return {number} 32 bit integer hash
 * @example
 * let h3 = hash3(123,100,200,300);
 * h3 === hash(123,[100,200,300]);
 */
export default function hash3(s, a, b, c) {
  s = s >>> 0;
  a = a >>> 0;
  b = b >>> 0;
  c = c >>> 0;

  let h = s + P5 + 12; // a + b + c is 12 bytes

  h += Math.imul(P3, a);
  h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17

  h += Math.imul(P3, b);
  h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17

  h += Math.imul(P3, c);
  h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17

  h = Math.imul(P2, h ^ (h >>> 15));
  h = Math.imul(P3, h ^ (h >>> 13));

  h ^= h >>> 16;
  return h >>> 0;
}
