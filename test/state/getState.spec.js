import createContext from '../../src/ctx/createContext';
import getState from '../../src/state/getState';
import { CONTEXT_NOT_FOUND } from '../../src/utils/alert';

describe('getState', () => {
  it('should fail when global context do not exist', () => {
    expect(() => getState()).toThrow(CONTEXT_NOT_FOUND);
  });

  it('should return the state', () => {
    const ctx = createContext({
      initialState: { count: 0 }
    });
    expect(ctx.getState()).toEqual({ count: 0 });
  });

  it('should pick up the global context', () => {
    createContext({
      initialState: { count: 0 }
    });
    expect(getState()).toEqual({ count: 0 });
  });
});
