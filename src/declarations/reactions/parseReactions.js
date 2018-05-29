import toArray from '../../utils/toArray';

export default ({
  reaction,
  reactionDeclared,
  reactionElse,
  reactionElseDeclared
}) => ({
  reactions: reactionDeclared ? toArray(reaction) : [],
  reactionsElse: reactionElseDeclared ? toArray(reactionElse) : []
});
