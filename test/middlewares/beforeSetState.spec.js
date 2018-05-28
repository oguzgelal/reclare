import createContext from '../../src/ctx/createContext';
import setState from '../../src/state/setState';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('beforeSetState', () => {
  it('should run with correct parameters', done => {
    const mockFn = jest.fn();
    const initialState = { count: 0 };
    const nextState = { count: 1 };
    const ctx = createContext({
      initialState,
      middlewares: {
        [hookTypes.BEFORE_SET_STATE]: mockFn
      }
    });

    setState({ nextState });

    setTimeout(() => {
      expect(mockFn).toBeCalled();
      const params = mockFn.mock.calls[0][0];
      expect(params).toHaveProperty('ctx');
      expect(params).toHaveProperty('state');
      expect(params).toHaveProperty('nextState');
      expect(params.ctx.id).toBe(ctx.id);
      expect(params.state).toEqual(initialState);
      expect(params.nextState).toEqual(nextState);
      done();
    });
  });
});
