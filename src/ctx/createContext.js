import global from './';
import ReclareContext from './ctx';

export default (config, options = {}) => {
  // initiate reclare context
  const ctx = new ReclareContext(config);

  // if successfully initialised, set it as the active context
  if (ctx && ctx.started && !options.createOnly) {
    global.ctx = ctx;
  }

  // return the context
  return ctx;
};
