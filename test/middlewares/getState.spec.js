import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('getState', () => {
  it('should run with correct parameters', done => {
    const mockFn = jest.fn();
    const ctx = createContext({
      middlewares: {
        [hookTypes.GET_STATE]: mockFn
      }
    });
    const state = ctx.getState();
    setTimeout(() => {
      expect(mockFn).toBeCalled();
      const params = mockFn.mock.calls[0][0];
      expect(params).toHaveProperty('ctx');
      expect(params).toHaveProperty('state');
      expect(params.ctx.id).toBe(ctx.id);
      expect(params.state).toEqual(state);
      expect(params.state).toEqual(ctx.state);
      done();
    });
  });
});
