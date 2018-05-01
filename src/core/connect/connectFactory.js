import React from 'react';
import { fail } from '../../utils/alert';

const validateInputs = (mapStateToProps, Wrap) => {
  if (!mapStateToProps || typeof mapStateToProps !== 'function') {
    fail(
      `First argument of connect must be a function, received: ${JSON.stringify(
        mapStateToProps
      )}`,
      '1faMX7E2xqlyCF'
    );
  }
  if (!Wrap) {
    fail(
      'The HOC returned by the connect method must immediately wrap a React component',
      'oBi1y12ZjYJHrA'
    );
  }
};

const validateExposedProps = exposedProps => {
  if (!exposedProps || typeof exposedProps !== 'object') {
    fail(
      'The first argument of connect must me a function and return object of key / value pairs',
      'AF8tNMQpak6LU0'
    );
  }
};

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
