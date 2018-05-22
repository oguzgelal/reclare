import { and } from '../../src/utils/operators';

describe('operators', () => {
  test('and operator should work', () => {
    // should return evaluater function
    expect(typeof and(true) === 'function');
    // when one or many non-function arguments are
    // received, it should evaluate their truthy values
    expect(and(true)()).toBe(true);
    expect(and('hey')()).toBe(true);
    expect(and('')()).toBe(false);
    expect(and(false)()).toBe(false);
    expect(and(null)()).toBe(false);
    expect(and(undefined)()).toBe(false);
    expect(and(true, true)()).toBe(true);
    expect(and(true, 'hey')()).toBe(true);
    expect(and(true, false)()).toBe(false);
  });
});
