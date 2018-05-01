export default ({ situation, situations }) => {
  let processed = [];

  // situations is an array
  if (situations && Array.isArray(situations)) {
    processed = situations;
  }

  // situations is an object
  // TODO: this is the output of `and`, `or`, `not` functions.
  // Implement them first, then this
  if (
    situations &&
    !Array.isArray(situations) &&
    typeof situations === 'object'
  ) {
  }

  if (situation) {
    processed.push(situation);
  }

  return {
    situations: processed
  };
};
