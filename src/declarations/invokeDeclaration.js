/**
 * declaration - [{ situations, reactions, reactionsElse, ...etc }]
 * declarationObject - { situations, reactions, reactionsElse, ...etc }
 */

import evaluateSituations from '../situations/evaluateSituations';
import invokeReactions from '../reactions/invokeReactions';
import invokeReducers from '../reducers/invokeReducers';
import executeHooks from '../middlewares/executeHooks';

import {
  DECLARATION_HIT,
  DECLARATION_MISS,
  DECLARATION_TRIGGERED,
} from '../middlewares/hookTypes';

const invokeDeclarationObject = ({ declarationObject, eventKey, payload }) => {

  const {
    unparsed,
    situations,
    reducers,
    reducersElse,
    reactions,
    reactionsElse,
  } = declarationObject;

  executeHooks({ id: DECLARATION_TRIGGERED }, eventKey, payload, unparsed)

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

export default ({
  currentState,
  declaration,
  eventKey,
  payload,
}) => {

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
      const { reducers, reactions } = invokeDeclarationObject({
        declarationObject, eventKey, payload,
      })
      reducerQueue = reducerQueue.concat(reducers || []);
      reactionQueue = reactionQueue.concat(reactions || []);
    }
  )

  // keep the old state 
  const prevState = currentState;

  // execute reducers in the queue
  executeReducers({
    currentState,
    reducers: reducerQueue,
    eventKey,
    payload,
  })

  // execute reactions in the queue, pass also the old state
  executeReactions({
    reactions: reactionQueue,
    prevState,
    eventKey,
    payload,
  })
}
