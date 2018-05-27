import global from '../ctx';
import { validateMiddleware } from './middlewareHelpers';
import * as hookTypes from './hookTypes';

export const _registerMiddlewares = ctx => config => {
  validateMiddleware(config);
  const useCtx = ctx || global.ctx;
  // eslint-disable-next-line no-unused-vars
  const { __esModule, ...rest } = hookTypes;
  Object.keys(rest).map(hook => {
    useCtx.registerHooks(hookTypes[hook], config[hookTypes[hook]]);
  });
};

export default _registerMiddlewares(null);
