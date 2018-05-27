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
      { type, unparsed: declaration },
      parseSituations({
        situation: declaration.situation,
        situationDeclared: declaration.hasOwnProperty('situation')
      }),
      parseReducers({
        reducer: declaration.reducer,
        reducerDeclared: declaration.hasOwnProperty('reducer'),
        reducerElse: declaration.reducerElse,
        reducerElseDeclared: declaration.hasOwnProperty('reducerElse')
      }),
      parseReactions({
        reaction: declaration.reaction,
        reactionDeclared: declaration.hasOwnProperty('reaction'),
        reactionElse: declaration.reactionElse,
        reactionElseDeclared: declaration.hasOwnProperty('reactionElse')
      })
    );

    // merge declarations by "on"
    toArray(declaration.on).map(on => {
      acc[on] = acc[on] || [];
      acc[on].push(parsed);
    });

    return acc;
  }, {});
};
