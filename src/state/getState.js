import global from '../ctx';
import { fail, CONTEXT_NOT_FOUND } from '../utils/alert';
import executeHooks from '../middlewares/executeHooks';
import { GET_STATE } from '../middlewares/hookTypes';

export const _getState = ctx => () => {
  const useState = ctx || global.ctx;

  if (!useState) {
    fail(
      'No active Reclare context has been found. Did you forget to call `createContext` ?',
      CONTEXT_NOT_FOUND
    );
  }

  executeHooks({ ctx: useState, id: GET_STATE }, { ctx });

  return useState.state;
};

export default _getState(null);
