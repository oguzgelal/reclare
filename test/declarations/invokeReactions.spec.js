import createContext from '../../src/ctx/createContext';
import { INVALID_REACTION } from '../../src/utils/alert';

describe('invokeReactions', () => {
  it('should fail on invalid reaction', () => {
    const ctx = createContext({
      initialState: { count: 0 },
      onEvent: [
        {
          on: 'increment',
          reaction: ['not func or func array']
        }
      ]
    });
    expect(() => ctx.broadcast('increment')).toThrow(INVALID_REACTION);
  });

  test('reactions should receive current and previous state', done => {
    const ctx = createContext({
      initialState: { count: 0 },
      onEvent: [
        {
          on: 'increment',
          reducer: ({ state }) => ({ ...state, count: state.count + 1 }),
          reaction: ({ state, prevState }) => {
            expect(state.count).toBe(1);
            expect(prevState.count).toBe(0);
            done();
          }
        }
      ]
    });
    ctx.broadcast('increment');
  });
});
