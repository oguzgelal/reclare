import React from 'react';
import { fail } from '../utils/alert';

import { Consumer } from '../context';

import validateInputs from './validateInputs';
import validateExposedProps from './validateExposedProps';
import evaluateExposedProps from './evaluateExposedProps';

export default mapStateToProps => Wrap => props => (
  <Consumer>
    {state => {
      validateInputs(mapStateToProps, Wrap);
      const exposedPropsObject = mapStateToProps(state);
      const exposedProps = evaluateExposedProps(exposedPropsObject);
      validateExposedProps(exposedProps);
      return <Wrap {...props} {...exposedProps} />;
    }}
  </Consumer>
);
