import get from 'lodash/get';

export default ({ state, prevState }) => path => {
  if (!path || path === '') {
    return state !== prevState;
  }
  const oldVal = get(prevState, path, null);
  const newVal = get(state, path, null);
  return newVal !== oldVal;
};
