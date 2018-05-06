/**
 * This method is synchronous - when reactions are chained, if a method calls
 * setState, next reaction will get the updated state unless setState is
 * called after an effect 
 */

import { fail } from '../utils/alert';
import ctx from '../ctx';
import { BEFORE_SET_STATE, AFTER_SET_STATE } from '../middlewares/hookTypes';

import executeHooks from '../middlewares/executeHooks';

export default nextState => {
  const prevState = ctx.state;
  executeHooks({ id: BEFORE_SET_STATE }, ctx.state, nextState);
  ctx.state = nextState;
  executeHooks({ id: AFTER_SET_STATE }, prevState, ctx.state);
};
