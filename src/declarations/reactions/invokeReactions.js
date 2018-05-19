import ctx from '../../ctx'

import { warning } from '../../utils/alert';
import executeHooks from '../../middlewares/executeHooks';
import setState from '../../state/setState';
import {
  BEFORE_REACTION,
  BEFORE_REACTIONS,
  AFTER_REACTION,
  AFTER_REACTIONS,
} from '../middlewares/hookTypes';

const executeReaction = ({
  reaction,
  eventKey,
  payload,
  prevState,
}) => {

  executeHooks({
    id: BEFORE_REACTION,
  }, eventKey, payload);

  reaction({
    state: ctx.state,
    prevState,
    event: payload,
    eventKey,
  });

  executeHooks({
    id: AFTER_REACTION,
  }, eventKey, payload);

}

export default ({ reactions, eventKey, payload, prevState }) => {
  executeHooks({
    id: BEFORE_REACTIONS,
  }, eventKey, payload);

  if (Array.isArray(reactions)) {
    reactions.map(r =>
      executeReaction({
        reaction: r,
        eventKey,
        payload,
        prevState,
      })
    );
  }

  executeHooks({
    id: AFTER_REACTIONS,
  }, eventKey, payload);
}