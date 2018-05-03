import React from 'react';

import storeCreatorFactory from './core/store/storeCreatorFactory';
import connectFactory from './core/connect/connectFactory';
import registerFactory from './core/registrations/registerFactory';
import getStateFactory from './core/state/getStateFactory';
import setStateFactory from './core/state/setStateFactory';
import providerFactory from './core/provider/providerFactory';

// TODO: fix circular dependancy

const { Provider, Consumer } = React.createContext();

const _ctx = {};

const _getState = getStateFactory();
const _setState = setStateFactory();
const createStore = storeCreatorFactory();
const connect = connectFactory();
const registerEvent = registerFactory();

export {
  _ctx,
  _getState,
  _setState,
  Provider,
  Consumer,
  createStore,
  connect,
  registerEvent
};
