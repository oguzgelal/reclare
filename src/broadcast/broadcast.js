import ctx from '../ctx';

import executeHooks from '../middlewares/executeHooks';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';
import executeDeclaration from '../declarations/executeDeclaration';

export default (eventKey, payload) => {

  executeHooks({ id: BEFORE_BROADCAST }, eventKey, payload);

  executeDeclaration({
    declarationTriggers: (ctx.declarations || {})[eventKey] || null,
    eventKey,
    payload,
  })

  executeHooks({ id: AFTER_BROADCAST }, eventKey, payload);
};
