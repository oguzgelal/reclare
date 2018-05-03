import { verifyStore } from './storeHelpers';

import { _ctx } from '../../main';
import Reclare from '../provider/providerFactory';
import processDeclarations from '../declarations/processDeclarations';

export default () => store => {
  verifyStore(store);

  // TODO: implement persistence
  // TODO: prepopulate persisted state
  // TODO: option for middlewares to prepopulate state
  // Initialise the state
  _ctx.store = store;

  // Set declarations
  _ctx.declarations = processDeclarations({ store });

  // Set middlewares
  // _ctx.middlewares: processMiddlewares({ _ctx, store }),

  // Set subscriptions
  // _ctx.middlewares: processSubscriptions({ _ctx, store }),

  return {
    Reclare
  };
};
