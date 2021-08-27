import { P2, P3, P5 } from './constants.js';

/**
 * Create a hash from a seed and 0 inputs equivelent to hash(seed,[]) with no data but much faster.
 * @param {number} s - 32 bit integer seed clamped to [0,0xffffffff]
 * @return {number} 32 bit integer hash
 * @example
 * let h0 = hash0(123);
 * h0 === hash(123,[]);
 */
export default function hash0(s) {
  s = s >>> 0;

  let h = s + P5;

  h = Math.imul(P2, h ^ (h >>> 15));
  h = Math.imul(P3, h ^ (h >>> 13));
  h ^= h >>> 16;
  return h >>> 0;
}
