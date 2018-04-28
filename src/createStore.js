import React, { createContext } from 'react';

export default (store) => {

  // Internal store
  const _Context = createContext({
    invocations: {},
    effects: {},
  });

  // User store
  const Context = createContext();

}