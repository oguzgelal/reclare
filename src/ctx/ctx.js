import reclareDefaults from '../config/reclareDefaults';
import parseDeclarations from '../declarations/parseDeclarations';
import executeHooks from '../middlewares/executeHooks';
import { validateConfiguration } from './ctxHelpers';
import { _broadcast } from '../broadcasts/broadcast';
import { _subscribe } from '../subscriptions/subscribe';
import { _getState } from '../state/getState';
import { _registerMiddlewares } from '../middlewares/registerMiddlewares';
import { _registerHooks } from '../middlewares/registerHooks';
import randomString from '../utils/randomString';

import { validateBroadcastDeclaration } from '../broadcasts/broadcastHelpers';
import { validateSubscriptionDeclaration } from '../subscriptions/subscriptionHelpers';

import {
  BEFORE_START,
  BEFORE_STATE,
  AFTER_START
} from '../middlewares/hookTypes';

import {
  ON_EVENT,
  ON_STATE_CHANGE,
  DECLARATION_BROADCAST,
  DECLARATION_SUB
} from '../config/constants';

export default class ReclareContext {
  constructor(config) {
    validateConfiguration(config);
    this._preInit(config);
    this._init(config);
  }

  broadcast(...args) {
    return _broadcast(this)(...args);
  }

  subscribe(...args) {
    return _subscribe(this)(...args);
  }

  getState(...args) {
    return _getState(this)(...args);
  }

  registerMiddlewares(...args) {
    return _registerMiddlewares(this)(...args);
  }

  registerHooks(...args) {
    return _registerHooks(this)(...args);
  }

  _preInit(config) {
    config.middlewares && this.registerMiddlewares(config.middlewares);
  }

  _init(config) {
    executeHooks({ ctx: this, id: BEFORE_START }, { ctx: this });
    executeHooks(
      {
        ctx: this,
        id: BEFORE_STATE,
        out: nextInitialState => {
          config.initialState = Object.assign(
            {},
            config.initialState,
            nextInitialState
          );
        }
      },
      {
        ctx: this,
        initialState: config.initialState
      }
    );

    this.started = true;

    // Assign a unique id to be able to compare context
    this.id = randomString(30);

    // Initialise the settings
    this.settings = Object.assign(reclareDefaults, config.options || {});

    // Initialise the state
    this.state = config.initialState || {};

    // Runs on broadcasts
    this[ON_EVENT] =
      config[ON_EVENT] &&
      parseDeclarations({
        type: DECLARATION_BROADCAST,
        declarations: config[ON_EVENT],
        customValidate: config.mockValidate || validateBroadcastDeclaration
      });

    // Runs when state changed
    this[ON_STATE_CHANGE] =
      config[ON_STATE_CHANGE] &&
      parseDeclarations({
        type: DECLARATION_SUB,
        declarations: config[ON_STATE_CHANGE],
        customValidate: config.mockValidate || validateSubscriptionDeclaration
      });

    executeHooks({ ctx: this, id: AFTER_START }, { ctx: this });
  }
}
