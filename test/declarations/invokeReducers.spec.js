import createContext from '../../src/ctx/createContext';
import { INVALID_REDUCER } from '../../src/utils/alert';
import { ON_EVENT } from '../../src/config/constants';

describe('invokeReducers', () => {
  it('should fail on invalid reducer', () => {
    const ctx = createContext({
      initialState: { count: 0 },
      [ON_EVENT]: [
        {
          on: 'increment',
          reducer: ['not func or func array']
        }
      ]
    });
    expect(() => ctx.broadcast('increment')).toThrow(INVALID_REDUCER);
  });

  test('reactions should receive current state', done => {
    const ctx = createContext({
      initialState: { count: 0 },
      [ON_EVENT]: [
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
