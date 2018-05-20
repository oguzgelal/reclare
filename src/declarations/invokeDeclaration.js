import ctx from '../ctx';

import invokeReactions from '../reactions/invokeReactions';
import invokeReducers from '../reducers/invokeReducers';
import executeHooks from '../middlewares/executeHooks';
import invokeDeclarationObject from './invokeDeclarationObject';

import { DECLARATION_HIT, DECLARATION_MISS } from '../middlewares/hookTypes';

// `eventKey` and `payload` gets populated when declaration is invoked from a broadcast
// `prevState` gets populated when declaration is invoked from a subscription
export default ({ declaration, eventKey, payload, prevState }) => {

  let reducerQueue = [];
  let reactionQueue = [];

  if (declaration && declaration.length > 0) {
    executeHooks({ id: DECLARATION_HIT }, eventKey, payload);
  } else {
    executeHooks({ id: DECLARATION_MISS }, eventKey, payload);
  }

  // run through the declarations on an event
  (declaration || []).map(declarationObject => {
    // run a declaration - evaluate situations,
    // get reactions / reducers if it holds
    const { reducers, reactions } = invokeDeclarationObject({
      declarationObject,
      prevState,
      eventKey,
      payload
    });

    // queue reducers / reactions to run after all
    // situations are evaluated
    reducerQueue = reducerQueue.concat(reducers || []);
    reactionQueue = reactionQueue.concat(reactions || []);
  });

  // keep the old state
  const stateBeforeReducers = ctx.state;

  // execute reducers in the queue
  invokeReducers({
    reducers: reducerQueue,
    eventKey,
    payload
  });

  // TODO: immediate subscriptions

  // execute reactions in the queue, pass also the old state
  invokeReactions({
    reactions: reactionQueue,
    prevState: stateBeforeReducers,
    eventKey,
    payload
  });

  // TODO: subscriptions
};
