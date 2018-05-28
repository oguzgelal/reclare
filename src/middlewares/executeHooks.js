import { VERBOSE } from '../middlewares/hookTypes';

const executeHook = ({ ctx, id, out, fns, verbose }, params) => {
  fns &&
    fns.map(h => {
      // if output of the hook functions matters - `out` function
      // receives what hook function returned as an argument
      let res = verbose ? h({ ctx, id, params }) : h(params);
      if (out && typeof out === 'function') {
        out(res);
      }
    });
};

export default ({ ctx, id, out }, params) => {
  if (ctx.hooks) {
    // Execute registered hooks
    executeHook({ id, out, ctx, fns: ctx.hooks[id] }, params);
    // Execute the Verbose hook
    executeHook(
      { id, out, ctx, fns: ctx.hooks[VERBOSE], verbose: true },
      params
    );
  }
};
