import ctx from '../ctx'

export default ({ id, out, fns, verbose }, ...args) => {
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
}