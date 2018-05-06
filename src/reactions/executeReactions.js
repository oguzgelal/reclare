/**
 * Reactions can be chained, when a reaction calls setState, the next reaction
 * will get the updated version of the state
 */

import ctx from '../ctx'

import executeReaction from './executeReaction';
import executeHooks from '../middlewares/executeHooks';
import { BEFORE_REACTION, AFTER_REACTION } from '../middlewares/hookTypes';

export default ({ reactions, eventKey, payload }) => {
  executeHooks({ id: BEFORE_REACTION }, eventKey, payload);
  reactions.map(r => executeReaction({ reaction: r, payload }));
  executeHooks({ id: AFTER_REACTION }, eventKey, payload);
}