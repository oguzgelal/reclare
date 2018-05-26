import executeHooks from '../../middlewares/executeHooks';
import { validateReaction } from './reactionHelpers';
import {
  BEFORE_REACTION,
  BEFORE_REACTIONS,
  AFTER_REACTION,
  AFTER_REACTIONS,
} from '../../middlewares/hookTypes';

const executeReaction = ({
  reaction,
  eventKey,
  payload,
  prevState,
  ctx,
}) => {

  executeHooks(
    { ctx, id: BEFORE_REACTION },
    eventKey,
    payload,
  );

  validateReaction({ reaction });

  reaction({
    state: ctx.state,
    prevState,
    event: payload,
    eventKey,
  });

  executeHooks(
    { ctx, id: AFTER_REACTION },
    eventKey,
    payload,
  );
}

export default ({
  reactions,
  eventKey,
  payload,
  prevState,
  ctx,
}) => {

  executeHooks(
    { ctx, id: BEFORE_REACTIONS },
    eventKey,
    payload,
  );

  reactions.map(r =>
    executeReaction({
      reaction: r,
      eventKey,
      payload,
      prevState,
      ctx,
    })
  );

  executeHooks(
    { ctx, id: AFTER_REACTIONS },
    eventKey,
    payload,
  );
}