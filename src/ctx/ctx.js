import reclareDefaults from '../config/reclareDefaults';
import parseDeclarations from '../declarations/parseDeclarations';
import executeHooks from '../middlewares/executeHooks';
import { validateConfiguration } from './ctxHelpers';
import { _broadcast } from '../broadcasts/broadcast';
import { _getState } from '../state/getState';
import { _registerMiddleware } from '../middlewares/registerMiddleware';
import { _registerHooks } from '../middlewares/registerHooks';
import randomString from '../utils/randomString';

import { validateBroadcastDeclaration } from '../broadcasts/broadcastHelpers';
import { validateSubscriptionDeclaration } from '../subscriptions/subscriptionHelpers';
import { DECLARATION_BROADCAST, DECLARATION_SUB } from '../config/constants';

import {
  BEFORE_START,
  BEFORE_STATE,
  AFTER_START
} from '../middlewares/hookTypes';

export default class ReclareContext {
  constructor(config) {
    validateConfiguration(config);
    this._init(config);
  }

  broadcast(...args) {
    return _broadcast(this)(...args);
  }

  getState(...args) {
    return _getState(this)(...args);
  }

  registerMiddleware(...args) {
    return _registerMiddleware(this)(...args);
  }

  registerHooks(...args) {
    return _registerHooks(this)(...args);
  }

  _init(config) {
    if (!this.started) {
      executeHooks({
        ctx: this,
        id: BEFORE_START
      });
      executeHooks(
        {
          ctx: this,
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

      // Assign a unique id to be able to compare context
      this.id = randomString(30);

      // Initialise the settings
      this.settings = Object.assign(reclareDefaults, config.options || {});

      // Initialise the state
      this.state = config.initialState || {};

      // Runs on broadcasts
      this.onEvent =
        config.onEvent &&
        parseDeclarations({
          type: DECLARATION_BROADCAST,
          declarations: config.onEvent,
          customValidate: config.mockValidate || validateBroadcastDeclaration
        });

      // Run right after reducers changes
      // the state (before reactions)
      this.onImmediateStateChange =
        config.onImmediateStateChange &&
        parseDeclarations({
          type: DECLARATION_SUB,
          declarations: config.onStateChange,
          customValidate: config.mockValidate || validateSubscriptionDeclaration
        });

      // Run when state changed and the declaration
      // finishes its execution (after reactions)
      this.onStateChange =
        config.onStateChange &&
        parseDeclarations({
          type: DECLARATION_SUB,
          declarations: config.onStateChange,
          customValidate: config.mockValidate || validateSubscriptionDeclaration
        });

      executeHooks({
        ctx: this,
        id: AFTER_START
      });
    }
  }
}
