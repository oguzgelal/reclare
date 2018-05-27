import createContext from '../../src/ctx/createContext';

describe('parseSituation', () => {
  it('should parse situations on false / falsy', () => {
    const ctx = createContext({
      onEvent: [
        { on: 'test1', situation: false },
        { on: 'test2', situation: null },
        { on: 'test3', situation: '' },
        { on: 'test4', situation: 0 },
        { on: 'test5', situation: undefined },
        { on: 'test6' }
      ]
    });
    expect(ctx.onEvent['test1'][0].situations.length).toBe(1);
    expect(ctx.onEvent['test2'][0].situations.length).toBe(1);
    expect(ctx.onEvent['test3'][0].situations.length).toBe(1);
    expect(ctx.onEvent['test4'][0].situations.length).toBe(1);
    expect(ctx.onEvent['test5'][0].situations.length).toBe(1);
    expect(ctx.onEvent['test6'][0].situations.length).toBe(0);
  });
});
