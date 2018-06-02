import invokeDeclaration from '../declarations/invokeDeclaration';
import { ON_STATE_CHANGE } from '../config/constants';
import hasChange from '../utils/hasChange';

export default ({ ctx, state, prevState }) => {
  if (!hasChange({ state, prevState })()) {
    return;
  }
  Object.keys(ctx[ON_STATE_CHANGE] || {}).forEach(declarationKey => {
    invokeDeclaration({
      hasChange: hasChange({ state, prevState }),
      declarations: ctx[ON_STATE_CHANGE][declarationKey] || [],
      prevState,
      ctx
    });
  });
};
