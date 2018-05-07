/**
 * declarationTrigger - { situations, reactions, reactionsElse }
 */

import ctx from '../ctx';

import evaluateSituations from '../situations/evaluateSituations';
import executeReactions from '../reactions/executeReactions';
import executeHooks from '../middlewares/executeHooks';
import { DECLARATION_TRIGGER } from '../middlewares/hookTypes';

export default ({ declarationTrigger, eventKey, payload }) => {
  if (declarationTrigger) {

    const {
      unparsed,
      situations,
      reactions,
      reactionsElse,
    } = declarationTrigger;

    executeHooks({ id: DECLARATION_TRIGGER }, eventKey, payload, unparsed)

    let situationHolds = evaluateSituations({
      situations,
      eventKey,
      payload,
    });

    if (situationHolds) {
      executeReactions({
        reactions,
        eventKey,
        payload,
      })
    } else {
      executeReactions({
        reactions: reactionsElse,
        eventKey,
        payload,
      })
    }
  }
}