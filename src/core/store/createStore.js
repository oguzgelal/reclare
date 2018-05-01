import React from 'react';

import { verifyStore } from './storeHelpers';
import processDeclarations from '../declarations/processDeclarations';
import connectFactory from '../connect/connectFactory';
import invokeFactory from '../invocations/invokeFactory';
import providerFactory from '../provider/providerFactory';

export default store => {
  verifyStore(store);

  // TODO: implement lifecycles

  // TODO: implement persistence
  // TODO: prepopulate persisted state
  // TODO: option for middlewares to prepopulate state

  const { Provider, Consumer } = React.createContext();

  let ctx = {
    _state: store.initialState || {},
    getState: () => ctx._state,
    setState: state => {
      ctx._state = state;
    },
    // middlewares: processMiddlewares({ ctx, store }),
    declarations: processDeclarations({ ctx, store })
  };

  return {
    _ctx: ctx,
    getState: ctx.getState,
    Reclare: providerFactory({ ctx, Provider }),
    connect: connectFactory({ ctx, Consumer }),
    invoke: invokeFactory({ ctx, Consumer })
  };
};
