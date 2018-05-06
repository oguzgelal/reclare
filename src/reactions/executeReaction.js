import { warning } from '../utils/alert';
import setState from '../state/setState';
import ctx from '../ctx'

export default ({ reaction, payload }) => {
  if (typeof reaction !== 'function') {
    warning(`Invalid reaction: expected function, got "${typeof reaction}". Ignoring.`, 'eyHBy++dTXjvzi')
  } else {
    reaction({
      state: ctx.state,
      event: payload,
      setState
    });
  }
}