import ctx from '../ctx';

import defaultOptions from '../config/broadcastDefaults';
import executeHooks from '../middlewares/executeHooks';
import invokeDeclaration from '../declarations/invokeDeclaration';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';

const broadcast = (eventKey, payload) => {
  executeHooks({ id: BEFORE_BROADCAST }, eventKey, payload);

  invokeDeclaration({
    declaration: (ctx.onEvent || {})[eventKey] || null,
    eventKey,
    payload
  });

  executeHooks({ id: AFTER_BROADCAST }, eventKey, payload);
};

export default (eventKey, payload, options = {}) => {
  const opts = Object.assign(defaultOptions, options);

  if (opts.defer) {
    setTimeout(() => broadcast(eventKey, payload, opts));
  } else {
    broadcast(eventKey, payload, opts);
  }
};
