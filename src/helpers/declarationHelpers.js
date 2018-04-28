import { fail } from './alert';

export const processDeclarations = (store) => {

  if (!store.declarations) {
    fail('`declarations` field required', 'iMcb7yfuyG1Tv8')
  }

  if (!Array.isArray(store.declarations)) {
    fail('`declarations` should be an object array', 'wEfvjNdm3SCHuM')
  }

  const { declarations } = store;
}