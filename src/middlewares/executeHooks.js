import ctx from '../ctx';

import { VERBOSE } from '../middlewares/hookTypes';

const executeHook = ({ id, out, fns, verbose }, ...args) => {
  if (fns) {
    fns.map(h => {
      /**
       * if output of the hook functions matters - `out` function
       * receives what hook function returned as an argument
       */
      let res = verbose ? h({ id, args, ctx }) : h(...args);
      if (out && typeof out === 'function') {
        out(res);
      }
    });
  }
};

export default ({ id, out }, ...args) => {
  if (ctx.hooks) {
    // Execute registered hooks
    executeHook({ id, out, fns: ctx.hooks[id] }, ...args);

    // Execute the Verbose hook
    executeHook({ id, out, fns: ctx.hooks[VERBOSE], verbose: true }, ...args);
  }
};
