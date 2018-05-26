import parseSituations from './situations/parseSituations';
import parseReactions from './reactions/parseReactions';
import parseReducers from './reducers/parseReducers';
import toArray from '../utils/toArray';

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
    toArray(declaration.on).map(on => {
      acc[on] = acc[on] || [];
      acc[on].push(parsed);
    });

    return acc;
  }, {});
};
