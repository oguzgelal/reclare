import ctx from '../ctx'

import { warning } from '../utils/alert';
import executeHooks from '../middlewares/executeHooks';
import setState from '../state/setState';
import { BEFORE_REACTION, AFTER_REACTION } from '../middlewares/hookTypes';

const executeReaction = ({ reaction, eventKey, payload }) => {
  if (typeof reaction !== 'function') {
    warning(`Invalid reaction: expected function, got "${typeof reaction}". Ignoring.`, 'eyHBy++dTXjvzi')
  } else {
    reaction({
      state: ctx.state,
      event: payload,
      eventKey,
    });
  }
}

export default ({ reactions, eventKey, payload }) => {
  executeHooks({
    id: BEFORE_REACTION,
  }, eventKey, payload);

  if (typeof reactions === 'function') {
    executeReaction({
      reaction: reactions,
      eventKey,
      payload,
    });
  } else if (Array.isArray(reactions)) {
    reactions.map(r =>
      executeReaction({
        reaction: r,
        eventKey,
        payload,
      })
    );
  }

  executeHooks({
    id: AFTER_REACTION,
  }, eventKey, payload);
}