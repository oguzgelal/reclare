import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createContext } from 'reclare';
import { ReclareProvider } from 'react-reclare';

import * as inputs from './ducks/inputs';
import * as todoItem from './ducks/todoItem';
import * as todoFilters from './ducks/todoFilters';

const ctx = createContext({
  ducks: [
    inputs,
    todoItem,
    todoFilters,
  ],
  initialState: {
    todoFilter: todoFilters.FILTER_ALL,
    inputs: {},
    todos: [],
  },
})

const base = (
  <ReclareProvider context={ctx}>
    <App />
  </ReclareProvider>
);

ReactDOM.render(base, document.getElementById('root'));
registerServiceWorker();
