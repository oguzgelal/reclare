import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('verbose', () => {
  it('should run', () => {
    const mockFn = jest.fn();
    createContext({
      middlewares: {
        [hookTypes.VERBOSE]: mockFn
      }
    });
    expect(mockFn).toBeCalled();
  });
});
