const operators = ['and', 'or', 'not'];

export default obj => {
  if (
    !obj ||
    !obj.operator ||
    !operators.includes(obj.operator) ||
    !obj.values ||
    !Array.isArray(obj.values)
  ) {
    return false;
  }
  return true;
};
