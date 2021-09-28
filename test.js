import test from 'ava';
import seeded from './lib/seeded.js';
import generator from './lib/generator.js';
import hash from './lib/hash.js';
import hash0 from './lib/hash0.js';
import range from './lib/transforms/range.js';
import uint from './lib/transforms/uint.js';
import list from './lib/transforms/list.js';
import bool from './lib/transforms/bool.js';
import clamp from './lib/transforms/clamp.js';

import { ME } from './lib/constants.js';

test.skip('Find interger limits', (t) => {
  // This is slow but usefull to find where the min & max integers are to confirm the range of the PRNG is [0,0xffffffff]
  t.timeout('200s');
  const limit = 0xffffffff; // 4294967295
  let min = undefined;
  let max = undefined;
  let n = 0;
  let r = 0;
  for (n = 0; n <= limit; n++) {
    r = hash0(n);
    if (r == 0) {
      min = n;
    }
    if (r == limit) {
      max = n;
    }
    if (r < 0 || r > limit) {
      t.fail(`Unexpected result: ${r}`);
    }
  }
  console.log(`Limits found: ${min} ${max}`);
  t.pass(`Limits found: ${min} ${max}`);
});

test('Test found integer limits', (t) => {
  // Locations found from the above test
  const minSeed = 3920205903;
  const maxSeed = 3110158695;
  t.is(hash0(minSeed), 0);
  t.is(hash0(maxSeed), 0xffffffff); // 4294967295
});

test('Test 32 bit overflows', (t) => {
  t.is(hash0(0), hash0(0xffffffff + 1));
  t.is(hash0(-1), hash0(0xffffffff));
});

test('Test hash[] and hash0 are equal', (t) => {
  t.is(hash0(0), hash(0));
  t.is(hash0(10), hash(10, []));
  t.is(hash0(0xffffffff), hash(0xffffffff, []));
});

test('Test random seed works', (t) => {
  const A = seeded(0);
  const B = seeded(0);

  t.is(A.random(), B.random());
  t.is(A.random(), B.random());

  t.not(A.random(), A.random());
});

test('Test random increment works', (t) => {
  const A = seeded(0);

  t.not(A.random(), A.random());
});

test('Test randomRange inclusive [0-1] range is different to default random [0-1) float exclusive range', (t) => {
  // Setup 2 seeded PRNGs from the same seed
  const A = seeded(0);
  const B = seeded(0);

  t.is(A.random(), B.random());
  t.is(A.random(range(0, 1)), B.random(range(0, 1)));
  t.is(A.random(range(10, 100)), B.random(range(10, 100)));

  t.not(A.random(), B.random(range(0, 1)));
  t.not(A.random(range(0, 1)), B.random(range(10, 100)));
});

test('Test we can save and load state', (t) => {
  const A = seeded(0);
  A.random();
  A.random();
  const B = seeded(0, A.state());

  t.is(A.random(), B.random());
  A.random();
  A.random();
  t.not(A.random(), B.random());

  A.state(50);
  B.state(50);
  t.is(A.state(), 50);
  t.is(B.state(), 50);

  t.is(A.random(), B.random());
});

test('Snapshot floats', (t) => {
  const A = seeded(0);

  for (let n = 0; n < 10; n++) t.snapshot(A.random());
});

test('Snapshot uints', (t) => {
  const A = seeded(0);

  for (let n = 0; n < 10; n++) t.snapshot(A.random(uint()));
});

test('Snapshot range', (t) => {
  const A = seeded(0);
  // Note that range(0,0) == 0 is correct!
  for (let n = 0; n < 10; n++) t.snapshot(A.random(range(0, n)));
  // Ranges should go -ve & float
  for (let n = 0; n < 10; n++) t.snapshot(A.random(range(-n / 2.53, n * 2.74)));
});

test('Snapshot clamp', (t) => {
  const A = seeded(0);
  // Note that clamp(0,0) == 0 is correct!
  for (let n = 0; n < 10; n++) t.snapshot(A.random(clamp(0, n)));
});

test('Snapshot bool', (t) => {
  const A = seeded(0);
  for (let n = 0; n < 10; n++) t.snapshot(A.random(bool()));
});

test('Snapshot list', (t) => {
  const A = seeded(0);

  for (let n = 0; n < 10; n++) t.snapshot(A.random(list(n)));
});

test('Snapshot uint list', (t) => {
  const A = seeded(0);

  for (let n = 0; n < 10; n++) t.snapshot(A.random(list(n, uint())));
});

test('Snapshot 2d list of uints', (t) => {
  const A = seeded(0);

  t.snapshot(A.random(list(3, list(3, uint()))));
});

test('Test uint transform works', (t) => {
  const A = seeded(0);
  const B = seeded(0);
  //console.log(A.random(uint()), B.random());

  // Snapshot values for seeded(0,0).random() and seeded(0,0).random(uint())
  t.is(0.03452833951450884, 148298089 * ME);
  t.is(A.random(uint()), 148298089);
  t.is(B.random(), 0.03452833951450884);

  t.not(A.random(uint()), B.random());
});

test('Test list transform', (t) => {
  const A = seeded(0);
  const l = A.random(list(3));
  // First 3 snapshot floats
  t.is(l[0], 0.03452833951450884);
  t.is(l[1], 0.9520792111288756);
  t.is(l[2], 0.12287149345502257);
});

test('Test list uint transform', (t) => {
  const A = seeded(0);
  const l = A.random(list(3, uint()));
  // First 3 snapshot uints
  t.is(l[0], 148298089);
  t.is(l[1], 4089149075);
  t.is(l[2], 527729046);
});

test('Test bool transform', (t) => {
  const A = seeded(0);
  // First 3 snapshot bools
  t.is(A.random(bool()), true);
  t.is(A.random(bool()), true);
  t.is(A.random(bool()), false);
});

test('Generator', (t) => {
  // Remember to provide an end counter if you want it to stop
  const A = generator(0, 0, 5);

  // for (const rnd of A) {
  //   console.log(rnd);
  // }

  //A.next().value;

  t.snapshot(Array.from(A));
});
