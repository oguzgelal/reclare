import { fail } from '../../utils/alert';

import validateDeclarations from './validateDeclarations';
import validateDeclaration from './validateDeclaration';
import processSituations from '../situations/processSituations';
import processReactions from '../reactions/processReactions';

const processDeclaration = ({ key, acc, processed }) => {
  acc[key] = acc[key] || [];
  acc[key].push(processed);
};

export default ({ ctx, store }) => {
  const { declarations } = store;
  validateDeclarations(declarations);

  const dec = declarations.reduce((acc, declaration) => {
    validateDeclaration(declaration);

    const processed = Object.assign(
      ...processSituations(declaration),
      ...processReactions(declaration)
    );

    if (declaration.key) {
      processDeclaration({ key: declaration.key, acc, processed });
    }
    if (declaration.keys) {
      declaration.keys.map(key => processDeclaration({ key, acc, processed }));
    }
    return acc;
  }, {});

  return dec;
};
