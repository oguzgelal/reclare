import createContext from '../../src/ctx/createContext';
import { ON_EVENT, DUCKS } from '../../src/config/constants';

describe('parseDucks', () => {
  it('should work when ducks is omitted', () => {
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'd1' }, { on: ['d1', 'd2'] }]
    });
    expect(ctx[ON_EVENT]['d1'].length).toBe(2);
  });

  it('should merge declarations from the ducks', () => {
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'd1' }],
      [DUCKS]: [
        {
          [ON_EVENT]: [{ on: 'd2' }]
        }
      ]
    });
    expect(Object.keys(ctx[ON_EVENT]).length).toBe(2);
  });

  it('should merge declarations normally', () => {
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'd1' }, { on: ['d2', 'd3'] }],
      [DUCKS]: [
        {
          [ON_EVENT]: [{ on: 'd1' }, { on: 'd1' }, { on: ['d1', 'd2'] }]
        }
      ]
    });
    expect(ctx[ON_EVENT]['d1'].length).toBe(4);
    expect(ctx[ON_EVENT]['d2'].length).toBe(2);
    expect(ctx[ON_EVENT]['d3'].length).toBe(1);
  });

  it('should combine multiple ducks', () => {
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'd1' }],
      [DUCKS]: [{ [ON_EVENT]: [{ on: 'd1' }] }, { [ON_EVENT]: [{ on: 'd1' }] }]
    });
    expect(ctx[ON_EVENT]['d1'].length).toBe(3);
  });

  it('should ignore unwanted object properties', () => {
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'd1' }],
      [DUCKS]: [
        {
          [ON_EVENT]: [{ on: 'd1' }],
          test: () => {},
          bar: 'something',
          foo: 1
        }
      ]
    });
    expect(ctx[ON_EVENT]['d1'].length).toBe(2);
  });

  it('should initiate props if they are not defined', () => {
    const ctx = createContext({
      [DUCKS]: [
        {
          [ON_EVENT]: [{ on: 'd1' }]
        }
      ]
    });
    expect(ctx[ON_EVENT]['d1'].length).toBe(1);
  });

  it('should be able to parse composed ducks', () => {
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'd1' }],
      [DUCKS]: [
        {
          [ON_EVENT]: [{ on: 'd1' }],
          [DUCKS]: [
            {
              [ON_EVENT]: [{ on: 'd1' }],
              [DUCKS]: [
                {
                  [ON_EVENT]: [{ on: 'd1' }],
                  [DUCKS]: [
                    {
                      [ON_EVENT]: [{ on: 'd1' }]
                    }
                  ]
                }
              ]
            },
            {
              [ON_EVENT]: [{ on: 'd1' }],
              [DUCKS]: [
                {
                  [ON_EVENT]: [{ on: 'd1' }]
                }
              ]
            }
          ]
        }
      ]
    });
    expect(ctx[ON_EVENT]['d1'].length).toBe(7);
  });
});
