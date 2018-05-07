import { fail } from '../utils/alert';

import {
  validateDeclarations,
  validateDeclaration,
  validateDeclarationTrigger
} from './declarationHelpers';

import parseSituations from '../situations/parseSituations';
import parseReactions from '../reactions/parseReactions';

const parseDeclaration = ({ on, acc, parsed }) => {
  validateDeclarationTrigger(on);
  acc[on] = acc[on] || [];
  acc[on].push(parsed);
};

export default ({ config }) => {
  const { declarations } = config;
  validateDeclarations(declarations);

  return declarations.reduce((acc, declaration) => {
    validateDeclaration(declaration);

    const parsed = Object.assign(
      { unparsed: declaration },
      parseSituations(declaration),
      parseReactions(declaration)
    );

    if (Array.isArray(declaration.on)) {
      declaration.on.map(on => parseDeclaration({ on, acc, parsed }));
    } else {
      parseDeclaration({ on: declaration.on, acc, parsed });
    }

    return acc;
  }, {});
};
