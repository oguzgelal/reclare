import reclareDefaults from '../config/reclareDefaults';
import parseDeclarations from '../declarations/parseDeclarations';
import executeHooks from '../middlewares/executeHooks';
import { validateConfiguration } from './ctxHelpers';
import { validateBroadcastDeclaration } from '../broadcasts/broadcastHelpers';
import { validateSubscriptionDeclaration } from '../subscriptions/subscriptionHelpers';

import {
  BEFORE_START,
  BEFORE_STATE,
  AFTER_START
} from '../middlewares/hookTypes';

import {
  DECLARATION_BROADCAST,
  DECLARATION_SUB,
  DECLARATION_SUB_IMMEDIATE
} from '../config/constants';

import broadcast from '../broadcasts/broadcast';

export default class ReclareContext {
  constructor(config) {
    validateConfiguration(config);
    this.init(config);
  }

  init(config) {
    if (!this.started) {
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

      this.started = true;

      // Initialise the settings
      this.settings = Object.assign(reclareDefaults, config.options || {});

      // Initialise the state
      this.state = config.initialState || {};

      // Set on broadcasts
      this.onEvent =
        config.onEvent &&
        parseDeclarations({
          type: DECLARATION_BROADCAST,
          declarations: config.onEvent,
          customValidateDeclaration: validateBroadcastDeclaration,
          customValidateSituation: null,
          customValidateReducer: null,
          customValidateReaction: null
        });

      // Run right after reducers changes the state (before reactions)
      this.onImmediateStateChange =
        config.onImmediateStateChange &&
        parseDeclarations({
          type: DECLARATION_SUB_IMMEDIATE,
          declarations: config.onStateChange,
          customValidateDeclaration: validateSubscriptionDeclaration,
          customValidateSituation: null,
          customValidateReducer: null,
          customValidateReaction: null
        });

      // Run when state changed and the declaration finishes its execution (after reactions)
      this.onStateChange =
        config.onStateChange &&
        parseDeclarations({
          type: DECLARATION_SUB,
          declarations: config.onStateChange,
          customValidateDeclaration: validateSubscriptionDeclaration,
          customValidateSituation: null,
          customValidateReducer: null,
          customValidateReaction: null
        });

      executeHooks({ id: AFTER_START });
    }
  }

  broadcast(...args) {
    broadcast(args);
  }
}
