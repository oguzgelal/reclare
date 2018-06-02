export default (arr, options = {}) => {
  if (Array.isArray(arr)) {
    return arr;
  }
  if (arr === undefined && options.dropUndefined) {
    return [];
  }
  if (arr === null && options.dropNull) {
    return [];
  }
  return [arr];
};
