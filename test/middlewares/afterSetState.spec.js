import createContext from '../../src/ctx/createContext';
import setState from '../../src/state/setState';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('afterSetState', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const initialState = { count: 0 };
    const nextState = { count: 1 };
    const ctx = createContext({
      initialState,
      middlewares: {
        [hookTypes.AFTER_SET_STATE]: params => {
          expect(params).toHaveProperty('prevState', initialState);
          expect(params).toHaveProperty('state', nextState);
          mockFn(params);
        }
      }
    });
    setState({ nextState });
    expect(mockFn).toBeCalled();
    const params = mockFn.mock.calls[0][0];
    expect(params).toHaveProperty('ctx.id', ctx.id);
  });
});
