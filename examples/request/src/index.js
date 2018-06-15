import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createContext } from 'reclare';
import { ReclareProvider } from 'react-reclare';
import * as request from './ducks/request.duck';
import * as gifs from './ducks/gifs.duck';

import App from './App';

const ctx = createContext({
  ducks: [request, gifs],
  initialState: {
    gifs: []
  }
});

const base = (
  <ReclareProvider context={ctx}>
    <App />
  </ReclareProvider>
);

ReactDOM.render(base, document.getElementById('root'));
registerServiceWorker();
