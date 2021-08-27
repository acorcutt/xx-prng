import float from './transforms/float.js';

const t = float();

/**
 * Generate a simple seeded random number generator
 * - returns a function like Math.random() by default
 * - automatically increments the counter state
 * - provide transforms to random() to change the output
 * @param {number} seed
 * @param {number} state
 * @returns {{ random: function(function):number, counter:function(number):number}}
 */
export default function seeded(seed = Date.now(), counter = 0) {
  // State is object that gets mutated
  const State = { counter };

  return {
    // TODO - state should be object we can pass to transform
    random: (transform = t) => transform(seed, State),
    /**
     * Get or set the state.
     * @param {number} newState
     * @returns {number}
     */
    state: (counter = State.counter) => (State.counter = counter),
  };
}
