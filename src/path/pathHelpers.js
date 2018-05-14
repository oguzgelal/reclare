import { fail } from '../utils/alert';

export const validatePath = (path) => {
  if (path === undefined || path === null) {
    fail(
      `Path not provided`,
      'tQ0YGwnQbwlgrh'
    );
  }
  if (!Array.isArray(path) && typeof path !== 'string') {
    fail(
      `Invalid path. Expected array or string, got ${JSON.stringify(typeof path)}`,
      '4YENHEFWMycNQW'
    );
  }
}

export const makeArray = (path) =>
  Array.isArray(path) ? path : path.split('.')