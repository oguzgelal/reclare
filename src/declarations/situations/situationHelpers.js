import { fail } from '../utils/alert';

export const validateSituation = ({ situation, customValidate }) => {
  if (customValidate) {
    customValidate({ situation })
  }
};
