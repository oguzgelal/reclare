/**
 * declarationTrigger - { situations, reactions, reactionsElse }
 */

import ctx from '../ctx';

import evaluateSituations from '../situations/evaluateSituations';
import executeReactions from '../reactions/executeReactions';

export default ({ declarationTrigger, eventKey, payload }) => {
  if (declarationTrigger) {

    const {
      situations,
      reactions,
      reactionsElse,
    } = declarationTrigger;

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