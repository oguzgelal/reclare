import { fail } from '../utils/alert';

import {
  validateDeclarations,
  validateDeclaration
} from './declarationHelpers';
import parseSituations from './situations/parseSituations';
import parseReactions from './reactions/parseReactions';
import parseReducers from './reducers/parseReducers';
import { validateSituation } from './situations/situationHelpers';
import { validateReducer } from './reducers/reducerHelpers';
import { validateReaction } from './reactions/reactionHelpers';

export default ({
  type,
  declarations,
  customValidateDeclaration,
  customValidateSituation,
  customValidateReducer,
  customValidateReaction
}) => {
  validateDeclarations({ type, declarations });

  return declarations.reduce((acc, declaration) => {
    validateDeclaration({
      type,
      declaration,
      customValidate: customValidateDeclaration
    });

    const parsed = Object.assign(
      {
        type,
        unparsed: declaration
      },
      parseSituations({
        declaration,
        validator: situation => {
          validateSituation({
            customValidate: customValidateSituation,
            situation
          });
        }
      }),
      parseReducers({
        declaration,
        validator: reducer => {
          validateReducer({
            customValidate: customValidateReducer,
            reducer
          });
        }
      }),
      parseReactions({
        declaration,
        validator: reaction => {
          validateReaction({
            customValidate: customValidateReaction,
            reaction
          });
        }
      })
    );

    // merge declarations by "on"
    if (Array.isArray(declaration.on)) {
      declaration.on.map(on => {
        acc[on] = acc[on] || [];
        acc[on].push(parsed);
      });
    } else {
      acc[on] = acc[on] || [];
      acc[on].push(parsed);
    }

    return acc;
  }, {});
};
