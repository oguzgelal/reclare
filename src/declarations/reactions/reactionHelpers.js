import { fail, INVALID_REACTION } from '../../utils/alert';

export const validateReaction = ({ reaction, customValidate }) => {
  if (typeof reaction !== 'function') {
    fail(`Invalid reaction: expected function, got "${typeof reducer}"`, INVALID_REACTION)
  }
  if (customValidate) {
    customValidate({ reaction })
  }
};
