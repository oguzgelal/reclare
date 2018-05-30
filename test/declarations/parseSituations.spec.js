import createContext from '../../src/ctx/createContext';
import { ON_EVENT } from '../../src/config/constants';

describe('parseSituation', () => {
  it('should parse situations on false / falsy', () => {
    const ctx = createContext({
      [ON_EVENT]: [
        { on: 'test1', situation: false },
        { on: 'test2', situation: null },
        { on: 'test3', situation: '' },
        { on: 'test4', situation: 0 },
        { on: 'test5', situation: undefined },
        { on: 'test6' }
      ]
    });
    expect(ctx[ON_EVENT]['test1'][0].situations.length).toBe(1);
    expect(ctx[ON_EVENT]['test2'][0].situations.length).toBe(1);
    expect(ctx[ON_EVENT]['test3'][0].situations.length).toBe(1);
    expect(ctx[ON_EVENT]['test4'][0].situations.length).toBe(1);
    expect(ctx[ON_EVENT]['test5'][0].situations.length).toBe(1);
    expect(ctx[ON_EVENT]['test6'][0].situations.length).toBe(0);
  });
});
