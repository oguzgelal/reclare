import { fail } from '../utils/alert';

export const validateDeclarations = ({ declarations }) => {
  if (!declarations) {
    fail('`declarations` field required', 'iMcb7yfuyG1Tv8');
  }
  if (!Array.isArray(declarations)) {
    fail('`declarations` should be an object array', 'wEfvjNdm3SCHuM');
  }
};

export const validateDeclaration = ({ declaration, customValidate }) => {
  if (!declaration) {
    fail(
      `Expected declaration, got ${JSON.stringify(declaration)}`,
      'msm9g06+/LCoo3'
    );
  }
  if (customValidate) {
    customValidate({ declaration });
  }
};
