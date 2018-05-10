/**
 * declaration - [{ situations, reactions, reactionsElse }]
 * declarationObject - { situations, reactions, reactionsElse }
 */

import ctx from '../ctx';
import evaluateSituations from '../situations/evaluateSituations';
import executeReactions from '../reactions/executeReactions';
import executeReducers from '../reducers/executeReducers';
import executeHooks from '../middlewares/executeHooks';
import {
  DECLARATION_HIT,
  DECLARATION_MISS,
  DECLARATION_TRIGGERED,
} from '../middlewares/hookTypes';

const triggerDeclarationObject = ({ declarationObject, eventKey, payload }) => {

  const {
    unparsed,
    situations,
    reducers,
    reducersElse,
    reactions,
    reactionsElse,
  } = declarationObject;

  executeHooks({
    id: DECLARATION_TRIGGERED,
  }, eventKey, payload, unparsed)

  const situationHolds = evaluateSituations({
    situations,
    eventKey,
    payload,
  });

  return {
    reducers: situationHolds ? reducers : reducersElse,
    reactions: situationHolds ? reactions : reactionsElse,
  }
}

export default ({ declaration, eventKey, payload }) => {
  let reducerQueue = [];
  let reactionQueue = [];

  if (declaration && declaration.length > 0) {
    executeHooks({ id: DECLARATION_HIT }, eventKey, payload);
  } else {
    executeHooks({ id: DECLARATION_MISS }, eventKey, payload);
  }

  // run through the declarations on an event
  (declaration || []).map(
    declarationObject => {
      const { reducers, reactions } = triggerDeclarationObject({
        declarationObject, eventKey, payload,
      })
      reducerQueue = reducerQueue.concat(reducers || []);
      reactionQueue = reactionQueue.concat(reactions || []);
    }
  )

  // keep the old state 
  const prevState = ctx.state;

  // execute reducers in the queue
  executeReducers({ reducers: reducerQueue, eventKey, payload })

  // execute reactions in the queue, pass also the old state
  executeReactions({ reactions: reactionQueue, eventKey, payload, prevState })
}
