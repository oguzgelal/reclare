import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { ON_EVENT } from '../../src/config/constants';

describe('afterReducer', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      initialState: {
        count: 0
      },
      [ON_EVENT]: [
        {
          on: 'increment',
          reducer: ({ state }) => ({ ...state, count: state.count + 1 })
        }
      ],
      middlewares: {
        [hookTypes.AFTER_REDUCER]: params => {
          expect(params).toHaveProperty('ctx.state', { count: 1 });
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

  it('should run for every reducer', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      initialState: {
        count: 0
      },
      [ON_EVENT]: [
        {
          on: 'increment',
          reducer: [
            ({ state }) => ({ ...state, count: state.count + 1 }),
            ({ state }) => ({ ...state, count: state.count + 1 })
          ]
        },
        {
          on: 'increment',
          reducer: ({ state }) => ({ ...state, count: state.count + 1 })
        }
      ],
      middlewares: {
        [hookTypes.AFTER_REDUCER]: mockFn
      }
    });
    ctx.broadcast('increment', { dx: 1 });
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
