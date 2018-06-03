import React from 'react';
import 'todomvc-app-css/index.css';
import './App.css';

import Base from './view/Base';
import Footer from './view/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Base />
        <Footer />
      </div>
    );
  }
}

export default App;
