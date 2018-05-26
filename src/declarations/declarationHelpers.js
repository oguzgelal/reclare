import {
  fail,
  INVALID_DECLARATION_ARGUMENT,
  INVALID_DECLARATION,
  INVALID_TRIGGER,
  INVALID_REACTION,
  INVALID_REDUCER
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
  // fail if `on` exists and is invalid
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
  // fail if reaction exists and is invalid
  if (
    declaration.reaction &&
    typeof declaration.reaction !== 'function' &&
    !Array.isArray(declaration.reaction)
  ) {
    fail(
      '`reaction` should either be function or array of functions',
      INVALID_REACTION
    );
  }
  // fail if reducer exists and is invalid
  if (
    declaration.reducer &&
    typeof declaration.reducer !== 'function' &&
    !Array.isArray(declaration.reducer)
  ) {
    fail(
      '`reducer` should either be function or array of functions',
      INVALID_REDUCER
    );
  }

  // execute the custom validator for the declarations type
  customValidate({ declaration });
};
