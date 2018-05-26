import { fail, INVALID_CONFIG } from '../utils/alert';

export const validateConfiguration = config => {
  if (!config) {
    fail('Invalid argument provided', INVALID_CONFIG);
  }
  if (typeof config !== 'object') {
    fail(
      `Invalid configuration passed to 'createContext'. Expected object, found ${JSON.stringify(
        config
      )}`,
      INVALID_CONFIG
    );
  }
};
