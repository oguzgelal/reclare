import React from 'react';
import { _ctx, Provider } from '../../main';

let provider = null;

class Reclare extends React.Component {
  constructor(props, context) {
    super(props, context);

    provider = this;

    this.state = {
      value: _ctx.store.initialState || {}
    };
  }

  render() {
    return <Provider value={this.state.value}>{this.props.children}</Provider>;
  }
}

export { provider };
export default Reclare;
