import { validatePath, makeArray } from './pathHelpers';

export default (state = {}, path) => {
  validatePath(path);

  const pathArr = makeArray(path);
  const acc = Object.assign({}, state);

  // fastest way discovered so far to resolve a path is to
  // use reduce (even faster than lodash _.get)
  // benchmarks/resolvingPath.js

  return pathArr.reduce((acc, current) => {
    return acc ? acc[current] : null;
  }, state);
};
