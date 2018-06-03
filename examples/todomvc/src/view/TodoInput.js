import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { connect } from 'react-reclare';
import { broadcast } from 'reclare';

import {
  INPUT_CHANGED,
  INPUT_SUBMITTED,
} from '../ducks/inputs';

const TodoInput = props => {
  return (
    <form onSubmit={e => broadcast(INPUT_SUBMITTED, { e, key: 'todoInput' })}>
      <input
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
        value={props.todoInput}
        onChange={e => broadcast(INPUT_CHANGED, { e, key: 'todoInput' })}
      />
    </form>
  );
};

TodoInput.propTypes = {
  todoInput: PropTypes.string,
};

const mapStateToProps = state => ({
  todoInput: get(state, 'inputs.todoInput', '')
})

export default connect(mapStateToProps)(TodoInput);