import toArray from '../../utils/toArray';

export default ({ reaction, reactionElse }) => ({
  reactions: toArray(reaction),
  reactionsElse: toArray(reactionElse),
});
