import createContext from '../../src/ctx/createContext';
import registerHooks from '../../src/middlewares/registerHooks';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { INVALID_HOOK } from '../../src/utils/alert';

describe('registerHooks', () => {
  it('should fail on invalid input', () => {
    const ctx = createContext({});
    expect(() =>
      ctx.registerHooks(hookTypes.BEFORE_START, 'not a func or func arr')
    ).toThrow(INVALID_HOOK);
  });

  it('should detect active context', () => {
    const _ctx = createContext({});
    registerHooks([hookTypes.BEFORE_BROADCAST], ({ ctx }) => {
      expect(ctx.id).toBe(_ctx.id);
    });
    _ctx.broadcast('increment');
  });
});
