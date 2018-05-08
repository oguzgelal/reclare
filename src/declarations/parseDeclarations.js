import { fail } from '../utils/alert';

import {
  validateDeclarations,
  validateDeclaration,
  validateDeclarationOnKey,
} from './declarationHelpers';

import parseSituations from '../situations/parseSituations';
import parseReactions from '../reactions/parseReactions';
import parseReducers from '../reducers/parseReducers';

const insertDeclaration = ({ on, acc, parsed }) => {
  validateDeclarationOnKey(on);
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
      parseReactions(declaration),
      parseReducers(declaration),
    );

    if (Array.isArray(declaration.on)) {
      declaration.on.map(on => insertDeclaration({ on, acc, parsed }));
    } else {
      insertDeclaration({ on: declaration.on, acc, parsed });
    }

    return acc;
  }, {});
};
