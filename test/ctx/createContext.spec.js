import global from '../../src/ctx';
import createContext from '../../src/ctx/createContext';
import { INVALID_CONFIG } from '../../src/utils/alert';

describe('createContext', () => {
  it('should fail when invalid config provided', () => {
    expect(() => createContext(null)).toThrow(INVALID_CONFIG);
    expect(() => createContext('not an object')).toThrow(INVALID_CONFIG);
  });

  it('should start the library', () => {
    const ctx = createContext({});
    expect(ctx.started).toBe(true);
  });

  it('should not register as active context when createOnly option provided', () => {
    const ctx = createContext({ createOnly: true });
    expect((global.ctx || {}).id).not.toBe(ctx.id);
  });

  it('should register as active context when createOnly option not provided', () => {
    const ctx = createContext({});
    expect(global.ctx.id).toBe(ctx.id);
  });

  it('should initialise state based on `initialState` option', () => {
    const ctx = createContext({ initialState: { bar: 'foo' } });
    const state = ctx.getState();
    expect(state.bar).toBe('foo');
  });
});
