import ctx from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';
import triggerDeclarations from '../declarations/triggerDeclarations';

export default () => (eventKey, payload) => {

  executeHooks({ id: BEFORE_BROADCAST }, eventKey, payload);

  triggerDeclarations({
    declaration: (ctx.declarations || {})[eventKey] || null,
    eventKey,
    payload,
  })

  executeHooks({ id: AFTER_BROADCAST }, eventKey, payload);
};
