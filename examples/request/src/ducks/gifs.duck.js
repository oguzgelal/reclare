import set from 'lodash/fp/set';
import get from 'lodash/get';
import { broadcast } from 'reclare';
import {
  REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  REQUEST_STOP
} from './request.duck';

export const SEARCH = 'SEARCH';
export const SEARCH_STOP = 'SEARCH_STOP';

export const onEvent = [
  {
    on: SEARCH,
    reaction: ({ event }) =>
      broadcast(REQUEST, {
        key: SEARCH,
        method: 'get',
        url: 'http://api.giphy.com/v1/gifs/search',
        params: {
          q: event.query,
          api_key: 'e76rryE2NoQ2G5rxH3lMftuXezp8Reb5'
        }
      })
  },
  {
    on: SEARCH_STOP,
    reaction: () => broadcast(REQUEST_STOP, { key: SEARCH })
  },
  {
    on: REQUEST_SUCCESS,
    situation: ({ event }) => event.key === SEARCH,
    reducer: ({ state, event }) =>
      set('gifs', get(event, 'data.data', []), state)
  },
  {
    on: REQUEST_FAIL,
    situation: ({ event }) => event.key === SEARCH,
    reaction: () => alert('Failed')
  }
];
