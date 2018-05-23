import global from '../ctx';
import { validateHooks } from './middlewareHelpers';

export const _registerHooks = ctx => (hookId, hooks) => {
  validateHooks(hooks);
  const useCtx = ctx || global.ctx;

  useCtx.hooks = useCtx.hooks || {};
  useCtx.hooks[hookId] = useCtx.hooks[hookId] || [];

  if (Array.isArray(hooks)) {
    useCtx.hooks[hookId] = useCtx.hooks[hookId].concat(hooks);
  }

  if (typeof hooks === 'function') {
    useCtx.hooks[hookId].push(hooks);
  }
};

export default _registerHooks(null);
