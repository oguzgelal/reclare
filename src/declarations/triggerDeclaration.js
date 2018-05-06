import ctx from '../ctx';

import evaluateSituations from '../situations/evaluateSituations';
import runReactions from '../reactions/runReactions';

import executeHooks from '../middlewares/executeHooks';
import { ON_DECLARATION_TRIGGERED, ON_SITUATION_TRUE, ON_SITUATION_FALSE } from '../middlewares/hookTypes';

export default ({ declaration, eventKey, payload }) => {
  if (declaration) {
    executeHooks({ id: ON_DECLARATION_TRIGGERED }, eventKey, payload);

    const {
      situations,
      reactions,
      reactionsElse,
    } = declaration;

    let situationHolds = evaluateSituations({ situations, eventKey, payload });

    if (situationHolds) {
      executeHooks({ id: ON_SITUATION_TRUE }, eventKey, payload);
      runReaction({ reactions })
    } else {
      executeHooks({ id: ON_SITUATION_FALSE }, eventKey, payload);
      runReactions({ reactions: reactionsElse })
    }

  }
}