import png from 'pngjs';
import fs from 'fs';
import hash2 from './lib/hash2.js';
import { prng_alea } from 'esm-seedrandom';
import { prng_xor128 } from 'esm-seedrandom';

const { PNG } = png;
const size = 1024;
let p = new PNG({ width: size, height: size });

for (let y = 0; y < p.height; y++) {
  for (let x = 0; x < p.width; x++) {
    let idx = (p.width * y + x) << 2;

    let col = hash2(0, x, y);

    p.data[idx] = (col & 0xff000000) >> 24;
    p.data[idx + 1] = (col & 0x00ff0000) >> 16;
    p.data[idx + 2] = (col & 0x0000ff0000) >> 8;
    p.data[idx + 3] = col & 0x000000ff;
  }
}

p.pack()
  .pipe(fs.createWriteStream('./xx.png'))
  .on('finish', function () {
    console.log('XX');
  });

// Non seeded random will push a new image to git every time
// p = new PNG({ width: size, height: size });

// for (let y = 0; y < p.height; y++) {
//   for (let x = 0; x < p.width; x++) {
//     let idx = (p.width * y + x) << 2;

//     let col = (Math.random() * 0xffffffff) >>> 0;

//     p.data[idx] = (col & 0xff000000) >>> 24;
//     p.data[idx + 1] = (col & 0x00ff0000) >>> 16;
//     p.data[idx + 2] = (col & 0x0000ff0000) >>> 8;
//     p.data[idx + 3] = col & 0x000000ff;
//   }
// }

// p.pack()
//   .pipe(fs.createWriteStream('./random.png'))
//   .on('finish', function () {
//     console.log('Random');
//   });

let alea = prng_alea(0);

p = new PNG({ width: size, height: size });

for (let y = 0; y < p.height; y++) {
  for (let x = 0; x < p.width; x++) {
    let idx = (p.width * y + x) << 2;

    let col = (alea.quick() * 0xffffffff) >>> 0;

    p.data[idx] = (col & 0xff000000) >>> 24;
    p.data[idx + 1] = (col & 0x00ff0000) >>> 16;
    p.data[idx + 2] = (col & 0x0000ff0000) >>> 8;
    p.data[idx + 3] = col & 0x000000ff;
  }
}

p.pack()
  .pipe(fs.createWriteStream('./alea.png'))
  .on('finish', function () {
    console.log('Alea');
  });

let xor = prng_xor128('0');

p = new PNG({ width: size, height: size });

for (let y = 0; y < p.height; y++) {
  for (let x = 0; x < p.width; x++) {
    let idx = (p.width * y + x) << 2;

    let col = (xor.quick() * 0xffffffff) >>> 0;

    p.data[idx] = (col & 0xff000000) >>> 24;
    p.data[idx + 1] = (col & 0x00ff0000) >>> 16;
    p.data[idx + 2] = (col & 0x0000ff0000) >>> 8;
    p.data[idx + 3] = col & 0x000000ff;
  }
}

p.pack()
  .pipe(fs.createWriteStream('./xor.png'))
  .on('finish', function () {
    console.log('Xor');
  });
