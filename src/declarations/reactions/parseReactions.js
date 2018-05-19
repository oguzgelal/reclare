import toArray from '../../utils/toArray';
import { validateReaction } from './reactionHelpers';

export default ({ reaction, reactionElse, validator }) => {
  const reactions = toArray(reaction, validator);
  const reactionsElse = toArray(reactionElse, validator);

  reactions.map(validator);
  reactionsElse.map(validator);

  return { reactions, reactionsElse }
};