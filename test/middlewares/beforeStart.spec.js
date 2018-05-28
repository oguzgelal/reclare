import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('beforeStart', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      middlewares: {
        [hookTypes.BEFORE_START]: mockFn
      }
    });
    expect(mockFn).toBeCalled();
    const params = mockFn.mock.calls[0][0];
    expect(params).toHaveProperty('ctx.id', ctx.id);
  });
});
