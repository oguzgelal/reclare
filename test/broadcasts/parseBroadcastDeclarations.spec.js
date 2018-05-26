import createContext from '../../src/ctx/createContext';
import { MISSING_TRIGGER } from '../../src/utils/alert';

describe('parseBroadcastDeclarations', () => {
  it('should fail when `on` is omitted', () => {
    expect(() => {
      createContext({
        onEvent: [{}]
      });
    }).toThrow(MISSING_TRIGGER);
  });
});
