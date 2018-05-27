import createContext from '../../src/ctx/createContext';
import registerMiddlewares from '../../src/middlewares/registerMiddlewares';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { MISSING_MIDDLEWARE_CONFIG } from '../../src/utils/alert';

describe('registerMiddlewares', () => {
  it('should fail when invalid middleware passed', () => {
    const ctx = createContext({});
    expect(() => ctx.registerMiddlewares()).toThrow(MISSING_MIDDLEWARE_CONFIG);
  });

  it('should register single function', () => {
    const ctx = createContext({});
    ctx.registerMiddlewares({
      [hookTypes.BEFORE_START]: () => {}
    });

    expect(ctx.hooks[hookTypes.BEFORE_START].length).toBe(1);
    expect(typeof ctx.hooks[hookTypes.BEFORE_START][0]).toBe('function');
  });

  it('should register multiple functions', () => {
    const ctx = createContext({});
    ctx.registerMiddlewares({
      [hookTypes.BEFORE_START]: [() => {}, () => {}]
    });

    expect(ctx.hooks[hookTypes.BEFORE_START].length).toBe(2);
    expect(typeof ctx.hooks[hookTypes.BEFORE_START][0]).toBe('function');
  });

  it('should detect active context', () => {
    const ctx = createContext({});
    registerMiddlewares({
      [hookTypes.BEFORE_START]: () => {}
    });

    expect(ctx.hooks[hookTypes.BEFORE_START].length).toBe(1);
    expect(typeof ctx.hooks[hookTypes.BEFORE_START][0]).toBe('function');
  });
});
