import global from '../ctx';
import parseDeclarations from '../declarations/parseDeclarations';
import { validateSubscriptionDeclaration } from '../subscriptions/subscriptionHelpers';
import {
  DECLARATION_SUB,
  ON_STATE_CHANGE,
  ON_IMMEDIATE_STATE_CHANGE
} from '../config/constants';

export const _subscribe = ctx => (declarations, options = {}) => {
  const useCtx = ctx || global.ctx;

  const parsed = parseDeclarations({
    type: DECLARATION_SUB,
    declarations,
    customValidate: validateSubscriptionDeclaration
  });

  const loc = options.immediate ? ON_IMMEDIATE_STATE_CHANGE : ON_STATE_CHANGE;

  Object.keys(parsed).map(declarationKey => {
    useCtx[loc] = useCtx[loc] || {};
    useCtx[loc][declarationKey] = useCtx[loc][declarationKey] || [];
    useCtx[loc][declarationKey] = useCtx[loc][declarationKey].concat(
      parsed[declarationKey]
    );
  });
};

export default _subscribe(null);
