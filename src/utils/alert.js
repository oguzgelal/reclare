export const INVALID_CONFIG = 'invalid-config';
export const MISSING_MIDDLEWARE_CONFIG = 'missing-middleware-config';
export const INVALID_HOOK = 'invalid-hook';
export const INVALID_DECLARATION_ARGUMENT = 'invalid-declaration-argument';
export const INVALID_DECLARATION = 'invalid-declaration';
export const MISSING_TRIGGER = 'missing-trigger';
export const INVALID_TRIGGER = 'invalid-trigger';
export const INVALID_REACTION = 'invalid-reaction';
export const INVALID_REDUCER = 'invalid-reducer';
export const CONTEXT_NOT_FOUND = 'context-not-found';

export const fail = (m, c) => {
  throw new Error(`${m} (${c})`);
};

/* eslint-disable no-console */
// export const warning = (m, c) => console.warn(`${m} (${c})`);
// export const error = (m, c) => console.error(`${m} (${c})`);
/* eslint-enable */
