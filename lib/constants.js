// xxHash Primes
export const P1 = 2654435761 | 0;
export const P2 = 2246822519 | 0;
export const P3 = 3266489917 | 0;
export const P4 = 668265263 | 0;
export const P5 = 374761393 | 0;

// Int32 to Float multipliers
export const MI = 1.0 / 0xffffffff; // [0-1] inclusive of 1
export const ME = 1.0 / (0xffffffff + 1.0); // [0-1) exclusive of 1
