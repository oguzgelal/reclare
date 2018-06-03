import { createSelector } from 'reselect';
import { broadcast } from 'reclare';
import get from 'lodash/get';

import {
  INPUT_SUBMITTED,
  INPUT_RESET,
  INPUT_CHANGED,
} from './inputs';

export const ITEM_COMPLETE_CLICKED = 'ITEM_COMPLETE_CLICKED';
export const ITEM_DELETE_CLICKED = 'ITEM_DELETE_CLICKED';
export const ITEM_DOUBLE_CLICKED = 'ITEM_DOUBLE_CLICKED';

export const onEvent = [
  {
    on: ITEM_COMPLETE_CLICKED,
    reducer: ({ state, event }) => {
      const todos = get(state, 'todos', []).slice();
      const { itemIndex, item } = itemSelector({ todos, id: event.id })
      todos[itemIndex] = { ...item, completed: event.status };
      return { ...state, todos }
    }
  },
  {
    on: ITEM_DELETE_CLICKED,
    reducer: ({ state, event }) => {
      const todos = get(state, 'todos', []).slice();
      const { itemIndex } = itemSelector({ todos, id: event.id })
      todos.splice(itemIndex, 1);
      return { ...state, todos }
    }
  },
  {
    on: ITEM_DOUBLE_CLICKED,
    reducer: ({ state, event }) => {
      const todos = get(state, 'todos', []).slice();
      const { itemIndex, item } = itemSelector({ todos, id: event.id });
      todos[itemIndex] = { ...item, editing: true };
      return { ...state, todos }
    },
    reaction: ({ state, event }) => {
      const todos = get(state, 'todos', []).slice();
      const { item } = itemSelector({ todos, id: event.id });
      broadcast(INPUT_CHANGED, { key: 'itemInput', value: item.text });
    }
  },
  {
    on: INPUT_SUBMITTED,
    situation: [
      ({ event }) => event.key === 'todoInput',
      ({ state }) => get(state, 'inputs.todoInput'),
    ],
    reducer: ({ state }) => ({
      ...state,
      todos: [
        {
          id: `t${Math.round(Math.random() * 10000000000)}`,
          completed: false,
          editing: false,
          text: get(state, 'inputs.todoInput', ''),
        },
        ...get(state, 'todos', [])
      ],
    }),
    reaction: ({ event }) => broadcast(INPUT_RESET, {
      key: event.key,
    })
  },
  {
    on: INPUT_SUBMITTED,
    situation: [
      ({ event }) => event.key === 'itemInput',
      ({ state }) => get(state, 'inputs.itemInput'),
    ],
    reducer: ({ state, event }) => {
      const todos = get(state, 'todos', []).slice();
      const { itemIndex, item } = itemSelector({ todos, id: event.id });
      const text = get(state, 'inputs.itemInput');
      todos[itemIndex] = { ...item, editing: false, text };
      return { ...state, todos }
    },
    reaction: ({ event }) => broadcast(INPUT_RESET, {
      key: event.key,
    })
  },
]

export const itemSelector = createSelector(
  args => args.todos,
  args => args.id,
  (todos, id) => {
    const itemIndex = (todos || []).map(t => t.id).indexOf(id);
    return { itemIndex, item: todos[itemIndex] };
  }
)