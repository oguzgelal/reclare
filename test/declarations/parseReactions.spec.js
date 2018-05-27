import createContext from '../../src/ctx/createContext';
import { INVALID_REACTION } from '../../src/utils/alert';

describe('parseReaction', () => {
  it('should fail when invalid reaction passed', () => {
    expect(() =>
      createContext({
        onEvent: [
          {
            on: 'test',
            reaction: 'not a func or func array'
          }
        ]
      })
    ).toThrow(INVALID_REACTION);
  });

  it('should not fail when reaction is omitted', () => {
    expect(() =>
      createContext({
        onEvent: [
          {
            on: 'test'
          }
        ]
      })
    ).not.toThrow(INVALID_REACTION);
  });
});
