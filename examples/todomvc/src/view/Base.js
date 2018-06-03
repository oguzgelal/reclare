import React from 'react';
import PropTypes from 'prop-types';

import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';

const Base = props => {
  return (
    <section className="todoapp">
      <TodoHeader />
      <TodoBody />
    </section>
  );
};

Base.propTypes = {
};

export default Base;