import { fail } from '../../utils/alert';

import {
  validateDeclarations,
  validateDeclaration,
  validateDeclarationTrigger
} from './declarationHelpers';

import processSituations from '../situations/processSituations';
import processReactions from '../reactions/processReactions';

const processDeclaration = ({ on, acc, processed }) => {
  validateDeclarationTrigger(on);
  acc[on] = acc[on] || [];
  acc[on].push(processed);
};

export default ({ ctx, store }) => {
  const { declarations } = store;
  validateDeclarations(declarations);

  return declarations.reduce((acc, declaration) => {
    validateDeclaration(declaration);

    const processed = Object.assign(
      processSituations(declaration),
      processReactions(declaration)
    );

    if (Array.isArray(declaration.on)) {
      declaration.on.map(on => processDeclaration({ on, acc, processed }));
    } else {
      processDeclaration({ on: declaration.on, acc, processed });
    }
    return acc;
  }, {});
};
