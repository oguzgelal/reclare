import createContext from '../../src/ctx/createContext';
import subscribe from '../../src/subscriptions/subscribe';
import {
  ON_STATE_CHANGE,
  DECLARATION_NO_KEY
} from '../../src/config/constants';

describe('subscribe', () => {
  it('should accept subscription from `createContext`', () => {
    const ctx = createContext({
      [ON_STATE_CHANGE]: [{}, {}]
    });
    expect(ctx[ON_STATE_CHANGE][DECLARATION_NO_KEY].length).toBe(2);
  });

  it('should accept subscriptions from `subscribe`', () => {
    const ctx = createContext({});
    ctx.subscribe([{}, {}]);
    expect(ctx[ON_STATE_CHANGE][DECLARATION_NO_KEY].length).toBe(2);
  });

  it('should merge subscriptions', () => {
    const ctx = createContext({
      [ON_STATE_CHANGE]: [{}, {}]
    });
    ctx.subscribe([{}, {}]);
    expect(ctx[ON_STATE_CHANGE][DECLARATION_NO_KEY].length).toBe(4);
  });

  it('should pick up global context', () => {
    const ctx = createContext({});
    subscribe([{}, {}]);
    expect(ctx[ON_STATE_CHANGE][DECLARATION_NO_KEY].length).toBe(2);
  });
});
