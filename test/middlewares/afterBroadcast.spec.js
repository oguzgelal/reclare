import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('afterBroadcast', () => {
  it('should run with correct parameters', done => {
    const mockFn = jest.fn();
    const ctx = createContext({
      middlewares: {
        [hookTypes.AFTER_BROADCAST]: mockFn
      },
      onEvent: [
        {
          on: 'increment'
        }
      ]
    });

    ctx.broadcast('increment', { dx: 1 });

    setTimeout(() => {
      expect(mockFn).toBeCalled();
      const params = mockFn.mock.calls[0][0];
      expect(params).toHaveProperty('ctx');
      expect(params).toHaveProperty('eventKey');
      expect(params).toHaveProperty('payload');
      expect(params.ctx.id).toBe(ctx.id);
      expect(params.eventKey).toBe('increment');
      expect(params.payload).toEqual({ dx: 1 });
      done();
    });
  });
});
