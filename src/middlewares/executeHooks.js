import { VERBOSE } from '../middlewares/hookTypes';

const executeHook = ({ ctx, id, out, fns, verbose }, ...args) => {
  if (fns) {
    fns.map(h => {
      // if output of the hook functions matters - `out` function
      // receives what hook function returned as an argument
      let res = verbose ? h({ ctx, id, args }) : h(...args);
      if (out && typeof out === 'function') {
        out(res);
      }
    });
  }
};

export default ({ ctx, id, out }, ...args) => {
  if (ctx.hooks) {
    // Execute registered hooks
    executeHook({ id, out, ctx, fns: ctx.hooks[id] }, ...args);
    // Execute the Verbose hook
    executeHook(
      { id, out, ctx, fns: ctx.hooks[VERBOSE], verbose: true },
      ...args
    );
  }
};
