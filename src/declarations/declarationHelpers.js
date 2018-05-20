import {
  fail,
  INVALID_DECLARATION_ARGUMENT,
  INVALID_DECLARATION
} from '../utils/alert';

export const validateDeclarations = ({ declarations }) => {
  if (!Array.isArray(declarations)) {
    fail(
      `Declarations should be passed as an object array, found ${typeof declarations} instead`,
      INVALID_DECLARATION_ARGUMENT
    );
  }
};

export const validateDeclaration = ({ declaration, customValidate }) => {
  if (!declaration) {
    fail(
      `Expected declaration, got ${JSON.stringify(declaration)}`,
      INVALID_DECLARATION
    );
  }
  if (customValidate) {
    customValidate({ declaration });
  }
};
