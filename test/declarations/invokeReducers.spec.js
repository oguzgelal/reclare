import createContext from '../../src/ctx/createContext';

describe('invokeReducers', () => {
  test('reactions should receive current state', done => {
    const ctx = createContext({
      initialState: { count: 0 },
      onEvent: [
        {
          on: 'increment',
          reducer: ({ state }) => {
            expect(state.count).toBe(0);
            done();
            return { ...state, count: state.count + 1 };
          }
        }
      ]
    });
    ctx.broadcast('increment');
  });
});
