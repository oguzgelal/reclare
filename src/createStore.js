import React from 'react';

import { verify } from './helpers/storeHelpers';
import { processDeclarations } from './helpers/processHelpers';
import { connectFactory, invokeFactory } from './factories'

export default (store) => {

  verify(store)

  const { Provider, Consumer } = React.createContext();

  let ctx = {
    state: store.initialState || {},
    getState: () => ctx.state,
    setState: state => {
      ctx.state = state
    },
    middlewares: processMiddlewares({ ctx, store }),
    declarations: processDeclarations({ ctx, store }),
  }

  return {
    Provider,
    getState: ctx.getState,
    connect: connectFactory({ ctx, Consumer }),
    invoke: invokeFactory({ ctx, Consumer }),
  }

}