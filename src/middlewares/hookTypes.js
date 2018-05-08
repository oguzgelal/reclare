/**
 * DEVELOPMENT ONLY - NOT FOR PRODUCTION
 * Executes on EVERY hook, receives all arguments
 * that the relevant hook receives.
 * 
 * hook functions receive: ({ id, [args] })
 * id - id of the executed hook
 * args - array of arguments that relevant hook receives
 */
export const VERBOSE = 'verbose';

/**
 * Runs before the library is initialized.
 */
export const BEFORE_START = 'beforeStart';

/**
 * Runs before initial state is set. Hook functions takes in the
 * initial state, and is supposed to return the next initial state.
 * If the intention is not prepopulating the state, use `onBeforeStart`
 *
 * hook functions receive: (initialState)
 * hook functions returns: nextInitialState
 */
export const BEFORE_STATE = 'beforeState';

/**
 * Runs after the library is initialized
 */
export const AFTER_START = 'afterStart';

/**
 * Runs when getState is called
 *
 * hook functions receive: (state)
 * state - current state
 */
export const GET_STATE = 'getState';

/**
 * Runs every time before setState is called
 *
 * hook functions receive: (state, nextState)
 * state - current state
 * nextState - state after setState execution is completed
 */
export const BEFORE_SET_STATE = 'beforeSetState';

/**
 * Runs every time after setState execution is complete
 *
 * hook functions receive: (prevState, state)
 * prevState - previous state
 * state - current state with setState execution complete
 */
export const AFTER_SET_STATE = 'afterSetState';

/**
 * Runs every time before broadcast reaches the declarations
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const BEFORE_BROADCAST = 'beforeBroadcast';

/**
 * Runs every time after broadcast lifecycle completes
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const AFTER_BROADCAST = 'afterBroadcast';

/**
 * Runs every time a broadcasted event matches a declaration
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const DECLARATION_HIT = 'declarationHit';

/**
 * Runs every time a broadcasted event fails to match a declaration
 * (ie. nothing declared for that event)
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const DECLARATION_MISS = 'declarationMiss';

/**
 * Runs every time a declaration gets triggered. This trigger gets handy
 * when you want to add functionality by extending the declaration definition,
 * because it receives the declaration object as it is defined.
 * 
 * hook functions receive: (eventKey, payload, declaration)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 * declaration - declaration object
 */
export const DECLARATION_TRIGGERED = 'declarationTriggered';

/**
 * Runs every time after situation (or situations)
 * are evaluated and holds
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const SITUATION_TRUE = 'situationTrue';

/**
 * Runs every time after situation (or situations)
 * are evaluated and does not hold
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const SITUATION_FALSE = 'situationFalse';

/**
 * Runs every time before before a reducer
 * gets executed (including reducerElse)
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const BEFORE_REDUCER = 'beforeReducer';

/**
 * Runs every time after before a reducer
 * gets executed (including reducerElse)
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const AFTER_REDUCER = 'afterReducer'

/**
 * Runs every time before before a reaction
 * gets executed (including reactionElse)
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const BEFORE_REACTION = 'beforeReaction';

/**
 * Runs every time after before a reaction
 * gets executed (including reactionElse)
 * 
 * hook functions receive: (eventKey, payload)
 * eventKey - the event that was broadcasted
 * payload - payload of the broadcast
 */
export const AFTER_REACTION = 'afterReaction'

