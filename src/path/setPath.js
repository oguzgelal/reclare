import { set } from 'immutadot';
import { clone } from 'lodash';
import { validatePath, makeArray } from './pathHelpers';

export default (state, path, value) => {
  validatePath(path);
  return set(state, path, clone(value));
};
