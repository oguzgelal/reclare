import { fail, MISSING_MIDDLEWARE_CONFIG, INVALID_HOOK } from '../utils/alert';

export const validateMiddleware = config => {
  if (!config) {
    fail(
      'No configuration provided for the middleware',
      MISSING_MIDDLEWARE_CONFIG
    );
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
      INVALID_HOOK
    );
  }
};
