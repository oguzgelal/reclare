import ctx from '../ctx';
import { validateHooks } from './middlewareHelpers';

export default (hookId, hooks) => {
  validateHooks(hooks);

  ctx.hooks = ctx.hooks || {};
  ctx.hooks[hookId] = ctx.hooks[hookId] || [];

  if (Array.isArray(hooks)) {
    ctx.hooks[hookId] = ctx.hooks[hookId].concat(hooks);
  }

  if (typeof hooks === 'function') {
    ctx.hooks[hookId].push(hooks);
  }
};
