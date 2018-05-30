import createContext from '../../src/ctx/createContext';
import {
  ON_EVENT,
  ON_STATE_CHANGE,
  ON_IMMEDIATE_STATE_CHANGE
} from '../../src/config/constants';
import {
  INVALID_DECLARATION_ARGUMENT,
  INVALID_DECLARATION,
  INVALID_TRIGGER,
  INVALID_REACTION,
  INVALID_REDUCER
} from '../../src/utils/alert';

describe('parseDeclarations', () => {
  it('should throw error on invalid declaration array', () => {
    expect(() =>
      createContext({
        [ON_EVENT]: 'not an object array'
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        [ON_EVENT]: {}
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        [ON_STATE_CHANGE]: 'not an object array'
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        [ON_STATE_CHANGE]: {}
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        [ON_IMMEDIATE_STATE_CHANGE]: 'not an object array'
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        [ON_IMMEDIATE_STATE_CHANGE]: {}
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
  });

  it('should fail on invalid declaration', () => {
    expect(() =>
      createContext({
        [ON_EVENT]: ['not an object']
      })
    ).toThrow(INVALID_DECLARATION);
    expect(() =>
      createContext({
        [ON_EVENT]: [
          {
            on: () => alert('this is wrong')
          }
        ]
      })
    ).toThrow(INVALID_TRIGGER);
  });

  // Custom validator functions checks a declaration object is valid
  // for a given type. For example, if i wanted to disallow `on` keyword
  // for subscription declarations, i would add a check to the custom validator
  // at `/subscriptions/subscriptionHelpers` and fail if it exists
  it('should call custom declaration validators', () => {
    // Mock func to test custom validation calls
    const mockValidate = jest.fn();

    createContext({
      mockValidate,
      [ON_EVENT]: [
        {
          on: 'page-load',
          situation: ({ state }) => state.started === false,
          reaction: () => alert('starting...'),
          reactionElse: () => alert('already started'),
          reducer: ({ state }) => ({ ...state, started: true }),
          reducerElse: ({ state }) => ({ ...state, fails: state.fails + 1 })
        }
      ]
    });

    expect(mockValidate).toBeCalledWith(
      expect.objectContaining({
        declaration: expect.any(Object)
      })
    );
  });

  it('should parse single declaration', () => {
    const ctx = createContext({
      [ON_EVENT]: [
        {
          on: 'page-load',
          situation: ({ state }) => state.started === false,
          reaction: () => alert('starting...'),
          reactionElse: () => alert('already started'),
          reducer: ({ state }) => ({ ...state, started: true }),
          reducerElse: ({ state }) => ({ ...state, fails: state.fails + 1 })
        }
      ]
    });

    const declarations = ctx[ON_EVENT]['page-load'];
    const declaration = declarations[0];

    // declaration parsed correctly
    expect(declarations).toBeDefined();
    expect(declaration.situations).toBeDefined();
    expect(declaration.reactions).toBeDefined();
    expect(declaration.reactionsElse).toBeDefined();
    expect(declaration.reducers).toBeDefined();
    expect(declaration.reducersElse).toBeDefined();
    expect(declarations.length).toBe(1);
    expect(declaration.situations.length).toBe(1);
    expect(declaration.reactions.length).toBe(1);
    expect(declaration.reactionsElse.length).toBe(1);
    expect(declaration.reducers.length).toBe(1);
    expect(declaration.reducersElse.length).toBe(1);
  });

  it('should merge declarations by `on` key', () => {
    const ctx = createContext({
      [ON_EVENT]: [
        { on: ['a', 'b', 'c'] },
        { on: ['b', 'c', 'd'] },
        { on: 'a' },
        { on: 'c' },
        { on: 'c' },
        { on: ['a', 'd'] }
      ]
    });

    expect(ctx[ON_EVENT].a.length).toBe(3);
    expect(ctx[ON_EVENT].b.length).toBe(2);
    expect(ctx[ON_EVENT].c.length).toBe(4);
    expect(ctx[ON_EVENT].d.length).toBe(2);
  });

  it('should throw error on invalid reducer', () => {
    expect(() => {
      createContext({
        [ON_EVENT]: [
          {
            reducer: 'not a func or func array'
          }
        ]
      });
    }).toThrow(INVALID_REDUCER);
  });

  it('should throw error on invalid reaction', () => {
    expect(() => {
      createContext({
        [ON_EVENT]: [
          {
            reaction: 'not a func or func array'
          }
        ]
      });
    }).toThrow(INVALID_REACTION);
  });
});
