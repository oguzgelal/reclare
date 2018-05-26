import {
  fail,
  INVALID_DECLARATION_ARGUMENT,
  INVALID_DECLARATION,
  INVALID_TRIGGER
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
  if (!declaration || typeof declaration !== 'object') {
    fail(
      `Expected declaration object, got ${JSON.stringify(declaration)}`,
      INVALID_DECLARATION
    );
  }
  if (
    declaration.on &&
    typeof declaration.on !== 'string' &&
    !Array.isArray(declaration.on)
  ) {
    fail(
      'Declarations `on` trigger should either be a string or a string array',
      INVALID_TRIGGER
    );
  }
  // custom validator for declarations
  if (customValidate) {
    customValidate({ declaration });
  }
};
