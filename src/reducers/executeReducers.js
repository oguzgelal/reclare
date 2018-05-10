import ctx from '../ctx'

import { warning } from '../utils/alert';
import executeHooks from '../middlewares/executeHooks';
import setState from '../state/setState';
import {
  BEFORE_REDUCER,
  BEFORE_REDUCERS,
  AFTER_REDUCER,
  AFTER_REDUCERS,
} from '../middlewares/hookTypes';

const executeReducer = ({ reducer, eventKey, payload }) => {
  if (typeof reducer !== 'function') {
    warning(`Invalid reducer: expected function, got "${typeof reducer}". Ignoring.`, 'eyHBy++dTXjvzi')
  } else {

    executeHooks({
      id: BEFORE_REDUCER,
    }, eventKey, payload);

    setState(
      reducer({
        state: ctx.state,
        event: payload,
        eventKey,
      })
    )

    executeHooks({
      id: AFTER_REDUCER,
    }, eventKey, payload);
  }
}

export default ({ reducers, eventKey, payload }) => {
  executeHooks({
    id: BEFORE_REDUCERS,
  }, eventKey, payload);

  if (Array.isArray(reducers)) {
    reducers.map(r =>
      executeReducer({
        reducer: r,
        eventKey,
        payload,
      })
    );
  }

  executeHooks({
    id: AFTER_REDUCERS,
  }, eventKey, payload);
}