/**
 * Takes in a set of values, returns a function that returns true if
 * all values are true or evaluates to true. If an array is provided
 * (of any dimension) it will be flattened recursively.
 * 
 * @example
 * {
    // ...
    situation: and(
      ({ state }) => state.count < 10,
      ({ state }) => state.count >= 0,
    ),
    // ...
  },
 */

export const and = (...values) => (...args) =>
  values.every(v => {
    if (Array.isArray(v)) {
      return and(...v)(...args);
    }
    if (typeof v === 'function') {
      return v(...args);
    }
    return !!v;
  });

/**
 * Takes in a set of values, returns a function that true if some
 * values are true or evaluates to true. If an array is provided
 * (of any dimension) it will be flattened recursively.
 * 
 * @example
 * {
    // ...
    situation: and(
      ({ event }) => !event.halt,
      or(
        ({ state }) => state.count < 10,
        ({ state }) => state.count >= 0,
      )
    ),
    // ...
  },
 */

export const or = (...values) => (...args) =>
  values.some(v => {
    if (Array.isArray(v)) {
      return or(...v)(...args);
    }
    if (typeof v === 'function') {
      return v(...args);
    }
    return !!v;
  });

/**
 * Takes in any value, returns a function which returns the 
 * negation of the provided argument.
 * 
 * @example <caption>
 * When the argument is a function, its value will be evaluated
 * and the output will be negated
 * </caption>
 * not(() => false)() // returns true
 * not(() => 'test')() // returns false
 * 
 * @example <caption>
 * When the argument is an array, `not` operator will be recursively
 * called on all its values, and the negation array will be returned
 * </caption>
 * not([true, false, true])() // returns [false, true, false]
 * not([true, () => false, true])() // returns [false, true, false]
 * 
 * @example <caption>
 * When an argument isn't both, its truthy / falsy value will be negated
 * </caption>
 * not(42)() // returns false
 * not('')() // returs true
 * 
 *  @example
 * {
    // ...
    situation: and(
      not(({ event }) => event.halt),
      or(
        ({ state }) => state.count < 10,
        ({ state }) => state.count >= 0,
      )
    ),
    // ...
  },
 */

export const not = value => (...args) => {
  if (Array.isArray(value)) {
    return value.map(v => not(v)(...args));
  }
  if (typeof value === 'function') {
    return !value(...args);
  }
  return !value;
};
