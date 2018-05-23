import global from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import { GET_STATE } from '../middlewares/hookTypes';

export const _getState = ctx => () => {
  executeHooks({ ctx: ctx || global.ctx, id: GET_STATE }, ctx.state);
  return ctx.state;
};

export default _getState(null);
