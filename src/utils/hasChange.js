import _get from 'lodash/get';

export default ({ state, prevState }) => path => {
  if (!path || path === '') {
    return state !== prevState;
  }
  const oldVal = _get(prevState, path, null);
  const newVal = _get(state, path, null);
  return newVal !== oldVal;
};
