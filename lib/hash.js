import { P2, P3, P4, P5 } from './constants.js';
/**
 * Create a hash from a seed and a list of integers using partial xxHash algorithm.
 * @param {number} s - 32 bit integer seed clamped to [0,0xffffffff]
 * @param {[number]} d - Array of 32 bit integers
 * @return {number} 32 bit integer hash
 * @example
 * let h = hash(123,[1,2,3,4,5]);
 */
export default function hash(s, d = []) {
  s = s >>> 0;

  const l = d.length;
  let h = s + P5 + l * 4; // Each 32 bit int is 4 bytes

  let i = 0; // Slightly faster loop
  for (; i < l; i++) {
    h += Math.imul(P3, d[i] >>> 0); // Ensure ints are 32 bit
    h = Math.imul(P4, (h << 17) | (h >>> 15)); //rotl 17 32-17
  }

  // Note - we dont need the final mix loop as we are using 32 bit ints with no extra bytes
  h = Math.imul(P2, h ^ (h >>> 15));
  h = Math.imul(P3, h ^ (h >>> 13));

  h ^= h >>> 16;
  // Ensure hash is 32 bit
  return h >>> 0;
}
