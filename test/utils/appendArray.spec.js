import appendArray from '../../src/utils/appendArray';

describe('appendArray', () => {
  it('should merge arrays', () => {
    expect(appendArray([1, 2, 3], [4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should turn source into an array', () => {
    expect(appendArray(1, [2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should turn target into an array', () => {
    expect(appendArray(1, [2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should turn source and target into an array', () => {
    expect(appendArray(1, 2)).toEqual([1, 2]);
  });

  it('should omit undefined and null values', () => {
    expect(appendArray(undefined, [1, 2, 3])).toEqual([1, 2, 3]);
    expect(appendArray(null, [1, 2, 3])).toEqual([1, 2, 3]);
  });
});
