import React from 'react';

import { verifyStore } from './helpers/storeHelpers';
import { processDeclarations } from './helpers/processHelpers';
import connectFactory from './factories/connectFactory'
import invokeFactory from './factories/invokeFactory'
import providerFactory from './factories/providerFactory'

export default (store) => {

  verifyStore(store)

  // TODO: implement lifecycles

  // TODO: implement persistence
  // TODO: prepopulate persisted state
  // TODO: option for middlewares to prepopulate state

  const { Provider, Consumer } = React.createContext();

  let ctx = {
    _state: store.initialState || {},
    getState: () => ctx._state,
    setState: state => { ctx._state = state },
    // middlewares: processMiddlewares({ ctx, store }),
    declarations: processDeclarations({ ctx, store }),
  }

  return {
    _ctx: ctx,
    getState: ctx.getState,
    Reclare: providerFactory({ ctx, Provider }),
    connect: connectFactory({ ctx, Consumer }),
    invoke: invokeFactory({ ctx, Consumer }),
  }

}