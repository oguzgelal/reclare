import React from 'react';
import PropTypes from 'prop-types';

import { broadcast } from 'reclare';
import { connect } from 'react-reclare';

import {
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
  FILTER_CHANGE_CLICKED,
  todosActiveSelector,
  todosCompletedSelector,
} from '../ducks/todoFilters';

const TodoFooter = props => {

  const todosActive = todosActiveSelector({
    todos: props.todos
  });

  const todosCompleted = todosCompletedSelector({
    todos: props.todos
  })

  return (
    <footer className="footer">
      <span className="todo-count">
        {todosActive.length} items left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#"
            className={props.todoFilter === FILTER_ALL ? 'selected' : ''}
            onClick={e => broadcast(FILTER_CHANGE_CLICKED, {
              filter: FILTER_ALL, e
            })}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#"
            className={props.todoFilter === FILTER_ACTIVE ? 'selected' : ''}
            onClick={e => broadcast(FILTER_CHANGE_CLICKED, {
              filter: FILTER_ACTIVE, e
            })}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#"
            className={props.todoFilter === FILTER_COMPLETED ? 'selected' : ''}
            onClick={e => broadcast(FILTER_CHANGE_CLICKED, {
              filter: FILTER_COMPLETED, e
            })}
          >
            Completed
          </a>
        </li>
      </ul>
      {
        todosCompleted &&
        todosCompleted.length > 0 &&
        <button className="clear-completed">
          Clear completed
        </button>
      }
    </footer>
  );
};

TodoFooter.propTypes = {
  todos: PropTypes.array,
  todoFilter: PropTypes.string,
};

const mapStateToProps = state => ({
  todos: state.todos,
  todoFilter: state.todoFilter
})

export default connect(mapStateToProps)(TodoFooter);