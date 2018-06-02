import createContext from '../../src/ctx/createContext';
import { ON_STATE_CHANGE, ON_EVENT } from '../../src/config/constants';

describe('invokeSubscriptions', () => {
  it('should invoke subscriptions on state change', () => {
    const mock = jest.fn();
    const ctx = createContext({
      initialState: { counter: 0 },
      [ON_EVENT]: [
        {
          on: 'increment',
          reducer: ({ state }) => ({ ...state, counter: state.counter + 1 })
        }
      ],
      [ON_STATE_CHANGE]: [{ reaction: mock }]
    });
    ctx.broadcast('increment');
    expect(mock).toHaveBeenCalled();
  });

  it('should not fail when no subscriptions are provided', () => {
    const ctx = createContext({
      initialState: { counter: 0 },
      [ON_EVENT]: [
        {
          on: 'increment',
          reducer: ({ state }) => ({ ...state, counter: state.counter + 1 })
        }
      ]
    });
    const ctx2 = createContext({
      initialState: { counter: 0 },
      [ON_STATE_CHANGE]: [],
      [ON_EVENT]: [
        {
          on: 'increment',
          reducer: ({ state }) => ({ ...state, counter: state.counter + 1 })
        }
      ]
    });
    expect(() => {
      ctx.broadcast('increment');
    }).not.toThrow();
    expect(() => {
      ctx2.broadcast('increment');
    }).not.toThrow();
  });
});
