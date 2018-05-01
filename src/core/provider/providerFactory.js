import React from 'react';

export default ({ ctx, Provider }) => {
  class Reclare extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        value: ctx.getState()
      };
    }

    render() {
      return (
        <Provider value={this.state.value}>{this.props.children}</Provider>
      );
    }
  }

  return Reclare;
};
