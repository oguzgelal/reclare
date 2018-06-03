import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => {
  return (
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>by <a href="https://github.com/oguzgelal">Oguz Gelal</a></p>
      <p>Example for <a href="https://github.com/reclarejs/reclare">Reclare</a></p>
    </footer>
  );
};

Footer.propTypes = {
};

export default Footer;