import ctx from '../ctx';

export default ({ id, out }, ...args) => {
  if (ctx.hooks && ctx.hooks[id]) {
    ctx.hooks[id].map(h => {
      /**
       * if output of the hook functions matters - `out` function
       * receives what hook function returned as an argument
       */
      const res = h(...args);
      if (out && typeof out === 'function') {
        out(res);
      }
    });
  }
};
