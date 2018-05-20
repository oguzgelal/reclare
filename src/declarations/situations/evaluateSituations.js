import executeHooks from '../../middlewares/executeHooks';
import { SITUATION_TRUE, SITUATION_FALSE } from '../../middlewares/hookTypes';

const evaluateSituation = ({
  prevState,
  situation,
  payload,
  ctx,
}) => {

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

export default ({
  prevState,
  situations,
  eventKey,
  payload,
  ctx,
}) => {

  let situationHolds = situations.every(
    s => evaluateSituation({
      situation: s,
      prevState,
      payload,
      ctx,
    })
  );

  if (situationHolds) {
    executeHooks(
      { ctx, id: SITUATION_TRUE },
      eventKey,
      payload,
    );
  } else {
    executeHooks(
      { ctx, id: SITUATION_FALSE },
      eventKey,
      payload,
    );
  }

  return situationHolds;
}