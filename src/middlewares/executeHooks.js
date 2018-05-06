import ctx from '../ctx';

import executeHook from './executeHook';
import { VERBOSE } from '../middlewares/hookTypes';

export default ({ id, out }, ...args) => {
  if (ctx.hooks) {

    // Execute registered hooks
    executeHook({ id, out, fns: ctx.hooks[id] }, ...args);

    // Execute the Verbose hook
    executeHook({ id, out, fns: ctx.hooks[VERBOSE], verbose: true }, ...args);
  }
};
