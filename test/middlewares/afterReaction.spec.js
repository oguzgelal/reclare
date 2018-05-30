import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { ON_EVENT } from '../../src/config/constants';

describe('afterReaction', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      initialState: { count: 0 },
      [ON_EVENT]: [
        {
          on: 'increment',
          reaction: () => {}
        }
      ],
      middlewares: {
        [hookTypes.AFTER_REACTION]: params => {
          expect(params).toHaveProperty('prevState', { count: 0 });
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

  it('should run for every reaction', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      initialState: { count: 0 },
      [ON_EVENT]: [
        {
          on: 'increment',
          reaction: [() => {}, () => {}]
        },
        {
          on: 'increment',
          reaction: () => {}
        }
      ],
      middlewares: {
        [hookTypes.AFTER_REACTION]: mockFn
      }
    });
    ctx.broadcast('increment', { dx: 1 });
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
