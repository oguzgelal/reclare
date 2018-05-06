/**
 * declarationTriggers - [{ situations, reactions, reactionsElse }]
 */

import executeDeclarationTriggers from './executeDeclarationTriggers';
import executeHooks from '../middlewares/executeHooks';
import { DECLARATION_HIT, DECLARATION_MISS } from '../middlewares/hookTypes';

export default ({ declarationTriggers, eventKey, payload }) => {

  if (declarationTriggers && declarationTriggers.length > 0) {
    executeHooks({ id: DECLARATION_HIT }, eventKey, payload);
  } else {
    executeHooks({ id: DECLARATION_MISS }, eventKey, payload);
  }

  (declarationTriggers || []).map(
    declarationTrigger => executeDeclarationTriggers({
      declarationTrigger, eventKey, payload,
    })
  )
}