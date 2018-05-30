import createContext from '../../src/ctx/createContext';
import {
  DECLARATION_NO_KEY,
  ON_STATE_CHANGE
} from '../../src/config/constants';

describe('parseSubscriptionDeclarations', () => {
  it('should not fail when `on` is omitted', () => {
    expect(() =>
      createContext({
        [ON_STATE_CHANGE]: [{}]
      })
    ).not.toThrow();
  });

  it('should organise declaration with no key correctly', () => {
    const ctx = createContext({
      [ON_STATE_CHANGE]: [{}, {}, {}]
    });
    expect(ctx[ON_STATE_CHANGE][DECLARATION_NO_KEY].length).toBe(3);
  });
});
