import hasChange from '../../src/utils/hasChange';

describe('hasChange', () => {
  it('should return true on value change', () => {
    const oldState = { counter: 1 };
    const newState = { ...oldState, counter: 2 };
    expect(
      hasChange({
        state: newState,
        prevState: oldState
      })('counter')
    ).toBe(true);
  });

  it('should return true on identity change', () => {
    const oldState = { user: { name: 'john doe' } };
    const newState = { ...oldState, user: { name: 'jane doe' } };
    expect(hasChange({ state: newState, prevState: oldState })('user')).toBe(
      true
    );
    expect(
      hasChange({ state: newState, prevState: oldState })('user.name')
    ).toBe(true);
  });

  test('change should failed to be detected when state is mutated', () => {
    const oldState = { user: { name: 'john doe' } };
    const newState = oldState;
    newState.user.name = 'jane doe';
    expect(hasChange({ state: newState, prevState: oldState })('user')).toBe(
      false
    );
    expect(
      hasChange({ state: newState, prevState: oldState })('user.name')
    ).toBe(false);
  });

  it('should compare root state when path is omitted', () => {
    const oldState = { counter: 0 };
    const newState = { counter: 1 };
    expect(hasChange({ state: newState, prevState: oldState })()).toBe(true);
    expect(hasChange({ state: newState, prevState: newState })()).toBe(false);
  });
});
