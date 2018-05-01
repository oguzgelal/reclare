export default ({ reaction, reactions, reactionElse, reactionsElse }) => {
  let processedReactions = [];
  let processedReactionsElse = [];

  if (reactions && Array.isArray(reactions)) {
    processedReactions = reactions;
  }
  if (reaction) {
    processedReactions.push(reaction);
  }

  if (reactionsElse && Array.isArray(reactionsElse)) {
    processedReactionsElse = processedReactionsElse;
  }
  if (reactionElse) {
    processedReactionsElse.push(reactionElse);
  }

  return {
    reactions: processedReactions,
    reactionsElse: processedReactionsElse
  };
};
