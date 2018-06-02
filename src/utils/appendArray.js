import toArray from './toArray';

export default (appendTo, append) => {
  const opts = { dropUndefined: true, dropNull: true };
  return toArray(appendTo, opts).concat(toArray(append, opts));
};
