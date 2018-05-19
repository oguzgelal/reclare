import { fail } from '../utils/alert';

export const validateReducer = ({ reducer, customValidate }) => {
  if (typeof reducer !== 'function') {
    fail(`Invalid reducer: expected function, got "${typeof reducer}"`, 'eyHBy++dTXjvzi')
  }
  if (customValidate) {
    customValidate({ reducer })
  }
};
