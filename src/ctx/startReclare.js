import ctx from './';
import reclareDefaults from '../config/reclareDefaults';
import parseDeclarations from '../declarations/parseDeclarations';
import executeHooks from '../middlewares/executeHooks';
import { validateConfiguration } from './ctxHelpers';
import { validateBroadcastDeclaration } from '../broadcasts/broadcastHelpers';
import { validateSubscriptionDeclaration } from '../subscriptions/subscriptionHelpers';

import { BEFORE_START, BEFORE_STATE, AFTER_START } from '../middlewares/hookTypes';
import { DECLARATION_BROADCAST, DECLARATION_SUBSCRIPTION } from '../config/constants'

export default (config) => {
  validateConfiguration(config);

  /**
   * Since middlewares are given the option the option to receive
   * the configuration and initialize core Reclare library,
   * multiple plugins may attempt to do it. To avoid this,
   * make sure it's initiated only once.
   */

  if (!ctx.started) {
    executeHooks({ id: BEFORE_START });

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

    ctx.started = true;

    // Initialise the settings
    ctx.settings = Object.assign(reclareDefaults, config.options || {})

    // Initialise the state
    ctx.state = config.initialState || {};

    // Set broadcast channel declarations
    ctx.onEvent = parseDeclarations({
      type: DECLARATION_BROADCAST,
      declarations: config.onEvent,
      customValidateDeclaration: validateBroadcastDeclaration,
      customValidateSituation: null,
      customValidateReducer: null,
      customValidateReaction: null,
    });

    // Set state change declarations
    ctx.onStateChange = parseDeclarations({
      type: DECLARATION_SUBSCRIPTION,
      declarations: config.onStateChange,
      customValidateDeclaration: validateSubscriptionDeclaration,
      customValidateSituation: null,
      customValidateReducer: null,
      customValidateReaction: null,
    });

    executeHooks({ id: AFTER_START });
  }
};
