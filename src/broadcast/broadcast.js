import ctx from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import triggerDeclaration from '../declarations/triggerDeclaration';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';
import defaultOptions from './defaultOptions';

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
  const opts = Object.assign(defaultOptions, options)

  if (opts.defer) {
    setTimeout(() => broadcast(eventKey, payload, opts))
  } else {
    broadcast(eventKey, payload, opts)
  }
};
