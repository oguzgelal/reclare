
export const fail = (m, c) => { throw new Error(`${m} [F-${c}]`) };
export const warning = (m, c) => console.warn(`${m} [W-${c}]`);
export const error = (m, c) => console.error(`${m} [E-${c}]`);