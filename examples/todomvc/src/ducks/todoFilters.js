import { createSelector } from 'reselect'

export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_ACTIVE = 'FILTER_ACTIVE';
export const FILTER_COMPLETED = 'FILTER_COMPLETED';
export const FILTER_CHANGE_CLICKED = 'FILTER_CHANGE_CLICKED';

export const onEvent = [
  {
    on: FILTER_CHANGE_CLICKED,
    reaction: ({ event }) => event.e.preventDefault(),
    reducer: ({ state, event }) => ({
      ...state,
      todoFilter: event.filter
    })
  }
]

export const todosFilterSelector = createSelector(
  args => args.todos,
  args => args.filter,
  (todos, filter) => {
    return (todos || []).filter(todo =>
      (filter === FILTER_COMPLETED && todo.completed) ||
      (filter === FILTER_ACTIVE && !todo.completed) ||
      (filter === FILTER_ALL)
    )
  }
)

export const todosCompletedSelector = createSelector(
  args => args.todos,
  todos => (todos || []).filter(todo => todo.completed)
)

export const todosActiveSelector = createSelector(
  args => args.todos,
  todos => (todos || []).filter(todo => !todo.completed)
)