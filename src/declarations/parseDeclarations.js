import parseSituations from './situations/parseSituations';
import parseReactions from './reactions/parseReactions';
import parseReducers from './reducers/parseReducers';

import {
  validateDeclarations,
  validateDeclaration
} from './declarationHelpers';

export default ({ type, declarations, customValidate }) => {
  validateDeclarations({ type, declarations });

  return declarations.reduce((acc, declaration) => {
    validateDeclaration({
      type,
      declaration,
      customValidate
    });

    const parsed = Object.assign(
      {
        type,
        unparsed: declaration
      },
      parseSituations(declaration),
      parseReducers(declaration),
      parseReactions(declaration)
    );

    // merge declarations by "on"
    if (Array.isArray(declaration.on)) {
      declaration.on.map(on => {
        acc[on] = acc[on] || [];
        acc[on].push(parsed);
      });
    } else if (typeof declaration.on === 'string') {
      acc[declaration.on] = acc[declaration.on] || [];
      acc[declaration.on].push(parsed);
    }

    return acc;
  }, {});
};
