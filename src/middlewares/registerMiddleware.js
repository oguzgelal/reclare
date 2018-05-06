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
    onAfterSetState,
    onDeclarationTriggered,
    onSituationTrue,
    onSituationFalse,
  } = config;

  // reclare lifecycle
  registerHooks(hookTypes.BEFORE_START, onBeforeStart);
  registerHooks(hookTypes.BEFORE_STATE, onBeforeState);
  registerHooks(hookTypes.AFTER_START, onAfterStart);

  // state
  registerHooks(hookTypes.GET_STATE, onGetState);
  registerHooks(hookTypes.BEFORE_SET_STATE, onBeforeSetState);
  registerHooks(hookTypes.AFTER_SET_STATE, onAfterSetState);

  // broadcast
  registerHooks(hookTypes.BEFORE_BROADCAST, onBeforeBroadcast);
  registerHooks(hookTypes.AFTER_BROADCAST, onAfterBroadcast);

  // declaration lifecycle
  registerHooks(hookTypes.ON_DECLARATION_TRIGGERED, onDeclarationTriggered);
  registerHooks(hookTypes.ON_SITUATION_TRUE, onSituationTrue);
  registerHooks(hookTypes.ON_SITUATION_FALSE, onSituationFalse);
};
