import { fail, INVALID_REACTION } from '../../utils/alert'

export const validateReaction = ({ reaction }) => {
  if (typeof reaction !== 'function') {
    fail(`Invalid reaction: expected function, got "${typeof reaction}"`, INVALID_REACTION);
  }
}