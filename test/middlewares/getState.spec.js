import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('getState', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      middlewares: {
        [hookTypes.GET_STATE]: params => {
          mockFn(params);
        }
      }
    });
    const state = ctx.getState();
    const params = mockFn.mock.calls[0][0];
    expect(params).toHaveProperty('ctx.id', ctx.id);
    expect(params).toHaveProperty('state', ctx.state);
    expect(params).toHaveProperty('state', state);
  });
});
