import { validateMiddleware } from './middlewareHelpers';
import registerHooks from './registerHooks';
import * as hookTypes from './hookTypes';

export default config => {
  validateMiddleware(config);

  const {
    verbose,
    onBeforeStart,
    onBeforeState,
    onAfterStart,
    onBeforeBroadcast,
    onAfterBroadcast,
    onGetState,
    onBeforeSetState,
    onAfterSetState,
    onDeclarationHit,
    onDeclarationMiss,
    onDeclarationTriggered,
    onSituationTrue,
    onSituationFalse,
    onBeforeReducer,
    onBeforeReducers,
    onAfterReducer,
    onAfterReducers,
    onBeforeReaction,
    onBeforeReactions,
    onAfterReaction,
    onAfterReactions,
  } = config;

  // reclare lifecycle
  registerHooks(hookTypes.VERBOSE, verbose);
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
  registerHooks(hookTypes.DECLARATION_HIT, onDeclarationHit);
  registerHooks(hookTypes.DECLARATION_MISS, onDeclarationMiss);
  registerHooks(hookTypes.DECLARATION_TRIGGERED, onDeclarationTriggered);
  registerHooks(hookTypes.SITUATION_TRUE, onSituationTrue);
  registerHooks(hookTypes.SITUATION_FALSE, onSituationFalse);
  registerHooks(hookTypes.BEFORE_REDUCER, onBeforeReducer);
  registerHooks(hookTypes.BEFORE_REDUCERS, onBeforeReducers);
  registerHooks(hookTypes.AFTER_REDUCER, onAfterReducer);
  registerHooks(hookTypes.AFTER_REDUCERS, onAfterReducers);
  registerHooks(hookTypes.BEFORE_REACTION, onBeforeReaction);
  registerHooks(hookTypes.BEFORE_REACTIONS, onBeforeReactions);
  registerHooks(hookTypes.AFTER_REACTION, onAfterReaction);
  registerHooks(hookTypes.AFTER_REACTIONS, onAfterReactions);
};
