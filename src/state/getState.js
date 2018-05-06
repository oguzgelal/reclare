import { fail } from '../utils/alert';
import { GET_STATE } from '../middlewares/hookTypes';

import ctx from '../ctx';
import executeHooks from '../middlewares/executeHooks';

export default () => {
  executeHooks({ id: GET_STATE }, ctx.state);

  return ctx.state;
};
