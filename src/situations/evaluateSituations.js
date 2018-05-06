import evaluateSituation from './evaluateSituation';

import executeHooks from '../middlewares/executeHooks';
import { ON_SITUATION_TRUE, ON_SITUATION_FALSE } from '../middlewares/hookTypes';

export default ({ situations, eventKey, payload }) => {

  let situationHolds = Array.every(
    s => evaluateSituation({ situation: s, eventKey, payload })
  );

  if (situationHolds) {
    executeHooks({ id: ON_SITUATION_TRUE }, eventKey, payload);
  } else {
    executeHooks({ id: ON_SITUATION_FALSE }, eventKey, payload);
  }

  return situationHolds;
}