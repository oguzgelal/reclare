import invokeReactions from './reactions/invokeReactions';
import invokeReducers from './reducers/invokeReducers';
import executeHooks from '../middlewares/executeHooks';
import invokeDeclarationObject from './invokeDeclarationObject';

import { DECLARATION_HIT, DECLARATION_MISS } from '../middlewares/hookTypes';

export default ({
  ctx,
  declarations,
  // populated when invoked from a broadcast
  payload,
  eventKey,
  // populated when invoked from a subscription
  prevState,
  hasChange
}) => {
  if (declarations && declarations.length > 0) {
    executeHooks({ ctx, id: DECLARATION_HIT }, { ctx, eventKey, payload });
  } else {
    executeHooks({ ctx, id: DECLARATION_MISS }, { ctx, eventKey, payload });
  }

  let reducerQueue = [];
  let reactionQueue = [];

  // run through the declarations on an event
  declarations.map(declarationObject => {
    // run a declaration - evaluate situations,
    // get reactions / reducers if it holds
    const { reducers, reactions } = invokeDeclarationObject({
      declarationObject,
      prevState,
      hasChange,
      eventKey,
      payload,
      ctx
    });

    // queue reducers / reactions to run after all
    // situations are evaluated
    reducerQueue = reducerQueue.concat(reducers);
    reactionQueue = reactionQueue.concat(reactions);
  });

  // keep the old state
  const stateBeforeReducers = ctx.state;

  // execute reducers in the queue
  invokeReducers({
    reducers: reducerQueue,
    eventKey,
    payload,
    ctx
  });

  // execute reactions in the queue, pass also the old state
  invokeReactions({
    reactions: reactionQueue,
    prevState: stateBeforeReducers,
    eventKey,
    payload,
    ctx
  });
};
