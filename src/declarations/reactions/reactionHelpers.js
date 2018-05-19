import { fail } from '../utils/alert';

export const validateReaction = ({ reaction, customValidate }) => {
  if (typeof reaction !== 'function') {
    fail(`Invalid reaction: expected function, got "${typeof reducer}"`, 'eyHBy++dTXjvzi')
  }
  if (customValidate) {
    customValidate({ reaction })
  }
};
