import { fail } from '../utils/alert';

const processSituations = ({ situation, ...rest }) => {
  return situation;
}

const _validateDeclarations = (declarations) => {
  if (!declarations) {
    fail('`declarations` field required', 'iMcb7yfuyG1Tv8')
  }
  if (!Array.isArray(declarations)) {
    fail('`declarations` should be an object array', 'wEfvjNdm3SCHuM')
  }
}

const _validateDeclaration = (declaration) => {
  if (!declaration) {
    fail(`Expected declaration, got ${JSON.stringify(declaration)}`, 'msm9g06+/LCoo3')
  }
  if (!declaration.key && !declaration.keys) {
    fail('Declarations should have at least one key', 'f2+fpC38gEa8+V')
  }
}

const _processDeclaration = ({ key, acc, processed }) => {
  acc[key] = acc[key] || [];
  acc[key].push(processed)
}

const processDeclarations = ({ ctx, store }) => {
  const { declarations } = store;
  _validateDeclarations(declarations)

  const dec = declarations.reduce((acc, declaration) => {
    _validateDeclaration(declaration)
    const processed = { ...declaration, situation: processSituations(declaration) }
    if (declaration.key) { _processDeclaration({ key: declaration.key, acc, processed }) }
    if (declaration.keys) { declaration.keys.map(key => _processDeclaration({ key, acc, processed })) }
    return acc;
  }, {})

  return dec;

}

export {
  processDeclarations
}