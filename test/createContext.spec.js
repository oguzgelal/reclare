import createContext from '../src/ctx/createContext';
import { INVALID_DECLARATION_ARGUMENT } from '../src/utils/alert';

describe('createContext', () => {
  it('should start the library', () => {
    const ctx = createContext({});
    expect(ctx.started).toBe(true);
  });

  it('should fail when invalid declaration provided', () => {
    expect(() => createContext({ onEvent: 'not an object array' })).toThrow(
      INVALID_DECLARATION_ARGUMENT
    );
  });
});
