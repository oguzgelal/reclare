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
});
