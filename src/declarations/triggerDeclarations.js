import ctx from '../ctx';

import evaluateSituations from '../situations/evaluateSituations';
import runReactions from '../reactions/runReactions';

import executeHooks from '../middlewares/executeHooks';
import { ON_DECLARATION_TRIGGERED } from '../middlewares/hookTypes';

export default ({ declaration, eventKey, payload }) => {
  if (declaration) {
    executeHooks({ id: ON_DECLARATION_TRIGGERED }, eventKey, payload);

    const {
      situations,
      reactions,
      reactionsElse,
    } = declaration;

    let situationHolds = evaluateSituations({
      situations,
      eventKey,
      payload,
    });

    if (situationHolds) {
      runReaction({ reactions })
    } else {
      runReactions({ reactions: reactionsElse })
    }
  }
}