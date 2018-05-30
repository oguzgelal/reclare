import createContext from '../../src/ctx/createContext';
import { INVALID_REDUCER } from '../../src/utils/alert';
import { ON_EVENT } from '../../src/config/constants';

describe('parseReducer', () => {
  it('should fail when invalid reducer passed', () => {
    expect(() =>
      createContext({
        [ON_EVENT]: [
          {
            on: 'test',
            reducer: 'not a func or func array'
          }
        ]
      })
    ).toThrow(INVALID_REDUCER);
  });

  it('should not fail when reducer is omitted', () => {
    expect(() =>
      createContext({
        [ON_EVENT]: [
          {
            on: 'test'
          }
        ]
      })
    ).not.toThrow(INVALID_REDUCER);
  });
});
