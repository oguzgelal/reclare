import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('beforeStart', () => {
  it('should run with correct parameters', done => {
    const mockFn = jest.fn();
    const ctx = createContext({
      middlewares: {
        [hookTypes.BEFORE_START]: mockFn
      }
    });
    setTimeout(() => {
      expect(mockFn).toBeCalled();
      const params = mockFn.mock.calls[0][0];
      expect(params).toHaveProperty('ctx');
      expect(params.ctx.id).toBe(ctx.id);
      done();
    });
  });
});
