import { fail, MISSING_PATH, INVALID_PATH } from '../utils/alert';

export const validatePath = path => {
  if (path === undefined || path === null) {
    fail(`Path not provided`, MISSING_PATH);
  }
  if (!Array.isArray(path) && typeof path !== 'string') {
    fail(
      `Invalid path. Expected array or string, got ${JSON.stringify(
        typeof path
      )}`,
      INVALID_PATH
    );
  }
};

export const makeArray = path => (Array.isArray(path) ? path : path.split('.'));
