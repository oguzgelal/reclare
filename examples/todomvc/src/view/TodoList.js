import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-reclare';
import { broadcast } from 'reclare';

import TodoItem from './TodoItem';
import { todosFilterSelector } from '../ducks/todoFilters';

const TodoList = props => {

  const todosFiltered = todosFilterSelector({
    todos: props.todos,
    filter: props.todoFilter,
  });

  return (
    <ul className="todo-list">
      {
        todosFiltered.map(todo =>
          <TodoItem key={todo.id} {...todo} />
        )
      }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  todoFilter: PropTypes.string,
};

const mapStateToProps = state => ({
  todos: state.todos,
  todoFilter: state.todoFilter,
})

export default connect(mapStateToProps)(TodoList);