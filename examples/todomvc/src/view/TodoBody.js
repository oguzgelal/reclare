import React from 'react';
import PropTypes from 'prop-types';

const TodoBody = props => {
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        <li data-id="1527983886287">
          <input className="toggle" type="checkbox" />
          <label>asd</label>
          <button className="destroy" />
        </li>
        <li data-id="1527984424587">
          <input className="toggle" type="checkbox" />
          <label>test</label>
          <button className="destroy"></button>
        </li>
        <li data-id="1527984425106">
          <input className="toggle" type="checkbox" />
          <label>hey</label>
          <button className="destroy"></button>
        </li>
      </ul>
      <footer className="footer">
        <span className="todo-count">3 items left</span>
        <ul className="filters">
          <li><a href="#/" className="selected">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </section>
  );
};

TodoBody.propTypes = {
};

export default TodoBody;