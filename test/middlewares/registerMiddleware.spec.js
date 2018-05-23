import createContext from '../../src/ctx/createContext';
import registerMiddleware from '../../src/middlewares/registerMiddleware';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { MISSING_MIDDLEWARE_CONFIG } from '../../src/utils/alert';

describe('registerMiddleware', () => {
  it('should fail when invalid middleware passed', () => {
    const ctx = createContext({});
    expect(() => ctx.registerMiddleware()).toThrow(MISSING_MIDDLEWARE_CONFIG);
  });

  it('should register single function', () => {
    const ctx = createContext({});
    ctx.registerMiddleware({
      [hookTypes.BEFORE_START]: () => {}
    });

    expect(ctx.hooks[hookTypes.BEFORE_START].length).toBe(1);
    expect(typeof ctx.hooks[hookTypes.BEFORE_START][0]).toBe('function');
  });

  it('should register multiple functions', () => {
    const ctx = createContext({});
    ctx.registerMiddleware({
      [hookTypes.BEFORE_START]: [() => {}, () => {}]
    });

    expect(ctx.hooks[hookTypes.BEFORE_START].length).toBe(2);
    expect(typeof ctx.hooks[hookTypes.BEFORE_START][0]).toBe('function');
  });

  it('should detect active context', () => {
    const ctx = createContext({});
    registerMiddleware({
      [hookTypes.BEFORE_START]: () => {}
    });

    expect(ctx.hooks[hookTypes.BEFORE_START].length).toBe(1);
    expect(typeof ctx.hooks[hookTypes.BEFORE_START][0]).toBe('function');
  });
});
