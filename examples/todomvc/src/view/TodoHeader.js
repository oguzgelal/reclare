import React from 'react';
import PropTypes from 'prop-types';

const TodoInput = props => {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </header>
  );
};

TodoInput.propTypes = {
};

export default TodoInput;