import { fail } from '../utils/alert';

const processSituations = ({ situation, ...rest }) => {
  return situation;
}

const validateDeclarations = (declarations) => {
  if (!declarations) {
    fail('`declarations` field required', 'iMcb7yfuyG1Tv8')
  }
  if (!Array.isArray(declarations)) {
    fail('`declarations` should be an object array', 'wEfvjNdm3SCHuM')
  }
}

const validateDeclaration = (declaration) => {
  if (!declaration) {
    fail(`Expected declaration, got ${JSON.stringify(declaration)}`, 'msm9g06+/LCoo3')
  }
  if (!declaration.key && !declaration.keys) {
    fail('Declarations should have at least one key', 'f2+fpC38gEa8+V')
  }
}

const processDeclaration = (acc, d) => {
  const p = { ...d, situation: processSituations(d) }
  if (d.key) { acc[d.key] = (acc[d.key] || []).push(p) }
  if (d.keys) { d.keys.map(key => acc[key] = (acc[key] || []).push(p)) }
  return acc;
}

const processDeclarations = ({ ctx, store }) => {
  const { declarations } = store;
  validateDeclarations(declarations)

  return declarations.reduce((acc, d) => {
    validateDeclaration(d)
    return processDeclaration(acc, d)
  }, {})

}

export {
  processDeclarations
}