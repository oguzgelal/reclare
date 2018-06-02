import global from '../ctx';
import parseDeclarations from '../declarations/parseDeclarations';
import { validateSubscriptionDeclaration } from '../subscriptions/subscriptionHelpers';
import { DECLARATION_SUB, ON_STATE_CHANGE } from '../config/constants';

export const _subscribe = ctx => declarations => {
  const useCtx = ctx || global.ctx;

  const parsed = parseDeclarations({
    type: DECLARATION_SUB,
    declarations,
    customValidate: validateSubscriptionDeclaration
  });

  Object.keys(parsed).map(declarationKey => {
    useCtx[ON_STATE_CHANGE] = useCtx[ON_STATE_CHANGE] || {};
    useCtx[ON_STATE_CHANGE][declarationKey] =
      useCtx[ON_STATE_CHANGE][declarationKey] || [];
    useCtx[ON_STATE_CHANGE][declarationKey] = useCtx[ON_STATE_CHANGE][
      declarationKey
    ].concat(parsed[declarationKey]);
  });
};

export default _subscribe(null);
