import { verifyConfiguration } from './ctxHelpers';

import ctx from './';
import defaultSettings from './defaultSettings';
import parseDeclarations from '../declarations/parseDeclarations';
import executeHooks from '../middlewares/executeHooks';
import {
  BEFORE_START,
  BEFORE_STATE,
  AFTER_START
} from '../middlewares/hookTypes';

export default (config, options = {}) => {
  /**
   * Since middlewares are given the option the option to receive
   * the configuration and initialize core Reclare library,
   * multiple plugins may attempt to do it. To avoid this,
   * make sure it's initiated only once.
   */

  if (!ctx.started) {
    executeHooks({
      id: BEFORE_START
    });

    executeHooks(
      {
        id: BEFORE_STATE,
        out: nextInitialState => {
          // if a falsy value is returned from the hook, set initialState to its
          // previous value so middlewares can't accidentally break initial state
          config.initialState = nextInitialState || config.initialState;
        }
      },
      config.initialState
    );

    verifyConfiguration(config);

    ctx.started = true;

    // Initialise the settings
    ctx.settings = Object.assign({}, defaultSettings, options)

    // Initialise the state
    ctx.state = config.initialState || {};

    // Set declarations
    ctx.declarations = parseDeclarations({ config });

    executeHooks({
      id: AFTER_START
    });
  }
};
