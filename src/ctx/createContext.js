import global from './';
import ReclareContext from './ctx';

export default config => {
  // initiate reclare context
  const ctx = new ReclareContext(config);

  // if successfully initialised, set it as the active context
  if (ctx && ctx.started && !config.createOnly) {
    global.ctx = ctx;
  }

  // return the context
  return ctx;
};
