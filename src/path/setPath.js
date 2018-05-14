import { validatePath, makeArray } from './pathHelpers';
import set from 'lodash/set';

export default (state, path, value) => {
  validatePath(path);

  set({ ...state }, path, value)

  return state;
};