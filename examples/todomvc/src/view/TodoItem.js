import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';

import { connect } from 'react-reclare';
import { broadcast } from 'reclare';

import {
  ITEM_COMPLETE_CLICKED,
  ITEM_DELETE_CLICKED,
  ITEM_DOUBLE_CLICKED,
} from '../ducks/todoItem';

import {
  INPUT_CHANGED,
  INPUT_SUBMITTED
} from '../ducks/inputs';

const TodoItem = props => {
  return (
    <li
      className={cx(
        { 'completed': props.completed },
        { 'editing': props.editing },
      )}
      onDoubleClick={() =>
        broadcast(ITEM_DOUBLE_CLICKED, { id: props.id })
      }
    >
      <input
        type="checkbox"
        className="toggle"
        checked={props.completed}
        onChange={() =>
          broadcast(ITEM_COMPLETE_CLICKED, {
            id: props.id,
            status: !props.completed,
          })
        }
      />
      {!props.editing && <label>{props.text}</label>}
      {props.editing &&
        <form onSubmit={(e) => broadcast(INPUT_SUBMITTED, { e, key: 'itemInput', id: props.id })}>
          <input
            className="edit"
            value={props.itemInput}
            onBlur={(e) => broadcast(INPUT_SUBMITTED, { e, key: 'itemInput', id: props.id })}
            onChange={(e) => broadcast(INPUT_CHANGED, { e, key: 'itemInput' })}
          />
        </form>
      }
      <button
        className="destroy"
        onClick={() => broadcast(ITEM_DELETE_CLICKED, { id: props.id, })}
      />
    </li>
  );
};

TodoItem.propTypes = {
  itemInput: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
};

const mapStateToProps = state => ({
  itemInput: get(state, 'inputs.itemInput', ''),
})

export default connect(mapStateToProps)(TodoItem);