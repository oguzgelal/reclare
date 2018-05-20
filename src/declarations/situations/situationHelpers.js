export const validateSituation = ({ situation, customValidate }) => {
  if (customValidate) {
    customValidate({ situation })
  }
};
