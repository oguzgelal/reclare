import React, { createContext } from 'react';

import { fail } from './utils/alert';

export default (store) => {

  // condition check
  if (!store) { fail('Invalid argument provided', 'uzHuCovKH1afIb') }
  if (!store.declarations) { fail('`declarations` field required', 'iMcb7yfuyG1Tv8') }
  if (!Array.isArray(store.declarations)) { fail('`declarations` should be an object array', 'wEfvjNdm3SCHuM') }

  const { declarations } = store;

  

}