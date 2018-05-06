import { validateMiddleware } from './middlewareHelpers';
import registerHooks from './registerHooks';
import * as hookTypes from './hookTypes';

export default config => {
  validateMiddleware(config);

  const {
    onBeforeStart,
    onBeforeState,
    onAfterStart,
    onBeforeBroadcast,
    onAfterBroadcast,
    onGetState,
    onBeforeSetState,
    onAfterSetState
  } = config;

  /**
   * Runs before the library is initialized.
   */
  registerHooks(hookTypes.BEFORE_START, onBeforeStart);

  /**
   * Runs before initial state is set. Hook functions takes in the
   * initial state, and is supposed to return the next initial state.
   * If the intention is not prepopulating the state, use `onBeforeStart`
   *
   * hook functions receive: (initialState)
   * hook functions returns: nextInitialState
   */
  registerHooks(hookTypes.BEFORE_STATE, onBeforeState);

  /**
   * Runs after the library is initialized
   */
  registerHooks(hookTypes.AFTER_START, onAfterStart);

  /**
   * Runs every time before broadcast reaches the declarations
   */
  registerHooks(hookTypes.BEFORE_BROADCAST, onBeforeBroadcast);

  /**
   * Runs every time after broadcast lifecycle completes
   */
  registerHooks(hookTypes.AFTER_BROADCAST, onAfterBroadcast);

  /**
   * Runs when getState is called
   *
   * hook functions receive: (state)
   * state - current state
   */
  registerHooks(hookTypes.GET_STATE, onGetState);

  /**
   * Runs every time setState is called
   *
   * hook functions receive: (state, nextState)
   * state - current state
   * nextState - state after setState execution is completed
   */
  registerHooks(hookTypes.BEFORE_SET_STATE, onBeforeSetState);

  /**
   * Runs every time setState is called
   *
   * hook functions receive: (prevState, state)
   * prevState - previous state
   * state - current state with setState execution complete
   */
  registerHooks(hookTypes.AFTER_SET_STATE, onAfterSetState);
};
