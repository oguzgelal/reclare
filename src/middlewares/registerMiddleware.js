import { validateMiddleware } from './middlewareHelpers';
import registerHooks from './registerHooks';
import * as hookTypes from './hookTypes';

export default config => {
  validateMiddleware(config);

  const {
    onBeforeStart,
    onBeforeState,
    onAfterStart,
    verbose,
    onBeforeBroadcast,
    onAfterBroadcast,
    onGetState,
    onBeforeSetState,
    onAfterSetState,
    onDeclarationHit,
    onDeclarationMiss,
    onSituationTrue,
    onSituationFalse,
    onBeforeReaction,
    onAfterReaction,
  } = config;

  // reclare lifecycle
  registerHooks(hookTypes.BEFORE_START, onBeforeStart);
  registerHooks(hookTypes.BEFORE_STATE, onBeforeState);
  registerHooks(hookTypes.AFTER_START, onAfterStart);
  registerHooks(hookTypes.VERBOSE, verbose);

  // state
  registerHooks(hookTypes.GET_STATE, onGetState);
  registerHooks(hookTypes.BEFORE_SET_STATE, onBeforeSetState);
  registerHooks(hookTypes.AFTER_SET_STATE, onAfterSetState);

  // broadcast
  registerHooks(hookTypes.BEFORE_BROADCAST, onBeforeBroadcast);
  registerHooks(hookTypes.AFTER_BROADCAST, onAfterBroadcast);

  // declaration lifecycle
  registerHooks(hookTypes.DECLARATION_HIT, onDeclarationHit);
  registerHooks(hookTypes.DECLARATION_MISS, onDeclarationMiss);
  registerHooks(hookTypes.SITUATION_TRUE, onSituationTrue);
  registerHooks(hookTypes.SITUATION_FALSE, onSituationFalse);
  registerHooks(hookTypes.BEFORE_REACTION, onBeforeReaction);
  registerHooks(hookTypes.AFTER_REACTION, onAfterReaction);
};
