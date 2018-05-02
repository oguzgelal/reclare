import { fail } from '../../utils/alert';

export const validateDeclarations = declarations => {
  if (!declarations) {
    fail('`declarations` field required', 'iMcb7yfuyG1Tv8');
  }
  if (!Array.isArray(declarations)) {
    fail('`declarations` should be an object array', 'wEfvjNdm3SCHuM');
  }
};

export const validateDeclaration = declaration => {
  if (!declaration) {
    fail(
      `Expected declaration, got ${JSON.stringify(declaration)}`,
      'msm9g06+/LCoo3'
    );
  }
  if (!declaration.on) {
    fail('Declarations should have at least one trigger', 'f2+fpC38gEa8+V');
  }
  if (typeof declaration.on !== 'string' && !Array.isArray(declaration.on)) {
    fail(
      'Declarations trigger should either be a string or a string array',
      'Ai/LlDsZ/nYFFk'
    );
  }
};

export const validateDeclarationTrigger = on => {
  if (typeof on !== 'string') {
    fail(
      `Declaration trigger must be of type string, instead got ${JSON.stringify(
        on
      )}`,
      'YCxxqyGdmCkoUW'
    );
  }
};
