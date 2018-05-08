/**
 * declaration - [{ situations, reactions, reactionsElse }]
 * declarationObject - { situations, reactions, reactionsElse }
 */

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

  executeHooks({ id: DECLARATION_TRIGGERED }, eventKey, payload, unparsed)

  let situationHolds = evaluateSituations({
    situations,
    eventKey,
    payload,
  });

  // TODO: lazy execution
  if (situationHolds) {
    executeReducers({ reducers, eventKey, payload })
    executeReactions({ reactions, eventKey, payload })
  } else {
    executeReducers({ reducers: reducersElse, eventKey, payload })
    executeReactions({ reactions: reactionsElse, eventKey, payload })
  }
}

export default ({ declaration, eventKey, payload }) => {

  if (declaration && declaration.length > 0) {
    executeHooks({ id: DECLARATION_HIT }, eventKey, payload);
  } else {
    executeHooks({ id: DECLARATION_MISS }, eventKey, payload);
  }

  (declaration || []).map(
    declarationObject => triggerDeclarationObject({
      declarationObject, eventKey, payload,
    })
  )
}