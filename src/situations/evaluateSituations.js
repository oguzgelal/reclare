import ctx from '../ctx'
import { warning } from '../utils/alert';
import executeHooks from '../middlewares/executeHooks';
import { SITUATION_TRUE, SITUATION_FALSE } from '../middlewares/hookTypes';

const evaluateSituation = ({ situation, payload }) => {
  if (typeof situation === 'function') {
    return situation({
      state: ctx.state,
      event: payload,
    });
  } else {
    return !!situation;
  }
}

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