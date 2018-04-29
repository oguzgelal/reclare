export const fail = (m, c) => {
  throw new Error(`${m} [${c}]`);
};
export const warning = (m, c) => console.warn(`${m} [${c}]`);
export const error = (m, c) => console.error(`${m} [${c}]`);
