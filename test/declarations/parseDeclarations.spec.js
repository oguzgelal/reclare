import createContext from '../../src/ctx/createContext';
import {
  INVALID_DECLARATION_ARGUMENT,
  INVALID_DECLARATION,
  INVALID_TRIGGER
} from '../../src/utils/alert';

describe('parseDeclarations', () => {
  it('should throw error on invalid declaration array', () => {
    expect(() =>
      createContext({
        onEvent: 'not an object array'
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        onEvent: {}
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        onStateChange: 'not an object array'
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        onStateChange: {}
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        onImmediateStateChange: 'not an object array'
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
    expect(() =>
      createContext({
        onImmediateStateChange: {}
      })
    ).toThrow(INVALID_DECLARATION_ARGUMENT);
  });

  it('should fail on invalid declaration', () => {
    expect(() =>
      createContext({
        onEvent: ['not an object']
      })
    ).toThrow(INVALID_DECLARATION);
    expect(() =>
      createContext({
        onEvent: [
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
      onEvent: [
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
      onEvent: [
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

    const declarations = ctx.onEvent['page-load'];
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
      onEvent: [
        { on: ['a', 'b', 'c'] },
        { on: ['b', 'c', 'd'] },
        { on: 'a' },
        { on: 'c' },
        { on: 'c' },
        { on: ['a', 'd'] }
      ]
    });

    expect(ctx.onEvent.a.length).toBe(3);
    expect(ctx.onEvent.b.length).toBe(2);
    expect(ctx.onEvent.c.length).toBe(4);
    expect(ctx.onEvent.d.length).toBe(2);
  });
});
