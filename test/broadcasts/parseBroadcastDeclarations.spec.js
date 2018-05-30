import createContext from '../../src/ctx/createContext';
import { MISSING_TRIGGER } from '../../src/utils/alert';
import { ON_EVENT } from '../../src/config/constants';

describe('parseBroadcastDeclarations', () => {
  it('should fail when `on` is omitted', () => {
    expect(() => {
      createContext({
        [ON_EVENT]: [{}]
      });
    }).toThrow(MISSING_TRIGGER);
  });
});
