import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'reclare/reclare.js'

const r = createStore({
  declarations: [
    {
      key: 'increment_counter',
      situation: true,
      reaction: ({ state, setState }) => setState(Object.assign(state, { c: state.c + 1 }))
    },
    {
      key: 'decrement_counter',
      situation: ({ state, invocation }) => state.c > 0,
      reaction: ({ state, setState }) => setState(Object.assign(state, { c: state.c - 1 }))
    },
    {
      key: 'decrement_counter',
      situation: ({ state, invocation }) => state.c <= 0,
      reaction: () => new Error('Counter at zero')
    }
  ]
})


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
