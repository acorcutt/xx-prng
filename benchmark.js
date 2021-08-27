import Benchmark from 'benchmark';
import seeded from './lib/seeded.js';
import xxhash0 from './lib/hash0.js';
import xxhash1 from './lib/hash1.js';
import uint from './lib/transforms/uint.js';
import float from './lib/transforms/float.js';

import { ME } from './lib/constants.js';
import { prng_alea } from 'esm-seedrandom';
import { prng_arc4 } from 'esm-seedrandom';
import { prng_xor128 } from 'esm-seedrandom';

const suite = new Benchmark.Suite();

const { random: xx } = seeded(0);
// Caching transforms is way faster
const f = float();
const u = uint();
let c0 = 0;
let c1 = 0;

let alea = prng_alea('0');
let arc = prng_arc4('0');
let xor = prng_xor128('0');

// add tests
suite
  .add('xx()', function () {
    // Equivelant to xx(float) but slower due to using default parameters
    xx();
  })
  .add('xx(float)', function () {
    xx(f);
  })
  .add('xx(uint)', function () {
    // To uint32
    xx(u);
  })

  .add('xxhash1() * ME', function () {
    // To float [0,1) like Math.random() without state overhead
    xxhash1(0, c1++) * ME;
  })
  .add('xxhash0()', function () {
    xxhash0(c0++);
  })
  .add('xxhash1()', function () {
    xxhash1(0, c1++);
  })

  .add('random()', function () {
    Math.random();
  })
  .add('alea()', function () {
    alea.quick();
  })
  .add('arc()', function () {
    arc.quick();
  })
  .add('xor()', function () {
    xor.quick();
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
