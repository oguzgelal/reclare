// declaration - [{ situations, reactions, reactionsElse, ...etc }]
// declarationObject - { situations, reactions, reactionsElse, ...etc }

import evaluateSituations from './situations/evaluateSituations';
import executeHooks from '../middlewares/executeHooks';
import { DECLARATION_TRIGGERED } from '../middlewares/hookTypes';

export default ({ declarationObject, prevState, eventKey, payload }) => {
  const {
    unparsed,
    situations,
    reducers,
    reducersElse,
    reactions,
    reactionsElse
  } = declarationObject;

  executeHooks({ id: DECLARATION_TRIGGERED }, eventKey, payload, unparsed);

  const situationHolds = evaluateSituations({
    situations,
    prevState,
    eventKey,
    payload
  });

  return {
    reducers: situationHolds ? reducers : reducersElse,
    reactions: situationHolds ? reactions : reactionsElse
  };
};
