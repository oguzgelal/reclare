import get from 'lodash/get';

export const INPUT_CHANGED = 'INPUT_CHANGED';
export const INPUT_SUBMITTED = 'INPUT_SUBMITTED';
export const INPUT_RESET = 'INPUT_RESET';

export const onEvent = [
  {
    on: INPUT_CHANGED,
    reducer: ({ state, event }) => ({
      ...state,
      inputs: {
        ...get(state, 'inputs', {}),
        [event.key]: (
          get(event, 'value') ||
          get(event, 'e.target.value')
        )
      }
    })
  },
  {
    on: INPUT_SUBMITTED,
    reaction: ({ event }) => event.e.preventDefault(),
  },
  {
    on: INPUT_RESET,
    reducer: ({ state, event }) => ({
      ...state,
      inputs: {
        ...get(state, 'inputs', {}),
        [event.key]: ''
      }
    })
  }
]