import React from 'react';

import { verify } from './helpers/storeHelpers';
import { processDeclarations } from './helpers/declarationHelpers';
import { connectFactory, invokeFactory } from './factories/index'

export default (store) => {

  verify(store)

  const { Provider, Consumer } = React.createContext();

  let ctx = {
    state: {},
    getState: () => ctx.state,
    setState: state => ctx.state = state,
    declarations: processDeclarations(store),
  }

  return {
    Provider,
    getState: ctx.getState,
    connect: connectFactory({ ctx, Consumer }),
    invoke: invokeFactory({ ctx, Consumer }),
  }

}