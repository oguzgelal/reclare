export const and = (...values) => ({ operator: 'and', values });
export const not = (...values) => ({ operator: 'not', values });
export const or = (...values) => ({ operator: 'or', values });
export const operatorShapeValid = obj =>
  obj &&
  obj.operator &&
  ['and', 'or', 'not'].includes(obj.operator) &&
  obj.values &&
  Array.isArray(obj.values);
