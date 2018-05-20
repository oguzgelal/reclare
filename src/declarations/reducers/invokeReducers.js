import executeHooks from '../../middlewares/executeHooks';
import setState from '../../state/setState';

import {
  BEFORE_REDUCER,
  BEFORE_REDUCERS,
  AFTER_REDUCER,
  AFTER_REDUCERS,
} from '../../middlewares/hookTypes';

const executeReducer = ({
  reducer,
  eventKey,
  payload,
  ctx,
}) => {

  executeHooks(
    { ctx, id: BEFORE_REDUCER },
    eventKey,
    payload,
  );

  setState({
    ctx,
    nextState: reducer({
      state: ctx.state,
      event: payload,
      eventKey,
    })
  })

  executeHooks(
    { ctx, id: AFTER_REDUCER },
    eventKey,
    payload,
  );
}

export default ({
  reducers,
  eventKey,
  payload,
  ctx,
}) => {

  executeHooks(
    { ctx, id: BEFORE_REDUCERS },
    eventKey,
    payload,
  );

  reducers.map(reducer => {
    executeReducer({
      reducer,
      eventKey,
      payload,
      ctx,
    })
  });

  executeHooks(
    { ctx, id: AFTER_REDUCERS },
    eventKey,
    payload,
  );
}