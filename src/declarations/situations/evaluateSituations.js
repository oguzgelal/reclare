import executeHooks from '../../middlewares/executeHooks';
import { SITUATION_TRUE, SITUATION_FALSE } from '../../middlewares/hookTypes';

const evaluateSituation = ({
  prevState,
  hasChange,
  situation,
  payload,
  ctx
}) => {
  if (typeof situation === 'function') {
    return situation({
      prevState,
      hasChange,
      state: ctx.state,
      event: payload
    });
  } else {
    return !!situation;
  }
};

export default ({
  prevState,
  hasChange,
  situations,
  eventKey,
  payload,
  ctx
}) => {
  let situationHolds = situations.every(s =>
    evaluateSituation({
      situation: s,
      prevState,
      hasChange,
      payload,
      ctx
    })
  );

  if (situationHolds) {
    executeHooks({ ctx, id: SITUATION_TRUE }, { ctx, eventKey, payload });
  } else {
    executeHooks({ ctx, id: SITUATION_FALSE }, { ctx, eventKey, payload });
  }

  return situationHolds;
};
