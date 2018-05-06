import { fail } from '../utils/alert';

export const validateMiddleware = config => {
  if (!config) {
    fail('No configuration provided for the middleware', 'V+YzuqU1Vgy/oy');
  }
};

export const validateHooks = hooks => {
  // no hooks were provided
  if (hooks === undefined || hooks === null) {
    return;
  }
  if (!Array.isArray(hooks) && typeof hooks !== 'function') {
    fail(
      `Invalid hook provided. Expected a function or an array of functions, got "${typeof hooks}"`,
      'enYIL0dpH5PYWS'
    );
  }
};
