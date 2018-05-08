import ctx from '../ctx'

import { warning } from '../utils/alert';
import executeHooks from '../middlewares/executeHooks';
import setState from '../state/setState';
import { BEFORE_REDUCER, AFTER_REDUCER } from '../middlewares/hookTypes';

const executeReducer = ({ reducer, eventKey, payload }) => {
  if (typeof reducer !== 'function') {
    warning(`Invalid reducer: expected function, got "${typeof reducer}". Ignoring.`, 'eyHBy++dTXjvzi')
  } else {
    setState(
      reducer({
        state: ctx.state,
        event: payload,
        eventKey,
      })
    )
  }
}

export default ({ reducers, eventKey, payload }) => {
  executeHooks({
    id: BEFORE_REDUCER,
  }, eventKey, payload);

  if (typeof reducers === 'function') {
    executeReducer({
      reducers: reducer,
      eventKey,
      payload,
    })
  } else if (Array.isArray(reducers)) {
    reducers.map(r =>
      executeReducer({
        reducer: r,
        eventKey,
        payload,
      })
    );
  }

  executeHooks({
    id: AFTER_REDUCER,
  }, eventKey, payload);
}