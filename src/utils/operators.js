export const and = (...values) => (...args) =>
  values.every(v => {
    if (Array.isArray(v)) return and(...v)(...args);
    if (typeof v === 'function') return v(...args);
    return !!v;
  });

export const or = (...values) => (...args) =>
  values.some(v => {
    if (Array.isArray(v)) return or(...v)(...args);
    if (typeof v === 'function') return v(...args);
    return !!v;
  });

export const not = value => (...args) => {
  if (Array.isArray(value)) return value.map(v => not(v)(...args));
  if (typeof value === 'function') return !value(...args);
  return !value;
};
