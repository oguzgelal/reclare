import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('beforeBroadcast', () => {
  it('should run with correct parameters', done => {
    const mockFn = jest.fn();
    const ctx = createContext({
      onEvent: [{ on: 'increment' }],
      middlewares: {
        [hookTypes.BEFORE_BROADCAST]: mockFn
      }
    });

    ctx.broadcast('increment', { dx: 1 });

    setTimeout(() => {
      expect(mockFn).toBeCalled();
      const params = mockFn.mock.calls[0][0];
      expect(params).toHaveProperty('ctx.id', ctx.id);
      expect(params).toHaveProperty('eventKey', 'increment');
      expect(params).toHaveProperty('payload', { dx: 1 });
      done();
    });
  });
});
