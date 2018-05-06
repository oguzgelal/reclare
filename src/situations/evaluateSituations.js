import evaluateSituation from './evaluateSituation';

import executeHooks from '../middlewares/executeHooks';
import { SITUATION_TRUE, SITUATION_FALSE } from '../middlewares/hookTypes';

export default ({ situations, eventKey, payload }) => {

  let situationHolds = situations.every(
    s => evaluateSituation({ situation: s, payload })
  );

  if (situationHolds) {
    executeHooks({ id: SITUATION_TRUE }, eventKey, payload);
  } else {
    executeHooks({ id: SITUATION_FALSE }, eventKey, payload);
  }

  return situationHolds;
}