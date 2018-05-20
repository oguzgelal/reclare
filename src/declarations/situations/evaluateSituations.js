import ctx from '../../ctx'

import executeHooks from '../../middlewares/executeHooks';
import { SITUATION_TRUE, SITUATION_FALSE } from '../../middlewares/hookTypes';

const evaluateSituation = ({ prevState, situation, payload }) => {
  if (typeof situation === 'function') {
    return situation({
      prevState,
      state: ctx.state,
      event: payload,
    });
  } else {
    return !!situation;
  }
}

export default ({ prevState, situations, eventKey, payload }) => {

  let situationHolds = situations.every(
    s => evaluateSituation({
      situation: s,
      prevState,
      payload,
    })
  );

  if (situationHolds) {
    executeHooks({ id: SITUATION_TRUE }, eventKey, payload);
  } else {
    executeHooks({ id: SITUATION_FALSE }, eventKey, payload);
  }

  return situationHolds;
}