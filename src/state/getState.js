import ctx from '../ctx';
import executeHooks from '../middlewares/executeHooks';
import { GET_STATE } from '../middlewares/hookTypes';

export default () => {
  executeHooks({ id: GET_STATE }, ctx.state);
  return ctx.state;
};
