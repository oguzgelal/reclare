import { fail, INVALID_REDUCER } from '../../utils/alert';

export const validateReducer = ({ reducer }) => {
  if (typeof reducer !== 'function') {
    fail(
      `Invalid reducer: expected function, got "${typeof reducer}"`,
      INVALID_REDUCER
    );
  }
};
