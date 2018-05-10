import ctx from '../ctx';
import executeHooks from '../middlewares/executeHooks';
import { BEFORE_SET_STATE, AFTER_SET_STATE } from '../middlewares/hookTypes';

export default nextState => {
  const prevState = ctx.state;
  executeHooks({ id: BEFORE_SET_STATE }, ctx.state, nextState);
  ctx.state = nextState;
  executeHooks({ id: AFTER_SET_STATE }, prevState, ctx.state);
};
