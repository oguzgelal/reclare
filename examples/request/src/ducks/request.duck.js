import axios from 'axios';
import { broadcast } from 'reclare';
import set from 'lodash/fp/set';
import get from 'lodash/get';

export const REQUEST = 'REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const REQUEST_RESOLVE = 'REQUEST_RESOLVE';
export const REQUEST_STOP = 'REQUEST_STOP';

export const onEvent = [
  {
    on: REQUEST,
    reducer: ({ state, event }) =>
      set(`loading.${event.key}`, true, state),
    reaction: ({ event }) =>
      axios(event)
        .then(res => broadcast(REQUEST_RESOLVE, {
          ...res,
          e: REQUEST_SUCCESS,
          key: event.key,
        }))
        .catch(err => broadcast(REQUEST_RESOLVE, {
          ...err,
          e: REQUEST_FAIL,
          key: event.key,
        }))
  },
  {
    on: REQUEST_RESOLVE,
    situation: ({ state, event }) =>
      get(state, `loading.${event.key}`),
    reaction: [
      ({ event: { e, ...rest } }) => broadcast(e, rest),
      ({ event }) => broadcast(REQUEST_STOP, event)
    ]
  },
  {
    on: REQUEST_STOP,
    reducer: ({ state, event }) =>
      set(`loading.${event.key}`, false, state)
  },
];
