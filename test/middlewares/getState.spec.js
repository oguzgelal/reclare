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
      expect(params).toHaveProperty('ctx.id', ctx.id);
      expect(params).toHaveProperty('state', state);
      expect(params).toHaveProperty('state', ctx.state);
      done();
    });
  });
});
