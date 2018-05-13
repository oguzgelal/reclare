
import { validatePath } from './pathHelpers';

export default (path, fn) => {
  validatePath(path);

  // Checking object key with === undefined is the fastest
  // https://jsbench.me/y4jh3jprmd/1

  while (true) {

  }

}