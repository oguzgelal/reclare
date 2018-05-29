import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('afterBroadcast', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      onEvent: [{ on: 'increment' }],
      middlewares: {
        [hookTypes.AFTER_BROADCAST]: params => {
          expect(params).toHaveProperty('eventKey', 'increment');
          expect(params).toHaveProperty('payload', { dx: 1 });
          mockFn(params);
        }
      }
    });

    ctx.broadcast('increment', { dx: 1 });
    expect(mockFn).toBeCalled();
    const params = mockFn.mock.calls[0][0];
    expect(params).toHaveProperty('ctx.id', ctx.id);
  });
});