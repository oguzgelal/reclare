import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';
import { ON_EVENT } from '../../src/config/constants';

describe('declarationMiss', () => {
  it('should run with correct parameters', () => {
    const mockFn = jest.fn();
    const ctx = createContext({
      [ON_EVENT]: [{ on: 'increment' }],
      middlewares: {
        [hookTypes.DECLARATION_MISS]: params => {
          expect(params).toHaveProperty('eventKey', 'decrement');
          expect(params).toHaveProperty('payload', { dx: -1 });
          mockFn(params);
        }
      }
    });
    ctx.broadcast('decrement', { dx: -1 });
    expect(mockFn).toBeCalled();
    const params = mockFn.mock.calls[0][0];
    expect(params).toHaveProperty('ctx.id', ctx.id);
  });
});
