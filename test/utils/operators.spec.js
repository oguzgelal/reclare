import { and, or, not } from '../../src/utils/operators';

describe('operators', () => {
  test('and operator should work', () => {
    // should return evaluater function
    expect(typeof and(true) === 'function');

    // when one or many non-function arguments received,
    // it should evaluate their truthy values
    expect(and(true)()).toBe(true);
    expect(and('hey')()).toBe(true);
    expect(and('')()).toBe(false);
    expect(and(false)()).toBe(false);
    expect(and(null)()).toBe(false);
    expect(and(undefined)()).toBe(false);
    expect(and(true, true)()).toBe(true);
    expect(and(true, 'hey')()).toBe(true);
    expect(and(true, false)()).toBe(false);
    expect(and([true, false], [true, true], true)()).toBe(false);

    // when one or many function arguments are
    // received, it should evaluate their values
    expect(and(() => true)()).toBe(true);
    expect(and(() => false)()).toBe(false);
    expect(and(() => true, () => true)()).toBe(true);
    expect(and(() => true, () => false)()).toBe(false);
    expect(and(true, () => true)()).toBe(true);
    expect(and(true, () => false)()).toBe(false);
    expect(and(false, () => true)()).toBe(false);
    expect(and(true, () => 'hey')()).toBe(true);
    expect(and(false, () => 'hey')()).toBe(false);
    expect(and(true, () => '')()).toBe(false);
  });

  test('or operator should work', () => {
    // should return evaluater function
    expect(typeof or(true) === 'function');

    // when one or many non-function arguments received,
    // it should evaluate their truthy values
    expect(or(true)()).toBe(true);
    expect(or('hey')()).toBe(true);
    expect(or('')()).toBe(false);
    expect(or(false)()).toBe(false);
    expect(or(null)()).toBe(false);
    expect(or(undefined)()).toBe(false);
    expect(or(true, true)()).toBe(true);
    expect(or(true, 'hey')()).toBe(true);
    expect(or(true, false)()).toBe(true);
    expect(or(false, false)()).toBe(false);
    expect(or([true, false], [true, true], true)()).toBe(true);

    // when one or many function arguments are
    // received, it should evaluate their values
    expect(or(() => true)()).toBe(true);
    expect(or(() => false)()).toBe(false);
    expect(or(() => true, () => true)()).toBe(true);
    expect(or(() => true, () => false)()).toBe(true);
    expect(or(() => false, () => false)()).toBe(false);
    expect(or(true, () => true)()).toBe(true);
    expect(or(true, () => false)()).toBe(true);
    expect(or(false, () => true)()).toBe(true);
    expect(or(true, () => 'hey')()).toBe(true);
    expect(or(false, () => 'hey')()).toBe(true);
    expect(or(true, () => '')()).toBe(true);
    expect(or(false, () => '')()).toBe(false);
  });

  test('not operator should work', () => {
    // should return evaluater function
    expect(typeof not(true) === 'function');

    // when one or many non-function arguments received,
    // it should evaluate their truthy values
    expect(not(true)()).toBe(false);
    expect(not(false)()).toBe(true);
    expect(not('hey')()).toBe(false);
    expect(not('')()).toBe(true);

    // When the argument is an array, `not` operator should be recursively
    // called on all its values, and the negation array will be returned
    expect(not([true, false, false])()).toEqual([false, true, true]);
    expect(not([true, false, () => false])()).toEqual([false, true, true]);
    expect(not(['', 'hey', () => false])()).toEqual([true, false, true]);
  });

  test('composing operators should work', () => {
    expect(and(true, and(true, true))()).toBe(true);
    expect(and(true, and(true, false))()).toBe(false);
    expect(and(true, not(and(true, false)))()).toBe(true);
    expect(or(true, not(and(true, or(false, true))))()).toBe(true);
    expect(or('hey', not(and(() => true, or(() => null, true))))()).toBe(true);
  });
});
