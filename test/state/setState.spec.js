import createContext from '../../src/ctx/createContext';
import setState from '../../src/state/setState';

describe('setState', () => {
  it('should set the state', () => {
    const ctx = createContext({
      initialState: {
        count: 0
      }
    });
    setState({
      ctx,
      nextState: {
        count: 1
      }
    });
    const newState = ctx.getState();
    expect(newState).toEqual({ count: 1 });
  });

  it('should pick up the global context', () => {
    const ctx = createContext({
      initialState: {
        count: 0
      }
    });
    setState({
      nextState: {
        count: 1
      }
    });
    const newState = ctx.getState();
    expect(newState).toEqual({ count: 1 });
  });
});
