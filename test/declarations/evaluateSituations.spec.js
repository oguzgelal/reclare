import createContext from '../../src/ctx/createContext';
import { and, or, not } from '../../src/utils/operators';

describe('evaluateSituations', () => {
  test('situations should work with booleans', () => {
    const mockSitTrue = jest.fn();
    const mockSitFalse = jest.fn();
    const ctx = createContext({
      onEvent: [
        {
          on: 'testTrue',
          situation: true,
          reaction: mockSitTrue
        },
        {
          on: 'testFalse',
          situation: false,
          reaction: mockSitFalse
        }
      ]
    });
    ctx.broadcast('testTrue');
    ctx.broadcast('testFalse');
    expect(mockSitTrue).toBeCalled();
    expect(mockSitFalse).not.toBeCalled();
  });

  test('situations should work with functions', () => {
    const mockSitTrue = jest.fn();
    const mockSitFalse = jest.fn();
    const ctx = createContext({
      onEvent: [
        {
          on: 'testTrue',
          situation: () => true,
          reaction: mockSitTrue
        },
        {
          on: 'testFalse',
          situation: () => false,
          reaction: mockSitFalse
        }
      ]
    });
    ctx.broadcast('testTrue');
    ctx.broadcast('testFalse');
    expect(mockSitTrue).toBeCalled();
    expect(mockSitFalse).not.toBeCalled();
  });

  test('situations should work with truthy / falsy values', () => {
    const mockSitTrue = jest.fn();
    const mockSitFalse = jest.fn();
    const ctx = createContext({
      onEvent: [
        {
          on: 'testTrue',
          situation: 'hey',
          reaction: mockSitTrue
        },
        {
          on: 'testFalse',
          situation: 0,
          reaction: mockSitFalse
        }
      ]
    });
    ctx.broadcast('testTrue');
    ctx.broadcast('testFalse');
    expect(mockSitTrue).toBeCalled();
    expect(mockSitFalse).not.toBeCalled();
  });

  test('situations should work with operators', () => {
    const mockSitTrue = jest.fn();
    const mockSitFalse = jest.fn();
    const ctx = createContext({
      onEvent: [
        {
          on: 'testTrue',
          situation: and(true, true, or(true, false)),
          reaction: mockSitTrue
        },
        {
          on: 'testFalse',
          situation: not(and(true, true, or(true, false))),
          reaction: mockSitFalse
        }
      ]
    });
    ctx.broadcast('testTrue');
    ctx.broadcast('testFalse');
    expect(mockSitTrue).toBeCalled();
    expect(mockSitFalse).not.toBeCalled();
  });

  test('omitting situation should evaluate to true', () => {
    const mock = jest.fn();
    const ctx = createContext({
      onEvent: [
        {
          on: 'test',
          reaction: mock
        }
      ]
    });
    ctx.broadcast('test');
    expect(mock).toBeCalled();
  });
});
