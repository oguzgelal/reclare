import React from 'react';
import { fail } from '../../utils/alert';

import validateInputs from './validateInputs';
import validateExposedProps from './validateExposedProps';

export default ({ ctx, Consumer }) => mapStateToProps => Wrap => props => (
  <Consumer>
    {state => {
      validateInputs(mapStateToProps, Wrap);
      const exposedProps = mapStateToProps(state);
      validateExposedProps(exposedProps);
      return <Wrap {...props} {...exposedProps} />;
    }}
  </Consumer>
);
