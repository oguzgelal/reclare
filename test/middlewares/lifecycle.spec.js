import createContext from '../../src/ctx/createContext';
import setState from '../../src/state/setState';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { ON_EVENT } from '../../src/config/constants';

describe('lifecycle', () => {
  test('`createContext` middlewares should run in correct order', done => {
    let order = '';
    createContext({
      middlewares: {
        [hookTypes.BEFORE_START]: () => {
          order += 'a';
        },
        [hookTypes.BEFORE_STATE]: () => {
          order += 'b';
        },
        [hookTypes.AFTER_START]: () => {
          order += 'c';
        }
      }
    });
    setTimeout(() => {
      expect(order).toBe('abc');
      done();
    });
  });

  test('`setState` middlewares should run in correct order', done => {
    let order = '';
    createContext({
      middlewares: {
        [hookTypes.BEFORE_SET_STATE]: () => {
          order += 'a';
        },
        [hookTypes.AFTER_SET_STATE]: () => {
          order += 'b';
        }
      }
    });
    setState({ nextState: { count: 0 } });
    setTimeout(() => {
      expect(order).toBe('ab');
      done();
    });
  });

  test('`broadcast` middlewares should run in correct order', done => {
    let order = '';
    const ctx = createContext({
      middlewares: {
        [hookTypes.BEFORE_BROADCAST]: () => {
          order += 'a';
        },
        [hookTypes.AFTER_BROADCAST]: () => {
          order += 'b';
        }
      },
      [ON_EVENT]: [{ on: 'increment' }]
    });

    ctx.broadcast('increment');

    setTimeout(() => {
      expect(order).toBe('ab');
      done();
    });
  });
});
