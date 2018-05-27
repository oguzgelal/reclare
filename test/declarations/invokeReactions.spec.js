import createContext from '../../src/ctx/createContext';

describe('invokeReactions', () => {
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
