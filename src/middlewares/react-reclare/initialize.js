import { startReclare, registerMiddleware } from '../../core';

import getStateHooks from './hooks/getState';
import setStateHooks from './hooks/setState';

export default ({ provider, declarations, initialState }) => {
  // register hooks
  registerMiddleware({
    onGetState: getStateHooks(provider),
    onAfterSetState: setStateHooks(provider)
  });

  // initialize reclare context
  startReclare({ declarations, initialState });
};
