import activeCtx from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import { GET_STATE } from '../middlewares/hookTypes';

export default ctx => {
  executeHooks({ ctx: ctx || activeCtx, id: GET_STATE }, ctx.state);
  return ctx.state;
};
