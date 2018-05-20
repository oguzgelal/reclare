import activeCtx from '../ctx';
import { validateHooks } from './middlewareHelpers';

export default (hookId, hooks, ctx) => {
  validateHooks(hooks);
  const useCtx = ctx || activeCtx;

  useCtx.hooks = useCtx.hooks || {};
  useCtx.hooks[hookId] = useCtx.hooks[hookId] || [];

  if (Array.isArray(hooks)) {
    useCtx.hooks[hookId] = useCtx.hooks[hookId].concat(hooks);
  }

  if (typeof hooks === 'function') {
    useCtx.hooks[hookId].push(hooks);
  }
};
