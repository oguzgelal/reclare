import global from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import { BEFORE_SET_STATE, AFTER_SET_STATE } from '../middlewares/hookTypes';

export default ({ ctx, nextState }) => {
  const useCtx = ctx || global.ctx;
  const prevState = useCtx.state;

  executeHooks(
    { ctx: useCtx, id: BEFORE_SET_STATE },
    { ctx: useCtx, state: useCtx.state, nextState }
  );

  useCtx.state = nextState;

  executeHooks(
    { ctx: useCtx, id: AFTER_SET_STATE },
    { ctx: useCtx, prevState, state: useCtx.state }
  );
};
