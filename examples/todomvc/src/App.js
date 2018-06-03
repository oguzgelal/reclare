import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { connect } from 'react-reclare';
import { broadcast } from 'reclare';

import TodoInput from './view/TodoInput';
import TodoList from './view/TodoList';
import TodoFooter from './view/TodoFooter';
import Footer from './view/Footer';


const App = props => (
  <div>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput />
      </header>
      {
        get(props, 'todos', []).length > 0 &&
        <section className="main">
          <TodoList />
          <TodoFooter />
        </section>
      }
    </section>
    <Footer />
  </div>
);

App.propTypes = {
  todos: PropTypes.array,
}

const mapStateToProps = state => ({
  todos: state.todos
})

export default connect(mapStateToProps)(App);