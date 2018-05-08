/**
 * options:
 * 
 * deferExecution - If true, broadcast will take effect after the current event
 * loop tick (basically be wrapped with setSimeout(..., 0)). Default is false
 */

import ctx from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import triggerDeclaration from '../declarations/triggerDeclaration';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';

const broadcast = (eventKey, payload, options = {}) => {
  executeHooks({ id: BEFORE_BROADCAST }, eventKey, payload);

  triggerDeclaration({
    declaration: (ctx.declarations || {})[eventKey] || null,
    eventKey,
    payload,
  })

  executeHooks({ id: AFTER_BROADCAST }, eventKey, payload);
}

export default (eventKey, payload, options = {}) => {
  if (options.deferExecution || ctx.settings.deferExecution) {
    setTimeout(() => broadcast(eventKey, payload))
  } else {
    broadcast(eventKey, payload)
  }
};
