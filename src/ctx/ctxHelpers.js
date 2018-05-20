import { fail, INVALID_CONFIG } from '../utils/alert';

export const validateConfiguration = config => {
  if (!config) {
    fail('Invalid argument provided', INVALID_CONFIG);
  }
};
